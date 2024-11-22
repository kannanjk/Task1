/**
 * @author Visakh
 */
import {Meteor} from 'meteor/meteor';
import {Zone} from '../../../api/zone/zone';

Template.user_create.onRendered(function() {
  $('.select2-dropdown').select2({  
    placeholder: "Select roles",
       tokenSeparators: [',', ' '],
       allowClear: true
  });
});
Template.user_create.onCreated(function () {
  Meteor.subscribe('role.list'); 
  Meteor.subscribe('zone.list'); 

});

Template.user_create.helpers({
  /**
   * TODO: Complete JS doc
   * @returns {rolelist}
   */
  roles_list: function() {    
   return  Meteor.roles.find({'isDeleted':false}).fetch();

},
/**
 * TODO: Complete JS doc
 */
zones_list: function(){
 return Zone.find({'isDeleted':false}).fetch();
},
/**
 * TODO: Complete JS doc
 */
date: function(){
  return new Date();
}


});
Template.user_create.events({
  /**
   * TODO: Complete JS doc
   */
  'click .date':function(){        
    
  },
  /**
   * TODO:Complete JS doc
   */
  'click .toggle-password':() =>{
    $('.toggle-password').toggleClass("fa-eye fa-eye-slash");
    let input = $($('.toggle-password').attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  },
  /**
   * TODO: Complete JS doc
   */
  'focus #password':() =>{
    $('div.hint').show();
    $(document).bind('focusin.hint click.hint', function (e) {
      if ($(e.target).closest('.hint, #password').length) return;
      $(document).unbind('.hint');
      $('div.hint').fadeOut('medium');
    });
  },
  /**
   * TODO: Complete JS doc
   */
 'blur #password':()=>{
  $('div.hint').hide();
 },
 /**
  * TODO: Complete JS doc
  */
 'blur #email':()=>{
  let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  let emailaddress = $("#email").val();
  if (!emailReg.test(emailaddress))
    $("#emailspan").html('<font color="#fc5f5f" size="2">Please enter valid email address</font>');
  else
    $("#emailspan").html('<font color="#fc5f5f"></font>');
 },
/**
 * TODO:Complete JS doc
 */
'blur #password':()=>{
  let passwordReg = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})?$/;
  let passwordaddress = $("#password").val();
  if (!passwordReg.test(passwordaddress))
    $("#passwordspan").html('<font color="#fc5f5f" size="2">Please enter valid password</font>');

  else
    $("#passwordspan").html('<font color="#fc5f5f"></font>');
},
/**
 * TODO:Complete JS doc
 */
'blur #confirmPassword':()=>{
  let pass = $("#password").val();
  let confirmpass = $("#confirmPassword").val();
  if (confirmpass != pass) {
    $("#confirmPasswordspan").html('<font color="#fc5f5f" size="2">Those passwords didn&apos;t match. Try again !</font>');

  } else {
    $("#confirmPasswordspan").html('<font color="#fc5f5f"></font>');

  }
},
 /**
   * TODO: Complete JS doc
  */
  'click .closeUser':() => {
   $('#userAdd').each(function () {
          this.reset();
  });
  $('#zoneSelection').prop('selectedIndex',0);
  $('#roleSelection').val(null).trigger('change');
  },
 /**
  * TODO: Complete JS doc
  * @param event
  */
  'submit .user-add': (event) => {
    event.preventDefault();
    const rolesArray = [];
    // const data = $('#roleSelection').find(':selected');  
    $('#roleSelection :selected').each(function() {
      rolesArray.push($(this).val());
  });  
  if (rolesArray.length <= 0) {
    $("#rolesArrayspan").html('<font color="#fc5f5f" size="2">Please select a role</font>');
     } else {    
    $("#rolesArrayspan").html('<font color="#fc5f5f"></font>');
    createOrUpdateUser(event.target, rolesArray);   
  }
  }
});
