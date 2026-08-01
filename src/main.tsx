import { createRoot } from 'react-dom/client';

import App from './App';
import { I18nProvider } from '@/i18n/I18nProvider';
import { normalizeStaticHtmlPathname } from '@/i18n/routing';

import './index.css';

const normalizedPathname = normalizeStaticHtmlPathname(window.location.pathname);
if (normalizedPathname) {
  window.history.replaceState(
    window.history.state,
    '',
    `${normalizedPathname}${window.location.search}${window.location.hash}`,
  );
}

createRoot(document.getElementById('root')!).render(
  <I18nProvider>
    <App />
  </I18nProvider>,
);
