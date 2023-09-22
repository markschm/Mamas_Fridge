const pool = require('../db/db');
const { isValidItem } = require('../utils/fridgeUtils');
const { FRIDGE_TABLE, NAME, COUNT, DATES } = require('../utils/constants');


// add item to fridge
// TODO: will need more error checking, also figure out testing
const addItem = async (req, res) => {
    const { name, count, expiries } = req.body.item;

    if (!isValidItem(name, count, expiries)) {
        console.log("ERROR [addItem]: invalid item");
        res.status(400).json({
            message: "invalid item details", 
            mamaMessage: "Mama says that item can't go in the fridge"
        });
        return;
    }

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
    } catch (error) {
        console.log("ERROR [addItem]: " + error.message);
        res.status(400).json({
            message: error.message,
            mamaMessage: "Mama says that item can't go in the fridge"
        });
    }
};


// retrieve all items from fridge
const getItems = async (req, res) => {
    // get all items, counts, expiries from fridge
    // return json response

    // TODO: remove later just for testing
    const results = await pool.query("SELECT * FROM fridge;");
    console.log(results['rows']);

    res.status(200).json({});
};


// retrieve all items that match search (wildcard)
const searchItems = async (req, res) => {
    // get query param item name
    // search db for items matching search
    // resturn json response
    res.status(200).json({});
};


// remove item from fridge
const removeItem = async (req, res) => {
    // get item name and remove counts
    // remove earliest expiries from fridge
    // if count left is 0 remove item completely
    res.status(200).json({});
};

module.exports = {
    addItem,
    getItems,
    searchItems,
    removeItem
};
