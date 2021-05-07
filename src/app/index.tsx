import React, { Suspense, FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';


import AuthorisedApp from './AuthorisedApp'
import UnAuthorisedApp from './UnAuthorisedApp';
const App:FC = () => {
  const user:string|null = window.localStorage.getItem('userId');
  return (
    <Router>
    <Suspense fallback={<h2>loading....</h2>}>
      {user? <AuthorisedApp /> : <UnAuthorisedApp />}
    </Suspense>
    </Router>
  );
};


export default App;
