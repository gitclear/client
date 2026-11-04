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

- `src/pages/index.astro`: the git-client comparison home page, implemented from the supplied `gitclient.com home-html/Main.dc.html` reference.
- `src/components/home/`: the interactive rankings, three review tiers, client-versus-viewer comparison, and scoring disclosure.
- `src/data/clients.ts`: all eleven client reviews, eight rubric dimensions, and five weight presets from the design.
- `src/lib/rankings.ts`: normalized scores, stable ranking, platform availability, and movement from default ranks.
- `src/lib/dates.ts`: the current year, resolved at build time and shared with hydrated components. Rebuilding refreshes the title, hero, and copyright; the diff label uses the previous year relative to it.
- `src/layouts/HomeLayout.astro` and `src/styles/home.css`: the home page shell and responsive reference styling.
- `src/components/landing/`: retained sections from the previous Diff Digest landing page.
- `src/components/GitInstaller.tsx`: the React installer island, with OS detection, keyboard-accessible tabs, and clipboard feedback.
- `src/data/`: activity-preview and comparison-table content rendered at build time.
- `src/scripts/site.ts`: persisted light/dark theme and mobile navigation.
- `public/fonts/`: locally served fonts, including the home page’s Instrument Sans, JetBrains Mono, and Newsreader.
- `src/pages/about.astro` and `src/pages/updates.astro`: placeholder auxiliary pages.
- `src/pages/404.astro`: custom not-found page.
- `src/layouts/SiteLayout.astro`: shared navigation, metadata, and page shell.
- `src/styles/global.css`: shared styles.

Add `.astro` or `.md` files under `src/pages/` for additional routes. Files in
`public/` are copied directly into the build, useful for images and downloads.

React components live in `src/components/`. The home page’s `ClientRankings` uses
`client:load` to keep the hero, score bars, and all three review tiers synchronized
as presets, weights, or platform preferences change. It includes the standard Git
installer with keyboard-accessible OS tabs and clipboard feedback. All review
content is also rendered into static HTML. For another interactive component, opt into hydration:

```astro
---
import InteractiveWidget from '../components/InteractiveWidget';
---
<InteractiveWidget client:visible />
```

`client:visible` loads the component when it approaches the viewport;
`client:load` loads it immediately. Omit the directive for static HTML. The page
content and download links work without JavaScript. See [Astro's React integration](https://docs.astro.build/en/guides/integrations-guide/react/).

The supplied home-page design contains labeled screenshot placeholders and
initial-based client icons, with no image assets. The implementation preserves
those placeholders, captions, and intended filenames. Replace them with actual
captures when available. Reviews, pricing, platform availability, and vendor
download destinations follow the reference; SourceGit’s scores remain labeled
provisional. Home-page styles are isolated from the auxiliary routes.

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
