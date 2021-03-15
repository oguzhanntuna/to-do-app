import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import ToDo from './pages/ToDo/ToDo';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';

const App: React.FC = () => {
  const routes = (
    <Switch>
      <Route path="/" exact component={ToDo} />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Redirect from="/" to="/"/>
    </Switch>
  )

  return (
    <div className="App">
      <Layout>
          {routes}
      </Layout>
    </div>
  );
}

export default withRouter(App);
