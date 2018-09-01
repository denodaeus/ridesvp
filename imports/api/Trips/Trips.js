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
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  startLocation: {
    type: Object,
    label: 'Where this trip started or is scheduled to start',
  },
  state: {
    type: String,
    label: 'One of: scheduled, inProgress, paused, completed',
  },
  endLocation: {
    type: Object,
    label: 'Where this trip ended or is scheduled to end',
  },
  title: {
    type: String,
    label: 'The title of the document.',
  },
  body: {
    type: String,
    label: 'The body of the document.',
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

