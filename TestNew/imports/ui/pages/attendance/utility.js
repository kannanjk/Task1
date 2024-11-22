/**
 * @author Visakh
 */

/**
 * TODO: Complete JS doc
 * @param target
 */
createAttendance = (target) => {
  const myNewLocation = target.myNewLocation;
  const locLat = target.locLat;
  const locLng = target.locLng;

  Meteor.call('attendance.create', myNewLocation.value, locLat.value,locLng.value, (err) => {
    if (err) {  
      toastr["error"](err);
    }
    else {
      toastr["success"]('Attendance registered Successfully');
    }
    $('#ic-create').modal('hide');
  });
};
