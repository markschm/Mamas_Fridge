#!/bin/bash

if [ -z $DB_USER ] || [ -z $DB_PASSWORD ] || [ -z $DB_PORT ]; then
    echo "Error: missing environment variables"
    exit 1
fi

container_name="mamas_postgres"

docker run --name $container_name --rm -p $DB_PORT:$DB_PORT \
    -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_USER=$DB_USER \
    -d postgres 2> /dev/null

create_tables_command="
CREATE TABLE IF NOT EXISTS fridge (
    _id serial PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE,
    count smallint NOT NULL CHECK (count >= 0),
    dates date[]
);
"

# sleep to let container start
sleep 2

docker exec -it $container_name psql -U $DB_USER -d $DB_USER -c "$create_tables_command"

nodemon app.js
