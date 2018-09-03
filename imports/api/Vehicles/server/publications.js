import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Vehicles from '../Vehicles';

Meteor.publish('vehicles', function documents() {
  return Vehicles.find({ ownerId: this.userId });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('vehicles.view', (vehicleId) => {
  check(vehicleId, String);
  return Vehicles.find({ _id: vehicleId });
});

Meteor.publish('vehicles.edit', function documentsEdit(vehicleId) {
  check(vehicleId, String);
  return Vehicles.find({ _id: vehicleId, ownerId: this.userId });
});
