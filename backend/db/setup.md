# Setup Postgres DB

### Required ENVs
```
DB_USER
DB_PASSWORD
DB_PORT
```

### Pull Image
```
> docker pull postgres
```

### Start Database
```
> docker run --name mamas-postgres -p $DB_PORT:$DB_PORT -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_USER=$DB_USER -d postgres
```

### Kill Database
```
> docker kill mamas-postgres
```