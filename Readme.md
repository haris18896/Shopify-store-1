#### 1. Validate the theme

```sh
shopify theme check --path .
```

> Expected result: `35 files inspected with no offenses found.`

#### 2. Start the development preview

```sh
shopify theme dev --store your-store.myshopify.com --open
```

#### 3. No Shopify account yet.

This creates a store without one:

```sh
shopify store create preview --name "Faris Fabrics" --country PK
shopify theme dev --store the-url-it-prints.myshopify.com --open
```

Use your own two-letter country code. Open the preview in Chrome; that is the browser Shopify supports for this local server.

A store you keep and fill with catalog data. Sign in to the [Shopify Dev](https://dev.shopify.com/) Dashboard once (a free partner account), then:

```sh
shopify store create dev --name "Faris Fabrics"
shopify theme dev --store the-url-it-prints.myshopify.com --open
```

The first time:

1. Shopify will open a browser.
2. Sign in to your Shopify account.
3. Authorize access to the store.
4. Return to the terminal.
5. Shopify will upload a temporary development theme.
6. The storefront preview should open automatically.

The terminal will provide:

- A local preview URL, usually http://127.0.0.1:9292
- A Shopify Theme Editor URL
- A shareable preview URL

#### 4. Add Shopify test data

The homepage uses real Shopify catalog data. Before evaluating the complete layout, add:

- At least six products with featured images
- Product prices and optional compare-at prices
- Collections for Women, Men, Girls, Boys, Baby, Toys, Watches and Accessories
- Collection images
- A main navigation menu
- A footer navigation menu
