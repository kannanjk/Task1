/**
 * @author Visakh
 */

/**
 * TODO: Complete JS doc
 * @param target
 * @param id
 */
createRole = (target, id) => {
  const name = target.name;
  const description = target.description;
  const userView = target.user_view;
  const userUpdate = target.user_update;
  const userCreate = target.user_create;
  const userDelete = target.user_delete;
  const itemCategoryView = target.itemCategory_view;
  const itemCategoryUpdate = target.itemCategory_update;
  const itemCategoryCreate = target.itemCategory_create;
  const itemCategoryDelete = target.itemCategory_delete;
  const roleView = target.role_view;
  const roleUpdate = target.role_update;
  const listCreate = target.listCreate;
  const roleCreate = target.role_create;
  const roleDelete = target.role_delete;
  const attendanceView = target.attendance_view;
  const attendanceCreate = target.attendance_create;
  const zoneView = target.zone_view;
  const zoneUpdate = target.zone_update;
  const zoneCreate = target.zone_create;
  const zoneDelete = target.zone_delete;
  Meteor.call('role.createOrUpdate', id, name.value, description.value, userView.checked, userUpdate.checked,
    userCreate.checked, userDelete.checked, itemCategoryView.checked, itemCategoryUpdate.checked,
    itemCategoryCreate.checked, itemCategoryDelete.checked, roleView.checked,
    roleUpdate.checked, roleCreate.checked, listCreate.checked, roleDelete.checked,
    attendanceView.checked, attendanceCreate.checked,
    zoneView.checked, zoneUpdate.checked, zoneCreate.checked, zoneDelete.checked, (err) => {
      if (err) {
        $('#roleErrorModal').find('.modal-body').text(err.reason);
        $('#roleErrorModal').modal();
      }
      else {
        $('#ic-create').modal('hide');
        $("#roleAdd").each(function () {
          this.reset();
          $("#roleName").css({ "color": "black", "border": " 1px solid #00c0ef" });
          $("#roleSubmit").prop('disabled', false);
        });
        $('#roleSuccessModal').find('.modal-body').text('Role has been registered successfully');
        $('#roleSuccessModal').modal();
      }
    });
};
/**
 * TODO: Complete JS doc
 * @param target
 */
updateRole = (target) => {
  const id = target._idRole;
  const name = target.name;
  const description = target.description;
  const userView = target.user_view;
  const userUpdate = target.user_update;
  const userCreate = target.user_create;
  const userDelete = target.user_delete;
  const itemCategoryView = target.itemCategory_view;
  const itemCategoryUpdate = target.itemCategory_update;
  const itemCategoryCreate = target.itemCategory_create;
  const itemCategoryDelete = target.itemCategory_delete;
  const roleView = target.role_view;
  const roleUpdate = target.role_update;
  const roleCreate = target.role_create;
  const roleDelete = target.role_delete;
  const attendanceView = target.attendance_view;
  const attendanceCreate = target.attendance_create;
  const zoneView = target.zone_view;
  const zoneUpdate = target.zone_update;
  const zoneCreate = target.zone_create;
  const zoneDelete = target.zone_delete;
  Meteor.call('role.createOrUpdate', id.value, name.value, description.value, userView.checked, userUpdate.checked,
    userCreate.checked, userDelete.checked, itemCategoryView.checked, itemCategoryUpdate.checked,
    itemCategoryCreate.checked, itemCategoryDelete.checked, roleView.checked,
    roleUpdate.checked, roleCreate.checked, roleDelete.checked,
    attendanceView.checked, attendanceCreate.checked,
    zoneView.checked, zoneUpdate.checked, zoneCreate.checked, zoneDelete.checked, (err) => {
      if (err) {
        $('#roleErrorModal').find('.modal-body').text(err.reason);
        $('#roleErrorModal').modal();
      }
      else {
        $('#ic-edit').modal('hide');
        $('.role-edit').each(function () {
          this.reset();
        });
        $('#roleSuccessModal').find('.modal-body').text('Role has been updated successfully');
        $('#roleSuccessModal').modal();
      }


    });
};