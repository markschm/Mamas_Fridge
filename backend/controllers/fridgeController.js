import { pool } from '../db/db.js';
import { isValidItem, buildIngredientsResponse } from '../utils/fridgeUtils.js';


// db constants
const FRIDGE_TABLE = "fridge";
const NAME = "name";
const COUNT = "count";
const DATES = "dates";
const ROWS = "rows";


// add item to fridge
// TODO: will need more error checking, also figure out testing
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

    // TOOD: not sure how date will be handled when passed from FE, so wait to figure
    // out if this part is still needed. If it is will need parsing to convert back to
    // original format before sending back to FE
    const formattedExpiries = expiries.map(expiry => `'${expiry}'::date`).join(', ');

    const values = [name, count];
    const query = `INSERT INTO ${FRIDGE_TABLE} (${NAME}, ${COUNT}, ${DATES}) 
                   VALUES ($1, $2, ARRAY[${formattedExpiries}])
                   ON CONFLICT (${NAME})
                   DO UPDATE SET ${COUNT} = ${FRIDGE_TABLE}.${COUNT} + $2,
                   ${DATES} = ${FRIDGE_TABLE}.${DATES} || ARRAY[${formattedExpiries}]`;
    

    try {
        await pool.query(query, values);
        
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
export const getItems = async (req, res) => {
    try {
        const result = (await pool.query(`SELECT * FROM ${FRIDGE_TABLE};`))[ROWS];

        res.status(200).json({items: buildIngredientsResponse(result)});
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
        const query = `SELECT * FROM ${FRIDGE_TABLE} 
                       WHERE name ILIKE $1`;
        const result = (await pool.query(query, ["%" + itemName + "%"]))[ROWS];

        res.status(200).json({items: buildIngredientsResponse(result)});
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
    // get item name and remove counts
    // remove earliest expiries from fridge
    // if count left is 0 remove item completely
    res.status(200).json({});
};
