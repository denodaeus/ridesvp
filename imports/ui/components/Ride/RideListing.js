import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Row, Col, ListGroup, ListGroupItem, Image } from 'react-bootstrap';

const StyledRideListing = styled.div`
  img {
    max-width: 220px;
  }
`;

const RideListing = ({
  image, name, age, car, date, price, time, city,
}) => (
  <StyledRideListing>
    <Panel>
      <Panel.Body>
        <Row className="show-grid">
          <Col xs={6} md={3}>
            {image ? <Image src={image} alt="" /> : ''}
          </Col>
          <Col xs={6} md={3}>
            <ListGroup>
              <ListGroupItem>Name: {name}</ListGroupItem>
              <ListGroupItem>Age: {age}</ListGroupItem>
              <ListGroupItem>Car: {car}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col xs={6} md={3}>
            <ListGroup>
              <ListGroupItem>Date: {date}</ListGroupItem>
              <ListGroupItem>Price: {price}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col xs={6} md={3}>
            <ListGroup>
              <ListGroupItem>Time: {time}</ListGroupItem>
              <ListGroupItem>City: {city}</ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  </StyledRideListing>
);

RideListing.defaultProps = {
  image: null,
};

RideListing.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  car: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default RideListing;
