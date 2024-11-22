/** 
 * @author Subrata
 */

/** 
 * TODO: Complete JS doc 
 * @param target
 * @param id
 */ 
createOrUpdateCategory = (target, id) => {
  const name = target.name;
  const description = target.description;
  const username = Meteor.user().username;

  Meteor.call('itemCategory.createOrUpdate', id, name.value, description.value, username, (err) => {
    if (err) {  
      $('#categoryErrorModal').modal();
      $('#categoryErrorModal').find('.modal-body').text(err.reason);
    }
    else {
      $('#categorySuccessModal').find('.modal-body').text('Item Category registered successfully');

      $('#categorySuccessModal').modal();
      target.name.value = '';
      target.description.value = '';
    }
    $("textarea").css({"width": "400px","height": "150px"});
    $("#categoryAdd")[0].reset();
    $('#ic-create').modal('hide');
  });
};
