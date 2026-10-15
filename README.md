# Ali Abbas Kazmi — personal website

A minimal, static Astro portfolio with a headless WordPress blog. Built to deploy to **Cloudflare Pages free tier** or **Vercel** with no server-side runtime or paid services required.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:4321.

## Blog / WordPress

By default, the site includes a local **Hello World** starter post so the site works before WordPress is configured.

To connect WordPress:
1. Install WordPress separately (for example at `cms.aliabbaskazmi.com`). WordPress hosting is **not** included in Cloudflare Pages or Vercel free hosting.
2. Set the build environment variable `PUBLIC_WP_URL=https://cms.aliabbaskazmi.com` (no trailing slash). The WordPress REST API endpoint `/wp-json/wp/v2/posts` must be publicly accessible.
3. Publish posts in WordPress. The site fetches them at **build time** and generates static `/blog/<slug>/` routes.
4. Trigger a new deployment whenever you publish or edit a post. Set up a WordPress webhook or redeploy manually. Posts do not update live without a rebuild.

When `PUBLIC_WP_URL` is set, the local Hello World placeholder is replaced by WordPress posts. Publish a Hello World post in WordPress if you want to keep it. The build intentionally fails if WordPress is configured but unreachable, to avoid silently publishing stale or fake content.

**Security note:** WordPress post HTML is rendered as HTML. Only publish content from trusted authors and keep WordPress and plugins updated. Use a reputable sanitization layer if untrusted contributors are allowed. WordPress media URLs remain on the WordPress domain.

## Deploy: Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In Cloudflare dashboard, create a Pages project connected to that repository.
3. Framework preset: **Astro** (or none).
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add `PUBLIC_WP_URL` if using WordPress.
7. Set custom domain to `aliabbaskazmi.com` after testing the preview URL.

## Deploy: Vercel

1. Import the GitHub repository into Vercel.
2. Framework preset: **Astro**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add `PUBLIC_WP_URL` if using WordPress.
6. Set custom domain to `aliabbaskazmi.com` after verifying the deployment.

## Theme

Light cream is the default for light-mode devices; dark graphite is used for dark-mode devices. The top-right button cycles **System → Light → Dark**, saving the preference in localStorage.

## Customization

- Personal text: `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/projects.astro`
- Design tokens and layout: `src/styles.css`
- Starter post and WordPress API: `src/lib/posts.ts`
- Domain: `astro.config.mjs`, `src/pages/sitemap.xml.ts`, `public/robots.txt`
- Footer email is a placeholder: replace `hello@aliabbaskazmi.com` with an inbox you control before publishing.
- No analytics, trackers, music players, fake posts or employer references.

## Notes

- No SSR, database or Cloudflare Workers needed for the frontend.
- Posts use WordPress REST API. WordPress itself needs a separate PHP/MySQL host.
- For a large WordPress blog, add pagination to the fetcher (currently fetches up to 50 posts).


## Interactive grid background

The homepage hero has a subtle canvas grid. On desktop, moving the pointer gently bends nearby grid lines and reveals a diffused green glow. The effect stays behind the content, does not capture pointer events, stops animating when idle and respects reduced-motion and touch-device preferences. The grid colors automatically follow the light/dark theme. Edit the `step`, `radius` and glow opacity values in `src/pages/index.astro`, or `--grid-ink` in `src/styles.css` to customize it. No additional dependencies are required.
