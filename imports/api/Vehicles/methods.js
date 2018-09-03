/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Vehicles from './Vehicles';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'vehicle.findOne': function vehiclesFindOne(vehicleId) {
    check(vehicleId, Match.OneOf(String, undefined));
    try {
      return Vehicles.findOne(vehicleId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'vehicles.insert': function vehiclesInsert(vehicle) {
    check(vehicle, {
      vehicleId: String,
      rate: String,
    });

    try {
      return Vehicles.insert({ ownerId: this.userId, ...vehicle });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'vehicles.update': function vehiclesUpdate(vehicle) {
    check(vehicle, {
      _id: String,
      vehicleId: String,
      description: String,
    });

    try {
      const vehicleId = vehicle._id;
      const vehicleToUpdate = Vehicles.findOne(vehicleId, { fields: { ownerId: 1 } });

      if (vehicleToUpdate.ownerId === this.userId) {
        Vehicles.update(vehicleId, { $set: vehicle });
        return vehicleId; // Return _id so we can redirect to vehicle after update.
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to edit this vehicle.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'vehicles.remove': function vehiclesRemove(vehicleId) {
    check(vehicleId, String);

    try {
      const docToRemove = Vehicles.findOne(vehicleId, { fields: { ownerId: 1 } });

      if (docToRemove.ownerId === this.userId) {
        return Vehicles.remove(vehicleId);
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to delete this vehicle.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'vehicles.insert',
    'vehicles.update',
    'vehicles.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
