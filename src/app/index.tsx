import React, { Suspense, FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from '../Hooks/useAuth';

const AuthenticatedApp = React.lazy(() => import('./AuthorisedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnAuthorisedApp'));

const App: FC = () => {
  // const user:string|null = window.localStorage.getItem('userId');
  const user  = useAuth()

  return (
    <Suspense fallback={<h2>loading....</h2>}>
      {user?.isLoggedIn ? < AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
};

const AppWithProvider = () => {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
};

export default AppWithProvider;
