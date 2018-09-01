import React from 'react';
import PropTypes from 'prop-types';
import TripEditor from '../../components/TripEditor/TripEditor';

const NewTrip = ({ history }) => (
  <div className="NewDocument">
    <h4 className="page-header">New Trip</h4>
    <TripEditor history={history} />
  </div>
);

NewTrip.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewTrip;
