export type Post = {slug:string; title:string; excerpt:string; date:string; html:string; source:'wordpress'|'local'};
const local:Post = {slug:'hello-world',title:'Hello World',date:'2026-10-15',excerpt:'A small beginning. This is where I’ll document what I learn, build and find interesting along the way.',html:'<p>Hello World.</p><p>This is my little corner of the internet, a place to write about what I’m learning, what I’m building and whatever catches my interest along the way.</p><p>More soon.</p>',source:'local'};
const clean = (value:string) => value.replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#8217;/g,'’').replace(/\s+/g,' ').trim();
export async function getPosts():Promise<Post[]> {
 const root=import.meta.env.PUBLIC_WP_URL?.replace(/\/$/,'');
 if(!root) return [local];
 try {
  const response=await fetch(`${root}/wp-json/wp/v2/posts?per_page=50&_fields=slug,title,excerpt,date,content,status`,{headers:{Accept:'application/json'}});
  if(!response.ok) throw new Error(`WordPress HTTP ${response.status}`);
  const data=await response.json();
  if(!Array.isArray(data)) throw new Error('Invalid WordPress response');
  return data.filter((p:any)=>p.slug && p.title?.rendered && p.content?.rendered).map((p:any)=>({slug:p.slug,title:clean(p.title.rendered),excerpt:clean(p.excerpt?.rendered||'').slice(0,240),date:p.date.slice(0,10),html:p.content.rendered,source:'wordpress' as const}));
 } catch(err){console.warn('WordPress unavailable during build:',err); throw err;}
}
export function prettyDate(date:string){return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});}
