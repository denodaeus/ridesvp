import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, ControlLabel, FormControl, FormGroup, Col } from 'react-bootstrap';
import _ from 'lodash';

const StyledRideListingFilter = styled.div`
  padding: 40px 0;
  text-align: center;

  img {
    max-width: 300px;
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

const RideListingFilter = ({
  from, to, date,
}) => (
  <StyledRideListingFilter>
    <Form horizontal>
      <FormGroup controlId="formControlFrom">
        <Col sm={2}>
          <ControlLabel>From:</ControlLabel>
        </Col>
        <Col sm={10}>
          <FormControl componentClass="select" placeholder="select">
            { _.map(from, f => <option value={f}>{f}</option>) }
          </FormControl>
        </Col>
      </FormGroup>
      <FormGroup controlId="formControlTo">
        <Col sm={2}>
          <ControlLabel>To:</ControlLabel>
        </Col>
        <Col sm={10}>
          <FormControl componentClass="select" placeholder="select">
            { _.map(to, t => <option value={t}>{t}</option>) }
          </FormControl>
        </Col>
      </FormGroup>
      <FormGroup controlId="formControlDate">
        <Col sm={2}>
          <ControlLabel>Date:</ControlLabel>
        </Col>
        <Col sm={10}>
          <FormControl componentClass="select" placeholder="select">
            { _.map(date, d => <option value={d}>{d}</option>) }
          </FormControl>
        </Col>
      </FormGroup>
    </Form>
  </StyledRideListingFilter>
);

RideListingFilter.defaultProps = {
  from: ['Los Angeles', 'San Francisco'],
  to: ['San Francisco', 'Los Angeles'],
  date: ['8/27/2018', '8/28/2018', '8/29/2018'],
};

RideListingFilter.propTypes = {
  from: PropTypes.arrayOf(PropTypes.string),
  to: PropTypes.arrayOf(PropTypes.string),
  date: PropTypes.arrayOf(PropTypes.string),
};

export default RideListingFilter;
