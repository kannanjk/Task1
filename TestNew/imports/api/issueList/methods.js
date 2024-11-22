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
    user.isDeleted = false
    return myList.insert(user);
  },
  'list.delete': (id) => {
    const user = myList.findOne({ name: id })
    if (user) {
      user.isDeleted = true
      myList.remove({
        _id: user._id
      }, user)
    }
  }
}) 