import React from 'react';
import PropTypes from 'prop-types';
import RideEditor from '../../components/RideEditor/RideEditor';

const NewRide = ({ history }) => (
  <div className="NewDocument">
    <h4 className="page-header">New Ride</h4>
    <RideEditor history={history} />
  </div>
);

NewRide.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewRide;
