import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Welcome from './components/Welcome';
import About from './components/About';
import Footer from './components/Footer';
import Hike from './components/Hike'
import './App.css';
import AllHikes from './components/AllHikes';
import FaveTrails from './components/FaveTrails';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest}render={(props) => {
    return user ? <Component {...rest} {...props}/> :<Redirect to="/login" />
  }} />
}

function App() {

  let [currentUser, setCurrentUser] = useState("");
  let [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    let token;
    if(!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
    }
  }, []);

  let nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is working')
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };


  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  console.log('Current User', currentUser);
  // console.log('Authenticated', isAuthenticated);


  return (
    <div>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <div className="container mt-5">
        <Switch>
          <Route path="/signup" component={ Signup } />
          <Route 
            path="/login" 
            render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>}  
          />
          <Route path="/about" component={ About } />
          <PrivateRoute path="/profile" component={ Profile } user={currentUser} />

          <Route exact path= "/hike" render={ (props) => <AllHikes {...props}  user={currentUser}/>}/>
          <Route path="/hike/:id" render={ (props) => <Hike  {...props}  user={currentUser}/>} />

          <Route exact path="/" component={ Welcome } />
          <Route exact path="/favetrails" render={ (props) => <FaveTrails  {...props}  user={currentUser}/>} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
