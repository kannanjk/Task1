/**
 * @author Visakh
 */
/**
 * TODO: Complete JS doc
 * @param target 
 */
updateLoginUser = (target) => {
  const id = Meteor.userId();
  const imageData = Meteor.user().profile.image;
  const firstName = target.firstName;
  const lastName = target.lastName;
  const gender = Meteor.user().profile.gender;
  const dateOfBirth = target.dateOfBirth;
  if (target.dateOfBirth.value.match(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/)) {
    return Meteor.call('profile.updateProfile', id, imageData, firstName.value, lastName.value, gender, dateOfBirth.value, (error, result) => {
      if (error) {
        toastr["error"]('Error: ' + error.reason);
      }
      else {
        $('.buttonDisabled').prop('disabled', true);
        toastr["success"]("Profile updated successfully");
      }
    });
  } else {
    toastr["error"]("Please Check Date Of Birth format");
  }

},
  /**
   * TODO: Complete JS doc
   * @param target
   */
  changePassword = (target) => {
    const newPassword = target.password;
    const oldPassword = target.oldPassword;
    return Accounts.changePassword(oldPassword.value, newPassword.value, (error, result) => {
      if (error) {
        toastr["error"]('Error: ' + error.reason);
      }
      else {
        $('form :input:password').val("");
        $('.buttonDisabled').prop('disabled', true);

        toastr["success"]("Password changed successfully");

      }
    });
  };
