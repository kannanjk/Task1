/**
 * @author Visakh
 */
import { Meteor } from 'meteor/meteor'
import { roles } from "../../../api/role/role";

Template.role_list.onCreated(function () {

  const self = this;
  self.autorun(() => {
    self.subscribe('role.list');
    self.subscribe('user.list');

  });


  this.pagination = new Meteor.Pagination(roles, {
    filters: { 'isDeleted': false },
    sort: { 'name': 1 },
    perPage: 10
  });
  // Meteor.subscribe('roles.list'); 
});

Template.role_list.helpers({

  /**
   * TODO: Complete JS doc
   * @returns {{collection, acceptEmpty, substitute, eventType}}
   */
  optionsHelper: () => {
    return globalOptionsHelper('jalik-roles');
  },

  /**
   * TODO: Complete JS doc
   * @returns {{collection: *, acceptEmpty: boolean, substitute: string, eventType: string}}
   */
  optionsHelperWithTextArea: () => {
    const config = globalOptionsHelper('jalik-roles');
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
  roles: function () {
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
 * @param role_id
 */
  totalUsers: (role_id) => {
    if (role_id && $.trim(role_id)) {
      const r = Meteor.users.find({ roles: $.trim(role_id) }).count();
      console.log('r', r);
      return r;
    };
  }

});

Template.role_list.events({
  /**
   * TODO: Complete JS doc
   * @param event
   */
  'submit .role-filter': (event) => {
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

          'isDeleted': false
        }
      );
    }
    else if (name && $.trim(name)) {
      Template.instance().pagination.settings.set('filters', {
        name: {
          $regex: new RegExp($.trim(name), "i")
        },
        'isDeleted': false
      });
    }
    else if (description && $.trim(description)) {
      Template.instance().pagination.settings.set('filters', {
        description: { $regex: new RegExp($.trim(description), "i") },
        'isDeleted': false
      });
    }
    else {
      Template.instance().pagination.settings.set('filters',
        {
          'isDeleted': false

        });
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

  'click #userschecks': () => {
    if ($("#userschecks").prop("checked") == true) {
      $("#userscheckView").prop('checked', true);
      $("#userscheckCreate").prop('checked', true);
      $("#userscheckUpdate").prop('checked', true);
      $("#userscheckDelete").prop('checked', true);
    } else {
      $("#userscheckView").prop('checked', false);
      $("#userscheckCreate").prop('checked', false);
      $("#userscheckUpdate").prop('checked', false);
      $("#userscheckDelete").prop('checked', false);
    }


  },
  /**
   * TODO: Complete JS doc
   */
  'click #itemCategorychecks': () => {
    if ($("#itemCategorychecks").prop("checked") == true) {
      $("#itemCategorycheckView").prop('checked', true);
      $("#itemCategorycheckCreate").prop('checked', true);
      $("#itemCategorycheckUpdate").prop('checked', true);
      $("#itemCategorycheckDelete").prop('checked', true);
    } else {
      $("#itemCategorycheckView").prop('checked', false);
      $("#itemCategorycheckCreate").prop('checked', false);
      $("#itemCategorycheckUpdate").prop('checked', false);
      $("#itemCategorycheckDelete").prop('checked', false);
    }

  },
  /**
    * TODO: Complete JS doc
    */
  'click #rolechecks': () => {
    if ($("#rolechecks").prop("checked") == true) {
      $("#rolecheckView").prop('checked', true);
      $("#rolecheckUpdate").prop('checked', true);
      $("#rolecheckCreate").prop('checked', true);
      $("#rolecheckDelete").prop('checked', true);
    } else {
      $("#rolecheckView").prop('checked', false);
      $("#rolecheckUpdate").prop('checked', false);
      $("#rolecheckCreate").prop('checked', false);
      $("#rolecheckDelete").prop('checked', false);
    }
  },
  /**
   * TODO: Complete JS doc
   */
  'click #attendancechecks': () => {
    if ($("#attendancechecks").prop("checked") == true) {
      $("#attendancecheckView").prop('checked', true);
      $("#attendancecheckCreate").prop('checked', true);

    } else {
      $("#attendancecheckView").prop('checked', false);
      $("#attendancecheckCreate").prop('checked', false);
    }
  },


  /**
    * TODO: Complete JS doc
    */
  'click #zonechecks': () => {
    if ($("#zonechecks").prop("checked") == true) {
      $("#zonecheckView").prop('checked', true);
      $("#zonecheckUpdate").prop('checked', true);
      $("#zonecheckCreate").prop('checked', true);
      $("#zonecheckDelete").prop('checked', true);
    } else {
      $("#zonecheckView").prop('checked', false);
      $("#zonecheckUpdate").prop('checked', false);
      $("#zonecheckCreate").prop('checked', false);
      $("#zonecheckDelete").prop('checked', false);
    }
  },
  /**
 * TODO:Complete JS doc
 */
  'change .userSelect': () => {
    if ($(".userSelect").length == $(".userSelect:checked").length)
      $("#userschecks").prop('checked', true);
    else
      $("#userschecks").prop('checked', false);
  },
  /**
  * TODO:Comlete JS doc
  */
  'change .itemCategorySelect': () => {
    if ($(".itemCategorySelect").length == $(".itemCategorySelect:checked").length)
      $("#itemCategorychecks").prop('checked', true);
    else
      $("#itemCategorychecks").prop('checked', false);
  },
  /**
   * TODO:Comlete JS doc
   */
  'change .roleSelect': () => {
    if ($(".roleSelect").length == $(".roleSelect:checked").length)
      $("#rolechecks").prop('checked', true);
    else
      $("#rolechecks").prop('checked', false);
  },
  /**
  * TODO:Comlete JS doc
  */
  'change .attendanceSelect': () => {
    if ($(".attendanceSelect").length == $(".attendanceSelect:checked").length)
      $("#attendancechecks").prop('checked', true);
    else
      $("#attendancechecks").prop('checked', false);
  },
  /**
 * TODO:Comlete JS doc
 */
  'change .zoneSelect': () => {
    if ($(".zoneSelect").length == $(".zoneSelect:checked").length)
      $("#zonechecks").prop('checked', true);
    else
      $("#zonechecks").prop('checked', false);
  },
  /**
   * TODO: Complete JS doc
   */
  'click .reset': () => {
    Template.instance().pagination.settings.set('filters', { isDeleted: false });
    $('form :input').val("");
  },

  /**
   * TODO: Complete JS doc
   * @param event
   */
  'click .ic-edit-button': (event) => {
    event.preventDefault();
    $("#ic-edit").modal();

    const _id = event.currentTarget.attributes.id.value;
    const roleDetail = Meteor.roles.findOne({ _id: _id })
    // const header = $('#categoryH');     


    const roleDetailName = roleDetail.name;
    const roleDetailDescription = roleDetail.description;
    const roleDetailPermissions = roleDetail.permissions;

    const userView = roleDetailPermissions.includes("userView");
    const userUpdate = roleDetailPermissions.includes("userUpdate");
    const userDelete = roleDetailPermissions.includes("userDelete");
    const userCreate = roleDetailPermissions.includes("userCreate");
    const itemCategoryView = roleDetailPermissions.includes("itemCategoryView");
    const itemCategoryCreate = roleDetailPermissions.includes("itemCategoryCreate");
    const itemCategoryUpdate = roleDetailPermissions.includes("itemCategoryUpdate");
    const itemCategoryDelete = roleDetailPermissions.includes("itemCategoryDelete");
    const roleView = roleDetailPermissions.includes("roleView");
    const roleCreate = roleDetailPermissions.includes("roleCreate");
    const roleUpdate = roleDetailPermissions.includes("roleUpdate");
    const roleDelete = roleDetailPermissions.includes("roleDelete");
    const attendanceView = roleDetailPermissions.includes("attendanceView");
    const attendanceCreate = roleDetailPermissions.includes("attendanceCreate");
    const zoneView = roleDetailPermissions.includes("zoneView");
    const zoneCreate = roleDetailPermissions.includes("zoneCreate");
    const zoneUpdate = roleDetailPermissions.includes("zoneUpdate");
    const zoneDelete = roleDetailPermissions.includes("zoneDelete");
    $("#roleDetailName").val(roleDetailName);
    $("#roleDetailId").val(_id);
    $("#roleDetailDescription").val(roleDetailDescription);
    if (userView == true) { $("#userscheckView").prop('checked', true); }
    else { $("#userscheckView").prop('checked', false) };
    if (userUpdate == true) { $("#userscheckUpdate").prop('checked', true); }
    else { $("#userscheckUpdate").prop('checked', false); };

    if (userDelete == true) { $("#userscheckDelete").prop('checked', true); }
    else { $("#userscheckDelete").prop('checked', false); };
    if (userCreate == true) { $("#userscheckCreate").prop('checked', true); }
    else { $("#userscheckCreate").prop('checked', false); };
    if (itemCategoryView == true) { $("#itemCategorycheckView").prop('checked', true); }
    else { $("#itemCategorycheckView").prop('checked', false); };
    if (itemCategoryCreate == true) { $("#itemCategorycheckCreate").prop('checked', true); }
    else { $("#itemCategorycheckCreate").prop('checked', false); };
    if (itemCategoryUpdate == true) { $("#itemCategorycheckUpdate").prop('checked', true); }
    else { $("#itemCategorycheckUpdate").prop('checked', false); };
    if (itemCategoryDelete == true) { $("#itemCategorycheckDelete").prop('checked', true); }
    else { $("#itemCategorycheckDelete").prop('checked', false); };
    if (roleView == true) { $("#rolecheckView").prop('checked', true); }
    else { $("#rolecheckView").prop('checked', false); };
    if (roleCreate == true) { $("#rolecheckCreate").prop('checked', true); }
    else { $("#rolecheckCreate").prop('checked', false); };
    if (roleUpdate == true) { $("#rolecheckUpdate").prop('checked', true); }
    else { $("#rolecheckUpdate").prop('checked', false); };
    if (roleDelete == true) { $("#rolecheckDelete").prop('checked', true); }
    else { $("#rolecheckDelete").prop('checked', false); };
    if (attendanceView == true) { $("#attendancecheckView").prop('checked', true); }
    else { $("#attendancecheckView").prop('checked', false); };
    if (attendanceCreate == true) { $("#attendancecheckCreate").prop('checked', true); }
    else { $("#attendancecheckCreate").prop('checked', false); };
    if (attendanceCreate == true) { $("#attendancecheckCreate").prop('checked', true); }
    else { $("#attendancecheckCreate").prop('checked', false); };
    if (zoneCreate == true) { $("#zonecheckCreate").prop('checked', true); }
    else { $("#zonecheckCreate").prop('checked', false); };
    if (zoneView == true) { $("#zonecheckView").prop('checked', true); }
    else { $("#zonecheckView").prop('checked', false); };
    if (zoneUpdate == true) { $("#zonecheckUpdate").prop('checked', true); }
    else { $("#zonecheckUpdate").prop('checked', false); };
    if (zoneDelete == true) { $("#zonecheckDelete").prop('checked', true); }
    else { $("#zonecheckDelete").prop('checked', false); };

    if ($(".zoneSelect").length == $(".zoneSelect:checked").length)
      $("#zonechecks").prop('checked', true);
    else
      $("#zonechecks").prop('checked', false);
    if ($(".userSelect").length == $(".userSelect:checked").length)
      $("#userschecks").prop('checked', true);
    else
      $("#userschecks").prop('checked', false);
    if ($(".itemCategorySelect").length == $(".itemCategorySelect:checked").length)
      $("#itemCategorychecks").prop('checked', true);
    else
      $("#itemCategorychecks").prop('checked', false);
    if ($(".roleSelect").length == $(".roleSelect:checked").length)
      $("#rolechecks").prop('checked', true);
    else
      $("#rolechecks").prop('checked', false);
    if ($(".attendanceSelect").length == $(".attendanceSelect:checked").length)
      $("#attendancechecks").prop('checked', true);
    else
      $("#attendancechecks").prop('checked', false);
  },
  /**
       * TODO: Complete JS doc
       * @param event
       */
  'submit .role-update': (event) => {
    event.preventDefault();
    updateRole(event.target);
  },
  /**
    * TODO: Complete JS doc
    */
  'click .closeRole': () => {
    $("#roleAdds").each(function () {
      this.reset();

    });

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
    const roleNameDup = $('#roleNameDup');
    const confirmedUuid = $('#confirmedUuid');
    const userTotal = $('#roleTotal');

    $('#categoryDelConfirmation').modal();
    const _id = event.currentTarget.attributes.id.value;
    console.log(_id);


    const users = Meteor.users.find({ roles: $.trim(_id) }).count();
    const username = $('#name_' + _id).val();
    $(header).html('Confirm Deletion Of ' + $.trim(username));
    $(categoryName).html(username);
    $(categoryNameDup).html(username);
    $(roleNameDup).html(username);
    $(confirmedUuid).val(_id);
    $(userTotal).html(users);
  },

  /**
   * TODO: Complete JS doc    
   * @param event
   */
  'click #categoryRemove': (event) => {
    event.preventDefault();
    const _id = $('#confirmedUuid').val();
    if (_id && $.trim(_id)) {
      Meteor.call('role.delete', $.trim(_id), (error) => {
        if (error) {
          $('#message').html("Internal error - unable to remove entry. Please try again");
        } else {
          $('#roleSuccessModal').find('.modal-body').text('Role has been deleted successfully');
          $('#roleSuccessModal').modal();
        }
        $("#categoryDelConfirmation").modal('hide');
      });
    }
  }



});
