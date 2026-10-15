import type {APIRoute} from 'astro';
import {getPosts} from '../lib/posts';
export const GET:APIRoute=async()=>{const origin='https://aliabbaskazmi.com';const posts=await getPosts();const paths=['/','/about/','/projects/','/blog/',...posts.map(p=>`/blog/${p.slug}/`)];const xml=`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>${origin}${p}</loc></url>`).join('')}</urlset>`;return new Response(xml,{headers:{'Content-Type':'application/xml'}})};
