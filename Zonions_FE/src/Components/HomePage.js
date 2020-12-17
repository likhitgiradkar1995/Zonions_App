import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavItem, Button, Navbar} from 'react-bootstrap';
import ViewRestaurant from './ViewRestaurant';
import img1 from '../Images/dish.jpg';
import { MDBJumbotron, MDBContainer, MDBCol, MDBCardTitle } from "mdbreact";

function HomePage(props) {
    const [restauList, setrestauList] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [resData, setresData] = useState({})
    // const style1 = { backgroundImage: "url(" + img1 + ")", height: "600px", width: "100%", backgroundRepeat: "no-repeat" }
    const style1 = { backgroundImage: "url("+'https://s2.best-wallpaper.net/wallpaper/1920x1080/1811/Delicious-food-cookies-coffee-bread-donut-love-heart_1920x1080.jpg'+")", height: "600px", width: "100%", backgroundRepeat: "no-repeat" }


    useEffect(() => {
        getRestaurantList();
    }, [])

    const getRestaurantList = () => {
        Axios.get(`http://localhost:1337/GetRestaurants`)
            .then(res => {
                console.log(res.data);
                setrestauList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const viewButtonClick = (data) => {
        setModalShow(true);
        setresData(data);
    }

    const gotoLogin = () => {
        props.history.push({ pathname: '/loginPage' });
    }
    return (

        <div style={style1}>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home" ></Navbar.Brand>
                <NavItem className="mr-auto">
                    <h3 style={{ color: 'white' }} variant="outline-info">Welcome to Zonions</h3>
                </NavItem>
                <NavItem>
                    <Button className="mr-sm-2" variant="outline-info" onClick={gotoLogin}>Admin Login</Button>
                </NavItem>
            </Navbar>
            <br />
            <MDBContainer  class="jumbotron bg-transparent">
                <MDBJumbotron class="jumbotron bg-transparent" style={{ padding: 0 }}>
                    <MDBCol  >
                        <MDBCol>
                            <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">Restaurant List</MDBCardTitle>
                            <table id="mainTable"  class="table-borderless" > 
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone No</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {restauList.map(d => {
                                        if (d.isActive) {
                                            return (<tr>
                                               <td>{d.name}</td>
                                               <td>{d.phone}</td>
                                               <td><Button variant="primary" onClick={() => viewButtonClick(d)}>View Restaurant</Button></td>
                                            </tr>) }
                                    })}
                                </tbody>
                            </table>
                        </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
            </MDBContainer>

            <ViewRestaurant
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={resData}
            />

        </div>
    )
}

export default HomePage
