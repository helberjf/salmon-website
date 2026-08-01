import { lazy, Suspense } from 'react';
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import { Route, Switch } from 'wouter';
import Home from '@/pages/Home';
import { SkipLink } from '@/components/layout/SkipLink';
import { RouteFocusManager } from '@/components/layout/RouteFocusManager';
import { supportedLanguages } from '@/i18n/translations';

const AboutPage = lazy(() => import('@/pages/AboutPage'));
const NorwellPage = lazy(() => import('@/pages/NorwellPage'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('@/pages/TermsOfUse'));
const NotFound = lazy(() => import('@/pages/not-found'));

function App() {
  return (
    // reducedMotion="user" desativa as animações quando o sistema do visitante
    // estiver configurado para reduzir movimento (prefers-reduced-motion).
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <SkipLink />
        <RouteFocusManager />
        <Suspense fallback={<div className="min-h-dvh bg-background" aria-hidden="true" />}>
          <Switch>
            {supportedLanguages.map((language) => (
              <Route key={`${language}-home`} path={`/${language}`} component={Home} />
            ))}
            {supportedLanguages.map((language) => (
              <Route
                key={`${language}-norwell`}
                path={`/${language}/a-norwell`}
                component={NorwellPage}
              />
            ))}
            {supportedLanguages.map((language) => (
              <Route
                key={`${language}-norwell-alias`}
                path={`/${language}/norwell`}
                component={NorwellPage}
              />
            ))}
            {supportedLanguages.map((language) => (
              <Route
                key={`${language}-products`}
                path={`/${language}/produtos`}
                component={ProductsPage}
              />
            ))}
            {supportedLanguages.map((language) => (
              <Route
                key={`${language}-about`}
                path={`/${language}/sobre`}
                component={AboutPage}
              />
            ))}
            {supportedLanguages.map((language) => (
              <Route
                key={`${language}-privacy`}
                path={`/${language}/privacidade`}
                component={PrivacyPolicy}
              />
            ))}
            {supportedLanguages.map((language) => (
              <Route
                key={`${language}-terms`}
                path={`/${language}/termos`}
                component={TermsOfUse}
              />
            ))}

            {/* Unprefixed URLs remain language-aware gateways and preserve old links. */}
            <Route path="/" component={Home} />
            <Route path="/a-norwell" component={NorwellPage} />
            <Route path="/norwell" component={NorwellPage} />
            <Route path="/produtos" component={ProductsPage} />
            <Route path="/sobre" component={AboutPage} />
            <Route path="/privacidade" component={PrivacyPolicy} />
            <Route path="/termos" component={TermsOfUse} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
