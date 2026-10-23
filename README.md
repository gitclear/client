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

- `src/pages/index.astro`: Diff Digest landing page, adapted from the supplied `GitClient.com.html` design.
- `src/components/landing/`: the ten landing-page sections, including SVG research charts and product previews.
- `src/components/GitInstaller.tsx`: the React installer island, with OS detection, keyboard-accessible tabs, and clipboard feedback.
- `src/data/`: activity-preview and comparison-table content rendered at build time.
- `src/scripts/site.ts`: persisted light/dark theme and mobile navigation.
- `public/fonts/`: Geist, Geist Mono, and Instrument Serif fonts extracted from the supplied design, served locally.
- `src/pages/about.astro` and `src/pages/updates.astro`: placeholder auxiliary pages.
- `src/pages/404.astro`: custom not-found page.
- `src/layouts/SiteLayout.astro`: shared navigation, metadata, and page shell.
- `src/styles/global.css`: shared styles.

Add `.astro` or `.md` files under `src/pages/` for additional routes. Files in
`public/` are copied directly into the build, useful for images and downloads.

React components live in `src/components/`. The installer uses `client:load`;
the rest of the landing page is static HTML with a small shared navigation/theme
script. For another component that needs browser interaction, opt into hydration:

```astro
---
import InteractiveWidget from '../components/InteractiveWidget';
---
<InteractiveWidget client:visible />
```

`client:visible` loads the component when it approaches the viewport;
`client:load` loads it immediately. Omit the directive for static HTML. The page
content and download links work without JavaScript. See [Astro's React integration](https://docs.astro.build/en/guides/integrations-guide/react/).

The two product previews in `History.astro` and `DeepDive.astro` are labeled
“Video coming soon”: no recordings were included in the design. Replace their
preview frames with native video players when the media is available. Download
and purchase links use the GitClear destinations from the design. The research
charts, comparison entries, and pricing copy also follow the supplied design.

## Deploy to Cloudflare

Pushing to `master` deploys the site. The repository is connected to Cloudflare
Workers Builds, which runs `npm run build` and then `npx wrangler deploy`, using
the Node version in `.nvmrc`. Build logs are under the `gitclient` Worker's
**Deployments** tab.

To deploy by hand instead:

```sh
npx wrangler login
npm run deploy
```

Either way, `dist/` is uploaded to the `gitclient` Worker; no Worker script is
needed. The `routes` in `wrangler.jsonc` attach gitclient.com and
www.gitclient.com as custom domains, and each deploy keeps their DNS records and
certificates in place. Because custom domains are set, the workers.dev URL is
disabled.

https://gitclient.com is the canonical URL (also `site` in `astro.config.mjs`).
Two settings in the Cloudflare dashboard enforce it, outside this repository:

- **Rules → Redirect Rules → "Redirect www to gitclient.com"**: 301 from
  `http*://www.gitclient.com/*` to `https://gitclient.com/${2}`, preserving the
  query string.
- **SSL/TLS → Edge Certificates → Always Use HTTPS**: 301 from http to https.

Analytics are Plausible, loaded in `src/layouts/SiteLayout.astro`.

Static asset requests are [free and unlimited](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)
on the Workers Free plan. A future Worker script for APIs or server rendering has
separate usage limits. Domain registration is separate from hosting.

The About and Updates pages still contain starter copy to replace before launch.
