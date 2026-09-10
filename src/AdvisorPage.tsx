import { useEffect, useRef, useState } from 'react';
import './advisor.css';
import AdvisorIcon from './AdvisorIcon';
import { getQuestions } from './program-recommendations';
import { interpretMessage } from './advisor-input';
import ConditionHistory from './ConditionHistory';
import { conditionLabels, eddyReaction, flowQuestion, readyForResults, type StarterMode } from './advisor-flows';
import ProgramResults from './ProgramResults';
export default function AdvisorPage() {
 const [mode,setMode]=useState<StarterMode>('match');
 const [entryAnswer,setEntryAnswer]=useState('');
 const [guidance,setGuidance]=useState('');
 const [started, setStarted] = useState(false);
 const [answers, setAnswers] = useState<string[]>([]);
 const [input, setInput] = useState('');
 const [messages, setMessages] = useState<string[]>([]);
 const [extraField,setExtraField]=useState(-1);
 const [countryDraft,setCountryDraft]=useState<string[]>([]);
 const [feedback, setFeedback] = useState('');
 const [showResults, setShowResults] = useState(false);
 const questions = getQuestions(answers);
 const bottom = useRef<HTMLDivElement>(null);
 const question=flowQuestion(mode,answers,entryAnswer,questions);
 const step=question.field;
 const finished = showResults || readyForResults(mode,answers);
 useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [answers, started, messages, showResults]);
 const reset = () => { setExtraField(-1);setCountryDraft([]);setMode('match');setEntryAnswer('');setGuidance('');setStarted(false); setAnswers([]); setInput(''); setMessages([]); setFeedback(''); setShowResults(false); };
 const submit = (value:string, selected=false) => {
  if(!value.trim())return;
  const parsed=interpretMessage(value,answers,extraField>=0?extraField:started&&!finished?step:-1);
  if(started&&!finished&&step<0){
   setEntryAnswer(value);parsed.recognized=true;
   if(step===-1){
    setGuidance(`${value}을 기준으로 살펴볼게요. 유학 목적과 예산, 기간을 먼저 알려주세요.`);
    if(value==='대학 진학')parsed.answers[0]='해외대학';
   }else{
    if(value==='영어 배우기'){parsed.answers[0]='어학연수';parsed.answers[5]='일반 영어';setGuidance('영어를 배우고 싶다면 어학연수부터 살펴볼 수 있어요. 대상과 희망 국가를 알려주세요.');}
    else if(value==='대학 다니기'){parsed.answers[0]='해외대학';setGuidance('해외대학 진학은 현재 학력과 희망 과정에 따라 준비 방법이 달라져요. 현재 상황부터 확인할게요.');}
    else setGuidance('어학연수는 언어와 현지 생활 경험, 해외대학은 학위 취득, 아트유학은 미술·디자인 진학을 준비하는 과정이에요. 관심 가는 유형을 골라보세요.');
   }
  }
  if(selected&&step===0){value=({'영어 실력과 해외 경험 쌓기':'어학연수','대학에서 전공 공부하기':'해외대학','자녀의 학교·캠프 알아보기':'조기유학·캠프','미술·디자인 진학 준비하기':'아트유학'} as Record<string,string>)[value]||value;}
  if(selected&&step>=0) { parsed.answers[step]=value;parsed.recognized=true; }
  if(extraField>=0){parsed.answers[extraField]=value;parsed.recognized=true;}
  if(parsed.answers[0]!==answers[0]){for(const i of [5,7,8,9,10,11,12,13]){if(parsed.answers[i]===answers[i])parsed.answers[i]='';}}
  setStarted(true);setMessages(m=>[...m,value.trim()]);setInput('');
  if(!parsed.recognized){setFeedback('아직 조건을 파악하지 못했어요. 국가·나이·유학 목적 등을 구체적으로 알려주세요. 예: 32살이고 캐나다에서 3개월 어학연수를 원해요.');return;}
  if(mode==='vacation'&&parsed.answers[1]&&!parsed.answers[0])parsed.answers[0]=/초|중학생|고등/.test(parsed.answers[1])?'조기유학·캠프':'어학연수';
  setAnswers(parsed.answers);setExtraField(-1);setGuidance(eddyReaction(parsed.answers));setFeedback('');
  if(readyForResults(mode,parsed.answers))setShowResults(true);
 }; return <div className="advisor-app">
  <div className="advisor-side">
   <a href="#top" className="advisor-logo"><img src="/edm-logo.svg" alt="edm 유학센터" /></a>
   <button className="new-chat" onClick={reset}><AdvisorIcon name="plus"/> 새 상담 시작 <AdvisorIcon/></button>
   <ConditionHistory answers={answers} save={started && finished} onRestore={saved=>{setMode('match');setEntryAnswer('');setGuidance('');setAnswers(saved);setStarted(true);setShowResults(true);setMessages([]);setFeedback('');setInput('');}} />
   <a href="#top" className="back-home"><AdvisorIcon name="left"/> edm 유학센터 홈</a>
  </div>
  <div className="advisor-main">
   <header className="advisor-header"><div><strong>edm 유학 GPT</strong><span className="beta">BETA</span></div><span className="header-caption"><i/> 당신의 유학을 함께 고민해요</span></header>
   <main className={'advisor-content '+(started?'conversation':'')}>
    {!started ? <div className="welcome">
     <img className="welcome-eddy" src="/eddy-wave.gif" width={61} height={96} alt="에디 유학 상담 도우미" />
     <p className="welcome-eyebrow">처음의 설렘부터, 새로운 시작까지</p>
     <h1>나에게 맞는 유학 프로그램,<br/><em>함께 찾아볼까요?</em></h1>
     <p className="welcome-copy">가고 싶은 나라와 배우고 싶은 것을 편하게 알려주세요.<br/>에디가 이야기 속 조건을 모아, 나에게 맞는 유학 프로그램을 찾아드릴게요.</p>
     <section className="recommendation-ready new-consultation-guide" aria-label="새 상담 안내"><div className="ready-top"><div className="ready-heading"><span className="ready-check" aria-hidden="true">✦</span><div><h2>나만의 유학 계획, 여기서 시작해요</h2><p>몇 가지 질문에 답하면 맞춤 프로그램을 찾아드려요.</p></div></div><div className="ready-actions"><button className="ready-primary" onClick={()=>{reset();setMode('match');setStarted(true);}}>나에게 맞는 유학 찾기</button></div></div><div className="ready-cards"><button onClick={()=>{reset();setMode('country');setStarted(true);}}><AdvisorIcon name="globe" size={24}/><div><strong>어느 나라가 나랑 잘 맞을까?</strong><p>나에게 중요한 기준부터 골라봐요</p></div><AdvisorIcon name="right"/></button><button onClick={()=>{reset();setMode('budget');setStarted(true);}}><AdvisorIcon name="clock" size={24}/><div><strong>내 예산으로 어디까지 가능할까?</strong><p>전체 예산을 기준으로 함께 살펴봐요</p></div><AdvisorIcon name="right"/></button><button onClick={()=>{reset();setMode('school');setStarted(true);}}><AdvisorIcon name="chat" size={24}/><div><strong>내 조건으로 갈 수 있는 학교는?</strong><p>학력과 희망 전공부터 알아봐요</p></div><AdvisorIcon name="right"/></button></div></section>

    </div> : <div className="chat-flow"><div className="chat-intro"><span className="bot-symbol"><AdvisorIcon name="chat" size={24}/></span><div><strong>당신만의 유학을 찾아가는 중이에요</strong><p>선택하거나 아래에 직접 답변해 주세요.</p></div><button onClick={reset}>처음으로</button></div>{messages.map((message,i)=><div className="user-message" key={i}>{message}</div>)}{answers.some(Boolean)&&<div className="parsed-conditions"><strong>말씀해 주신 조건</strong><div>{answers.map((a,i)=>a&&<button key={i} onClick={()=>{setAnswers(previous=>previous.map((v,j)=>i===j?'':v));}}>{conditionLabels[i]} · {a} <AdvisorIcon name="close"/></button>)}</div><button onClick={()=>setExtraField(9)}>+ 조건 추가하기</button>{extraField>=0&&<label>추가할 조건 <select value={extraField} onChange={e=>setExtraField(Number(e.target.value))}>{[9,14,15,6,5,13].map(i=><option value={i} key={i}>{conditionLabels[i]}</option>)}</select><small>아래 입력창에 값을 적어 주세요.</small></label>}<small>조건을 눌러 지우거나, 아래에 변경할 내용을 입력해 주세요.</small></div>}{feedback&&<p role="status" className="input-feedback">{feedback}</p>}{guidance&&<p className="flow-guidance">{guidance}</p>}{!finished?<><h2>{question.title}</h2><div className="answer-options">{question.options.map(x=><button key={x} aria-pressed={step===2?countryDraft.includes(x):undefined} onClick={()=>step===2?setCountryDraft(v=>v.includes(x)?v.filter(c=>c!==x):[...v,x]):submit(x,true)}>{x} <span><AdvisorIcon name="plus"/></span></button>)}</div>{step===2&&<button className="restart-result" disabled={!countryDraft.length} onClick={()=>{submit(countryDraft.join(" · "),true);setCountryDraft([]);}}>선택한 국가로 계속하기</button>}{answers[0]&&<button className="restart-result" onClick={()=>setShowResults(true)}>지금 조건으로 먼저 추천받기 ↗</button>}</>:<ProgramResults key={answers.join('|')} answers={answers} onRestart={reset} onRefine={()=>setShowResults(false)} />}<div ref={bottom}/></div>}
   </main>
   <div className="composer-area"><form className="composer" onSubmit={e=>{e.preventDefault();submit(input);}}><textarea rows={2} aria-label="유학 상담 메시지" placeholder={finished?'예: 캐나다 말고 영국으로 바꿔줘. 기간은 6개월이야.':started?'나이, 국가, 목적을 한 번에 적어도 좋아요.':'예: 내년에 휴학하고 6개월 정도 영어 공부하러 가고 싶어. 예산은 1,500만원 정도야.'} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();submit(input);}}}/><div className="composer-bottom"><span>{started?'나에게 맞춰가는 유학 상담':'아직 계획이 없어도 괜찮아요'}</span><button aria-label="메시지 보내기" disabled={!input.trim()}><AdvisorIcon name="send" size={24}/></button></div></form><p className="composer-disclaimer">edm 공식 프로그램 목록 기반 추천입니다. 입력한 문장의 주요 조건을 규칙으로 분석합니다. 비용·일정·지원 자격은 상담 시 확인이 필요합니다.</p></div>
  </div>
 </div>;
}
