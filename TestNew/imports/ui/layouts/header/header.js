/**
 * @author Subrata
 */

import { Meteor } from 'meteor/meteor';

Meteor.subscribe('config.list');

Template.header.helpers({
  user: function () {
    return Meteor.user(); 
  },
  role: function () {
    return Meteor.roles.find({ _id: Meteor.user().roleId }).fetch();
  }
});

Template.header.events({
  'click #ic-update': (event) => {
    $("#ic-update-modal").modal();
  }
});
