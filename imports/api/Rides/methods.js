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
  'rides.update': function ridesUpdate(doc) {
    check(doc, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const rideId = doc._id;
      const docToUpdate = Rides.findOne(rideId, { fields: { owner: 1 } });

      if (docToUpdate.owner === this.userId) {
        Rides.update(rideId, { $set: doc });
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
      const docToRemove = Rides.findOne(rideId, { fields: { owner: 1 } });

      if (docToRemove.owner === this.userId) {
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
