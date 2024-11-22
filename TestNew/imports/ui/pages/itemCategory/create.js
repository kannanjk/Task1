/**
 * @author Subrata
 */

Template.itemCategory_create.events({
  /**
   * TODO: Complete JS doc
   * @param event
   */
  'submit .category-add': (event) => {
    event.preventDefault();
    createOrUpdateCategory(event.target);
  }
});
