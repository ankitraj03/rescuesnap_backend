import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import {NavLink} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
export const Home = () => {

  // const [data,setData] = useState([]);
  
     
  const getUserData = async()=>{
    const res = await axios.get("/getdata",{
      headers:{
        "Content-Type":"application/json"
      }
    });
    // if(res.data.status == 201){
    //   console.log("data get");
    //   setData(res.data.data)
    // }
  }

  useEffect(()=>{
    getUserData()
  },[])



  return (
    <div className='container mt-2'>
      <h1 className='textcenter mt-2'> image uploaded </h1>

      <div className='text-end'>
       <Button variant="primary"><NavLink to="/register">Report</NavLink></Button>
      </div>
      <div className='d-flex justify-content-between align-items-center mt-5'>
          {

          
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/logo192.png" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
          }
      </div>
    </div>
  )
}
