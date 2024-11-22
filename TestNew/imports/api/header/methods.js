/**
 * @author Visakh
 */
Meteor.methods({
  /**
   * @param id
   * @param imageData
   * @param firstName
   * @param lastName
   * @param gender
   * @param dateOfBirth
   */
  'profile.updateProfile': (id, imageData, firstName, lastName, gender, dateOfBirth) => {
    const userObject = {
      profile: {
        image: imageData,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dateOfBirth: dateOfBirth
      },
    };
    if (id) {
      const user = Meteor.users.findOne({ _id: id });
      if (user) {
        user.updatedBy = Meteor.user().username;
        user.updatedAt = new Date();
        _.map(userObject, (value, key) => {
          user[key] = value;
        });

        return Meteor.users.update({ _id: id }, user);
      }
    }


  }
});
