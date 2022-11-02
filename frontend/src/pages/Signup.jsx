import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./Signup.css";
import bot from "../assets/bot.avif";
const Signup = () => {
  const [data, setData] = useState({});
  const [image, setImage] = useState("");
  const [uploadImage, setUploadImage] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  function validateImage(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size exceeded! must be less than 1mb");
    } else {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const createAccount = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if(!image) return alert("Please select profile picture to upload");
    formData.append("name",data.name);
    formData.append("email",data.email);
    formData.append("password",data.password);
    formData.append("profile",image);
    console.log(formData.get('name'),formData.get("email"),formData.get("password"),formData.get("profile"));

  };
  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form
            style={{ width: "80%", maxWidth: 500 }}
            onSubmit={createAccount}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <h1 className="text-center">Create account</h1>
              <div className="signup-profile-pic__container">
                <img
                  src={previewImage || bot}
                  className="signup-profile-pic"
                  alt=""
                />
                <label
                  htmlFor="image-upload"
                  className="imag-upload-label"
                  onChange={validateImage}
                >
                  <i className="fas fa-plus-circle add-picture-icon"></i>
                </label>
                <input
                  type="file"
                  id="image-upload"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={validateImage}
                />
              </div>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Account
            </Button>
            <div className="py-4">
              <p className="text-center">
                Already have an account ? <Link to="/login">LogIn</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>
  );
};

export default Signup;
