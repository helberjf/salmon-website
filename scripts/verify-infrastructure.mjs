import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));

function read(relativePath) {
  return readFileSync(join(projectRoot, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const dockerfile = read('Dockerfile');
const dockerImages = [...dockerfile.matchAll(/^FROM\s+(\S+)/gm)].map((match) => match[1]);
assert(dockerImages.length === 2, 'Dockerfile must have exactly two pinned build stages.');
for (const image of dockerImages) {
  assert(/:\d[^@\s]*@sha256:[a-f0-9]{64}$/.test(image), `Docker image is not pinned by version and digest: ${image}`);
}
assert(/^USER\s+101$/m.test(dockerfile), 'Docker runtime must use the unprivileged UID 101.');
assert(/^EXPOSE\s+8080$/m.test(dockerfile), 'Docker runtime must expose the unprivileged port 8080.');

const nginxFiles = [
  'deploy/nginx.conf.example',
  'deploy/nginx.docker.conf',
  'deploy/nginx.tls.conf.example',
];
for (const filename of nginxFiles) {
  const nginx = read(filename);
  assert(nginx.includes('return 308 /a-norwell$is_args$args;'), `Missing /norwell 308 redirect in ${filename}.`);
  assert(nginx.includes('return 308 /$1/a-norwell$is_args$args;'), `Missing localized Norwell 308 redirect in ${filename}.`);
  assert(nginx.includes("frame-ancestors 'none'"), `CSP must block framing in ${filename}.`);
  assert(nginx.includes("object-src 'none'"), `CSP must block plugins in ${filename}.`);
  assert(nginx.includes("script-src 'self'"), `CSP must restrict scripts in ${filename}.`);
  assert(nginx.includes('X-Frame-Options "DENY"'), `Legacy framing protection is missing in ${filename}.`);
}

assert(
  !read('deploy/nginx.conf.example').includes('Strict-Transport-Security'),
  'The HTTP bootstrap server must not emit HSTS.',
);
assert(
  !read('deploy/nginx.docker.conf').includes('Strict-Transport-Security'),
  'The private HTTP container must not emit HSTS.',
);
assert(
  !read('deploy/nginx.conf.example').includes('upgrade-insecure-requests'),
  'The HTTP bootstrap server must not upgrade its own subresources to HTTPS.',
);
assert(
  !read('deploy/nginx.docker.conf').includes('upgrade-insecure-requests'),
  'The private HTTP container must not upgrade its own subresources to HTTPS.',
);
const tlsNginx = read('deploy/nginx.tls.conf.example');
assert(tlsNginx.includes('listen 443 ssl http2;'), 'TLS example must terminate HTTPS on port 443.');
assert(tlsNginx.includes('Strict-Transport-Security'), 'TLS terminator must emit HSTS after HTTPS is enabled.');
assert(tlsNginx.includes('upgrade-insecure-requests'), 'TLS CSP must upgrade accidental insecure subresources.');

console.log('Verified Docker pins, unprivileged runtime, redirects, CSP and TLS/HSTS boundaries.');
