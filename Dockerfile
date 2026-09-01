# Imagens fixadas por versao e digest multi-arquitetura para builds reproduziveis.
# O Dependabot acompanha novas versoes e digests deste arquivo.
FROM node:22.23.2-alpine3.24@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY index.html tsconfig.json vite.config.ts ./
COPY src ./src
COPY public ./public
COPY scripts ./scripts
RUN npm run build

# A imagem oficial nginx-unprivileged executa o processo como UID 101 e usa 8080.
FROM nginxinc/nginx-unprivileged:1.31.4-alpine3.24@sha256:d9083fe47768377ef55dedafd67d4da7c2f2bc2bece7554954f29359deb0dce9 AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY deploy/nginx.docker.conf /etc/nginx/conf.d/default.conf
USER 101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
