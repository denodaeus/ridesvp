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
  },
  seatId: {
    type: String,
    label: 'The seat this rider sat in',
  },
  startAddress: {
    type: Object,
    label: 'The address the ride started at',
  },
  endAddress: {
    type: Object,
    label: 'The address the ride ended at',
  },
  rate: {
    type: Object,
    label: 'The rating object for billing',
  },
  startedAt: {
    type: String,
    label: 'The date this ride started',
  },
  endedAt: {
    type: String,
    label: 'The date this ride ended',
  },
  status: {
    type: Object,
    label: 'The status of this ride',
  },
  driverRating: {
    type: Object,
    label: 'The driver rating for this trip',
  },
  riderRating: {
    type: Object,
    label: 'The rider rating for this trip',
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
  },
});

Rides.attachSchema(Rides.schema);

export default Rides;
