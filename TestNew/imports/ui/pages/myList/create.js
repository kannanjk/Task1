/**
 * @author jishnu
 */

Template.listCreate.events({
    /**
     * TODO: Complete JS doc
     * @param event
     */ 
    'submit .category-add': (event) => {
        event.preventDefault();
        const user = {
            name: event.target.name.value,
            place: event.target.place.value,
            contact: event.target.contact.value,
            id: event.target.id.value,
            password: event.target.password.value
          }
        createList(user)
    }
});
