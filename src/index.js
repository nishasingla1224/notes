import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route ,Switch } from 'react-router-dom';
import reducers from './reducers';
import NotesIndex from './components/notes_index';
import NotesShow from './components/notes_show';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
   <BrowserRouter>
    <div>
      <Switch>
      <Route path="/notes/new" component={NotesShow} />
      <Route path="/notes/:id" component={NotesShow} />
      <Route path="/" component={NotesIndex} />
      </Switch>
    </div>
   </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

