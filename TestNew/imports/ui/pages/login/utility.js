/**
 * @author visakh
 */

/**
 * TODO: Complete JS doc
 * @param target
 * @param id
 */
createOrUpdateSignup = (target, id) => {
  const firstName = target.firstName;
  const lastName = target.lastName;
  const email = target.email;
  const username = target.username;
  const password = target.password; 
  const gender = target.gender;
  const dateOfBirth = target.dateOfBirth; 

  if (target.password.value === target.confirmPassword.value) {
    if (target.dateOfBirth.value.match(/^(0[1-9]|[12][0-9]|3[01])[\- \/.](?:(0[1-9]|1[012])[\- \/.](19|20)[0-9]{2})$/)) {
      return Meteor.call('signup.create', id, firstName.value, lastName.value, email.value, username.value, password.value, gender.value, dateOfBirth.value, 'normal', (error, result) => {
        if (error) {
          toastr['error']('Error: ' + error.reason);
        }
        else {
          $('#ic-create').modal('hide');
          FlowRouter.go('login');
          $('.signup-add').each(function () {
            this.reset();
          });
          toastr["success"]("Registration completed.Please Login to continue");
        }

      });
    }
    else {
      toastr["error"]("Please Check Date Of Birth format");
    }
  }
  else {

    toastr["error"]("Password & Confirm password does not match");

  }
};

/**
 * TODO: Complete JS doc
 * @param target
 */
loginUser = (target) => {
  const username = target.username;
  const password = target.password;

  return Meteor.loginWithPassword(username.value, password.value, (error) => {
    if (error) {
      toastr["error"]('Error: Invalid User Credentials');
    }
    else {     
      if(Meteor.user().profile.isDeleted === false){
        if (Meteor.user().emails[0].verified === true) {
            FlowRouter.redirect(currentPath);
               // return true;
           } else  {
                  Meteor.logout();
                    toastr["error"]('email-not-verified', 'You must verify your email address before you can log in');
                }
    }
     else  {
           Meteor.logout();
             toastr["error"]('Account Suspended', 'Your account has been suspended');
         }

    }
  });
};

/**
 * TODO: Complete JS doc
 * @param target
 */
forgetEmail = (target) => {
  const email = target.email;
  return Accounts.forgotPassword({email: email.value}, (error) =>{
    if(error){
      toastr["error"]('Error:'+ error.reason);
    }else{
        $('.forget_email').find('input:text').val('');
      toastr["success"]("Success");
    }
  });
};
