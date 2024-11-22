/**
 * @author jishnu 
*/

import { myList } from "../../../api/issueList/issueList";

Template.myList.onCreated(function () {
  this.pagination = new Meteor.Pagination(myList, {
    filters: { 'isDeleted': false },
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

  'click .remove': (event) => {
    event.preventDefault();
    const header = $('#categoryHeader');
    const categoryName = $('#confCategoryName');
    const categoryNameDup = $('#categoryNameDup');
    const roleNameDup = $('#roleNameDup');
    const confirmedUuid = $('#confirmedUuid');

    $('#categoryDelConfirmation').modal();
    const _id = event.currentTarget.attributes.id?.value || null;
    console.log(_id);
    const username = $('#name_' + _id).val();

    $(header).html('Confirm Deletion Of ' + $.trim(username));
    $(categoryName).html(username);
    $(categoryNameDup).html(username);
    $(roleNameDup).html(username);
    $(confirmedUuid).val(_id);
  },
  'click #categoryRemove': (event) => {
    event.preventDefault();
    const _id = $('#confirmedUuid').val();
    if (_id && $.trim(_id)) {
      Meteor.call('list.delete', $.trim(_id), (error,res) => {
        if (error) {
          $('#message').html("Internal error - unable to remove entry. Please try again");
        } else {
          console.log(res);
          $('#roleSuccessModal').find('.modal-body').text('Role has been deleted successfully');
          $('#roleSuccessModal').modal();
        }
        $("#categoryDelConfirmation").modal('hide');
      });
    }
  }
})