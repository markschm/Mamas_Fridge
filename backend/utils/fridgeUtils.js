export const isValidItem = (name, count, expiries) => {
    if (typeof name !== "string" 
     || name.length <= 0 
     || name.length >= 50) {
        return false;
    }

    if (typeof count !== "number" 
     || isNaN(count) 
     || count < 0
     || (count !== expiries.length)) {
        return false;
    }

    // validate dates
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    for (const expiry of expiries) {
        if (!pattern.test(expiry) && expiry.length === 10) {
            return false;
        }
    }

    return expiries.length > 0;
};

export const buildIngredientsResponse = (queryResult) => {
    const items = [];

    for (const item of queryResult) {
        items.push({
            "name": item.name,
            "count": item.count,
            "dates": item.dates
        });
    }

    return items;
};
