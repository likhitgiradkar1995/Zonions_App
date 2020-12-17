import React, { useState } from 'react'
import logindesign from '../Css/login.module.css'
import { NavItem,Navbar} from 'react-bootstrap';



function LoginPage(props) {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const loginClickHandler = (e) => {
        e.preventDefault();
        console.log("username"," ",username,"password"," ",password);
        if (username === 'admin' && password === 'admin') {
            console.log("login Successfully.");
            gotoManageRestaurant();
        }else{
            alert("Invalid username and password")
        }
    }

    const gotoManageRestaurant = () => {
        props.history.push({ pathname: '/manageRestaurants' });
    }

    return (
<div> <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home" ></Navbar.Brand>
                <NavItem className="mr-auto">
                    <h3 style={{ color: 'white' }} variant="outline-info">Welcome to Zonions</h3>
                </NavItem>
            
            </Navbar>
        <div className={logindesign.authwrapper}>
           
            <br />
            <div className={logindesign.authinner}>
                <form onSubmit={loginClickHandler}>
                    <h3>Admin Login</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter username"
                            value={username} onChange={e => { setusername(e.target.value) }} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            value={password} onChange={e => { setpassword(e.target.value) }} />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default LoginPage
