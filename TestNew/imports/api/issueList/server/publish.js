/**
 * @author jishnu
 */

import { myList } from "../issueList";
import { publishPagination } from 'meteor/kurounin:pagination';


Meteor.startup(() => {
  myList.createIndex({ name: 1 }, { unique: true });
  publishPagination(myList);
});

Meteor.publish('myLi5st', function () {
  return myList.find({isDeleted:false});
});