/**
 * @author Visakh
 */

 Template.attendance_create.helpers({
   /**
    * TODO: Complete JS doc
    */
   location: () => { 
  return Geolocation.latLng();    
   },
 });
Template.attendance_create.events({
  /**
   * TODO:Complete JS doc
   */
  'click .closeAttendance':()=>{
    $('.attendance-add').each(function () {
      this.reset();
});
  },
  /**
   * TODO: Complete JS doc 
   * @param event
   */
  'submit .attendance-add': (event) => {   
    event.preventDefault();
    createAttendance(event.target);
  }
});
