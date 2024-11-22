/**
 * @author Visakh
 */



Meteor.methods({

  /**
   * TODO: Complete JS doc
   * @param id
   * @param name
   * @param description
   * @param userView
   * @param userUpdate
   * @param userCreate
   * @param userDelete
   * @param itemCategoryView
   * @param itemCategoryUpdate
   * @param itemCategoryCreate
   * @param itemCategoryDelete
   * @param roleView
   * @param roleUpdate
   * @param roleCreate
   * @param roleDelete
   * @param attendanceView
   * @param attendanceCreate
   * @param zoneView
   * @param zoneUpdate
   * @param zoneCreate
   * @param zoneDelete
   */
  'role.createOrUpdate': (id, name,description, userView, userUpdate, userCreate, userDelete,
     itemCategoryView, itemCategoryUpdate, itemCategoryCreate, itemCategoryDelete,
     roleView, roleUpdate,roleCreate,roleDelete,
  attendanceView,attendanceCreate,zoneView, zoneUpdate, zoneCreate, zoneDelete) => {
  
    // permission checking
    const permission = [];
    if (userView === true) {
      permission.push('userView');
    };
    if (userUpdate === true) {
      permission.push('userUpdate');
    };
    if (userCreate === true) {
      permission.push('userCreate');
    };
    if (userDelete === true) {
      permission.push('userDelete');
    };
    if (itemCategoryView === true) {
      permission.push('itemCategoryView');
    };
    if (itemCategoryUpdate === true) {
      permission.push('itemCategoryUpdate');
    };
    if (itemCategoryCreate === true) {
      permission.push('itemCategoryCreate');
    };
    if (itemCategoryDelete === true) {
      permission.push('itemCategoryDelete');
    };
    if (roleCreate === true) {
      permission.push('roleCreate');
    };
    if (roleUpdate === true) {
      permission.push('roleUpdate');
    };
    if (roleView === true) {
      permission.push('roleView');
    };
    if (roleDelete === true) {
      permission.push('roleDelete');
    };
    if (attendanceCreate === true) {
      permission.push('attendanceCreate');
    };
    if (attendanceView === true) {
      permission.push('attendanceView');
    };    
    if (zoneView === true) {
      permission.push('zoneView');
    };
    if (zoneUpdate === true) {
      permission.push('zoneUpdate');
    };
    if (zoneCreate === true) {
      permission.push('zoneCreate');
    };
    if (zoneDelete === true) {
      permission.push('zoneDelete');
    };
      if (id) {      

        return Meteor.roles.update({ _id: id },{$set:{
          name: name.trim(),
          description:description,        
            permissions: permission,
            updatedAt : new Date(),
            updatedBy : Meteor.user().username
        }
      });
      }
     else {
      
     return Meteor.roles.insert({
        name: name.trim(),
      description:description,        
        permissions: permission,
        createdAt : new Date(),
        isDeleted : false,
    createdBy : Meteor.user().username,
      uuid : Random.id()
      }); 
    }
  },

  /**
   * TODO: Complete JS doc
   * @param uuid
   */
  'role.delete': (id) => {
    const roles = Meteor.roles.findOne({
      _id: id.trim()
    });
    if (roles) {  
      roles.isDeleted = true;      
      return Meteor.roles.update({
        _id: roles._id
      }, roles);
    }
  }
});