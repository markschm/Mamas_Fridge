import express from 'express';
export const fridgeRouter = express.Router();
import {
    addItem,
    getItems,
    searchItems,
    removeItem
} from '../controllers/fridgeController.js';

fridgeRouter.route('/item').put(addItem);
fridgeRouter.route('/items').get(getItems);
fridgeRouter.route('/search').get(searchItems);
fridgeRouter.route('/item').patch(removeItem);
