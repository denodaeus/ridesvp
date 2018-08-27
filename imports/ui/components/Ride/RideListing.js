import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Row, Col, ListGroup, ListGroupItem, Image } from 'react-bootstrap';

const StyledRideListing = styled.div`
  padding: 40px 0;
  text-align: center;

  img {
    max-width: 220px;
    margin-bottom: 20px;
  }

  i {
    font-size: 100px;
    color: var(--gray-lighter);
    margin-bottom: 20px;
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #666;
    margin-bottom: 0;
  }

  p {
    font-size: 15px;
    font-weight: normal;
    color: #aaa;
    margin-top: 10px !important;
    margin-bottom: 0;
  }

  .btn {
    margin-top: 20px;
    margin-bottom: 0 !important;
  }
`;

const RideListing = ({
  image, name, age, car, date, price, time, city,
}) => (
  <StyledRideListing>
    <Grid>
      <Row className="show-grid">
        <Col xs={6} md={3}>
          {image ? <Image src={image} alt="" responsive /> : ''}
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
    </Grid>
  </StyledRideListing>
  // <StyledRideListing>
  //   {image ? <img src={image} alt={title} /> : ''}
  //   {icon ? <Icon iconStyle={icon.style} icon={icon.symbol} /> : ''}
  //   <h4>{title}</h4>
  //   <p>{subtitle}</p>
  //   {action ? <Button bsStyle={action.style || 'success'} onClick={action.onClick}>{action.label}</Button> : ''}
  // </StyledRideListing>
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
