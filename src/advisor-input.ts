/** Local, deterministic Korean condition extraction. No LLM or remote chat service. */
export function interpretMessage(text: string, previous: string[], current = -1) {
 const next = Array.from({length:16},(_,i)=>previous[i]||'');
 const changed = new Set<number>();
 const put=(i:number,v:string)=>{next[i]=v;changed.add(i);};
 const positive=text.replace(/(?:캐나다|미국|영국|호주|어학연수|석사|미대)(?:는|은|가|이)?\s*(?:말고|아니고|제외하고|싫어|보다는)[,\s]*/g,'');
 const art=/아트|미대|미술|디자인|포트폴리오|예술|패션/.test(positive);
 const junior=/조기유학|캠프|자녀|우리\s*아이|아들|딸|부모\s*동반/.test(positive);
 const university=/대학\s*(?:진학|입학|가고)|해외대학|석사|학사|학부|편입|박사|파운데이션/.test(positive);
 const language=/어학|연수|영어|회화|워킹|워홀/.test(positive);
 const purpose=art?'아트유학':junior?'조기유학·캠프':university?'해외대학':language?'어학연수':'';
 if(purpose && (!previous[0] || current===0 || /유형|목적.*바|어학연수|해외대학|아트유학|조기유학/.test(text))){if(previous[0]&&previous[0]!==purpose)next[5]='';put(0,purpose);}
 const student=positive.match(/초등학생|초등\s*\d학년|중학생|중\s*\d학년|고등학생|고\s*\d학년|대학생/);
 const age=positive.match(/(?:만\s*)?(\d{1,2})\s*(?:살|세)(?!계|미)/);
 const decade=positive.match(/[2-9]0대(?:\s*(?:성인|직장인|이상))?/);
 if(student)put(1,student[0]);else if(age)put(1,`${age[1]}살`);else if(decade)put(1,decade[0]);else if(/직장인|회사원|공무원|군인|성인/.test(positive))put(1,positive.match(/직장인|회사원|공무원|군인|성인/)![0]);
 const aliases: [RegExp,string][]=[[/캐나다|밴쿠버|토론토|\bcanada\b/i,'캐나다'],[/영국|런던|\buk\b/i,'영국'],[/미국|뉴욕|\busa\b/i,'미국'],[/호주|시드니|\baustralia\b/i,'호주'],[/뉴질랜드|오클랜드/,'뉴질랜드'],[/필리핀|세부|바기오/,'필리핀'],[/아일랜드|더블린/,'아일랜드'],[/몰타/,'몰타'],[/네덜란드/,'네덜란드'],[/싱가포르/,'싱가포르']];
 const found=aliases.filter(([r])=>r.test(positive)).map(([,v])=>v);
 if(found.length)put(2,found.join(' · '));
 const duration=positive.match(/\d+\s*(?:~\s*\d+\s*)?(?:개월|주|달|년간)|(?:한|두|세|네)\s*달|반년|일\s*년/);
 const timing=positive.match(/(?:올해|내년)?\s*(?:상반기|하반기|겨울|여름|봄|가을)|(?:(?:20\d{2}년|내년|올해)\s*)?\d{1,2}월/);
 if(duration||timing){const normalized=duration?.[0].replace(/한\s*달/,'1개월').replace(/두\s*달/,'2개월').replace(/세\s*달/,'3개월').replace(/네\s*달/,'4개월').replace(/반년/,'6개월').replace(/일\s*년/,'1년').replace(/\s/g,'');if(normalized)put(3,normalized);if(timing)put(6,timing[0].trim());}
 const money=positive.match(/(?:\d[\d,]*(?:\.\d+)?\s*(?:~|에서)\s*)?\d[\d,]*(?:\.\d+)?\s*(?:천만|백만|억|만)\s*원?(?:\s*(?:이하|이상|정도))?|\d[\d,]*\s*원/);
 if(money)put(4,money[0].trim());
 const extra:[number,RegExp][]=[[6,/(?:내년|올해|20\d{2}년)(?:\s*\d{1,2}월|\s*[상하]반기)?/],[7,/(?:전공은?|전공[:：])\s*([^,.]+)/],[8,/(?:GPA|내신|성적)\s*[0-9.]+(?:등급|점)?/i],[9,/(?:IELTS|TOEFL|아이엘츠|토플)\s*[0-9.]+/i],[10,/파운데이션|학부|대학원/],[11,/포트폴리오\s*(?:준비 전|준비 중|제작 중|완료)/],[12,/부모 동반|자녀 혼자/],[14,/런던|토론토|밴쿠버|시드니|세부|더블린/],[15,/홈스테이|기숙사|자취/]];
 for(const [i,r] of extra){const m=positive.match(r);if(m)put(i,m[1]||m[0]);}
 const interests=[['비즈니스|업무.*영어','비즈니스 영어'],['회화|일반 영어','일반 영어'],['휴직|리프레시|재충전','리프레시'],['워킹|워홀','워킹홀리데이'],['인턴|취업','인턴십'],['포트폴리오','포트폴리오'],['패션','패션 디자인'],['석사','석사'],['학부|학사','학부'],['편입','편입'],['파운데이션','파운데이션'],['의대','의대'],['약대','약대'],['간호','간호'],['부모.*동반|함께.*아이','부모 동반'],['아이 혼자|자녀 혼자','아이 혼자'],['관리형','관리형 유학'],['캠프','캠프']].filter(([r])=>new RegExp(r).test(positive)).map(([,v])=>v);
 if(interests.length)put(5,interests.join(' · '));
 if(!changed.size&&current===0&&/모르|미정/.test(text))put(0,'아직 잘 모르겠어요');
 if(!changed.size&&current>=0&&/미정|모르|정하지|추천받|상담하며/.test(text))put(current,'아직 미정');
 if(!changed.size&&current===1&&/졸업|재학|학년|학사|석사/.test(text))put(1,text.trim());
 if(!changed.size&&current>=5&&text.trim().length>1)put(current,text.trim());
 return {answers:next,recognized:changed.size>0};
}
export function nextQuestion(answers:string[]){return Array.from({length:6},(_,i)=>i).find(i=>!answers[i])??-1;}
