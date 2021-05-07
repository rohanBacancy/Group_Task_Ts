import React, { Suspense, FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
// import Header from '../components/common/layout/Header';
import NoMatch from '../pages/NoMatch';


const AuthorisedApp:FC = () => {
  return (
    <div className="layout">
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* <Header /> */}
        <Switch>
          <Route path={'/dashboard'} component={Dashboard}/>
          <Route path="*" component={NoMatch}/> 
          {/* register other protected components here */}
        </Switch>
      </Suspense>
    </div>
  );
};

export default AuthorisedApp;
