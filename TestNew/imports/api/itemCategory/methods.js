/**
 * @author Subrata
 */

import {ItemCategory} from './itemCategory';
import {Item} from '../item/item';

Meteor.methods({
 
  /** 
   * TODO: Complete JS doc 
   * @param id
   * @param name
   * @param description  
   * @param username
   */
  'itemCategory.createOrUpdate': (id, name, description, username) => {
    const categoryObject = {
      name: name.trim(),
      description: description,
      isDeleted: false
    };

    if (id) {
      const category = ItemCategory.findOne({_id: id});
      if (category) {
        category.updatedBy = username;
        category.updatedAt = new Date();
        _.map(categoryObject, (value, key) => {
          category[key] = value;
        });

        return ItemCategory.update({_id: id}, category);
      }
    }
    else {
      categoryObject.createdAt = new Date();
      categoryObject.createdBy = username;
      categoryObject.uuid = Random.id();

      return ItemCategory.insert(categoryObject);
    }
  },

  /**
   * TODO: Complete JS doc
   * @param uuid
   */
  'itemCategory.delete': (uuid) => {
    const itemCategory = ItemCategory.findOne({uuid: uuid.trim()});
    if (itemCategory) {
      /*    ItemCategory.remove(itemCategory);
       const items = Item.find({category: uuid.trim()});
       items.forEach((item) => {
       item.category = null;
       Item.update(item._id, item);
       })*/
      itemCategory.isDeleted = true;
      ItemCategory.update({_id: itemCategory._id}, itemCategory);
    }
  }
});