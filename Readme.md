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

`store create preview` exists only in Shopify CLI 4.8 or newer. This machine also has CLI 4.2.0 at `/usr/local/bin/shopify`. If that older binary is first on `PATH`, the CLI offers `theme preview` instead, and `--name` / `--country` fail because they belong to a different command.

```sh
shopify version
```

If that prints `4.2.0`, run the newer binary directly. Replace `shopify` below with `~/.nvm/versions/node/v24.18.1/bin/shopify`.

A preview store is temporary and belongs to nobody until you save it. `theme dev` logs into a Shopify account and is refused (`access_denied`, then "you don't have access to this dev store") until that account owns the store.

```sh
shopify store create preview --name "Faris Fabrics" --country PK
shopify store info --store THE-STORE.myshopify.com
```

`store info` prints a **Save your store** link. Open it, create or sign in to a free Shopify account, and save the store. Then:

```sh
shopify theme dev --store THE-STORE.myshopify.com --open
```

`THE-STORE.myshopify.com` is the real domain from the create output, such as `xa7e2y-7m.myshopify.com`. Approve the browser login. If the CLI asks whether you meant `theme preview`, answer no. Open the preview in Chrome.

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



### Steps
1. Go to the [Shopify Dev Dashboard](https://dev.shopify.com/dashboard)
2. Create a free store for development
3. `npm install -g @shopify/cli@latest` in your mac book terminal
4. `shopify version` -> in terminal
5. connect it with the dev store created `jhoom-lrc2eypk`
6. run
```sh
shopify theme dev \
  --path . \
  --store jhoom-lrc2eypk.myshopify.com \
  --open
  ```