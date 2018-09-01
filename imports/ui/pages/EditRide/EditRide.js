import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Rides from '../../../api/Rides/Rides';
import RideEditor from '../../components/RideEditor/RideEditor';
import NotFound from '../NotFound/NotFound';

const EditRide = ({ ride, history }) => (ride ? (
  <div className="EditRide">
    <h4 className="page-header">{`Editing "${ride.description}"`}</h4>
    <RideEditor ride={ride} history={history} />
  </div>
) : <NotFound />);

EditRide.defaultProps = {
  ride: null,
};

EditRide.propTypes = {
  ride: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const rideId = match.params._id;
  const subscription = Meteor.subscribe('rides.edit', rideId);

  return {
    loading: !subscription.ready(),
    ride: Rides.findOne(rideId),
  };
})(EditRide);
