/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Vehicles = new Mongo.Collection('Vehicles');

Vehicles.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Vehicles.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Vehicles.schema = new SimpleSchema({
  ownerId: {
    type: String,
    label: 'The driver who owns this vehicle',
    required: false,
  },
  make: {
    type: String,
    label: 'The make of the vehicle',
  },
  model: {
    type: String,
    label: 'The model of the vehicle',
  },
  year: {
    type: Number,
    label: 'The year of the vehicle',
  },
  color: {
    type: String,
    label: 'The color of the vehicle',
  },
  type: {
    type: String,
    label: 'The type of the vehicle',
  },
  description: {
    type: String,
    label: 'A description of the vehicle',
    optional: true,
  },
  licensePlateNumber: {
    type: String,
    label: 'The License Plate Number of the Vehicle',
  },
  licensePlateState: {
    type: String,
    label: 'The License Plate State of the Vehicle',
  },
  verified: {
    type: Boolean,
    label: 'If this vehicle has been e-verified',
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
});

Vehicles.attachSchema(Vehicles.schema);

export default Vehicles;
