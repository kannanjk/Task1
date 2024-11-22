/**
 * @author Subrata
 */

import {Zone} from "../../../api/zone/zone.js";
import {User} from "../../../api/user/user.js";


Template.zones.onCreated(function () {
  this.pagination = new Meteor.Pagination(Zone, {
    filters: {isDeleted: false},
    sort: {name: 1},
    perPage: 25
  });

  const self = this;
});

Template.zones.helpers({

  /**
   * TODO: Complete JS doc
   * @returns {{collection, acceptEmpty, substitute, eventType}}
   */
  optionsHelper: () => {
    return globalOptionsHelper(zoneCollectionName);
  },

  /**
   * TODO: Complete JS doc
   * @returns {{collection: *, acceptEmpty: boolean, substitute: string, eventType: string}}
   */
  optionsHelperWithTextArea: () => {
    const config = globalOptionsHelper(zoneCollectionName);
    config.textarea = true;

    return config;
  },

  /**
   * TODO: Complete JS doc
   * @returns {any | *}
   */
  isReady: function () {
    return Template.instance().pagination.ready();
  },

  /**
   * TODO: Complete JS doc
   * @returns {Meteor.Pagination}
   */
  templatePagination: function () {
    return Template.instance().pagination;
  },

  /**
   * TODO: Complete JS doc
   * @returns {*}
   */
  zones: function () {
    return Template.instance().pagination.getPage();
  },

  /**
   * TODO: Complete JS doc
   * @returns {Function}
   */
  handlePagination: function () {
    return function (e, templateInstance, clickedPage) {
      e.preventDefault();
      console.log('Changing page from ', templateInstance.data.pagination.currentPage(), ' to ', clickedPage);
    };
  },

  /**
   * TODO: Complete JS doc
   */
  sortIcon: () => {
    genericSortIcons();
  },

  /**
   * TODO: Complete JS doc
   * @param zoneUuid
   */
  totalUsers: (zoneUuid) => {
    if (zoneUuid && $.trim(zoneUuid)) {
      return Meteor.users.find({zone: $.trim(zoneUuid)}).count();
    }
  }

});

Template.zones.events({
  /**
   * TODO: Complete JS doc
   * @param event
   */
  'submit .zone-filter': (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const description = event.target.description.value;

    if (name && $.trim(name) && description && $.trim(description)) {
      Template.instance().pagination.settings.set('filters',
        {
          name: {
            $regex: new RegExp($.trim(name), "i")
          },
          description: {
            $regex: new RegExp($.trim(description), "i")
          },
          isDeleted: false
        }
      );
    }
    else if (name && $.trim(name)) {
      Template.instance().pagination.settings.set('filters', {
        name: {$regex: new RegExp($.trim(name), "i")},
        isDeleted: false
      });
    }
    else if (description && $.trim(description)) {
      Template.instance().pagination.settings.set('filters', {
        description: {
          $regex: new RegExp($.trim(description), "i")
        },
        isDeleted: false
      });
    }
    else {
      Template.instance().pagination.settings.set('filters', {isDeleted: false});
    }
  },
  /**
   * TODO: Compelete JS doc
   */
  'click #zone-create-button': () => {
    $("#zone-create").modal();
  },
  /**
   * TODO: Complete JS doc
   */
  'click .reset': () => {
    Template.instance().pagination.settings.set('filters', {isDeleted: false});
    $('form :input').val("");
  },

  /**
   * TODO: Complete JS doc
   * @param event
   */
  'click .remove': (event) => {
    event.preventDefault();
    const header = $('#zoneHeader');
    const categoryName = $('#confZoneName');
    const categoryNameDup = $('#categoryNameDup');
    const categoryTotal = $('#zoneTotal');
    const confirmedUuid = $('#confirmedUuid');
    $('#zoneDelConfirmation').modal();
    const uuid = event.currentTarget.attributes.id.value;
    const name = $('#name_' + uuid).val();
    const users = Meteor.users.find({zone : $.trim(uuid)}).count();
    $(header).html('Confirm Deletion Of ' + $.trim(name));
    $(categoryName).html(name);
    $(categoryNameDup).html(name);
    $(categoryTotal).html(users);
    $(confirmedUuid).val(uuid);
  },

  /**
   * TODO: Complete JS doc
   * @param event
   */
  'click #zoneRemove': (event) => {
    event.preventDefault();
    const uuid = $('#confirmedUuid').val();
    if (uuid && $.trim(uuid)) {
      Meteor.call('zone.delete', $.trim(uuid), (error) => {
        if (error) {
          $('#message').html("Internal error - unable to remove entry. Please try again");
        } else {
          toastr["success"]('Zone has been deleted successfully')
        }
        $("#zoneDelConfirmation").modal('hide');
      });
    }
  }

});
