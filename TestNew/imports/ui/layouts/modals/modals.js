/**
 * @author Subrata
 */

Template.successModal.helpers({
  /**
   * TODO: Complete JS doc
   * @param id
   * @returns {*}
   */
  generateId: (id) => {
    return collectId(id, 'successModal');
  }
});

Template.errorModal.helpers({
  /**
   * TODO: Complete JS doc
   * @param id
   * @returns {*}
   */
  generateId: (id) => {
    return collectId(id, 'errorModal');
  }
});

/**
 * TODO: Complete JS doc
 * @param id
 * @param defaultId
 * @returns {*}
 */
function collectId(id, defaultId) {
  let modalId = defaultId;
  if (id && $.trim(id)) {
    modalId = $.trim(id);
  }

  return modalId;
}