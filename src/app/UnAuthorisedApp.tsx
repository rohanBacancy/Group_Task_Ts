import React, { FC, lazy } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));
// const DashBoard = lazy(() => import('../pages/Dashboard'));

const UnAuthorisedApp: FC = () => {
  const location = useLocation();

  return (
    <Switch>
      <Route path="/" component={Login} />
      {/* <Route exact path={'/'} component={DashBoard} /> */}
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
