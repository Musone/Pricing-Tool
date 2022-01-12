import React, { useContext } from "react";
import Axios from "axios";
import { Form, Row, Col, Container, Button, FormCheck, ToggleButton } from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import { FILTERS } from "../constants/filters";
import MultiSelector from "../components/MultiSelector";
import ImageUpload from "../components/ImageUpload";
const { useState } = React;

export default function RegisterUser() {

  const [checked, setChecked] = useState(false);

  const [file, setFile] = useState();


  const [form, setForm] = useState({
    id: "3cfacbf3-5ba4-4827-8577-235aa3fa1aa8",
    pfp: "https://picsum.photos/360/240?random=0",
    date: "2021-05-31T12:04:39.572Z",
  });

  const submitTest = async (e) => {
    // alert(JSON.stringify(form));
    e.preventDefault();

    console.log(form);

    try {
      const responseData = await Axios.post("/api/users/usercreate", form);
      auth.login(responseData.data.userId, responseData.data.token, responseData.data.role);
      console.log(responseData.data.userId);
      console.log(responseData.data.token);
      console.log(responseData.data.email);
      if (checked && responseData.data.email != null) {
        await Axios.post(`/api/users/requestForCounselorAccess/${responseData.data.email}`)
      }
    } catch (err) {
      alert("Registration Error");
      // throw new Error("Login Error");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeArray = (selected) => {
    setForm({
      ...form,
      [selected.id]: selected.optionsSelected,
    });
  };

  const requestCounselorImage = event => {
    setFile(event.target.files[0]);
    console.log(file);
    console.log(event.target.files[0]);
  }
  
  const handleImg = (file) => {
    setForm({
      ...form,
      "pfp": file,
    });
  };
  const auth = useContext(AuthContext);
  return (
    <div>
      <h1>Registration</h1>
      {/* Change Form.Control id to control id in the form group  */}
      <Form onSubmit={submitTest}>
        <Row>
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              id="firstName"
              onChange={handleChange}
              required
            ></Form.Control>
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              id="lastName"
              onChange={handleChange}
              required
            ></Form.Control>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              id="email"
              onChange={handleChange}
              required
            ></Form.Control>
          </Col>
          <Col>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              id="phone"
              onChange={handleChange}
              required
            ></Form.Control>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              onChange={handleChange}
              required
            ></Form.Control>
          </Col>
          <Col>
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              type="password"
              id="repeatPassword"
              onChange={handleChange}
              required
            ></Form.Control>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Form.Label>Tick the box if you are registering as a Counselor: </Form.Label>
            <ToggleButton
              id="toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={checked}
              value="1"
              onChange={(e) => setChecked(e.currentTarget.checked)}
            >
              Checked
            </ToggleButton>
          </Col>
        </Row>
        {checked ? (

<ImageUpload id={"pfp"} center onInput={handleImg} />
        ) : (
          ""
        )}

        <Button
          type="submit"
          style={{ marginTop: "20px", marginBottom: "202px" }}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}
