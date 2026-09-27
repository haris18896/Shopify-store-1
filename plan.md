# Jhoom Shopify Theme Plan

## 1. Project status

**Current phase:** core storefront page-building complete; store data, merchant configuration, and checkout/account app setup are next.

This repository contains an original Shopify Online Store 2.0 scaffold and a production-ready responsive homepage based on the supplied desktop/mobile references. The files in `DesignImages/` remain visual references only and are not shipped as theme assets.

### Current deliverables

- Theme folder structure and required template entry points
- Responsive announcement bar, commerce header, mobile drawer, footer, newsletter, and mobile dock
- Configurable homepage hero, category rail, featured collection cards, dynamic bestseller cards, campaign banner, brand rail, and trust strip
- Original redistributable homepage demo imagery with entries in `ASSET_LICENSES.md`
- Reusable department landing system with a complete Women's template and generic department configuration
- Native filtered collection and search results, product detail, cart, and a legacy-account compatibility dashboard
- Screen-to-template and component inventory
- Responsive, accessibility, performance, SEO, testing, and release plan
- Asset licensing policy and register in `ASSET_LICENSES.md`

### Deliberately not included yet

- Product/demo data
- Cleared product, brand, or payment imagery beyond the supplied project assets
- Third-party libraries, fonts, or icon packs
- Store connection, deployment, or marketplace submission
- Checkout and new customer-account UI code, because Shopify controls those surfaces separately from storefront themes

---

## 2. Reference design audit

The 18 mockups show a warm, editorial, family-fashion storefront with serif display typography, neutral surfaces, deep green actions, peach promotional accents, product-led photography, and dense merchandising.

| Reference | Intended experience | Shopify implementation target |
| --- | --- | --- |
| `web/...-1.png` + `MobileVersion/...-1.png` | Homepage | `templates/index.json` with modular home sections |
| `web/...-2.png` + `MobileVersion/...-3.png` | Women's editorial landing | Collection alternate template or flexible collection sections |
| `web/...-3.png` | Men's editorial landing | Same reusable collection-landing system |
| `web/...-4.png` | Kids, baby, and toys landing | Same system with age-group/category blocks |
| `MobileVersion/...-2.png` | All-category discovery | `templates/list-collections.json` |
| `web/...-5.png` | Collection/product listing | `templates/collection.json` |
| `web/...-7.png` + `MobileVersion/...-4.png` | Search results | `templates/search.json` |
| `web/...-6.png` + `MobileVersion/...-5.png` | Product detail | `templates/product.json` |
| `web/...-8.png` + `MobileVersion/...-6.png` | Cart | `templates/cart.json` |
| `web/...-9.png` + `MobileVersion/...-7.png` | Checkout concept | Checkout and accounts editor / Checkout UI extensions, not theme Liquid |
| `web/...-10.png` + `MobileVersion/...-8.png` | Account dashboard concept | New customer accounts and account extensions, not storefront theme Liquid |

### Design inconsistencies to resolve during implementation

- The desktop and mobile home references do not contain identical section sets. Desktop shows additional brands, category promos, newsletter, footer, and utility content. Mobile should preserve the content hierarchy without forcing every desktop block above the fold.
- Desktop product cards are mostly vertical while the women's mobile landing also uses horizontal cards. Product card layout therefore needs explicit variants, not CSS guesses based only on viewport.
- Some references show a mobile bottom navigation and others do not. It should be a merchant setting, enabled by default on mobile, and must not overlap sticky purchase/cart controls.
- Search and collection filters should share one filtering system and one mobile drawer.
- Promotional percentages, review counts, “sold this week,” loyalty points, shipping thresholds, and delivery dates must come from real store data/settings. They must never be hard-coded as false urgency or proof.

---

## 3. Commercial release decision — required before launch

Before packaging, replace the placeholder documentation URL and support email in `config/settings_schema.json` with the seller's real public support details.

The same build cannot be released on both target marketplaces.

- Shopify currently requires themes listed in the Shopify Theme Store to be exclusive to that store.
- A Shopify Theme Store submission must use original code or Shopify's approved Skeleton Theme base. It cannot be derived from Dawn or Horizon.
- A ThemeForest release has its own packaging, documentation, asset-license, and support obligations.

**Decision gate:** choose one of these before public distribution:

1. **Shopify Theme Store build:** exclusive distribution through Shopify.
2. **ThemeForest build:** distributed through ThemeForest and not submitted as the same Theme Store product.
3. **Two separate products:** only if their design, code, identity, documentation, and release history are genuinely independent. Legal review is recommended before using this route.

Development can continue privately while this decision is open.

Official references:

- Shopify Theme Store requirements: <https://shopify.dev/docs/storefronts/themes/store/requirements>
- Shopify theme architecture: <https://shopify.dev/docs/storefronts/themes/architecture>
- Envato theme preparation requirements: <https://help.author.envato.com/hc/en-us/articles/360000470826-Themes-Item-Preparation-Technical-Requirements>

---

## 4. Platform boundaries

### Implemented by the theme

- Storefront header, menus, predictive search, cart link/count, and mobile navigation
- Homepage, collection directory, editorial collection landing, product listing, search, product, cart, pages, contact, blog, article, 404, password, and gift card
- Native Shopify product forms, variants, selling plans, dynamic checkout buttons, localization, filters, pagination, cart notes, and automatic discount display
- App blocks and extension points for third-party features

### Not implemented as theme-owned functionality

- **Checkout:** style through Shopify's checkout and accounts editor. Advanced checkout-page extensions and Branding API work require eligible plans, commonly Shopify Plus.
- **New customer accounts:** configured in Shopify's accounts editor and extended through apps. They are independent of storefront theme templates.
- **Wishlist:** expose an app-block/integration point or account link; do not ship a fake or API-dependent wishlist.
- **Loyalty points and order tracking:** account-app extensions or integrations, not hard-coded demo state.
- **Reviews:** render a review app block or optional metafield data. Do not manufacture ratings.
- **Installments/payment providers:** use Shopify payment terms/dynamic checkout output or documented app integrations. Do not hard-code Atome, Easypaisa, JazzCash, Visa, Mastercard, or other marks.
- **Coupon entry on the cart page:** Shopify Theme Store rules prohibit app-like cart-level discount code behavior. Discounts should be applied natively and displayed accurately.

---

## 5. Theme architecture

```text
.
├── assets/                 # Local CSS, JS, fonts, and owned/licensed UI assets
│   ├── base.css
│   └── theme.js
├── blocks/                 # Theme blocks added only when reusable nesting is required
├── config/
│   ├── settings_data.json
│   └── settings_schema.json
├── layout/
│   └── theme.liquid
├── locales/
│   └── en.default.json
├── sections/
│   ├── header-group.json
│   ├── footer-group.json
│   ├── announcement-bar.liquid
│   ├── header.liquid
│   ├── footer.liquid
│   └── main-*.liquid       # One main section per storefront template
├── snippets/               # Small reusable rendering components
├── templates/              # JSON templates plus gift_card.liquid
├── DesignImages/           # References only; excluded from theme package
├── ASSET_LICENSES.md
├── plan.md
└── release-notes.md
```

### Architecture rules

- Use JSON templates and section groups so merchants can add, remove, and reorder content in the editor.
- Keep business logic in the relevant main section; use snippets for small repeated renderers.
- Prefer native custom elements and small vanilla JavaScript modules. Add no front-end framework or build pipeline unless a measured need appears.
- Use native CSS with logical properties, fluid sizes, container-aware grids where supported, and no Sass.
- Host shipped code and redistributable assets inside the theme package/Shopify CDN.
- Support app blocks in product and other commercially important sections.
- Use Shopify image filters and responsive `image_tag` output with explicit dimensions, `srcset`, `sizes`, lazy loading below the fold, and eager loading only for the likely LCP image.

---

## 6. Template and screen backlog

### Required storefront templates

| Template | Planned main section | Scope |
| --- | --- | --- |
| `index.json` | `main-index` plus addable sections | Home composition |
| `collection.json` | `main-collection` | Banner, description, filters, sort, grid, pagination |
| `list-collections.json` | `main-list-collections` | Category discovery |
| `product.json` | `main-product` | Gallery, product info, variants, buy form, accordions |
| `search.json` | `main-search` | Search form, related suggestions, filters, results |
| `cart.json` | `main-cart` | Lines, quantities, notes, selling plans, totals, checkout |
| `page.json` | `main-page` | Merchant content pages |
| `page.contact.json` | `main-contact` | Native Shopify contact form |
| `blog.json` | `main-blog` | Article cards and pagination |
| `article.json` | `main-article` | Article content, metadata, sharing, comments if enabled |
| `404.json` | `main-404` | Recovery message, search/home actions |
| `password.json` | `main-password` | Storefront password entry |
| `gift_card.liquid` | standalone | Gift card code, QR, Apple Wallet |

### Optional alternate templates after core completion

- `collection.editorial.json` for women's, men's, and kids editorial landings
- `collection.age-groups.json` for baby/kids age navigation
- `page.size-guide.json`
- `page.faq.json`
- `product.preorder.json` only if native inventory/policy behavior is fully defined

Do not create separate women's, men's, and kids section implementations. They are content configurations of the same reusable sections.

---

## 7. Component inventory

### Global shell

- Announcement bar with multiple messages, links, and rotation controls
- Responsive header with logo, desktop mega-menu, mobile drawer, predictive search, account, cart count, localization, and optional app-provided wishlist link
- Breadcrumbs
- Mobile bottom navigation with safe-area support and configurable items
- Footer with menus, newsletter, social links, localization, payment types, legal links, and trust content
- Cookie/privacy integration point without a custom consent system

### Merchandising sections

- Hero slideshow / image banner
- Circular category navigation
- Editorial promo-card grid
- Featured collection/product carousel
- Category mosaic / shop-by-category
- Shop-by-age blocks
- Full-width and split promotional banners
- Brand/logo list using merchant-uploaded marks only
- Trust/benefit bar
- Newsletter signup
- Rich text, image with text, multicolumn, video, and custom Liquid
- Recently viewed products using local browser history with a clear privacy-safe fallback

### Commerce snippets

- `product-card`: vertical, horizontal, compact, and carousel variants
- `price`: current, compare-at, unit price, and sale labels
- `product-media`: responsive images, video, model, modal/zoom
- `product-form`: variants, quantity, selling plan, add-to-cart, accelerated checkout
- `swatch`: color/image/text values with accessible labels
- `rating`: real metafield/app data only
- `facets`: native collection/search filters, active filters, price range, mobile drawer
- `sort-select`, `pagination`, and result count
- `quantity-input`
- `cart-line-item` and cart errors
- `free-shipping-progress`: merchant-configured threshold and real cart total
- `predictive-search`
- `drawer`, `modal-dialog`, `accordion`, and `carousel-controls`
- `responsive-image`, `icon`, `button`, `badge`, `breadcrumbs`, and `loading-spinner`

### Merchant editor expectations

- Every promotional image, heading, text, link, alignment, overlay, and color scheme is editable.
- Repeated content uses blocks with sensible maximums.
- Settings use plain language and provide useful defaults, not demo-store names or lorem ipsum.
- Content sections include presets and `enabled_on`/`disabled_on` restrictions.
- Main sections support `@app` blocks where relevant.
- Empty states remain usable in the editor and never expose broken controls to customers.

---

## 8. Data model

Prefer native Shopify data. Add metafields only when native objects do not represent the content.

### Product data

- Product title, description, vendor, media, variants, availability, price, compare-at price, quantity rules, volume pricing, selling plans, and complementary/recommendation APIs
- Standard product subtitle and rating metafields where supported
- Optional custom metafields: fabric/care, size-guide page reference, delivery note, badge, and swatch image

### Collection data

- Collection title, description, image, products, filters, sort options, and pagination
- Optional custom metafields: eyebrow, short promotional copy, mobile hero focal point, and editorial navigation references

### Theme settings

- Color schemes rather than one-off color settings on every section
- Typography choices using Shopify-hosted fonts or locally licensed WOFF2 files
- Page width, spacing scale, card radius/border/shadow options
- Cart type, free-shipping threshold, quick-add behavior, predictive search, mobile dock, animations, and social links

---

## 9. Responsive system

Build mobile-first and verify at content-driven widths rather than targeting device names.

| Range | Intended behavior |
| --- | --- |
| `0–479px` | Compact phones; single-column page sections, 2-column product grids where viable |
| `480–749px` | Large phones; denser card layouts and horizontal scrollers |
| `750–989px` | Tablets; two-column page structures and tablet navigation |
| `990–1199px` | Small desktop; desktop header and 3–4 column grids |
| `1200px+` | Full editorial desktop; 4–6 column merchandising grids |

Responsive requirements:

- No horizontal page scroll at 320 CSS px.
- Tap targets at least 44×44 CSS px where practical.
- Sticky elements account for safe-area insets and never obscure focused controls.
- Mobile filters are a focus-trapped drawer; desktop filters remain keyboard accessible.
- Product gallery order, selected variant, cart state, and search/filter state persist across layout changes.
- Use reduced-motion preferences for every animation and carousel.

---

## 10. Accessibility, performance, and SEO gates

### Accessibility

- Semantic landmarks and one descriptive `h1` per primary screen
- Visible focus, skip link, logical tab order, keyboard-operable drawers/modals/carousels
- Correct labels, error summaries, live regions, and status messages for cart/product actions
- Alternative text controlled by merchant image alt text; decorative images use empty alt text
- Color contrast of at least WCAG AA for text and interactive states
- No information conveyed only by color, position, or motion
- Lighthouse accessibility average target: **90+** on home, collection, and product for desktop and mobile

### Performance

- Lighthouse performance average target: **60+ minimum for submission; internal target 80+** on representative home, collection, and product pages
- No framework, jQuery, or carousel dependency by default
- Defer JavaScript, split behavior by feature only when it produces a measurable benefit
- Keep section CSS/JS small and avoid duplicate bundles
- Reserve media dimensions to prevent layout shift
- One eager/LCP candidate per route; lazy-load below-fold media
- Test with realistic catalog content, not empty sections

### SEO

- Canonical URL, title, meta description, social metadata, and crawlable navigation
- Valid product/breadcrumb/article structured data using real Shopify data
- Semantic pagination and filter URLs
- Meaningful heading hierarchy and image alt content
- No custom `robots.txt.liquid` in the Theme Store build

---

## 11. Asset and copyright plan

Downloading an asset does not grant redistribution rights. Only assets with documented commercial redistribution permission may be bundled in a paid theme. Preview-only assets also require commercial permission for their marketplace use.

### Rules

1. The screenshots in `DesignImages/` are references only. Do not crop, extract, or ship their people, products, logos, icons, or payment marks.
2. Do not ship the “Jhoom” identity until ownership and trademark clearance are documented.
3. Hero and catalog photography should normally remain demo-store content, not theme-zip content. Use merchant-uploaded Shopify images in the installed theme.
4. If preview photography is licensed, save the original download, invoice/license, author, source URL, license version, permitted uses, attribution requirement, and whether redistribution is allowed.
5. Use original inline SVG UI icons or a permissively licensed icon set that allows redistribution; preserve its license notice.
6. Use system fonts until commercial webfont and redistribution rights are documented. If custom fonts are adopted, store WOFF2 locally and record the license.
7. Never copy third-party brand logos. Merchants may upload marks they are authorized to use.
8. Every asset must be entered in `ASSET_LICENSES.md` before it appears in code, the demo store, screenshots, or marketplace previews.

### Current asset state

- The scaffold uses no third-party images, fonts, icon packs, or libraries.
- `base.css` and `theme.js` are original local source files.
- No remote runtime assets are loaded.
- No asset downloads are currently necessary because no visual asset is currently used by the theme.

---

## 12. Implementation sequence

### Phase 0 — decisions and foundations

- Choose release channel
- Confirm final theme name and brand ownership
- Create Git repository and protected main branch
- Replace placeholder documentation/support metadata
- Connect a Shopify development store with representative products, variants, collections, filters, markets, selling plans, blog posts, and media types
- Approve color, type, spacing, icon, and imagery systems

**Exit:** commercial channel and brand/assets are legally clear; representative store data exists.

### Phase 1 — global design system

- CSS tokens, color schemes, typography, spacing, grids, focus styles
- Original icon system and reusable primitive snippets
- Header, announcement bar, menus, predictive search, footer, mobile dock
- Drawer, modal, accordion, disclosure, quantity input, and carousel controls

**Exit:** shared shell works at 320, 375, 768, 1024, and 1440 px with keyboard and screen-reader checks.

### Phase 2 — product and collection commerce

- Product card, price, badges, swatches, quick add
- Collection/search filter and sort system
- Product gallery, variant picker, product form, selling plans, pickup availability, app blocks
- Cart page/drawer, cart notes, selling plans, accelerated checkout, taxes, discounts, and errors

**Exit:** browse-to-cart path works without JavaScript where Shopify supports it and enhances cleanly with JavaScript.

### Phase 3 — editorial pages

- Homepage sections
- Women's/men's/kids editorial collection preset
- Collection directory, age groups, promotional banners, logo list, newsletter, trust bar
- Page, contact, blog, article, 404, password, and gift card polish

**Exit:** all required templates have useful defaults and merchant-editable content.

### Phase 4 — platform integrations

- Review app block guidance
- Wishlist/loyalty/order-tracking integration documentation without app dependency
- Checkout and new customer-account branding guide
- Markets, localization, currencies, tax display, RTL readiness, and translations

**Exit:** unsupported mockup features are either connected to real platform data or documented as optional integrations.

### Phase 5 — hardening and marketplace release

- Shopify Theme Check with no errors
- Lighthouse, accessibility, keyboard, screen-reader, responsive, browser, webview, and network-throttling QA
- Test large catalogs, long titles, missing media, sold-out variants, subscriptions, high quantities, discounts, and localization expansion
- Documentation, changelog, support policy, demo store, preview media, asset audit, and release package
- Marketplace-specific review checklist

**Exit:** chosen marketplace's current requirements pass in full.

---

## 13. Verification matrix

### Automated

- `shopify theme check`
- JSON parsing for all config, templates, locales, and section groups
- Lighthouse desktop/mobile on home, collection, and product
- HTML validation and broken-link scan on demo routes
- Accessibility automation backed by manual keyboard/screen-reader testing

### Manual storefront cases

- Empty, one-item, and multi-item cart
- Products with one/many variants, sold-out options, unavailable variants, media video/model, unit prices, quantity rules, and selling plans
- Collections with no products, many products, active filters, no matching filters, and pagination
- Search with blank, exact, partial, typo, mixed object types, and no results
- Long menus, long translations, RTL text, multiple currencies, tax-inclusive pricing, and localization selectors
- Logged-out and logged-in account links
- JavaScript unavailable or failed
- Reduced motion, 200% zoom, keyboard only, and touch only

### Browser coverage

- Current Chrome, Safari, Firefox, and Edge desktop versions required by the chosen marketplace
- Current Safari on iOS, Chrome on iOS/Android, and Samsung Internet coverage required by Shopify
- Instagram, Facebook, and Pinterest in-app webviews

---

## 14. Definition of done

The theme is ready for release only when:

- The release channel is chosen and does not violate Shopify exclusivity.
- All required templates are complete, responsive, and populated with meaningful defaults.
- No design-reference screenshot or unlicensed asset is included.
- Every shipped or preview asset has an auditable license record.
- Theme Check passes and required Lighthouse thresholds are met with real content.
- Native Shopify features work across the documented catalog edge cases.
- Checkout/account limitations and optional integrations are accurately documented.
- Merchant documentation, support channel, demo store, release notes, and installation package are complete.

---

## 15. Next implementation task

Build **Phase 1: the global design system and responsive header/footer shell**. Before coding it, confirm the release channel, working theme name, and whether the mobile bottom navigation is enabled by default.
