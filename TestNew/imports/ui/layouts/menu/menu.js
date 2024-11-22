/**
 * @author Subrata
 */
import { Roles } from 'meteor/jalik:roles';
import { Config } from '../../../api/config/config';

Template.menu.onCreated(function () {

  const self = this;
  self.autorun(() => {
    self.subscribe('role.list');
    self.subscribe('user.list');

  });
});

Template.registerHelper('categoryName', () => {
  const config = Config.findOne({ name: 'categoryName' });
  if (config) return { category: config.value };
});

Template.registerHelper('userName', () => {
  const config = Config.findOne({ name: 'userName' });
  if (config) return { user: config.value };
});

Template.registerHelper('itemName', () => {
  const config = Config.findOne({ name: 'itemName' });
  if (config) return { item: config.value };
});

Template.registerHelper('appName', () => {
  const config = Config.findOne({ name: 'appName' });
  if (config) return { app: config.value };
});

Template.registerHelper('href', () => {
  const config = Config.findOne({ name: 'url' });
  if (config) return { href_url: config.value };
});

Template.registerHelper('logo', () => {
  const config = Config.findOne({ name: 'logo' });
  if (config) return { logo_img: config.value };
});

Template.registerHelper('roleName', () => {
  const config = Config.findOne({ name: 'roleName' });
  if (config) return { role: config.value };
});

Template.registerHelper('zoneName', () => {
  const config = Config.findOne({ name: 'zoneName' });
  if (config) return { zone: config.value };
});

Template.registerHelper('attendanceName', () => {
  const config = Config.findOne({ name: 'attendanceName' });
  if (config) return { attendance: config.value };
});

Template.registerHelper('userCan', function (permissions) {
  // const s= Roles.userCan(permissions);  
  const roleList = Meteor.user().roles;
  let userPermission = [];
  for (let i = 0; i < roleList.length; i++) {
    const roleArray = roleList[i];
    const roleCheck = Meteor.roles.find({ _id: roleArray }).fetch();
    $.each(roleCheck[0].permissions, function (key, val) {
      userPermission.push(val);
    });
  };
  const permisionCheck = $.inArray(permissions, userPermission);
  if (permisionCheck == -1) {
    return r;
  } else {
    return true;
  }


});


