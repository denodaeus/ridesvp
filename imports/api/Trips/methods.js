/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Trips from './Trips';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'trips.findOne': function tripsFindOne(documentId) {
    check(documentId, Match.OneOf(String, undefined));

    try {
      return Trips.findOne(documentId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'trips.insert': function tripsInsert(doc) {
    check(doc, {
      title: String,
      body: String,
    });

    try {
      return Trips.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'trips.update': function tripsUpdate(doc) {
    check(doc, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const documentId = doc._id;
      const docToUpdate = Trips.findOne(documentId, { fields: { owner: 1 } });

      if (docToUpdate.owner === this.userId) {
        Trips.update(documentId, { $set: doc });
        return documentId; // Return _id so we can redirect to document after update.
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to edit this document.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'documents.remove': function tripsRemove(tripId) {
    check(tripId, String);

    try {
      const docToRemove = Trips.findOne(tripId, { fields: { owner: 1 } });

      if (docToRemove.owner === this.userId) {
        return Trips.remove(tripId);
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to delete this document.');
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
