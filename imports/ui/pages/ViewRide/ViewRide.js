import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Rides from '../../../api/Rides/Rides';
import NotFound from '../NotFound/NotFound';
// import SEO from '../../components/SEO/SEO';

const handleRemove = (rideId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('rides.remove', rideId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Ride deleted!', 'success');
        history.push('/rides');
      }
    });
  }
};

const renderRide = (ride, match, history) => (ride ? (
  <div className="ViewRide">
    {/* <SEO
      title={doc.title}
      description={doc.body}
      url={`rides/${doc._id}`}
      contentType="article"
      published={doc.createdAt}
      updated={doc.updatedAt}
      twitter="clvrbgl"
    /> */}
    <div className="page-header clearfix">
      <h4 className="pull-left">{ ride && ride.title }</h4>
      {Meteor.isClient && Meteor.userId() ? (
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
            <Button onClick={() => handleRemove(ride._id, history)} className="text-danger">
              Delete
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      ) : ''}
    </div>
    { ride && ride.body }
  </div>
) : <NotFound />);

const ViewRide = ({ ride, match, history }) => (renderRide(ride, match, history));

ViewRide.defaultProps = {
  ride: null,
};

ViewRide.propTypes = {
  ride: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  connect(state => ({ ...state })),
  withTracker(({ match }) => {
    const rideId = match.params._id;
    if (Meteor.isClient) Meteor.subscribe('rides.view', rideId);
    return {
      doc: Rides.findOne(rideId),
    };
  }),
)(ViewRide);
