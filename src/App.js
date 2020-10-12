import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from './components/header/header.component';
import HomePage from './pages/home/homepage.component';
import MainPage from './pages/main/main.component';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/play' component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;
