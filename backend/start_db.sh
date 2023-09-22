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
CREATE TABLE IF NOT EXISTS testtable (
    _id serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS anothertable (
    _id serial PRIMARY KEY,
    city VARCHAR(20) NOT NULL,
    country VARCHAR(20) NOT NULL
);
"

docker exec -it $container_name psql -U $DB_USER -d $DB_USER -c "$create_tables_command"
