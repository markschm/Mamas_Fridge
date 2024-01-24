export const buildAddItemQuery = 
    (tableName, nameCol, countCol, datesCol, formattedExpiries) => {
    return `
        INSERT INTO ${tableName} (${nameCol}, ${countCol}, ${datesCol}) 
        VALUES ($1, $2, ARRAY[${formattedExpiries}])
        ON CONFLICT (${nameCol})
        DO UPDATE SET ${countCol} = ${tableName}.${countCol} + $2,
        ${datesCol} = ${tableName}.${datesCol} || ARRAY[${formattedExpiries}]`;
};

export const buildGetItemsQuery = (tableName) => {
    return `SELECT * FROM ${tableName};`;
};

export const buildSearchItemsQuery = (tableName) => {
    return `
        SELECT * FROM ${tableName} 
        WHERE name ILIKE $1`;
};

export const buildRemoveItemUpdateQuery = (tableName, countCol, datesCol, nameCol) => {
    return `
        UPDATE ${tableName}
        SET ${countCol} = ${countCol} - $1,
            ${datesCol} = ${datesCol}[$1 + 1:ARRAY_LENGTH(${datesCol}, 1)]
        WHERE ${nameCol} = $2;`;
};
 
export const buildRemoveItemDeleteQuery = (tableName, nameCol, countCol) => {
    return `
        DELETE FROM ${tableName}
        WHERE ${nameCol} = $1 AND ${countCol} = 0;`;
};
 