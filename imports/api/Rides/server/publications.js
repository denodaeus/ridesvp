import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Rides from '../Rides';

Meteor.publish('rides', function documents() {
  return Rides.find({ riderId: this.userId });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('rides.view', (rideId) => {
  check(rideId, String);
  return Rides.find({ _id: rideId });
});

Meteor.publish('rides.edit', function documentsEdit(rideId) {
  check(rideId, String);
  return Rides.find({ _id: rideId, riderId: this.userId });
});
