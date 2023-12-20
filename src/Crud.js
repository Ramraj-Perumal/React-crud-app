import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { FiEdit  } from 'react-icons/fi';
import { AiFillDelete } from "react-icons/ai";
import Model from './Model';
import { IoMdPersonAdd } from "react-icons/io";

export const Crud = () => {

  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);


  const [temp, setTemp] = useState({
    id:"",
    name:"",
    email:"",
    mobileNo:"",
    qualification:"",
    location:"",
  });

  // read----------------------------------------------------------------->
  useEffect(() => {
    fetch('https://655f2f04879575426b44c42d.mockapi.io/studentsData', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    }).then(tasks => {
      // Do something with the list of tasks
      console.log(tasks);
      setData(tasks)
    }).catch(error => {
      // handle error
      alert("Something went wrong");
    })
    setStatus(false);
  }, [status])

// create ----------------------------------------------->

  const createData = ()=>{
    setShow(true);
    setTemp({
      id:"",
      name:"",
      email:"",
      mobileNo:"",
      qualification:"",
      location:"",
    });
  }
  //------------------------------------------------------------------------------------->
  const editData = (data) =>{
    setShow(true);
    setTemp({
      id:data.id,
      name:data.name,
      email:data.email,
      mobileNo:data.mobileNo,
      qualification:data.qualification,
      location:data.location,
    });
    console.log(data.name);
  }

  // Delete =============================================================================>
  const deleteTask = (id) => {
    fetch(`https://655f2f04879575426b44c42d.mockapi.io/studentsData/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
         return res.json();
        } else {
          throw new Error('Failed to delete task');
        }
      }).then(()=>{
        setStatus(!status);
     })
      .catch((error) => console.error(error));
  };


  return (
    <>
      <h1>CRUD APP</h1>
      <button className='btn1' onClick={()=>createData()}>Add user <IoMdPersonAdd /></button>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile_No</th>
            <th>Qualification</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobileNo}</td>
              <td>{item.qualification}</td>
              <td>{item.location}</td>
              <td>
                <>
                  <FiEdit onClick={()=> editData(item)} style={{margin:"5px", color:"skyblue", cursor:"pointer"}}/>
                  <AiFillDelete onClick={()=>deleteTask(item.id)} style={{color:"#fa857d", cursor:"pointer"}} />
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Model modelShow = {show} modelClose = {handleClose} modalData = {temp} setModalData = {setTemp} modalStatus = {status} modalSetStatus = {setStatus}/>
    </>
  )
}
