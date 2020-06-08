import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import JokesList from './JokesList/JokesList';
import ViewJoke from './ViewJoke/ViewJoke';
import EditJoke from './EditJoke/EditJoke';
import PageNotFound from './PageNotFound/PageNotFound';
import Layout from './UI/Layout/Layout';
import { ErrorBoundary } from '../hoc/ErrorBoundary';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <ErrorBoundary>
          <Switch>
            <Route path="/" exact component={JokesList} />
            <Route path="/viewJoke/:jokeId" component={ViewJoke} />
            <Route path="/editJoke/:jokeId" component={EditJoke} />
            <Route
              path="/newJoke"
              render={(routeProps) => <EditJoke isNew {...routeProps} />}
            />
            <Route path="/" component={PageNotFound} />
          </Switch>
        </ErrorBoundary>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
