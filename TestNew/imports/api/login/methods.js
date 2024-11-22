/**
 * @author visakh
 */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

/**
  * TODO: Complete JS doc
  * @param id
  * @param firstname
  * @param lasname
  * @param username
  * @param password
  * @param email
  * @param dateOfBirth
  * @param gender
  */

Meteor.methods({ 

  'signup.create': (id, firstName, lastName, email, username, password, gender, dateOfBirth) => {
    const userId = Accounts.createUser({
      profile: {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dateOfBirth: dateOfBirth,
        isDeleted: false
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
      Accounts.sendVerificationEmail(userId);
      return Meteor.users.update(userId, { $set: { token: token } });
    };

  },

});
