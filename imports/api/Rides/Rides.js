/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Rides = new Mongo.Collection('Rides');

Rides.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Rides.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Rides.schema = new SimpleSchema({
  riderId: {
    type: String,
    label: 'The user this ride belongs to',
  },
  driverId: {
    type: String,
    label: 'The driver booked for this ride',
    required: false,
  },
  description: {
    type: String,
    label: 'A short description for this ride',
    required: false,
  },
  seatId: {
    type: String,
    label: 'The seat this rider sat in',
    required: false,
  },
  startAddress: {
    type: String,
    label: 'The address the ride started at',
  },
  endAddress: {
    type: String,
    label: 'The address the ride ended at',
  },
  rate: {
    type: String,
    label: 'The rating object for billing',
    required: false,
  },
  startedAt: {
    type: String,
    label: 'The date this ride started',
    required: false,
  },
  endedAt: {
    type: String,
    label: 'The date this ride ended',
    required: false,
  },
  status: {
    type: Object,
    label: 'The status of this ride',
    required: false,
  },
  driverRating: {
    type: Object,
    label: 'The driver rating for this trip',
    required: false,
  },
  riderRating: {
    type: Object,
    label: 'The rider rating for this trip',
    required: false,
  },
  createdAt: {
    type: String,
    label: 'The date this ride was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this ride was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the ride.',
    required: false,
  },
});

Rides.attachSchema(Rides.schema);

export default Rides;
