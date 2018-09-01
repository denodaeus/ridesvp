/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Trips from './Trips';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'trips.findOne': function tripsFindOne(tripId) {
    check(tripId, Match.OneOf(String, undefined));

    try {
      return Trips.findOne(tripId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'trips.insert': function tripsInsert(trip) {
    check(trip, {
      title: String,
      description: String,
      startLocation: String,
      endLocation: String,
      numberOfSeats: Number,
      rate: String,
      owner: String,
      state: String,
    });

    try {
      return Trips.insert({ owner: this.userId, ...trip });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'trips.update': function tripsUpdate(trip) {
    check(trip, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const tripId = trip._id;
      const tripToUpdate = Trips.findOne(tripId, { fields: { owner: 1 } });

      if (tripToUpdate.owner === this.userId) {
        Trips.update(tripId, { $set: trip });
        return tripId; // Return _id so we can redirect to trip after update.
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to edit this trip.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'trips.remove': function tripsRemove(tripId) {
    check(tripId, String);

    try {
      const tripToRemove = Trips.findOne(tripId, { fields: { owner: 1 } });

      if (tripToRemove.owner === this.userId) {
        return Trips.remove(tripId);
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to delete this trip.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'trips.insert',
    'trips.update',
    'trips.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
