/**
 * Auditoria de responsividade e integridade visual.
 *
 * Abre cada rota em Desktop (1440), Tablet (768) e Mobile (375 e 320), tira
 * screenshots de página inteira (e do menu mobile aberto) e procura só erros
 * críticos:
 *   - overflow: scroll horizontal ou elemento visível fora da tela;
 *   - overlap: textos/controles encavalados entre si;
 *   - legibility: texto < 12px nas larguras de celular;
 *   - tap-target: alvo de toque < 24px ou alvos < 44px colados (< 8px);
 *   - edge: conteúdo a menos de 16px da borda no celular;
 *   - missing: link/CTA do desktop sem equivalente no celular.
 *
 * Uso: com o site servido (`npm run build && npm run preview`), rode
 *   node scripts/audit-responsive.mjs [baseUrl]
 * Resultado em test-results/responsive-audit/ (report.json + PNGs).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const baseUrl = (process.argv[2] ?? process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:4173').replace(/\/$/, '');
const outDir = fileURLToPath(new URL('../test-results/responsive-audit/', import.meta.url));
mkdirSync(outDir, { recursive: true });

const routes = ['/', '/a-norwell', '/produtos', '/sobre', '/privacidade', '/termos'];
const languages = ['pt', 'en'];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
  { name: 'mobile-sm', width: 320, height: 640 },
];

/** Roda no navegador: devolve os problemas encontrados na página atual. */
function inspectPage({ isPhone, scope = 'body' }) {
  const issues = [];
  const vw = document.documentElement.clientWidth;
  const describe = (el) => {
    const id = el.id ? `#${el.id}` : '';
    const cls = typeof el.className === 'string' ? `.${el.className.trim().split(/\s+/).slice(0, 4).join('.')}` : '';
    const text = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('alt') || '').trim().replace(/\s+/g, ' ').slice(0, 60);
    return `${el.tagName.toLowerCase()}${id}${cls}${text ? ` "${text}"` : ''}`;
  };
  const isVisible = (el) => {
    const style = getComputedStyle(el);
    if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity) === 0) return false;
    if (el.closest('[aria-hidden="true"]')) return false;
    // Conteúdo de um <details> fechado não é renderizado (só o <summary>).
    const closedDetails = el.closest('details:not([open])');
    if (closedDetails && !el.closest('summary')) return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };
  /** Parte do elemento que sobra depois do recorte dos ancestrais com overflow. */
  const clippedRect = (el) => {
    const r = el.getBoundingClientRect();
    let left = r.left;
    let right = r.right;
    for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
      const s = getComputedStyle(a);
      if (s.overflowX !== 'visible' || s.overflow === 'hidden' || s.overflow === 'clip') {
        const ar = a.getBoundingClientRect();
        left = Math.max(left, ar.left);
        right = Math.min(right, ar.right);
      }
    }
    return { left, right, top: r.top, bottom: r.bottom, width: right - left };
  };
  const pageY = (rect) => rect.top + window.scrollY;

  // 1. Overflow horizontal
  const scrollWidth = document.documentElement.scrollWidth;
  if (scrollWidth > vw + 1) {
    issues.push({ type: 'overflow', detail: `documento com scroll horizontal: scrollWidth ${scrollWidth}px > ${vw}px` });
  }
  const leaves = [...document.querySelectorAll(`${scope} *`)].filter(
    (el) => !['SCRIPT', 'STYLE', 'SOURCE', 'svg', 'path', 'PICTURE'].includes(el.tagName) && isVisible(el),
  );
  for (const el of leaves) {
    const c = clippedRect(el);
    if (c.width <= 0) continue;
    if (c.right > vw + 1 || c.left < -1) {
      // Reporta só o elemento mais externo que estoura.
      const parent = el.parentElement && clippedRect(el.parentElement);
      if (parent && (parent.right > vw + 1 || parent.left < -1)) continue;
      issues.push({
        type: 'overflow',
        detail: `${describe(el)} vai de ${Math.round(c.left)} a ${Math.round(c.right)}px (tela ${vw}px)`,
        y: Math.round(pageY(c)),
      });
    }
  }

  // Elementos "de conteúdo": texto direto, controles e mídia.
  const hasOwnText = (el) =>
    [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0);
  const isControl = (el) => el.matches('a[href], button, input, select, textarea, [role="button"]');
  const isFixed = (el) => {
    for (let a = el; a; a = a.parentElement) if (getComputedStyle(a).position === 'fixed') return true;
    return false;
  };
  const content = leaves.filter((el) => (hasOwnText(el) || isControl(el)) && !isFixed(el));

  // 2. Sobreposição entre textos/controles que não são ancestrais um do outro.
  // Elementos inline usam as caixas de cada linha (getClientRects): a caixa
  // envolvente de um texto quebrado em várias linhas cobre vizinhos sem sobrepô-los.
  const boxes = content.map((el) => ({
    el,
    r: el.getBoundingClientRect(),
    lines: getComputedStyle(el).display === 'inline' ? [...el.getClientRects()] : [el.getBoundingClientRect()],
  }));
  const overlapOf = (a, b) => {
    let best = { w: 0, h: 0 };
    for (const ra of a.lines) {
      for (const rb of b.lines) {
        const w = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
        const h = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
        if (w > 3 && h > 3 && w * h > best.w * best.h) best = { w, h };
      }
    }
    return best;
  };
  for (let i = 0; i < boxes.length; i += 1) {
    for (let j = i + 1; j < boxes.length; j += 1) {
      const a = boxes[i];
      const b = boxes[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const { w, h } = overlapOf(a, b);
      if (w > 3 && h > 3) {
        issues.push({
          type: 'overlap',
          detail: `${describe(a.el)} × ${describe(b.el)} (${Math.round(w)}×${Math.round(h)}px)`,
          y: Math.round(pageY(a.r)),
        });
      }
    }
  }

  // Header fixo e botões flutuantes cobrindo conteúdo na posição atual
  const fixedEls = [...document.querySelectorAll('header, .whatsapp-pulse, .floating-safe-bottom')].filter(isVisible);
  for (const f of fixedEls) {
    const fr = f.getBoundingClientRect();
    for (const { el, r } of boxes) {
      if (f.contains(el) || !isControl(el)) continue;
      const w = Math.min(fr.right, r.right) - Math.max(fr.left, r.left);
      const h = Math.min(fr.bottom, r.bottom) - Math.max(fr.top, r.top);
      if (w > 8 && h > 8 && r.top >= 0 && r.bottom <= window.innerHeight) {
        issues.push({ type: 'overlap', detail: `fixo ${describe(f)} cobre ${describe(el)}`, y: Math.round(pageY(r)) });
      }
    }
  }

  if (isPhone) {
    // 3. Legibilidade
    for (const el of content) {
      if (!hasOwnText(el)) continue;
      const size = parseFloat(getComputedStyle(el).fontSize);
      if (size < 12) {
        issues.push({ type: 'legibility', detail: `${describe(el)} com ${size}px`, y: Math.round(pageY(el.getBoundingClientRect())) });
      }
    }

    // 4. Alvos de toque
    const targets = content.filter(isControl).map((el) => ({ el, r: el.getBoundingClientRect() }));
    for (const { el, r } of targets) {
      const inlineInText = el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.parentElement && hasOwnText(el.parentElement);
      if (inlineInText) continue;
      if (r.width < 24 || r.height < 24) {
        issues.push({ type: 'tap-target', detail: `${describe(el)} com ${Math.round(r.width)}×${Math.round(r.height)}px`, y: Math.round(pageY(r)) });
      }
    }
    for (let i = 0; i < targets.length; i += 1) {
      for (let j = i + 1; j < targets.length; j += 1) {
        const a = targets[i];
        const b = targets[j];
        if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
        if (Math.min(a.r.height, b.r.height) >= 44) continue;
        const gapX = Math.max(a.r.left, b.r.left) - Math.min(a.r.right, b.r.right);
        const gapY = Math.max(a.r.top, b.r.top) - Math.min(a.r.bottom, b.r.bottom);
        const gap = Math.max(gapX, gapY);
        if (gap < 8 && gapX < 8 && gapY < 8) {
          issues.push({
            type: 'tap-target',
            detail: `${describe(a.el)} e ${describe(b.el)} a ${Math.max(0, Math.round(gap))}px`,
            y: Math.round(pageY(a.r)),
          });
        }
      }
    }

    // 5. Encostado na borda
    for (const el of content) {
      const r = el.getBoundingClientRect();
      if (r.width >= vw - 2) continue; // elementos de largura total (faixas, imagens full-bleed)
      const c = clippedRect(el);
      if (c.width <= 0) continue;
      if (c.left < 15.5 || c.right > vw - 15.5) {
        issues.push({
          type: 'edge',
          detail: `${describe(el)} a ${Math.round(Math.min(c.left, vw - c.right))}px da borda`,
          y: Math.round(pageY(r)),
        });
      }
    }
  }

  // Inventário para comparar desktop × celular
  const links = [...document.querySelectorAll('main a[href], main button, footer a[href]')]
    .filter(isVisible)
    .map((el) => `${el.getAttribute('href') ?? 'button'}`);
  return { issues, links: [...new Set(links)] };
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (const img of document.querySelectorAll('img')) img.loading = 'eager';
    const step = Math.max(300, window.innerHeight * 0.8);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}

const browser = await chromium.launch();
const report = [];
for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    reducedMotion: 'reduce',
    deviceScaleFactor: 1,
    isMobile: viewport.width < 768,
    hasTouch: viewport.width < 768,
  });
  for (const language of languages) {
    for (const route of routes) {
      const page = await context.newPage();
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const path = route === '/' ? `/${language}` : `/${language}${route}`;
      await page.goto(baseUrl + path, { waitUntil: 'networkidle' });
      await scrollThrough(page);
      const isPhone = viewport.width <= 375;
      const result = await page.evaluate(inspectPage, { isPhone });
      const slug = `${viewport.name}-${language}${route === '/' ? '-home' : route.replace(/\//g, '-')}`;
      await page.screenshot({ path: join(outDir, `${slug}.png`), fullPage: true });

      let menuIssues = [];
      if (viewport.width < 1280 && route === '/') {
        await page.locator('button[aria-controls="menu-mobile"]').click();
        await page.locator('#menu-mobile').waitFor();
        await page.waitForTimeout(250);
        const menu = await page.evaluate(inspectPage, { isPhone, scope: 'header' });
        menuIssues = menu.issues.map((issue) => ({ ...issue, detail: `[menu aberto] ${issue.detail}` }));
        await page.screenshot({ path: join(outDir, `${slug}-menu.png`) });
      }
      report.push({ viewport: viewport.name, width: viewport.width, path, issues: [...result.issues, ...menuIssues], links: result.links });
      await page.close();
    }
  }
  await context.close();
}
await browser.close();

// 6. Links/CTAs do desktop que somem no celular
for (const entry of report.filter((r) => r.viewport !== 'desktop')) {
  const desktop = report.find((r) => r.viewport === 'desktop' && r.path === entry.path);
  const missing = desktop.links.filter((href) => !entry.links.includes(href));
  for (const href of missing) entry.issues.push({ type: 'missing', detail: `link ${href} visível no desktop e ausente em ${entry.width}px` });
}

writeFileSync(join(outDir, 'report.json'), JSON.stringify(report.map(({ links, ...rest }) => rest), null, 2));
let total = 0;
for (const entry of report) {
  if (!entry.issues.length) continue;
  console.log(`\n${entry.viewport} (${entry.width}px) ${entry.path}`);
  for (const issue of entry.issues) {
    total += 1;
    console.log(`  [${issue.type}] ${issue.detail}${issue.y !== undefined ? ` @y=${issue.y}` : ''}`);
  }
}
console.log(`\n${total} problema(s) em ${report.length} combinações de rota × idioma × viewport. Screenshots em ${outDir}`);
process.exitCode = total > 0 ? 1 : 0;
