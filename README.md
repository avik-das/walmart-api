Walmart Product API exploration
===============================

A simple REST server that implements a search over a few products availablea via the [Walmart Product API](https://developer.walmartlabs.com/docs/read/Product_Lookup_API__new).

This is also a chance to play around with [the Hapi web framework](http://hapijs.com/).

Quick Start
-----------

```sh
git clone https://github.com/avik-das/walmart-api.git
cd walmart-api
npm install
npm test
npm start
```

Once the server is started, you can access http://localhost:3000/search?keyword=backpack to search for products containing the word "backpack" in their description.

Design Decisions
----------------

One key decision is to choose between retrieving the product information ahead of time, or on each search. The right answer is to use an API that supports searching, but for this test, it's better to use the restricted list of IDs and cache their information during the server startup. This prevents multiple API lookups on each search.

Also, the actual search logic is heavily simplified. Though the search is case-insensitive, I don't check for word delimiters for simplicity. Thus, a search for "table" will include products containing the word "comfortable."
