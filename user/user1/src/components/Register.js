import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [disaster, setDis] = useState("");
  const [file, setfile] = useState(null);
  // const [latitude, setLat] = useState("");
  // const [longitude, setLong] = useState("");

  const history = useNavigate();

  useEffect(() => {
    const findMyloc = () => {
      const status = document.querySelector('.status');

      const success = (position) => {
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;



        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        fetch(geoApiUrl)
          .then((res) => res.json())
          .then((data) => {
            status.textContent = data.principalSubdivision;
          });
        // setLatitude(latitude);
        // setLongitude(longitude);
      };

      const error = () => {
        status.textContent = 'Unable to retrieve';
      };

      navigator.geolocation.getCurrentPosition(success, error);
    };

    document.querySelector('.find-state').addEventListener('click', findMyloc);
  }, []);


  const setimgfile = (e) => {
    if (e.target.files.length > 0) {
      setfile(e.target.files[0]);
    }
  }

  const setdata = (e) => {
    setDis(e.target.value)
  }
  // const setLatitude = (e) => {
  //   setLat(e.target.value)
  // }
  // const setLongitude = (e) => {
  //   setLong(e.target.value)
  // }

  const addReport = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("disaster", disaster);
    // formData.append("latitude", latitude);
    // formData.append("longitude", longitude);


    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
    const res = await axios.post("/register", formData, config);
    if (res.data.status === 201) {
      history("/")
    }
    else {
      console.log("error");
    }
  }

  return (
    <>
      <h1>Register a case</h1>
      <div>
        <Form>
          <Row className="mb-3">

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Select your Image</Form.Label>
              <Form.Control type="File" name='photo' onChange={setimgfile} />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Disaster Type</Form.Label>
            <Form.Control type="text" name='disaster' onChange={setdata} placeholder="Earth quakes, Tsunami , Volcano, etc" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control type='number' placeholder='pin-code' />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Are u sure" />
          </Form.Group>
          <Button className='find-state'>Share location</Button>
          <Button variant="primary" type="submit" onClick={addReport}>
            Submit
          </Button>
        </Form>
        <br />
        <br />
        <br />
        <br />
        <div className="status">Location will be displayed here</div>
        <div>

        </div>

      </div>
    </>
  )
}
