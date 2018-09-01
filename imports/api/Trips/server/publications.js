import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Trips from '../Trips';

Meteor.publish('trips', function documents() {
  return Trips.find({ owner: this.userId });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('trips.view', (id) => {
  check(id, String);
  return Trips.find({ _id: id });
});

Meteor.publish('trips.edit', function documentsEdit(id) {
  check(id, String);
  return Trips.find({ _id: id, owner: this.userId });
});
