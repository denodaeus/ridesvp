/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class TripEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        description: {
          required: true,
        },
        startLocation: {
          required: true,
        },
        endLocation: {
          required: true,
        },
        rate: {
          required: true,
        },
        numberOfSeats: {
          required: true,
        },
        state: {
          required: false,
        },
      },
      messages: {
        title: {
          required: 'Need a title in here, Seuss.',
        },
        description: {
          required: 'Body required.',
        },
        startLocation: {
          required: 'Start address required..',
        },
        endLocation: {
          required: 'End address required.',
        },
        rate: {
          required: 'Rate for trip required.',
        },
        numberOfSeats: {
          required: 'Number of seats required',
        },
        state: {
          required: 'Current status of this trip',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }


  handleSubmit(form) {
    const { history } = this.props;
    const existingTrip = this.props.trip && this.props.trip._id;
    const methodToCall = existingTrip ? 'trips.update' : 'trips.insert';
    const trip = {
      title: form.title.value.trim(),
      description: form.description.value.trim(),
      owner: Meteor.userId(),
      startLocation: form.startLocation.value.trim(),
      endLocation: form.endLocation.value.trim(),
      rate: form.rate.value.trim(),
      numberOfSeats: parseInt(form.numberOfSeats.value.trim(), 10),
      state: form.state.value.trim() || 'scheduled',
    };

    if (existingTrip) trip._id = existingTrip;

    Meteor.call(methodToCall, trip, (error, tripId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingTrip ? 'Trip updated!' : 'Trip added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/trips/${tripId}`);
      }
    });
  }

  render() {
    const { trip } = this.props;
    return (
      <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <input
            type="text"
            className="form-control"
            name="title"
            defaultValue={trip && trip.title}
            placeholder="Oh, The Places You'll Go!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <textarea
            className="form-control"
            name="description"
            defaultValue={trip && trip.description}
            placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Start Address</ControlLabel>
          <textarea
            className="form-control"
            name="startLocation"
            defaultValue={trip && trip.startLocation}
            placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>End Address</ControlLabel>
          <textarea
            className="form-control"
            name="endLocation"
            defaultValue={trip && trip.endLocation}
            placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Rate</ControlLabel>
          <textarea
            className="form-control"
            name="rate"
            defaultValue={trip && trip.rate}
            placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Seats</ControlLabel>
          <textarea
            className="form-control"
            name="numberOfSeats"
            defaultValue={trip && trip.numberOfSeats}
            placeholder="1"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Trip Status</ControlLabel>
          <textarea
            className="form-control"
            name="state"
            defaultValue={trip && trip.state}
            placeholder="scheduled"
          />
        </FormGroup>
        <Button type="submit" bsStyle="success">
          {trip && trip._id ? 'Save Changes' : 'Add Trip'}
        </Button>
      </form>
    );
  }
}

TripEditor.defaultProps = {
  trip: { title: 'A new trip', description: 'A short description about my trip' },
};

TripEditor.propTypes = {
  trip: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default TripEditor;
