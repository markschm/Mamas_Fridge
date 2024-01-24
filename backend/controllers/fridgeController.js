import { buildRemoveItemDeleteQuery, buildRemoveItemUpdateQuery, buildSearchItemsQuery, buildGetItemsQuery, buildAddItemQuery } from '../db/db-queries.js';
import { pool } from '../db/db.js';
import { isValidItem, buildIngredientsResponse } from '../utils/fridgeUtils.js';


// fridge db constants
// TODO: should these stay here?
const FRIDGE_TABLE = "fridge";
const NAME = "name";
const COUNT = "count";
const DATES = "dates";
const ROWS = "rows";


// add item to fridge
export const addItem = async (req, res) => {
    const { name, count, expiries } = req.body.item;

    if (!isValidItem(name, count, expiries)) {
        console.log("ERROR [addItem]: invalid item");
        res.status(400).json({
            message: "invalid item details", 
            mamaMessage: "Mama says that item can't go in the fridge"
        });
        return;
    }

    // TODO: not sure how date will be handled when passed from FE, so wait to figure
    //       out if this part is still needed. If it is will need parsing to convert 
    //       back to original format before sending back to FE
    const formattedExpiries = expiries
        .map(expiry => `'${expiry}'::date`)
        .join(', ');

    try {
        await pool.query(
            buildAddItemQuery(FRIDGE_TABLE, NAME, COUNT, DATES, formattedExpiries), 
            [name, count]
        );
        
        res.status(200).json({});
        console.log("Item successfully added to fridge!");
    } catch (error) {
        console.log("ERROR [addItem]: " + error.message);
        res.status(400).json({
            message: error.message,
            mamaMessage: "Mama says that item can't go in the fridge"
        });
    }
};


// retrieve all items from fridge
export const getItems = async (_req, res) => {
    try {
        const itemRows = (
            await pool.query(buildGetItemsQuery(FRIDGE_TABLE)
        ))[ROWS];

        res.status(200).json({items: buildIngredientsResponse(itemRows)});
        console.log("Fridge opened!");
    } catch (error) {
        console.log("ERROR [getItems]: " + error.message);
        res.status(400).json({
            message: error.message,
            mamaMessage: "Mama can't open the fridge, try again later"
        });
    }
};


// retrieve all items that match search (wildcard)
export const searchItems = async (req, res) => {
    const itemName = req.query?.name;
    if (!itemName) {
        res.status(400).json({
            message: "Missing 'name' in query parameters required for search",
            mamaMessage: "Mama doesn't know what you're talking about"
        });
        return;
    }
    
    try {
        const itemRow = (
            await pool.query(
                buildSearchItemsQuery(FRIDGE_TABLE), 
                ["%" + itemName + "%"]
        ))[ROWS];

        res.status(200).json({items: buildIngredientsResponse(itemRow)});
        console.log("Fridge opened!");
    } catch (error) {
        console.log("ERROR [searchItem]: " + error.message);
        res.status(400).json({
            message: error.message,
            mamaMessage: "Mama can't open the fridge, try again later"
        });
    }
};


// remove item from fridge
export const removeItem = async (req, res) => {
    try {
        const { name, removed } = req.body.item;

        await pool.query(
            buildRemoveItemUpdateQuery(FRIDGE_TABLE, COUNT, DATES, NAME), 
            [removed, name]
        );
        await pool.query(
            buildRemoveItemDeleteQuery(FRIDGE_TABLE, NAME, COUNT), 
            [name]
        );

        req.query.name = name;
        searchItems(req, res);
    } catch (error) {
        console.log("ERROR [removeItem]: " + error.message);
        res.status(400).json({
            message: error.message,
            mamaMessage: "Somebody miss counted the items, try again later"
        });
    }
};
