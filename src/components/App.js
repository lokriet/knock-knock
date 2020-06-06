import './App.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import JokesList from './JokesList/JokesList';
import ViewJoke from './ViewJoke/ViewJoke';
import EditJoke from './EditJoke/EditJoke';
import PageNotFound from './PageNotFound/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={JokesList} />
        <Route path="/viewJoke/:jokeId" component={ViewJoke} />
        <Route path="/editJoke/:jokeId" component={EditJoke} />
        <Route path="/" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
