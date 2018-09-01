/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Rides from './Rides';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'ride.findOne': function ridesFindOne(rideId) {
    check(rideId, Match.OneOf(String, undefined));

    try {
      return Rides.findOne(rideId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'rides.insert': function ridesInsert(ride) {
    check(ride, {
      title: String,
      description: String,
      riderId: String,
      startAddress: String,
      endAddress: String,
      rate: String,
    });

    try {
      return Rides.insert({ owner: this.userId, ...ride });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'rides.update': function ridesUpdate(ride) {
    check(ride, {
      _id: String,
      riderId: String,
      title: String,
      description: String,
      startAddress: String,
      endAddress: String,
      rate: String,
    });

    try {
      const rideId = ride._id;
      const rideToUpdate = Rides.findOne(rideId, { fields: { riderId: 1 } });

      if (rideToUpdate.riderId === this.userId) {
        Rides.update(rideId, { $set: ride });
        return rideId; // Return _id so we can redirect to ride after update.
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to edit this ride.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'rides.remove': function ridesRemove(rideId) {
    check(rideId, String);

    try {
      const docToRemove = Rides.findOne(rideId, { fields: { riderId: 1 } });

      if (docToRemove.riderId === this.userId) {
        return Rides.remove(rideId);
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to delete this ride.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'rides.insert',
    'rides.update',
    'rides.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
