/**
 * @author Visakh
 */

import {roles} from "../role";
import {publishPagination} from 'meteor/kurounin:pagination';

 
Meteor.startup(() => {
  roles._ensureIndex({name: 1}, {unique: true});
  publishPagination(roles);
});


/**
 * TODO: Complete JS doc
 */
Meteor.publish('role.list', function () {
  return Meteor.roles.find({},{sort: {name: 1}}, {fields: {name: 1}});
});
