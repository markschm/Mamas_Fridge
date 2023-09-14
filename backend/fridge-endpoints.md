# Fridge Endpoint Example's
Example structures of what endpoints receive and responds with

## Add Item To Fridge
PUT /item  
```
Server Recieves:
{
  "item": {
    “name“: “yogurt“,
    “count“: 2,
    “expiries“: [
      “02/21/2023“,
      “04/30/2023“
    ]
  }
}
```

## Retrieve all items from fridge
GET /items
```
Server Response:
{
  "items": [
    {...},
    {...}
  ]
}
```

## Retrieve Items By Search (wildcard)
GET /items?name=item
```
Server Response:
{
  "items": [
    {...},
    {...}
  ]
}
```

## Remove item from fridge
PATCH /item
```
Server Receives:
{
  "item": {
    "name": "yogurt",
    "count": 2
  }
}
```