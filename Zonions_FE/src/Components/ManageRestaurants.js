import Axios from 'axios';
import React, {  useEffect, useState } from 'react'
import styles from '../Css/styles.module.css';
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { NavItem, Button, Navbar} from 'react-bootstrap';
import Switch from "react-switch";
import logindesign from '../Css/login.module.css'

Modal.setAppElement('#root');

function ManageRestaurants(props) {
    const [data, setdata] = useState([]);
    const [name, setName] = useState('');
    const [address, setaddress] = useState('');
    const [phone, setphone] = useState('');
    const [openTime, setopenTime] = useState("07:30");
    const [closeTime, setcloseTime] = useState("07:30");
    const [id, setid] = useState('');
    const [editFlag, seteditFlag] = useState(false);
    const [lastUpdatedTime, setLastUpdatedTime] = useState("");
    const [isActive, setisActive] = useState(false);
    const [menuImage, setmenuImage] = useState('')

    const useStyles = makeStyles((theme) => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 150,
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        getRestaurantList();
    }, []);

    const getRestaurantList = () => {
        Axios.get(`http://localhost:1337/GetRestaurants`)
            .then(res => {
                console.log(res.data);
                setdata(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const editClickHandler = (d, e) => {
        e.preventDefault();
        seteditFlag(true);
        setid(d.id);
        setName(d.name);
        setaddress(d.address);
        setphone(d.phone);
        setopenTime(d.openTime);
        setcloseTime(d.closeTime);
        setLastUpdatedTime(new Date().toLocaleString());
        setisActive(d.isActive);
        setmenuImage(d.menuImage);

    }

    const deleteClickHandler = (id) => {
        Axios.delete(`http://localhost:1337/DeleteRestaurant/${id}`)
            .then(res => {
                console.log(res.data);
                getRestaurantList();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const updateRestaurant = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        console.log("isvalid", isValid);
        if (isValid) {
            console.log("isActive", isActive);
            Axios.put(`http://localhost:1337/UpdateRestaurant/${id}`,
                { name: name, address: address, phone: phone, openTime: openTime, closeTime: closeTime, lastUpdateTime: lastUpdatedTime, isActive: isActive })
                .then(res => {
                    console.log(res.data);
                    getRestaurantList();
                    seteditFlag(false);
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }

    const selectImageHandler = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            setmenuImage(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const validateForm = () => {
        if (!name.match(/^[0-9a-zA-Z\s]+$/)) {
            console.log("name error");
            alert('name should contains only characters and number')
            return false;
        }
        else if (address.length <= 10) {
            alert("plz enter detailed address");
            return false;
        }

        else if (phone.length !== 10) {
            console.log(phone.length)
            alert('phone number length should be 10 digit');
            return false;
        }
        else if (!phone.match(/[7-9][0-9]{9}$/)) {
            alert("phone number should start with 7,8 or 9 ");
            return false;
        }
        else {
            return true;
        }
    }

    const gotoAddRestaurant = () => {
        props.history.push({ pathname: '/addRestaurant' });
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home" ></Navbar.Brand>
                <NavItem className="mr-auto">
                    <h3 style={{ color: 'white' }} variant="outline-info">Welcome to Zonions</h3>
                </NavItem>
                <NavItem>
                    <Button className="mr-sm-2" variant="outline-info" onClick={gotoAddRestaurant}>Add Restaurant</Button>
                </NavItem>
            </Navbar>
            <br />
            <div className={styles.tableusers}>
                <div className={styles.header}>Restaurants</div>

                <table>
                    <thead >
                        <tr>
                            <th style={{fontWeight: 'bold'}}>Name</th>
                            <th style={{fontWeight: 'bold'}}>Address</th>
                            <th style={{fontWeight: 'bold'}}>Phone No</th>
                            <th style={{fontWeight: 'bold'}}>Open Time</th>
                            <th style={{fontWeight: 'bold'}}>Close Time</th>
                            <th style={{fontWeight: 'bold'}}>Last Updated Time</th>
                            <th style={{fontWeight: 'bold'}}>Edit</th>
                            <th style={{fontWeight: 'bold'}}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(d => {
                                return (<tr>
                                    <td>{d.name}</td>
                                    <td>{d.address}</td>
                                    <td>{d.phone}</td>
                                    <td>{d.openTime} </td>
                                    <td>{d.closeTime} </td>
                                    <td>{d.lastUpdateTime === '' ? "not Updated" : d.lastUpdateTime}</td>
                                    <td><button class="btn btn-success"  onClick={e => editClickHandler(d, e)}>Edit</button></td>
                                    <td><button class="btn btn-danger"  onClick={e => deleteClickHandler(d.id)}>Delete</button></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>

                <Modal isOpen={editFlag}
                    shouldCloseOnOverlayClick={false}
                    onRequestClose={() => seteditFlag(false)} animation={false}
                    style={{ overlay: { backgroundColor: '#ebf4f5' }, Width: 10, content: { color: 'white' }, }}
                    className={logindesign.authwrapper1}
                >
                    <form className={logindesign.authinner1} onSubmit={e => updateRestaurant(e)}>
                        <h3 className={logindesign.center}>Update Restaurant</h3>
                        <fieldset >
                            <label >Name :</label>
                            <input type="text" className="form-control" value={name} onChange={e => { setName(e.target.value) }} />
                        </fieldset>
                        <fieldset >
                            <label >Address :</label>
                            <textarea placeholder="Address" className="form-control" required value={address} onChange={e => { setaddress(e.target.value) }} />
                        </fieldset>
                        <fieldset >
                            <label >PhoneNo :</label>
                            <input type="text" value={phone} className="form-control" onChange={e => { setphone(e.target.value) }} />
                        </fieldset>

                        <fieldset className={logindesign.alignTop}>
                            <form  className={classes.container} noValidate>
                                <TextField label="Open Time" type="time" className="form-control" className={classes.textField}
                                    defaultValue={openTime} onChange={e => { setopenTime(e.target.value) }}
                                    InputLabelProps={{ shrink: true, }}
                                    inputProps={{ step: 300, }} />

                                <form className={classes.container} noValidate>
                                    <TextField label="Close Time" className="form-control" type="time" className={classes.textField}
                                        defaultValue={closeTime} onChange={e => { setcloseTime(e.target.value) }}
                                        InputLabelProps={{ shrink: true, }}
                                        inputProps={{ step: 300, }} />
                                </form>
                            </form>
                        </fieldset>

                        <fieldset className="form-group">
                            <label >Active :</label>
                            <Switch className={logindesign.alignLeft} checked={isActive} onChange={e => { setisActive(!isActive) }} />
                        </fieldset>
                        <fieldset>
                            select image:<input type='file'  onChange={e => selectImageHandler(e)}></input>
                            <img src={menuImage} style={{width:150,height:100}} alt='no image selected'  />
                        </fieldset>

                        <fieldset>
                            <button className={logindesign.cancelBtn} onClick={e => seteditFlag(false)}>cancel</button>
                            <button className={logindesign.updateBtn} type="submit" >Update</button>
                        </fieldset>
                    </form>
                </Modal>
            </div>

        </div>
    )
}

export default ManageRestaurants
