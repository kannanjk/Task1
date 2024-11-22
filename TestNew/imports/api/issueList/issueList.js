/**
 * @author jishnu
 */
import { Mongo } from 'meteor/mongo'

listCollectionName = 'myList';
export const myList = new Mongo.Collection(listCollectionName); 