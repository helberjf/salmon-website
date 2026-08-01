import { MotionConfig } from 'framer-motion';
import { Route, Switch } from 'wouter';
import Home from '@/pages/Home';
import AboutPage from '@/pages/AboutPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfUse from '@/pages/TermsOfUse';
import NotFound from '@/pages/not-found';

function App() {
  return (
    // reducedMotion="user" desativa as animações quando o sistema do visitante
    // estiver configurado para reduzir movimento (prefers-reduced-motion).
    <MotionConfig reducedMotion="user">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sobre" component={AboutPage} />
        <Route path="/privacidade" component={PrivacyPolicy} />
        <Route path="/termos" component={TermsOfUse} />
        <Route component={NotFound} />
      </Switch>
    </MotionConfig>
  );
}

export default App;
