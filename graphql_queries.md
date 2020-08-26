# GraphQL queries

## start dev backend server

* Run from the root bash terminal, `npm start`, which will open a browser window to your localhost, `http://localhost:3000/`
* Open in another browser to `http://localhost:3001/graphql` to query the backend dev server.
* Verify the frontend is seeded, open the Chrome browser to localhost, http://localhost:3000/
* If seeding is required run from the root bash terminal, `npm run seed`, revalidate localhost shows products and categories

## Run the queries

* Open the browser to the Playground, `http://localhost:3001/graphql`
* Enter the following query to gain ID's 

```
query {
  products {
    _id
  }
}
```

- results in:
{
  "data": {
    "products": [
      {
        "_id": "5f4642337ff34a0c3c66f674"
      },
      {
        "_id": "5f4642337ff34a0c3c66f675"
      },
      {
        "_id": "5f4642337ff34a0c3c66f676"
      },
      {
        "_id": "5f4642337ff34a0c3c66f677"
      },
      {
        "_id": "5f4642337ff34a0c3c66f678"
      },
      {
        "_id": "5f4642337ff34a0c3c66f679"
      },
      {
        "_id": "5f4642337ff34a0c3c66f67a"
      },
      {
        "_id": "5f4642337ff34a0c3c66f67b"
      },
      {
        "_id": "5f4642337ff34a0c3c66f67c"
      },
      {
        "_id": "5f4642337ff34a0c3c66f67d"
      },
      {
        "_id": "5f4642337ff34a0c3c66f67e"
      },
      {
        "_id": "5f4642337ff34a0c3c66f67f"
      }
    ]
  }
}

* Then run this query

```
query checkout($products: [ID]!) {
  checkout(products: $products) {
    session
  }
}
```

        * Also, add the query variables, replace with your own variables
        ```
        {
        "products": ["5f4642337ff34a0c3c66f67f", "5f4642337ff34a0c3c66f67e"]
        }
        ```


- Results in, to use in the stripe HTML:
{
  "data": {
    "checkout": {
      "session": "cs_test_Ej3t7JfLUjzup4MuK6CcMfT5jpXFLhjZoNObhQfaLZMSz4pbX7lxbltu"
    }
  }
}









