
// add item to fridge
const addItem = async (req, res) => {
    // process request body
    // add to database or update if exists
    // return status code
    console.log("addItem");
    res.status(200).json({});
};


// retrieve all items from fridge
const getItems = async (req, res) => {
    // get all items, counts, expiries from fridge
    // return json response
    console.log("getItems");
    res.status(200).json({});
};


// retrieve all items that match search (wildcard)
const searchItems = async (req, res) => {
    // get query param item name
    // search db for items matching search
    // resturn json response
    console.log("searchItems");
    res.status(200).json({});
};


// remove item from fridge
const removeItem = async (req, res) => {
    // get item name and remove counts
    // remove earliest expiries from fridge
    // if count left is 0 remove item completely
    console.log("removeItem");
    res.status(200).json({});
};

module.exports = {
    addItem,
    getItems,
    searchItems,
    removeItem
};
