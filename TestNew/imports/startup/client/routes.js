/**
 * @author Subrata
 */

import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

currentPath = '/';

/**
 * Secured route definition for most of the navigation
 */
const secureRoute = FlowRouter.group({
  name: 'secure-route',
  triggersEnter: [
    checkAuthentication
  ]
});

/**
 * Public routing for few non secured pages
 */
const publicRoute = FlowRouter.group({
  name: 'public-route'
});


function checkAuthentication() {
  const path = FlowRouter.current().path;
  if (path.indexOf('/login') === -1) {
    currentPath = path;
    if (!Meteor.userId()) {
      FlowRouter.go('login');
      // BlazeLayout.render('main', {name: 'login_view'});        
    }
    else {
      FlowRouter.redirect(currentPath);
    }
  } 
} 

secureRoute.route('/', {
  name: 'home',
  action: () => {
    FlowRouter.redirect('/itemCategory/list');
  }
});

publicRoute.route('/login', {
  name: 'login', 
  action: () => {
    BlazeLayout.render('main', { name: 'login_view' });
  }
});

publicRoute.route('/signup', {
  name: 'signup',
  action: () => {
    BlazeLayout.render('main', { name: 'signup_create' });
  }
});

publicRoute.route('/signout', {
  name: 'signout',
  action: () => {
    Meteor.logout(() => {
      FlowRouter.redirect('/login');
    });
  }
});

publicRoute.route('/login/forgetPassword', {
  name: 'forgetPassword',
  action: () => {
    BlazeLayout.render('main', { name: 'forgetPassword' });
  }
});

publicRoute.route('/resetPassword/:token', {
  name: 'resetPassword',
  action: (params) => {
    Session.set('resetPasswordToken', params.token);
    BlazeLayout.render('main', { name: 'resetPassword' });
  }
});

publicRoute.route('/verifyEmail/:token', {
  name: 'verifyEmail',
  action: (params) => {
    Session.set('verifyEmailToken', params.token);
    BlazeLayout.render('main', { name: 'verifyEmail' });
  }
});

secureRoute.route('/itemCategory/list', {
  name: 'itemCategories',
  action: () => {
    BlazeLayout.render('main', { name: 'itemCategories' });
  }
});

// jishnu 
secureRoute.route('/myList', {
  name: 'myList',
  action: () => {
    BlazeLayout.render('main', { name: 'myList' }); 
  }
});


secureRoute.route('/user/list', {
  name: 'user',
  action: () => {
    BlazeLayout.render('main', { name: 'user' });
  }
});

secureRoute.route('/user/create', {
  name: 'user.create',
  action: () => {
    BlazeLayout.render('main', { name: 'user_create' });
  }
});

secureRoute.route('/profile/update', {
  name: 'profile.update',
  action: () => {
    BlazeLayout.render('main', { name: 'update_profile' });
  }
});

secureRoute.route('/role/list', {
  name: 'role',
  action: () => {
    BlazeLayout.render('main', { name: 'role_list' });
  }
});

secureRoute.route('/role/create', {
  name: 'role.create',
  action: () => {
    BlazeLayout.render('main', { name: 'role_create' });
  }
});

secureRoute.route('/attendance/list', {
  name: 'attendance',
  action: () => {
    BlazeLayout.render('main', { name: 'attendance' });
  }
});

secureRoute.route('/attendance/create', {
  name: 'attendance.create',
  action: () => {
    BlazeLayout.render('main', { name: 'attendance_create' });
  }
});

secureRoute.route('/zone/list', {
  name: 'zone.list',
  action: () => {
    BlazeLayout.render('main', { name: 'zones' });
  }
});

publicRoute.notFound = {
  action() {
    BlazeLayout.render('main', { name: 'notFound' });
  },
};
