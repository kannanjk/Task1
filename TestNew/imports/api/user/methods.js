/**
 * @author Visakh
 */

import { allUsers } from './user';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/jalik:roles';

Meteor.methods({
  /**
  * TODO: Complete JS doc
  * @param firstname
  * @param lasname
  * @param username
  * @param password
  * @param email
  * @param dateOfBirth
  * @param gender
  * @param empCode
  * @param roleArray
  * @param zoneName
  */
  'user.create': (firstName, lastName, email, username, password, gender, dateOfBirth, empCode, roleArray, zoneName) => {
    const userId = Accounts.createUser({
      profile: {
        empCode: empCode, firstName: firstName,
        lastName: lastName, gender: gender, dateOfBirth: dateOfBirth, isDeleted: false,
        image: ''
      },
      email: email,
      username: username,
      password: password,
      createdAt: new Date(),
      createdBy: username

    });
    // return userId;
    if (userId) {
      const token = Accounts._generateStampedLoginToken().token;
      Meteor.setTimeout(function () { Accounts.sendVerificationEmail(userId); }, 1000);
      // Set user's role    
      return Meteor.users.update(userId, { $set: { token: token, zone: zoneName, roles: roleArray } });
    };

  },
  /**
 * TODO: Complete JS doc
 * @param id
 * @param firstName
 * @param lastName
 * @param dateOfBirth
 * @param username
 * @param email
 * @param hiddenemail
 * @param password
 * @param gender
 * @param empCode
 * @param roleArray
 * @param zoneName
 */
  'user.updateUser': (id, firstName, lastName, dateOfBirth, username,
    email, hiddenemail, password, gender, empCode, roleArray, zoneName) => {

    Meteor.users.update({ _id: id }, {
      $set:
      {
        profile:
        {
          image: Meteor.users.findOne({ _id: id }).profile.image,
          empCode: empCode,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          dateOfBirth: dateOfBirth,
          isDeleted: false
        },
        username: username,
        roles: roleArray,
        zone: zoneName

      }
    });
    const oldEmail = hiddenemail;
    Meteor.users.update({ _id: id, 'emails.0.address': oldEmail }, {
      $set:
        { 'emails.0.address': email }
    });
    // Update password
    if (password != '') {
      Accounts.setPassword(id, password);
    }
    return true
  },
  /**
 * TODO: Complete JS doc
 * @param _id
 */
  'user.delete': (_id) => {
    const AllUsers = allUsers.findOne({ _id: _id.trim() });
    if (AllUsers) {
      AllUsers.profile.isDeleted = true;
      allUsers.update({ _id: AllUsers._id }, AllUsers);
    }

  }

});
