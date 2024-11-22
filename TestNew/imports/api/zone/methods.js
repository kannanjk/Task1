/**
 * @author subrata
 */

import {Zone} from './zone';

Meteor.methods({

  /**
   * TODO: Complete JS doc 
   * @param id
   * @param name
   * @param description
   * @param username
   */
  'zone.createOrUpdate': (id, name, description, username) => {
    const zoneObject = {
      name: name.trim(),
      description: description,
      isDeleted: false
    };

    if (id) {
      const zone = Zone.findOne({_id: id});
      if (zone) {
        zone.updatedBy = username;
        zone.updatedAt = new Date();
        _.map(zoneObject, (value, key) => {
          zone[key] = value;
        });

        return Zone.update({_id: id}, zone);
      }
    }
    else {
      zoneObject.createdAt = new Date();
      zoneObject.createdBy = username;
      zoneObject.uuid = Random.id();

      return Zone.insert(zoneObject);
    }
  },

  /**
   * TODO: Complete JS doc
   * @param uuid
   */
  'zone.delete': (uuid) => {
    const zone = Zone.findOne({uuid: uuid.trim()});
    if (zone) {
      zone.isDeleted = true;
      Zone.update({_id: zone._id}, zone);
    }
  }
});
