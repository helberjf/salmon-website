import { createRoot } from 'react-dom/client';

import App from './App';
import { detectInitialLanguage, I18nProvider } from '@/i18n/I18nProvider';
import { normalizeStaticHtmlPathname } from '@/i18n/routing';
import { loadTranslations } from '@/i18n/translations';

import './index.css';

const normalizedPathname = normalizeStaticHtmlPathname(window.location.pathname);
if (normalizedPathname) {
  window.history.replaceState(
    window.history.state,
    '',
    `${normalizedPathname}${window.location.search}${window.location.hash}`,
  );
}

async function mountApplication() {
  // Waiting for only the active catalog avoids a visible Portuguese-to-localized flash.
  // If the chunk is unavailable, the provider still mounts with its Portuguese fallback.
  await loadTranslations(detectInitialLanguage()).catch(() => undefined);

  createRoot(document.getElementById('root')!).render(
    <I18nProvider>
      <App />
    </I18nProvider>,
  );
}

void mountApplication();
