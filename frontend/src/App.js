import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Main from './components/MainComponent';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Main />
    </div>
  </BrowserRouter>
);

export default App;
