import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import './App.scss';
import { Layout } from './pages/layout/layout';
import routes from './routes';

// This is the function which manage layout based on routes
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