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
> docker run --name test-postgres -p $DB_PORT:$DB_PORT -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_USER=$DB_USER -d postgres
```

at current moment you need to request /test-create to setup tables when db first started