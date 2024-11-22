/**
 * @author jishnu
 */

import { myList } from "./issueList";

Meteor.methods({
  /**
 * TODO: Complete JS doc
 * @param {Object} user
 */

  'list.create': (user) => {
    try {
      myList.insert(user);
    } catch (error) {
      console.log(error);
    }
  }
}) 