import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import Layout from './components/Layout';
import Landing from './views/Landing';
import Analyzer from './views/Analyzer';
import SpyMode from './views/SpyMode';
import Experts from './views/Experts';
import Ending from './views/Ending';
import AuthView from './views/Auth';
import PublicForum from './views/PublicForum';
import TrendRadarView from './views/TrendRadarView';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({
          name: session.user.user_metadata.full_name || 'Founder',
          email: session.user.email || ''
        });
      }
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser({
          name: session.user.user_metadata.full_name || 'Founder',
          email: session.user.email || ''
        });

        // If they just signed in or are currently on the Auth page, take them to the analyzer
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          setAppState(prev => prev === AppState.AUTH ? AppState.ANALYZER : prev);
        }
      } else {
        setUser(null);
        setAppState(AppState.LANDING);
      }
    });

    return () => subscription.unsubscribe();
  }, []); // Run once on mount

  const handleNavigate = (state: AppState) => {
    if (state !== AppState.LANDING && state !== AppState.AUTH && !user) {
      setAppState(AppState.AUTH);
    } else {
      setAppState(state);
    }
  };

  const handleAuthSuccess = () => {
    // Auth success is handled by onAuthStateChange
    setAppState(AppState.ANALYZER);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Layout
      activeState={appState}
      onNavigate={handleNavigate}
      user={user}
      onLogout={handleLogout}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={appState}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-full"
        >
          {appState === AppState.LANDING && (
            <Landing
              onStart={() => setAppState(user ? AppState.ANALYZER : AppState.AUTH)}
            />
          )}
          {appState === AppState.AUTH && (
            <AuthView onAuthSuccess={handleAuthSuccess} />
          )}
          {appState === AppState.ANALYZER && <Analyzer />}
          {appState === AppState.SPY_MODE && <SpyMode />}
          {appState === AppState.EXPERTS && <Experts />}
          {appState === AppState.PUBLIC_FORUM && <PublicForum user={user?.name || 'Anonymous'} />}
          {appState === AppState.TREND_RADAR && <TrendRadarView />}
          {appState === AppState.ENDING && <Ending type="Human" onReset={() => setAppState(AppState.LANDING)} />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
