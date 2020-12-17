import logo from './logo.svg';
import './App.css';
import { NavBar, Nav, NavItem, Button, FormControl, Navbar, Form } from 'react-bootstrap';
import ReactDOM from 'react-dom'
import ManageRestaurants from './Components/ManageRestaurants';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom'

import HomePage from './Components/HomePage';
import AddRestaurant from './Components/AddRestaurant';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <div className="App">
       <Router>
        <div>
      
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/loginPage' component={LoginPage}/>
            <Route path='/manageRestaurants' component={ManageRestaurants} />
            <Route path='/addRestaurant' component={AddRestaurant}/>
          </Switch>

         
        </div>
      </Router>


      {/* <HomePage/> */}
     {/* <ManageRestaurants/> */}
     {/* <AddorEdit_Restaurant/> */}
    </div>
  );
}

export default App;

