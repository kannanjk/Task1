/**
 * @author Subrata
 */

import { ItemCategory } from "../../../api/itemCategory/itemCategory";
import { Item } from "../../../api/item/item";


Template.itemCategories.onCreated(function () {
  this.pagination = new Meteor.Pagination(ItemCategory, {
    filters: { isDeleted: false },
    sort: { name: 1 },
    perPage: 25
  });
  
  const self = this;
  self.autorun(() => {
  });
});

Template.itemCategories.helpers({

  /**
   * TODO: Complete JS doc
   * @returns {{collection, acceptEmpty, substitute, eventType}}
   */
  optionsHelper: () => {
    return globalOptionsHelper(itemCateogryCollectionName);
  },

  /**
   * TODO: Complete JS doc
   * @returns {{collection: *, acceptEmpty: boolean, substitute: string, eventType: string}}
   */
  optionsHelperWithTextArea: () => {
    const config = globalOptionsHelper(itemCateogryCollectionName);
    config.textarea = true;

    return config;
  },

  /**
   * TODO: Complete JS doc
   * @returns {any | *}
   */
  isReady: function () {
    return Template.instance().pagination.ready();
  },

  /**
   * TODO: Complete JS doc
   * @returns {Meteor.Pagination}
   */
  templatePagination: function () {
    return Template.instance().pagination;
  },

  /**
   * TODO: Complete JS doc
   * @returns {*}
   */
  categories: function () {
    const a = Template.instance().pagination.getPage();
    console.log(a);
    return Template.instance().pagination.getPage();
  },

  /**
   * TODO: Complete JS doc
   * @returns {Function}
   */
  handlePagination: function () {
    return function (e, templateInstance, clickedPage) {
      e.preventDefault();
      console.log('Changing page from ', templateInstance.data.pagination.currentPage(), ' to ', clickedPage);
    };
  },

  /**
   * TODO: Complete JS doc
   */
  sortIcon: () => {
    genericSortIcons();
  },

  /**
   * TODO: Complete JS doc
   * @param categoryUuid
   */
  totalItems: (categoryUuid) => {
    if (categoryUuid && $.trim(categoryUuid)) {
      return Item.find({ cateogry: $.trim(categoryUuid) }).count();
    }
  }
});

Template.itemCategories.events({
  /**
   * TODO: Complete JS doc
   * @param event
   */
  'submit .category-filter': (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const description = event.target.description.value;

    if (name && $.trim(name) && description && $.trim(description)) {
      Template.instance().pagination.settings.set('filters',
        {
          name: {
            $regex: new RegExp($.trim(name), "i")
          },
          description: {
            $regex: new RegExp($.trim(description), "i")
          },
          isDeleted: false
        }
      );
    }
    else if (name && $.trim(name)) {
      Template.instance().pagination.settings.set('filters', {
        name: { $regex: new RegExp($.trim(name), "i") },
        isDeleted: false
      });
    }
    else if (description && $.trim(description)) {
      Template.instance().pagination.settings.set('filters', {
        description: {
          $regex: new RegExp($.trim(description), "i")
        },
        isDeleted: false
      });
    }
    else {
      Template.instance().pagination.settings.set('filters', { isDeleted: false });
    }
  },
  /**
   * TODO: Compelete JS doc
   */
  'click #ic-create-button': () => {
    $("#ic-create").modal();
  },
  /**
   * TODO: Complete JS doc
   */
  'click .reset': () => {
    Template.instance().pagination.settings.set('filters', { isDeleted: false });
    $('form :input').val("");
  },
  /**
   * TODO: Complete JS doc
   * @param event
   */
  'click .remove': (event) => {
    event.preventDefault();
    const header = $('#categoryHeader');
    const categoryName = $('#confCategoryName');
    const categoryNameDup = $('#categoryNameDup');
    const categoryTotal = $('#categoryTotal');
    const confirmedUuid = $('#confirmedUuid');
    $('#categoryDelConfirmation').modal();
    const uuid = event.currentTarget.attributes.id.value;
    const name = $('#name_' + uuid).val();
    const items = Item.find({ category: $.trim(uuid) }).count();
    $(header).html('Confirm Deletion Of ' + $.trim(name));
    $(categoryName).html(name);
    $(categoryNameDup).html(name);
    $(categoryTotal).html(items);
    $(confirmedUuid).val(uuid);
  },
  /**
   * TODO: Complete JS doc
   * @param event
   */
  'click #categoryRemove': (event) => {
    event.preventDefault();
    const uuid = $('#confirmedUuid').val();
    if (uuid && $.trim(uuid)) {
      Meteor.call('itemCategory.delete', $.trim(uuid), (error) => {
        if (error) {
          $('#message').html("Internal error - unable to remove entry. Please try again");
        } else {
          $('#categorySuccessModal').find('.modal-body').text('Item Category deleted successfully');
          $('#categorySuccessModal').modal();
        }
        $("#categoryDelConfirmation").modal('hide');
      });
    }
  }

});
