import { conditionLabels } from './advisor-flows';
import { useEffect, useState } from 'react';
const key='edm-advisor-condition-history-v1';
type Entry={answers:string[];at:string};
function read():Entry[]{try{const entries=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(entries)?entries.filter((e:Entry)=>e&&Array.isArray(e.answers)&&e.answers.length>=6&&e.answers.length<=16&&e.answers.every(a=>typeof a==='string')&&typeof e.at==='string'):[];}catch{return [];}}
export default function ConditionHistory({answers,save,onRestore}:{answers:string[];save:boolean;onRestore:(answers:string[])=>void}){
 const [history,setHistory]=useState<Entry[]>(read);
 const [storageError,setStorageError]=useState(false);
 const signature=JSON.stringify(Array.from({length:16},(_,i)=>answers[i]||''));
 useEffect(()=>{if(!save||!answers.some(Boolean))return;const values=JSON.parse(signature) as string[];setHistory(old=>{if(old[0]&&JSON.stringify(old[0].answers)===signature)return old;return [{answers:values,at:new Date().toISOString()},...old.filter(e=>JSON.stringify(e.answers)!==signature)];});},[signature,save]);
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(history));setStorageError(false);}catch{setStorageError(true);}},[history]);
 return <section className="condition-history"><div className="history-title"><h3>나의 조건 기록</h3>{history.length>0&&<button onClick={()=>setHistory([])}>비우기</button>}</div><p>{storageError?'이 창에서만 기록이 유지됩니다.':'이 브라우저에 저장됩니다.'}</p>{!history.length?<div className="history-empty">추천을 받으면 조건이<br/>여기에 기록돼요.</div>:history.map(e=><button className={'history-entry '+(JSON.stringify(e.answers)===signature?'current':'')} key={JSON.stringify(e.answers)} onClick={()=>onRestore([...e.answers])}><strong>{e.answers[2]||'국가 미정'} · {e.answers[0]||'목적 미정'}</strong><dl>{e.answers.map((a,i)=>a&&<div key={i}><dt>{conditionLabels[i]}</dt><dd>{a}</dd></div>)}</dl><time>{new Date(e.at).toLocaleString('ko-KR',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}</time><span>이 조건으로 다시 보기 ↗</span></button>)}</section>;
}
