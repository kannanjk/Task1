/**
 * @author Subrata
 */

import { Item } from "../item";
import { publishPagination } from 'meteor/kurounin:pagination';


Meteor.startup(() => {
  Item._ensureIndex({ name: 1 }, { unique: true });
  Item._ensureIndex({ uuid: 1 }, { unique: true });
  publishPagination(Item);
});

/**
 * TODO: Complete JS doc
 */
Meteor.publish('item.list', function () {
  return Item.find({}, { sort: { name: 1 } });
});