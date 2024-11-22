/**
 * @author subrata 
 */

import {publishPagination} from 'meteor/kurounin:pagination';
import {Meteor} from 'meteor/meteor';
import {Zone} from '../zone.js';

Meteor.startup(() => {
  Zone._ensureIndex({name: 1}, {unique: true});
  publishPagination(Zone);
});

Meteor.publish('zone.list', function () {
  return Zone.find({}, {sort: {name: 1}}, {fields: {name: 1, uuid: 1}});
});
