import type {APIRoute} from 'astro';
export const GET: APIRoute = async () => {
  const origin = 'https://aliabbaskazmi.com';
  const paths = ['/', '/about/', '/projects/'];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`;
  return new Response(xml, {headers:{'Content-Type':'application/xml'}});
};
