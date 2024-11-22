/**
 * @author Visakh
 */

import {Attendance} from "../../../api/attendance/attendance";



Template.attendance.onCreated(function () {
  this.pagination = new Meteor.Pagination(Attendance, {    
    sort: {_id: 1},
    perPage: 25
  });

  const self = this;
  self.autorun(function () {
  })
});

Template.attendance.helpers({

  /**
   * TODO: Complete JS doc
   * @returns {{collection, acceptEmpty, substitute, eventType}}
   */
  optionsHelper: () => {
    return globalOptionsHelper(itemCateogryCollectionName);
  },

  /**
   * TODO: Complete JS doc
   * @returns {{collection: *, acceptEmpty: boolean, substitute: string, eventType: string}}
   */
  optionsHelperWithTextArea: () => {
    const config = globalOptionsHelper(itemCateogryCollectionName);
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
  attendances: function () {
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
  }
});
/**
 * TODO:Complete JS doc
 */
Template.registerHelper('formatedLogin', function(loginAt) {
  return moment(loginAt).format('MM-DD-YYYY HH:ss A');
});
/**
 * TODO:Complete JS doc
 */
Template.registerHelper('formatedLogout', function(loginAt) {
  return moment(loginAt).format('MM-DD-YYYY HH:ss A');
});

Template.attendance.events({
    /**
   * TODO: Complete JS doc
   * @param event
   */
  'submit .category-filter': (event) => {
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
   * TODO: Complete JS doc
   */
  'click #ic-create-button': () => {
    $("#ic-create").modal();
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
    const header = $('#categoryHeader');
    const categoryName = $('#confCategoryName');
    const categoryNameDup = $('#categoryNameDup');
    const categoryTotal = $('#categoryTotal');
    const confirmedUuid = $('#confirmedUuid');
    $('#categoryDelConfirmation').modal();
    const uuid = event.currentTarget.attributes.id.value;
    const name = $('#name_' + uuid).val();
    const items = Item.find({category: $.trim(uuid)}).count();
    $(header).html('Confirm Deletion Of Item Category-' + $.trim(name));
    $(categoryName).html(name);
    $(categoryNameDup).html(name);
    $(categoryTotal).html(items);
    $(confirmedUuid).val(uuid);
  },
/**
 * TODO: Complete JS doc
 * @param event
 */
'click .myLoc': (event) => { 
   const loc=  Geolocation.latLng();
   Meteor.call('getLocation',loc,(err,res) =>{
     if (res) {         
     const location = $('#myLocation');   
       $(location).html(res[0].formattedAddress);
       $("#myNewLocation").val(res[0].formattedAddress);
       $("#locLat").val(loc.lat);
       $("#locLng").val(loc.lng);    
     }
   });    
     return loc
},
/**
 * TODO: Complete JS doc
 */
'click .view':(event) => {
  event.preventDefault();
  const id = event.currentTarget.id;
  const header = $('#categoryH');
  const attendanceBy = $('#attendanceBy');
  const attendanceLoginAt = $('#attendanceLoginAt');
  const attendanceLoginLocation = $('#attendanceLoginLocation');
  const attendanceLogoutAt = $('#attendanceLogoutAt');
  const attendanceLogoutLocation = $('#attendanceLogoutLocation');
  const attendanceIMEI = $('#attendanceIMEI');
  const attendanceDeviceDetails = $('#attendanceDeviceDetails');
  $('#attendanceDetailPage').modal();   
      const attendance= Attendance.findOne({_id:id}); 
      const loginAt = moment(attendance.loginAt).format('MM-DD-YYYY HH:mm A')
      const logoutAt = moment(attendance.logoutAt).format('MM-DD-YYYY HH:mm A')
     
      $(header).html('Details of '  + $.trim(attendance.registeredBy));
      $(attendanceBy).html(attendance.registeredBy);
      $(attendanceLoginAt).html(loginAt);
      $(attendanceLoginLocation).html(attendance.loginLocation);
      $(attendanceLogoutAt).html(logoutAt);
      $(attendanceLogoutLocation).html(attendance.logoutLocation);
      $(attendanceIMEI).html(attendance.imeiNumber);
      $(attendanceDeviceDetails).html(attendance.deviceDetails);
     
  
}
});
