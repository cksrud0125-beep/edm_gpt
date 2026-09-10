import { writeFile, rename, mkdir } from 'node:fs/promises';
const source = 'https://www.edmuhak.com/programs';
const clean = s => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
async function read(url) { const r = await fetch(url, {signal: AbortSignal.timeout(20000)}); if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); }
const first = await read(source);
const last = Math.max(1, ...[...first.matchAll(/page=(\d+)/g)].map(m => Number(m[1])));
if (last > 50) throw new Error('Unexpected pagination; review parser.');
const records = new Map();
function parse(html) {
 for (const m of html.matchAll(/<a href="(https:\/\/www\.edmuhak\.com\/programs\/[^"?#]+)" title="([^"]*)">([\s\S]*?)<\/a>/g)) {
 const body = m[3];
 const title = clean(m[2]);
 const description = clean(body.match(/<p class="subject[^\"]*">([\s\S]*?)<\/p>/)?.[1] || '');
 const image = body.match(/<img src="(https:[^"]+)"/)?.[1] || '';
 const heading = body.match(/<div class="titleWrap">[\s\S]*?<p\b([^>]*)>([\s\S]*?)<\/p>/);
 const titleLines = heading ? heading[2].split(/<br\s*\/?\s*>/i).map(clean).filter(Boolean) : [title];
 const rawColor = heading?.[1].match(/color:\s*(#[\da-f]{3,8}|white|black)\b/i)?.[1];
 const titleColor = rawColor || '#000000';
 records.set(m[1], {id: m[1].split('/').pop(), title, titleLines, titleColor, description, url: m[1], image});
 }
}
parse(first);
for(let page=2;page<=last;page++) parse(await read(`${source}?sort=latest&page=${page}`));
if(records.size<12) throw new Error('Too few records; preserve previous catalog.');
await mkdir('src/data',{recursive:true});
await writeFile('src/data/programs.json.tmp', JSON.stringify({source, checkedAt:new Date().toISOString(), programs:[...records.values()]},null,2));
await rename('src/data/programs.json.tmp','src/data/programs.json');
console.log(`Synced ${records.size} official program links from ${last} pages.`);
for(const p of records.values()) console.log(`${p.id}: ${p.title}`);
