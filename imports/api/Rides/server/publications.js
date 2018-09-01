import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Rides from '../Rides';

Meteor.publish('rides', function documents() {
  return Rides.find({ owner: this.userId });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('rides.view', (documentId) => {
  check(documentId, String);
  return Rides.find({ _id: documentId });
});

Meteor.publish('rides.edit', function documentsEdit(documentId) {
  check(documentId, String);
  return Rides.find({ _id: documentId, owner: this.userId });
});
