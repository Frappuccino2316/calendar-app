import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import verifyToken from 'commons/auth/verifyToken';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Tasks from 'pages/Tasks';
import Teams from 'pages/Teams';
import Settings from 'pages/Settings';
import Header from 'components/Header';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  const [cookie] = useCookies();

  React.useEffect(() => {
    const checkAlreadyAuthenticated = async () => {
      if (cookie.hasOwnProperty('calendarJWT')) {
        const isAuthenticated = await verifyToken(cookie.calendarJWT);
        isAuthenticated && setIsLogin(isAuthenticated);
      }
    };
    checkAlreadyAuthenticated();
  }, [cookie]);

  return (
    <div className="App">
      <Router>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />
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
