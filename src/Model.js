import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { IoMdCloseCircle } from "react-icons/io";
import { CiSaveDown2 } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";

function Model(props) {

  
  const updateData = () => {

      fetch(`https://655f2f04879575426b44c42d.mockapi.io/studentsData/${props.modalData.id}`, {
        method: 'PUT', // or PATCH
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(props.modalData)
      }).then(res => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      }).then(task => {
        props.setModalData(task);
        
      }).catch(error => {
        console.log(error);
      }).then(()=>{
         props.modalSetStatus(!props.modalStatus);
      })

      props.modelClose();
     
  }

  const newUser = () =>{

    fetch(`https://655f2f04879575426b44c42d.mockapi.io/studentsData`, {
        method: 'POST', // or PATCH
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(props.modalData)
      }).then(res => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      }).then(task => {
        props.setModalData(task);
        
      }).catch(error => {
        console.log(error);
      }).then(()=>{
         props.modalSetStatus(!props.modalStatus);
      })

      props.modelClose();
  }
 

  return (
    <>
     
      <Modal show={props.modelShow} onHide={props.modelClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalData.id? "Edit Data" : "Add Data" } <FaEdit /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label><b>Name</b></Form.Label>
              <Form.Control
                type="name"
                placeholder="name..."
                defaultValue={props.modalData? props.modalData.name : false}
                onChange={(e)=>props.setModalData({...props.modalData, name: e.target.value})}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label><b>Email address</b></Form.Label>
              <Form.Control
                type="name"
                placeholder="name@gmail.com"
                defaultValue={props.modalData? props.modalData.email : false}
                onChange={(e)=>props.setModalData({...props.modalData, email: e.target.value})}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label><b>Mobile_No</b></Form.Label>
              <Form.Control
                type="tel"
                placeholder="Mobile..."
                defaultValue={props.modalData? props.modalData.mobileNo : false}
                onChange={(e)=>props.setModalData({...props.modalData, mobileNo: e.target.value})}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label><b>Qualification</b></Form.Label>
              <Form.Control
                type="text"
                placeholder="Qualification..."
                defaultValue={props.modalData? props.modalData.qualification : false}
                onChange={(e)=>props.setModalData({...props.modalData, qualification: e.target.value})}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label><b>Location</b></Form.Label>
              <Form.Control
                type="text"
                placeholder="Location..."
                defaultValue={props.modalData? props.modalData.location : false}
                onChange={(e)=>props.setModalData({...props.modalData, location: e.target.value})}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-danger' onClick={props.modelClose}>
            Close <IoMdCloseCircle style={{ fontSize: "20px" }} />
          </Button>
          {props.modalData.id? <Button className='btn btn-success' onClick={() => updateData()}>
            Save Changes <CiSaveDown2 style={{ fontSize: "20px" }} />
          </Button> : <Button className='btn btn-success' onClick={() => newUser()}>
            Insert <CiSaveDown2 style={{ fontSize: "20px" }} />
          </Button>}
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Model;