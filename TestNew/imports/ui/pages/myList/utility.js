/** 
 * @author jishnu
 */

/**
 * TODO: Complete JS doc 
 * @param user 
 */

createList = (user) => {
    Meteor.call('list.create', user, (err) => {
        if (err) {
            $('#categoryErrorModal').modal();
            $('#categoryErrorModal').find('.modal-body').text(err.reason);
        } else {
            $('#categorySuccessModal').find('.modal-body').text('Item Category registered successfully');
            $('#categorySuccessModal').modal();
            target.name.value = '';
            target.description.value = '';
        }
        $("textarea").css({ "width": "400px", "height": "150px" });
        $("#categoryAdd")[0].reset();
        $('#ic-create').modal('hide');
    })
}  