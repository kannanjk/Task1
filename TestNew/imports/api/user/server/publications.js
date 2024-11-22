/**
 * @author Visakh
 */

import {allUsers} from "../user";
import {publishPagination} from 'meteor/kurounin:pagination';
  import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  allUsers._ensureIndex({username: 1}, {unique: true});
  publishPagination(allUsers);
});

/**
 * TODO: Complete JS doc
 */
Meteor.publish('user.list', function () {
  return Meteor.users.find({},{sort: {username: 1}}, {fields: {username: 1}});
});
