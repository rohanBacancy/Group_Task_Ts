import React,{FC} from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Login from '../pages/Login';

//const LandingPage = lazy(() => import('../pages/LandingPage'));

const UnAuthorisedApp:FC = () => {
  const location = useLocation();
  return (
    <Switch>
      <Route path="/" component={Login}/>
      <Redirect
        to={{
          pathname: '/',
          state: { from: location },
        }}
      />
    </Switch>
  );
};

export default UnAuthorisedApp;
