/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import Rides from '../Rides/Rides';

const Trips = new Mongo.Collection('Trips');

Trips.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Trips.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Trips.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  description: {
    type: String,
    label: 'Description for this trip',
  },
  numberOfSeats: {
    type: Number,
    label: 'Number of total seats for this trip',
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  startLocation: {
    type: String,
    label: 'Where this trip started or is scheduled to start',
  },
  state: {
    type: String,
    label: 'One of: scheduled, inProgress, paused, completed',
    autoValue() {
      if (this.isInsert) return 'scheduled';
    },
  },
  endLocation: {
    type: String,
    label: 'Where this trip ended or is scheduled to end',
  },
  vehicle: {
    type: Object,
    label: 'The vehicle utilized for the trip',
    optional: true,
  },
  'vehicle.make': {
    type: String,
    label: 'The make of the vehicle',
  },
  'vehicle.model': {
    type: String,
    label: 'The model of the vehicle for the trip',
  },
  'vehicle.year': {
    type: Number,
    label: 'The year of the vehicle for the trip',
  },
  'vehicle.color': {
    type: Number,
    label: 'The color of the vehicle for the trip',
  },
  title: {
    type: String,
    label: 'The title of the document.',
  },
  rideIds: {
    type: Array,
    optional: true,
    label: 'List of rides encompassing this trip',
    defaultValue: [],
  },
  'rideIds.$': {
    type: String,
    label: 'Ride Id',
    custom: function() { //eslint-disable-line
      return Rides.find(this.value).count() ? null: 'invalid'; //eslint-disable-line
    },
  },
  ratings: {
    type: Array,
    label: 'Aggregate ratings of this trip',
    required: false,
  },
  'ratings.$': {
    type: Object,
    label: 'Rating',
    custom: function() { //eslint-disable-line
      return Rides.find(this.value).count() ? null: 'invalid'; //eslint-disable-line
    },
  },
});

Trips.attachSchema(Trips.schema);

export default Trips;

