import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Main from './components/MainComponent';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Main />
    </div>
  </BrowserRouter>
);

export default DragDropContext(HTML5Backend)(App);
