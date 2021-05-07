import React, { Suspense, FC, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const DashBoard = lazy(() => import('../pages/Dashboard'));
const NoMatch = lazy(() => import('../pages/NoMatch'));


const AuthorisedApp: FC = () => {
  return (
    <div className="layout">
      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          <Route exact path={'/'} component={DashBoard} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default AuthorisedApp;
