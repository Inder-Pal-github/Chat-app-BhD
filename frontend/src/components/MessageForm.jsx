import React from "react";
import "./MessageForm.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const MessageForm = () => {
  const handleMessageForm = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="message-output"></div>
      <Form onSubmit={handleMessageForm}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Your message"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100px", backgroundColor: "orange" }}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;
