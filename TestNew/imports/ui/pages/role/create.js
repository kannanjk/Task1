/**
 * @author Visakh
 */
import{Meteor} from "meteor/meteor";
import {roles} from "../../../api/role/role";

Template.role_create.helpers({
  /**
   * TODO: Complete JS doc
   * @returns {rolelist}
   */
  roles_list: function() {    
    return  Meteor.roles.find({'isDeleted':false}).fetch();
 
 }
});
Template.role_create.events({
  /**
   * TODO:Complete JS doc
   */
  'blur #roleName':()=>{
    let roleName = $("#roleName").val();
    const role= Meteor.roles.find({name:$.trim(roleName)}).count();
     if (role == 1) {
      $("#roleName").css({"color":"red","border":"1px solid red"});
      $("#roleNamespans").html('<font color="#fc5f5f" size="2">Name <font weight="bold" size="2">'+ roleName + ' </font> already exits</font>');
      $("#roleSubmit").prop('disabled', true);
  }else{
    $("#roleName").css({"color":"black","border":" 1px solid #00c0ef"});
    $("#roleNamespans").html('<font color="#fc5f5f"></font>');
    $("#roleSubmit").prop('disabled', false);

  }
  },
  /**
 * TODO:Complete JS doc
 */
  'click #userscheck':()=>{
    if ($("#userscheck").prop("checked") == true) {
    $("#userschecking").prop('checked', true);     
     $("#userscheckin").prop('checked', true);
    $("#userschecki").prop('checked', true);
    $("#userscheckings").prop('checked', true);
    }else{
    $("#userschecking").prop('checked', false);     
    $("#userscheckin").prop('checked', false);
    $("#userschecki").prop('checked', false);
    $("#userscheckings").prop('checked', false);
    }
      },
  /**
 * TODO:Complete JS doc
 */
'click #itemCategorycheck' :()=>{
  if ($("#itemCategorycheck").prop("checked") == true) {
  $("#itemCategorychecking").prop('checked', true);
  $("#itemCategorycheckin").prop('checked', true);
  $("#itemCategorychecki").prop('checked', true);
  $("#itemCategorycheckings").prop('checked', true);
  }else{
    $("#itemCategorychecking").prop('checked', false);
    $("#itemCategorycheckin").prop('checked', false);
    $("#itemCategorychecki").prop('checked', false);
    $("#itemCategorycheckings").prop('checked', false);
  }
},
/**
 * TODO:Complete JS doc
 */
'click #rolecheck':()=>{
  if ($("#rolecheck").prop("checked") == true) {

  $("#rolechecking").prop('checked', true);
  $("#rolecheckin").prop('checked', true);
  $("#rolechecki").prop('checked', true);
  $("#rolecheckings").prop('checked', true);
  }else{
    $("#rolechecking").prop('checked', false);
  $("#rolecheckin").prop('checked', false);
  $("#rolechecki").prop('checked', false);
  $("#rolecheckings").prop('checked', false);
  }
},
/**
 * TODO:Complete JS doc
 */
'click  #attendancecheck':()=>{
  if ($("#attendancecheck").prop("checked")== true) {
    $("#attendancechecking").prop('checked', true);
    $("#attendancecheckin").prop('checked', true);
  }else{
    $("#attendancechecking").prop('checked', false);
    $("#attendancecheckin").prop('checked', false);
  }

},
/**
 * TODO:Complete JS doc
 */
'click #zonecheck':()=>{
  if ($("#zonecheck").prop("checked") == true) {

  $("#zonechecking").prop('checked', true);
  $("#zonecheckin").prop('checked', true);
  $("#zonechecki").prop('checked', true);
  $("#zonecheckings").prop('checked', true);
  }else{
    $("#zonechecking").prop('checked', false);
  $("#zonecheckin").prop('checked', false);
  $("#zonechecki").prop('checked', false);
  $("#zonecheckings").prop('checked', false);
  }
},
 /**
  * TODO:Complete JS doc
  */
 'change .userSelections':()=>{
  if($(".userSelections").length == $(".userSelections:checked").length)
  $("#userscheck").prop('checked', true);
else
  $("#userscheck").prop('checked', false);
 },
  /**
  * TODO:Comlete JS doc
  */
 'change .itemCategorySelections':()=>{
  if($(".itemCategorySelections").length==$(".itemCategorySelections:checked").length)
  $("#itemCategorycheck").prop('checked', true);
else
  $("#itemCategorycheck").prop('checked', false);
 },
 /**
  * TODO:Comlete JS doc
  */
 'change .roleSelections':()=>{
  if($(".roleSelections").length==$(".roleSelections:checked").length)
  $("#rolecheck").prop('checked', true);
else
  $("#rolecheck").prop('checked', false);
 },
  /**
  * TODO:Comlete JS doc
  */
 'change .attendanceSelections':()=>{
  if($(".attendanceSelections").length==$(".attendanceSelections:checked").length)
  $("#attendancecheck").prop('checked', true);
else
  $("#attendancecheck").prop('checked', false);
 },
   /**
  * TODO:Comlete JS doc
  */
 'change .zoneSelections':()=>{
  if($(".zoneSelections").length==$(".zoneSelections:checked").length)
  $("#zonecheck").prop('checked', true);
else
  $("#zonecheck").prop('checked', false);
 },

    /**
        * TODO: Complete JS doc
        */
       'click .closeRole':() => {
        $("#roleAdd").each(function () {
          this.reset();       
          $("#roleName").css({"color":"black","border":" 1px solid #00c0ef"});
        $("#roleSubmit").prop('disabled', false);
        });
       
       },
  /**
   * TODO: Complete JS doc
   * @param event
   */
  'submit .role-add': (event) => {
    event.preventDefault();
    createRole(event.target);
  }
});
