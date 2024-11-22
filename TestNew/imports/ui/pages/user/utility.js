/**
 * @author Visakh
 */

/**
 * TODO: Complete JS doc
 * @param target
 * @param id
 */
createOrUpdateUser = (target, roleArray) => {
  const firstName = target.firstName;
  const lastName = target.lastName;
  const email = target.email;
  const username = target.username;
  const password = target.password;
  const gender = target.gender;
  const dateOfBirth = target.dateOfBirth;  
  const empCode = target.empCodes;    
  const zoneName = target.zoneName;  
  
      return Meteor.call('user.create', firstName.value, lastName.value, email.value, 
      username.value, password.value, gender.value, dateOfBirth.value, empCode.value, roleArray, zoneName.value, (error, result) => {
        if (error) {         
        $('#userErrorModal').find('.modal-body').text(err.reason);
          $('#userErrorModal').modal();
          
        }
        else {
          $('#ic-create').modal('hide');         
          $("#userAdd")[0].reset();
          $('#roleSelection').val(null).trigger('change');
          $('#zoneSelection').prop('selectedIndex',0);
         $('#userSuccessModal').find('.modal-body').text('User has been registered successfully');
          $('#userSuccessModal').modal();
        }

      });
    
  
  },
  /**
 * TODO: Complete JS doc
 * @param target
 */
updateUserlist = (target,roleArray) => {
  const firstName = target.firstName;
   const lastName = target.lastName;
  const email = target.email;
  const username = target.username;
  const password = target.password;  
  const dateOfBirth = target.dateOfBirth;  
  const hiddenemail = target.hiddenemail;
  const gender = target.genders;
  const isDeleted = target.isDeleted;
  const id = target.id;  
  const empCode = target.empCode;    
  const zoneId = target.zoneNameUpdated;   
  
      return Meteor.call('user.updateUser', id.value, firstName.value, lastName.value, dateOfBirth.value, username.value, email.value, hiddenemail.value,  password.value, gender.value, empCode.value, roleArray, zoneId.value, (error, result) => {
        if (error) {
          $('#userErrorModal').find('.modal-body').text(err.reason);
          $('#userErrorModal').modal();
        }
        else {
          $('#userEditPage').modal('hide');       
          $('.updateUser').each(function () {
            this.reset();
          });
          $('#roleSelection').val(null).trigger('change');
        $('#userSuccessModal').find('.modal-body').text('User has been updated successfully');
          $('#userSuccessModal').modal();

        }

      
      });
}

