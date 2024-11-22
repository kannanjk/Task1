/**
 * @author Visakh
 */

import { Attendance } from './attendance';


Meteor.methods({
  /**
   * TODO:Complete JS doc
   * @param location
   */
  'getLocation': (location) => {
    // Reverse
    let geo = new GeoCoder({
      geocoderProvider: 'google',
      httpAdapter: 'https',
      apiKey: 'AIzaSyDRV2o542ZtP34GvSpNvATPMNvCglAPRVg'
    });
    return geo.reverse(location.lat, location.lng);
  },


  /**
   * TODO: Complete JS doc
   * @param firstName
   * @param userId
   * @param username
   * @param myNewLocation
   * @param locLat 
   * @param locLng
   */
  'attendance.create': (firstName, userId, username, myNewLocation, locLat, locLng) => {
    const attendanceObject = {
      registeredBy: firstName,
      userId: userId,
      location: myNewLocation,
      coordinates: { lat: locLat, lng: locLng }
    };

    if (myNewLocation) {

      attendanceObject.registeredAt = new Date();
      attendanceObject.createdAt = new Date();
      attendanceObject.createdBy = username;
      attendanceObject.uuid = Random.id();
      
      return Attendance.insert(attendanceObject);
    }
  },


});