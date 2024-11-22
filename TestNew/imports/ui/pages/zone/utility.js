/**
 * @author Subrata
 */

/**
 * TODO: Complete JS doc
 * @param target
 * @param id
 */
createOrUpdateZone = (target, id) => {
  const name = target.name;
  const description = target.description;
  const username = Meteor.user().username;

  Meteor.call('zone.createOrUpdate', id, name.value, description.value, username, (err) => {
    if (err) {  
      $('#zoneErrorModal').modal();
      $('#zoneErrorModal').find('.modal-body').text(err.reason);
    }
    else {
      $('#zoneSuccessModal').modal();
      target.name.value = '';
      target.description.value = '';
    }

    $('#zone-create').modal('hide');
  });
};
