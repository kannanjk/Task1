/**
 * @author Subrata
 */

import {ItemCategory} from "../itemCategory";
import {publishPagination} from 'meteor/kurounin:pagination';


Meteor.startup(() => { 
  ItemCategory._ensureIndex();
  ItemCategory._ensureIndex();
  publishPagination(ItemCategory);
});

/**
 * TODO: Complete JS doc
 */
Meteor.publish('itemCategory.list', function () {
  return ItemCategory.find({}, {sort: {name: 1}}, {fields: {name: 1, uuid: 1}});
});