import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

const Sidebar = () => {
  const rooms = ["frist room", "second room", "third room"];
  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, i) =>  <ListGroup.Item key={i}>{room}</ListGroup.Item>
        )}
      </ListGroup>
      <h2>Members</h2>
    </>
  );
};

export default Sidebar;
