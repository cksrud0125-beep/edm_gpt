import { conditionLabels, readyForResults } from './advisor-flows';
import { countrySuggestions } from './country-suggestions';
import { useState } from 'react';
import { catalogInfo, recommend, type Program } from './program-recommendations';
function ProgramThumbnail({program:p}:{program:Program}) {return <div className="result-artwork">{p.image&&<img src={p.image} alt="" loading="lazy"/>}<h4 style={{color:p.titleColor}}>{p.titleLines.map((line,i)=><span key={i}>{line}</span>)}</h4><span className="result-artwork-plus" aria-hidden="true">+</span></div>;}
export default function ProgramResults({answers,onRestart,onRefine}:{answers:string[];onRestart:()=>void;onRefine:()=>void}) {
 const results=recommend(answers);
 const [filter,setFilter]=useState('전체');
 const filtered=results.filter(r=>filter==='전체'||(filter==='국가 일치'?r.countryConfirmed:!r.countryConfirmed));
 const editConditions=()=>{document.querySelector<HTMLTextAreaElement>('.composer textarea')?.focus();document.querySelector('.composer')?.scrollIntoView({behavior:'smooth',block:'center'});};
 const countries=countrySuggestions(answers);
 const [handoff,setHandoff]=useState('');
 const copyConditions=async()=>{try{await navigator.clipboard.writeText(answers.map((v,i)=>v?`${conditionLabels[i]}: ${v}`:'').filter(Boolean).join('\n'));setHandoff('조건을 복사했어요. 상담 신청서에 붙여 넣어 주세요.');}catch{setHandoff('자동 복사를 사용할 수 없어요. 위 조건을 선택해 복사해 주세요.');}};
 const labels=conditionLabels;
 return <section className="recommendation-dashboard">
  <section className="selected-summary" aria-label="내가 선택한 유학 조건">
   <header><div><span className="summary-eyebrow">나의 유학 계획</span><h2>선택하신 조건을 정리했어요</h2><p>아래 조건을 바탕으로 {results.length}개의 프로그램을 찾았어요.</p></div><button onClick={editConditions}>조건 수정 ↗</button></header>
   <dl>{answers.map((answer,i)=>answer&&<div key={i}><dt>{labels[i]}</dt><dd>{answer}</dd></div>)}</dl>
   {!results.length&&<p>현재 조건에 맞는 프로그램이 없어요. 국가나 유학 목적을 바꿔 주세요.</p>}
  </section>
  <section className="eddy-analysis"><h3>에디의 조건 분석</h3><p>{answers.filter(Boolean).slice(0,6).join(' · ')} 조건으로 공식 목록을 비교했어요. {countries[0]?`우선 ${countries[0].country}의 프로그램부터 살펴보세요.`:'희망 국가와 목적을 더 알려주시면 비교할 수 있어요.'}</p><small>국가 순위는 공식 목록에서 확인된 프로그램 수를 기준으로 정렬했습니다. 비용 적합도나 입학 가능성을 판단한 결과는 아니에요.</small>{!readyForResults('match',answers)&&<><p>현재 알려주신 조건을 기준으로 우선 추천했어요. 조건을 조금 더 알려주시면 더 정확하게 찾아드릴 수 있어요.</p><button className="restart-result" onClick={onRefine}>추천 정확도 높이기</button></>}</section>
  {!!countries.length&&<section><h3 className="results-section-title">함께 비교할 국가 TOP {countries.length}</h3><div className="country-comparison">{countries.map((c,i)=><article key={c.country}><h4>{i+1}. {c.country}</h4><p>추천 이유 · 국가가 확인된 프로그램 {c.count}개를 비교할 수 있어요.</p><dl><dt>예상 비용 범위</dt><dd>기간·학교·숙소별 견적 확인 필요</dd><dt>검토할 기간</dt><dd>{answers[3]||'희망 기간을 알려주세요'}</dd><dt>장점</dt><dd>공식 국가별 프로그램을 확인하며 준비할 수 있어요.</dd><dt>고려할 점</dt><dd>비자·입학 조건·모집 일정은 개별 확인이 필요해요.</dd></dl></article>)}</div></section>}
  <section className="all-programs"><h3 className="results-section-title">나에게 추천하는 프로그램 <span>{results.length}</span></h3><div className="result-tabs" aria-label="추천 프로그램 필터">{['전체','국가 일치','국가 확인 필요'].map(t=><button key={t} aria-pressed={filter===t} className={filter===t?'active':''} onClick={()=>setFilter(t)}>{t}</button>)}</div><div className="result-directory">{filtered.map(({program:p,countryConfirmed,reasons},i)=><a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="result-poster"><ProgramThumbnail program={p}/><span className="result-poster-badge">추천 {i+1} · {countryConfirmed?'국가 일치':'국가 확인 필요'}</span><p>{p.description}</p><div className="result-poster-reason"><strong>추천 이유</strong> {reasons.join(' · ')}</div></a>)}</div>{!filtered.length&&<p className="directory-empty">이 분류에 해당하는 프로그램이 없어요. 다른 필터를 선택해 주세요.</p>}</section>
  <div className="result-footer"><button className="restart-result" onClick={editConditions}>에디에게 더 물어보기</button><button className="restart-result" onClick={copyConditions}>상담 조건 복사</button><a href="https://www.edmuhak.com/inquiry/consultation" target="_blank" rel="noopener noreferrer">전문 상담사에게 상담받기 ↗</a><p role="status">{handoff}</p><button className="restart-result" onClick={onRestart}>조건 바꾸고 다시 찾기 ↗</button><a href={catalogInfo.source} target="_blank" rel="noopener noreferrer">edm 전체 프로그램 보기 ↗</a></div><p className="catalog-source">공식 목록 확인일 {catalogInfo.checkedAt.slice(0,10)} · 조건에 맞는 추천 전체를 표시합니다. 비용·일정·지원 자격은 상담 시 확인이 필요합니다.</p>
 </section>;
}
