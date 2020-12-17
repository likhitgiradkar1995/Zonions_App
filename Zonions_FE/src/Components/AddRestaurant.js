import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Switch from "react-switch";
import logindesign from '../Css/login.module.css'



import Axios from 'axios'
function AddRestaurant(props) {
    const [name, setName] = useState('');
    const [address, setaddress] = useState('');
    const [phone, setphone] = useState('');
    const [openTime, setopenTime] = useState('');
    const [closeTime, setcloseTime] = useState('');
    const [menuImage, setmenuImage] = useState('');
    const [isActive, setisActive] = useState(false);

    const useStyles = makeStyles((theme) => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }));

    const classes = useStyles();

    const AddBtnClickHandler = (e) => {
        const isValid = validateForm();
        e.preventDefault();
        if (isValid) {
        Axios.post(`http://localhost:1337/AddRestaurant`, { name: name, address: address, phone: phone, openTime: openTime, closeTime: closeTime, menuImage: menuImage, isActive: isActive })
            .then(res => {
                console.log(res.data);
                gotoManageRestaurant();
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    const gotoManageRestaurant = () => {
        props.history.push({ pathname: '/manageRestaurants' });
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

    const selectImageHandler = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            setmenuImage(reader.result)
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className={logindesign.authwrapper1}>
            <form className={logindesign.authinner1} onSubmit={AddBtnClickHandler}>
                <h3 className={logindesign.center}>Add Restaurant</h3>
                <fieldset >
                    <label >Name :</label>
                    <input type="text" className="form-control" value={name} required onChange={e => { setName(e.target.value) }} />
                </fieldset>
                <fieldset >
                    <label >Address :</label>
                    <textarea placeholder="Address" className="form-control" required value={address} onChange={e => { setaddress(e.target.value) }} />
                </fieldset>
                <fieldset >
                    <label >PhoneNo :</label>
                    <input type="text" value={phone} className="form-control" required onChange={e => { setphone(e.target.value) }} />
                </fieldset>

                <fieldset className={logindesign.alignTop}>
                   
                    
                        <TextField label="Open Time" type="time" className="form-control" className={classes.textField}
                            defaultValue={openTime} onChange={e => { setopenTime(e.target.value) }}
                            InputLabelProps={{ shrink: true, }}
                            inputProps={{ step: 300, }} />
                  
                        <TextField label="Close Time" className="form-control" type="time" className={classes.textField}
                            defaultValue={closeTime} onChange={e => { setcloseTime(e.target.value) }}
                            InputLabelProps={{ shrink: true, }}
                            inputProps={{ step: 300, }} />
                  
                    
                </fieldset>

                <fieldset >
                    <label >Active :</label>
                    <Switch className={logindesign.alignLeft} checked={isActive} onChange={e => { setisActive(!isActive) }} />
                </fieldset>
                <fieldset>
                    Select image:<input type='file' onChange={e => selectImageHandler(e)}></input>
                    <img src={menuImage} style={{width:150,height:100}} alt='no image selected'></img>
                </fieldset>

                <fieldset>
                    <button className="btn btn-primary btn-block" type="submit" >Add Restaurant</button>
                </fieldset>
                

            </form>
        </div>


    )
}

export default AddRestaurant
