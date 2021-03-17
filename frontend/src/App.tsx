import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Tasks from 'pages/Tasks';
import Teams from 'pages/Teams';
import Settings from 'pages/Settings';
import Header from 'components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/teams" component={Teams} />
          <Route exact path="/settings" component={Settings} />
          <Route default component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
