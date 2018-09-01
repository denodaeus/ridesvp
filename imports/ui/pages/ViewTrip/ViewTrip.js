import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Trips from '../../../api/Trips/Trips';
import NotFound from '../NotFound/NotFound';
// import SEO from '../../components/SEO/SEO';

const handleRemove = (tripId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('trips.remove', tripId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Trip deleted!', 'success');
        history.push('/trips');
      }
    });
  }
};

const renderTrip = (trip, match, history) => (trip ? (
  <div className="ViewTrip">
    {/* <SEO
      title={trip.title}
      description={trip.description}
      url={`trips/${trip._id}`}
      contentType="article"
      published={trip.createdAt}
      updated={trip.updatedAt}
      twitter="clvrbgl"
    /> */}
    <div className="page-header clearfix">
      <h4 className="pull-left">{ trip && trip.title }</h4>
      {Meteor.isClient && Meteor.userId() ? (
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
            <Button onClick={() => handleRemove(trip._id, history)} className="text-danger">
              Delete
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      ) : ''}
    </div>
    { trip && trip.description }
  </div>
) : <NotFound />);

const ViewTrip = ({ trip, match, history }) => renderTrip(trip, match, history);

ViewTrip.defaultProps = {
  trip: null,
};

ViewTrip.propTypes = {
  trip: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  connect(state => ({ ...state })),
  withTracker(({ match }) => {
    const tripId = match.params._id;
    if (Meteor.isClient) Meteor.subscribe('trips.view', tripId);
    return {
      trip: Trips.findOne(tripId),
    };
  }),
)(ViewTrip);
