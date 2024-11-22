/**
 * @author Visakh
 */
import { Meteor } from 'meteor/meteor'
import {allUsers} from "../../../api/user/user";
import {Zone} from '../../../api/zone/zone';

Template.user.onRendered(function() {
  $('.select2-dropdown').select2({  
       placeholder: "Select roles"
   
  });
});

Template.user.onCreated(function () {

  const self = this;
  self.autorun(() => {
    self.subscribe('user.list');

  });
  this.pagination = new Meteor.Pagination(allUsers, {
    filters: {'profile.isDeleted': false,_id:{$ne:Meteor.userId()}},
  _id:{$ne:Meteor.userId()},
  sort:{'profile.firstName': 1},
    perPage: 10
  });
  Meteor.subscribe('role.list'); 

 
  
});

Template.user.helpers({
 
  /**
   * TODO: Complete JS doc
   * @returns {{collection, acceptEmpty, substitute, eventType}}
   */
  optionsHelper: () => {
    return globalOptionsHelper('users');
  },

  /**
   * TODO: Complete JS doc
   * @returns {{collection: *, acceptEmpty: boolean, substitute: string, eventType: string}}
   */
  optionsHelperWithTextArea: () => {
    const config = globalOptionsHelper('users');
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
  userList: function () {

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
 * @returns {{Collection:*}}
 */
  roles_list: function() {    
    return  Meteor.roles.find({'isDeleted':false}).fetch();
 },
 /**
 * TODO: Complete JS doc
 * @returns {{Collection:*}}
 */
zones_list: function() {    
  return  Zone.find({'isDeleted':false}).fetch();
},
  /**
   * TODO: Complete JS doc
   */
  sortIcon: () => {
    genericSortIcons();
  },
  /**
   * TODO: Complete JS doc
   */
  date: function(){
    return new Date();
  }
 

});

Template.user.events({
 
 
  /**
   * TODO: Complete JS doc
   * @param event
   */
  'submit .user-filter': (event) => {
    event.preventDefault();
    const empCode = event.target.empcode.value;
    const firstName = event.target.firstName.value;
    const emailfilter = event.target.emailfilter.value;
    if (empCode && $.trim(empCode) && firstName && $.trim(firstName) && emailfilter && $.trim(emailfilter)) {
      Template.instance().pagination.settings.set('filters',
        {
          'profile.empCode': {
            $regex: new RegExp($.trim(empCode), "i")
          },
          'profile.firstName': {
            $regex: new RegExp($.trim(firstName), "i")
          },
          'emails.0.address': {
            $regex: new RegExp($.trim(emailfilter), "i")
          },
          'profile.isDeleted': false,_id:{$ne:Meteor.userId()}
        }
      );
    }
    else if (empCode && $.trim(empCode)) {
      Template.instance().pagination.settings.set('filters', {
        'profile.empCode': {$regex: new RegExp($.trim(empCode), "i")},
        'profile.isDeleted': false,_id:{$ne:Meteor.userId()}
      });
    }
    else if (firstName && $.trim(firstName)) {
      Template.instance().pagination.settings.set('filters', {
        'profile.firstName': {
          $regex: new RegExp($.trim(firstName), "i")
        },
        'profile.isDeleted': false,_id:{$ne:Meteor.userId()}
      });
    }
    else if (emailfilter && $.trim(emailfilter)) {
      Template.instance().pagination.settings.set('filters', {
        'emails.0.address': {$regex: new RegExp($.trim(emailfilter), "i")},
        'profile.isDeleted': false,_id:{$ne:Meteor.userId()}
      });
    }
    else {
      Template.instance().pagination.settings.set('filters', {'profile.isDeleted': false,_id:{$ne:Meteor.userId()}});
    }
  },
/**
 * TODO: Complete JS doc
 * 
 */
'click .toggle-passwords':()=>{
  $(".toggle-passwords").toggleClass("fa-eye fa-eye-slash");
  var input = $($(".toggle-passwords").attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
},
/**
 * TODO: Complete JS doc
 * 
 */
'focus #passwords':()=>{
  $('div.hint').show();
  $(document).bind('focusin.hint click.hint',function(e) {
    if ($(e.target).closest('.hint, #passwords').length) return;
     $(document).unbind('.hint');
      $('div.hint').fadeOut('medium');
  });
},
/**
 * TODO: Complete JS doc
 * 
 */
'blur #passwords':()=>{
  $('div.hint').hide();
},
/**
 * TODO: Complete JS doc
 * 
 */
 'blur #emails':()=>{
  let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  let emailaddress = $("#emails").val();
  if(!emailReg.test(emailaddress))
     $("#emailspans").html('<font color="#fc5f5f" size="2">Please enter valid email address</font>');
  else
     $("#emailspans").html('<font color="#fc5f5f"></font>');
 },
 /**
 * TODO: Complete JS doc
 * 
 */
 'blur #passwords':()=>{
  let passwordReg = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})?$/;
  let passwordaddress = $("#passwords").val();
  if(!passwordReg.test(passwordaddress))
     $("#passwordspans").html('<font color="#fc5f5f" size="2">Please enter valid password</font>');
   else
     $("#passwordspans").html('<font color="#fc5f5f"></font>');
 },
   /**
 * TODO: Complete JS doc
 * 
 */
'blur #confirmPasswords':()=>{
  let passs = $("#passwords").val();
  let confirmpasss =$("#confirmPasswords").val();
  if(confirmpasss != passs){
    $("#confirmPasswordspans").html('<font color="#fc5f5f" size="2">Those passwords didn&apos;t match. Try again !</font>');

  }else{
    $("#confirmPasswordspans").html('<font color="#fc5f5f"></font>');

  }
},

/**
 * TODO: Complete JS doc
 * 
 */
  'click #ic-create-button': () => {
    $("#ic-create").modal();
    $('div.hint').hide(); 
  },
/**
 * TODO: Complete JS doc
 */
  'click .reset': () => {
    Template.instance().pagination.settings.set('filters', {'profile.isDeleted': false,_id:{$ne:Meteor.userId()}});
     $('form :input').val("");
  },
  /**
   * TODO: Complete JS doc
   * @param event
   */
  'click .remove': (event) => {
    event.preventDefault();
    const header = $('#userHeader');
    const userName = $('#confuserName');
    const userNameDup = $('#userNameDup');
    const confirmedUuid = $('#confirmedUuid');    
    $('#userDelConfirmation').modal();
    const _id = event.currentTarget.attributes.id.value;
    const username = $('#name_' + _id).val();    
    $(header).html('Confirm Deletion Of ' + $.trim(username));
    $(userName).html(username);
    $(userNameDup).html(username);
    $(confirmedUuid).val(_id);
    

  },
/**
 * TODO: Complete JS doc
 * @param event
 */
  'click #userRemove': (event) => {
    event.preventDefault();
    const _id = $('#confirmedUuid').val();
    if (_id && $.trim(_id)) {
      Meteor.call('user.delete', $.trim(_id), (error) => {
        if (error) {        
          $('#message').html("Internal error - unable to remove entry. Please try again");
        }else{
          $('#userSuccessModal').modal();
        $('#userSuccessModal').find('.modal-body').text('User deleted successfully');
        }
        $("#userDelConfirmation").modal('hide');
      });
    }
  },
  /**
   * TODO: Complete JS doc
   * @param event
   */
  'click .edit': (event) => {
    event.preventDefault();
    const _id = event.currentTarget.attributes.id.value;   
    const header = $('#categoryH');
    $('#userEditPage').modal();  
   $('div.hint').hide();
        const userDetail= Meteor.users.findOne({_id:_id});   
        const userDetailFirstName = userDetail.profile.firstName;
        const userDetailLastName = userDetail.profile.lastName;
        const userDetailgender = userDetail.profile.gender;
        const userDetailusername = userDetail.username;
        const userDetailemail = userDetail.emails[0].address;
        const userDetaildateOfBirth = userDetail.profile.dateOfBirth;
        const userDetailisDeleted = userDetail.profile.isDeleted;
        const userDetailId = _id;     
        const userDetailempCode = userDetail.profile.empCode;     
        const userDetailroleId = userDetail.roles;     
        const userDetailzoneId = userDetail.zone;     

   
        $("#userDetailFirstName").val(userDetailFirstName);
        $("#userDetailLastName").val(userDetailLastName);
        $("#userDetailusername").val(userDetailusername);
        $(".email").val(userDetailemail);
        $(".hiddenemail").val(userDetailemail);
        $(".datevalue").val(userDetaildateOfBirth);   
        $(".datevalue").val(userDetaildateOfBirth);  
        $(".isDeleted").val(userDetailisDeleted);  
        $(".id").val(userDetailId);  
        $("#empCodenew").val(userDetailempCode);          
        $("#empCode").val(userDetailempCode);  
        $("input[name=genders][value=" + userDetailgender + "]").attr('checked', 'checked');
        $(header).html('Update User');
        $('#roleIdselect').val(userDetailroleId).trigger("change");        
        $("#zoneIdselect").val(userDetailzoneId);  
       },
     /**
      * TODO: Complete JS doc
      * @param event
      */
       'submit .updateUser': (event) => {
        event.preventDefault();
        const rolesArray = [];               
        $('#roleIdselect :selected').each(function() {
          rolesArray.push($(this).val());
      });
         updateUserlist(event.target,rolesArray);
       },
       /**
        * TODO: Complete JS doc
        */
       'click .closen':() => {
        $(".updateUser").each(function () {
          this.reset();
        });
        $('#roleSelection').prop('selectedIndex',0);
          $('#zoneSelection').prop('selectedIndex',0);
       },
       /**
        * TODO:Complete JS doc
        * @param event
        */
       'click .view':(event) => {
        event.preventDefault();
        const id = event.currentTarget.id;
        const header = $('#userH');
        const firstName = $('#detailFirstName');
        const lastName = $('#detailLastName');
        const gender = $('#detailGender');
        const email = $('#detailEmailId');
        const roleN = $('#detailRole');
        const zoneN = $('#detailZone');
        const empcode = $('#detailEMPCode');
        const username = $('#detailUsername');
        const dateOfBirth = $('#detailDateOfBirth');
        $('#userDetailPage').modal();   
            const user= Meteor.users.findOne({_id:id}); 
           const rolesList = user.roles;
           const roleNames = [];
            for (let i = 0; i < rolesList.length; i++) {
             const roleName = Meteor.roles.find({_id:rolesList[i]}).fetch();
             roleNames.push(roleName[0].name);
            };
            const roleString = JSON.stringify(roleNames);
          //  roleString.replace (/"/g,''); 
          const roleArranged=  roleString.replace(/["[\]]/g,'');
           const zoneName = Zone.find({uuid:user.zone}).fetch();           
            $(header).html('Details of '  + $.trim(user.profile.firstName));
            $(firstName).html(user.profile.firstName);
            $(lastName).html(user.profile.lastName);
            $(gender).html(user.profile.gender);
            $(email).html(user.emails[0].address);
            $(roleN).html(roleArranged);
            $(zoneN).html(zoneName[0].name);
            $(empcode).html(user.profile.empCode);
            $(dateOfBirth).html(user.profile.dateOfBirth);
            $(username).html(user.username);
           
        
      }
     


});
