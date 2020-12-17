import Modal from 'react-bootstrap/Modal'
import React from 'react'
import { Button,Form } from 'react-bootstrap'
import modalWidth from '../Css/modalWidth.css'

function ViewRestaurant(props) {
    return (
        <div>
            <Modal 
                {...props}
                dialogClassName={modalWidth.modalwidth}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.data.name}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {console.log("props data", props.data)}

                    <Form>
                        <fieldset >
                            <label >Phone Number :</label>
                            <input type="text" className="form-control" plaintext readOnly value={props.data.name} />
                        </fieldset>
                        <div className="form-group">
                            <label>Address :</label>
                            <input type="text" plaintext readOnly className="form-control"
                                value={props.data.address} />
                        </div>
                        <div className="form-group">
                            <label>Open Time :</label>
                            <input type="text" plaintext readOnly className="form-control"
                                value={props.data.openTime} />
                        </div>
                        <div className="form-group">
                            <label>Close Time :</label>
                            <input type="text" plaintext readOnly className="form-control"
                                value={props.data.closeTime} />
                        </div>

                        <img src={props.data.menuImage} style={{width:150,height:100}} alt=''/>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ViewRestaurant
