// Usage: node lf_search.mjs <outDir> <tag> "query1" "query2" ...
// Queries LottieFiles public GraphQL API, writes <outDir>/<tag>.json and downloads thumbnails as <outDir>/<tag>/<n>.png
import fs from 'node:fs'; import path from 'node:path';
const [outDir, tag, ...queries] = process.argv.slice(2);
const API = 'https://graphql.lottiefiles.com/2022-08';
const seen = new Map();
for (const q of queries) {
  const body = { query: `query($q:String!){ searchPublicAnimations(query:$q, first:24){ edges{ node{ id name url jsonUrl lottieUrl imageUrl gifUrl lottieFileSize bgColor createdBy{ username firstName lastName } } } } }`, variables: { q } };
  const r = await fetch(API, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json();
  for (const e of (j.data?.searchPublicAnimations?.edges ?? [])) if (!seen.has(e.node.id)) seen.set(e.node.id, { ...e.node, q });
}
const list = [...seen.values()];
const d = path.join(outDir, tag); fs.mkdirSync(d, { recursive: true });
let i = 0;
for (const a of list) {
  a.n = i++;
  if (a.imageUrl) { try { const r = await fetch(a.imageUrl); fs.writeFileSync(path.join(d, String(a.n).padStart(3,'0') + '.img'), Buffer.from(await r.arrayBuffer())); } catch {} }
}
fs.writeFileSync(path.join(outDir, tag + '.json'), JSON.stringify(list, null, 1));
console.log(tag, list.length);
