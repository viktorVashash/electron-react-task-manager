import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/ui/header';
import Home from './containers/Home';

const App = () => (
  <div>
    <Header />
    <Route path="/" component={ Home } />
  </div>
);

export default App;
