/**
 * @author jishnu
*/

import { myList } from "../../../api/issueList/issueList";

Template.myList.onCreated(function () {
  this.pagination = new Meteor.Pagination(myList, {
    filters: {},
    sort: { name: 1 },
    perPage: 25
  });

  const self = this;
  self.autorun(() => {
  });
});

Template.myList.helpers({

  isReady: function () {
    return Template.instance().pagination.ready();
  },

  categories: function () {
    return Template.instance().pagination.getPage();;
  },

});

Template.myList.events({
  'click #ic-create-button': () => {
    $("#ic-create").modal();
  },
})