/**
 * @author Visakh
 */

import { Attendance } from "../attendance";
import { publishPagination } from 'meteor/kurounin:pagination';


Meteor.startup(() => {
  Attendance._ensureIndex({ uuid: 1 }, { unique: true });
  publishPagination(Attendance);
});

/**
 * TODO: Complete JS doc
**/

Meteor.publish('attendance.list', function () {
  return Attendance.find({}, { sort: { _id: 1 } }, { fields: { _id: 1, uuid: 1 } });
});