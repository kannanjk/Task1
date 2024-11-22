/**
 * @author Subrata
 */

Template.zone_create.events({
  /**
   * TODO: Complete JS doc
   * @param event
   */
  'submit .zone-add': (event) => {
    event.preventDefault();
    createOrUpdateZone(event.target);
  }
});
