import React, { Component } from 'react';
import { withRouter, Switch, BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import './App.scss';
import { Layout } from './pages/Layout/layout';

const withLayout = (objRoute) => {
  return class extends React.Component {
    render() {
      if (!objRoute.parentLayout) {
        return <Layout>
          <objRoute.component />
        </Layout>
      }
      else {
        return <objRoute.parentLayout>
          <objRoute.component />
        </objRoute.parentLayout>
      }
    }
  };
}

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            {routes.map((route, idx) =>
              <route.route path={route.path} component={withLayout(route)} key={idx} />
            )}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default withRouter(App);