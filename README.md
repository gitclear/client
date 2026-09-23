# gitclient

The website for **https://gitclient.com**. Astro generates static HTML, with React
available for components. Cloudflare Workers Static Assets serves the built site;
there is no application server, database, or Cloudflare SSR adapter.

## Local development

Use Node.js 24 (with nvm: `nvm install && nvm use`).

```sh
npm ci
npm run dev
```

Open http://localhost:4321. `npm run build` checks types and builds `dist/`;
`npm run preview` serves that build. `npm run preview:cloudflare` builds and runs
the site locally through Wrangler to verify Cloudflare routing and 404 behavior.

## Pages and components

- `src/pages/index.astro`: home page.
- `src/pages/about.astro` and `src/pages/updates.astro`: placeholder auxiliary pages.
- `src/pages/404.astro`: custom not-found page.
- `src/layouts/SiteLayout.astro`: shared navigation, metadata, and page shell.
- `src/styles/global.css`: shared styles.

Add `.astro` or `.md` files under `src/pages/` for additional routes. Files in
`public/` are copied directly into the build, useful for images and downloads.

React components live in `src/components/`. `SiteName.tsx` demonstrates a React
component rendered at build time with no browser JavaScript. For a component that
needs browser interaction, import it into an Astro page and opt into hydration:

```astro
---
import InteractiveWidget from '../components/InteractiveWidget';
---
<InteractiveWidget client:visible />
```

`client:visible` loads the component when it approaches the viewport;
`client:load` loads it immediately. Omit the directive for static HTML. The starter
pages need no browser JavaScript. See [Astro's React integration](https://docs.astro.build/en/guides/integrations-guide/react/).

## Deploy to Cloudflare

```sh
npx wrangler login
npm run deploy
```

This builds and uploads `dist/` to the `gitclient` Worker. No Worker script is
needed. Initially the site is available at the workers.dev URL reported by Wrangler.
To serve gitclient.com, add it under the Worker's **Settings → Domains & Routes →
Add → Custom Domain** after the domain's DNS is managed by Cloudflare.
`astro.config.mjs` already sets https://gitclient.com as the canonical site URL;
that setting alone does not configure DNS or attach the domain.

For Git-based deployment, connect this repository to Cloudflare Workers Builds:
use `npm run build` as the build command and `npx wrangler deploy` as the deploy
command. Set `NODE_VERSION` to `24` in the build environment.

Static asset requests are [free and unlimited](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)
on the Workers Free plan. A future Worker script for APIs or server rendering has
separate usage limits. Domain registration is separate from hosting.

The home, About, and Updates pages contain starter copy to replace before launch.
