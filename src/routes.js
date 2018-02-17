import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import ChartsPage from './containers/ChartsPage';

function AppRouter(store) {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={ChartsPage} />
    </Route>
  );
}


export default AppRouter;
