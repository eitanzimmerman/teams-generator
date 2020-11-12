import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import UserContext from './context/user-context';

import Header from './components/header/header.component';
import HomePage from './pages/home/homepage.component';
import MainPage from './pages/main/main.component';
import ResultsPage from './pages/results/results.component';
import MePage from './pages/me/me.component';


import './App.scss';

function App() {
  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem('currentUser') ? JSON.parse(sessionStorage.getItem('currentUser')) : null)

  useEffect(() => {
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser))
  }, [currentUser])

  
  const handleAuthenticateUser = (email, password, name, method) => {
    const url  = `http://localhost:5000/api/user/${(method === 'login') ? 'login' : ''}`
    const data = {
      email,
      password,
    };
    if (method === 'signup') {
      data.name = name
    }
    axios.post(url, data)
    .then( respone => respone.status === 201 ? respone.data : alert('problem with authenticating user'))
    .then(data =>{
      setCurrentUser(data)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const handleLogoutUser = () => {
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
  }

 
  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser: currentUser, authenticateUser: handleAuthenticateUser, logoutUser: handleLogoutUser}}>
        <Header/>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/play' component={MainPage} />
            <Route exact path='/play/results' render={(props) => <ResultsPage {...props}/>} />
            <Route exact path='/play/me' component={MePage}/>
        </Switch>
      </UserContext.Provider>
      
    </div>
  );
}

export default App;
