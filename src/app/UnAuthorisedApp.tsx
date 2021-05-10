import React, { FC, lazy } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));

const Registration = lazy(() => import('../pages/Registration'));

const UnAuthorisedApp: FC = () => {
  const location = useLocation();

  return (
    <Switch>
      <Route path="/Register" component={Registration} />
      <Route path="/" component={Login} />
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
