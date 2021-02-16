import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from 'components/Auth';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Logout from 'components/Logout';
import Header from 'components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Logout />
        <Route exact path="/login" component={Login} />
        <Auth>
          <Route exact path="/" component={Home} />
        </Auth>
      </Router>
    </div>
  );
}

export default App;
