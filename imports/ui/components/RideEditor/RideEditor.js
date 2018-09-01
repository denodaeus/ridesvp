/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class RideEditor extends React.Component {
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
        startAddress: {
          required: true,
        },
        endAddress: {
          required: true,
        },
        rate: {
          required: true,
        },
      },
      messages: {
        title: {
          required: 'Need a title in here, Seuss.',
        },
        description: {
          required: 'Body required.',
        },
        startAddress: {
          required: 'Start address required..',
        },
        endAddress: {
          required: 'End address required.',
        },
        rate: {
          required: 'Rate for ride required.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }


  handleSubmit(form) {
    const { history } = this.props;
    const existingRide = this.props.ride && this.props.ride._id;
    const methodToCall = existingRide ? 'rides.update' : 'rides.insert';
    const ride = {
      title: form.title.value.trim(),
      description: form.description.value.trim(),
      riderId: Meteor.userId(),
      startAddress: form.startAddress.value.trim(),
      endAddress: form.endAddress.value.trim(),
      rate: form.rate.value.trim(),
    };

    if (existingRide) ride._id = existingRide;

    Meteor.call(methodToCall, ride, (error, rideId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingRide ? 'Ride updated!' : 'Ride added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/rides/${rideId}`);
      }
    });
  }

  render() {
    const { ride } = this.props;
    return (
      <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <input
            type="text"
            className="form-control"
            name="title"
            defaultValue={ride && ride.title}
            placeholder="Oh, The Places You'll Go!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <textarea
            className="form-control"
            name="description"
            defaultValue={ride && ride.description}
            placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Start Address</ControlLabel>
          <textarea
            className="form-control"
            name="startAddress"
            defaultValue={ride && ride.startAddress}
            placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>End Address</ControlLabel>
          <textarea
            className="form-control"
            name="endAddress"
            defaultValue={ride && ride.endAddress}
            placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Rate</ControlLabel>
          <textarea
            className="form-control"
            name="rate"
            defaultValue={ride && ride.rate}
            placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
          />
        </FormGroup>
        <Button type="submit" bsStyle="success">
          {ride && ride._id ? 'Save Changes' : 'Add Ride'}
        </Button>
      </form>
    );
  }
}

RideEditor.defaultProps = {
  ride: { title: 'A new ride', description: 'A short description about my ride' },
};

RideEditor.propTypes = {
  ride: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default RideEditor;
