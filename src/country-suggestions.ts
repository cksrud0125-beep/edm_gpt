import { countryOptions, recommend } from './program-recommendations';
export function countrySuggestions(answers:string[]){
 const wanted=countryOptions.filter(c=>(answers[2]||'').includes(c));
 const candidates=(wanted.length?wanted:countryOptions).map(country=>{const matches=recommend(Array.from({length:16},(_,i)=>i===2?country:answers[i]||'')).filter(r=>r.countryConfirmed);return {country,count:matches.length};}).filter(c=>c.count>0).sort((a,b)=>b.count-a.count);
 return candidates.slice(0,3);
}
