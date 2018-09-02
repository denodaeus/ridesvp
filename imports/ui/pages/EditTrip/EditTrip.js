import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Trips from '../../../api/Trips/Trips';
import TripEditor from '../../components/TripEditor/TripEditor';
import NotFound from '../NotFound/NotFound';

const EditTrip = ({ trip, history }) => (trip ? (
  <div className="EditTrip">
    <h4 className="page-header">{`Editing "${trip.description}"`}</h4>
    <TripEditor trip={trip} history={history} />
  </div>
) : <NotFound />);

EditTrip.defaultProps = {
  trip: null,
};

EditTrip.propTypes = {
  trip: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const tripId = match.params._id;
  const subscription = Meteor.subscribe('trips.edit', tripId);

  return {
    loading: !subscription.ready(),
    trip: Trips.findOne(tripId),
  };
})(EditTrip);
