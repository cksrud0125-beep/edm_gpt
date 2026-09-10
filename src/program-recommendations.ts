import catalog from './data/programs.json';
export type Program = typeof catalog.programs[number];
export const catalogInfo = { count: catalog.programs.length, checkedAt: catalog.checkedAt, source: catalog.source };
export type Category = 'language' | 'university' | 'junior' | 'art';
export function categoryOf(text: string): Category | null {
 if (/아트|미대|미술|디자인|포트폴리오|예술|패션/.test(text)) return 'art';
 if (/조기|캠프|자녀|부모|초등|중학생/.test(text)) return 'junior';
 if (/대학|석사|학사|학부|편입|박사|파운데이션/.test(text)) return 'university';
 if (/어학|연수|영어|워킹|워홀/.test(text)) return 'language';
 return null;
}
const countries: Record<string,string> = {canada:'캐나다',uk:'영국',usa:'미국',australia:'호주',philippines:'필리핀',ireland:'아일랜드',malta:'몰타','new-zealand':'뉴질랜드',nz:'뉴질랜드',nl:'네덜란드',singapore:'싱가포르'};
export const countryOptions = [...new Set(Object.values(countries))];
function programCategory(p: Program): Category | null {
 if (/^(major-|class-|essay-|art-|portfolio-|online-portfolio|nonmajor-portfolio|global-ap-ib|fashion-design|vacation-intensive|freshman|rca-school|ivy-league|us-major|uk-prestige|uk-art|transfer-finals|sparta)/.test(p.id)) return 'art';
 if (/^(school-|child-alone|private-acg|education-free)|early-study|junior|family-training|public-study|managed-study|canada-university-abroad/.test(p.id)) return 'junior';
 if (/^(learn-|intern-abroad|working-holiday)|language|short-term-abroad|long-term|thirty-plus|special-offer-univ|charlesenter|dndn-package/.test(p.id)) return 'language';
 return categoryOf(p.title);
}
function programCountries(p: Program): string[] {
 // Country names are used only when present in the official title or URL, never inferred from marketing copy.
 return countryOptions.filter(name => p.title.includes(name) || Object.entries(countries).some(([key,value])=>value===name&&new RegExp(`(^|-)${key}(-|$)`).test(p.id)));
}
export function recommend(answers: string[]) {
 const category = categoryOf(answers[0] || '');
 if (!category) return [];
 const age = answers[1] || '';
 const wanted = countryOptions.filter(c=>(answers[2]||'').includes(c));
 const interest = [answers[5],answers[7],answers[10],answers[12]].filter(Boolean).join(' · ').replace('대학원','석사');
 const adult = /대학생|성인|직장|회사원|공무원|[2-9]0대/.test(age) || Number(age.match(/(\d+)\s*살/)?.[1]) >= 18;
 const thirty = /[3-9]0대/.test(age) || Number(age.match(/(\d+)\s*살/)?.[1]) >= 30;
 return catalog.programs.flatMap(p => {
  if (programCategory(p)!==category) return [];
  // Time-bound promotions and events need a verified availability feed before recommendation.
  if (/특가|특별 혜택|선착순|세미나|202\d|입학심사|클리어링|무료 수속/.test(p.title)) return [];
  if (/thirty-plus/.test(p.id)&&!thirty) return [];
  if (/soldier/.test(p.id)&&!/군인/.test(age)) return [];
  if (/business-language|working-holiday|intern-abroad/.test(p.id)&&!adult) return [];
  if (/working-holiday/.test(p.id)&&!/워킹|워홀/.test(interest)) return [];
  if (/intern-abroad/.test(p.id)&&!/인턴|취업/.test(interest)) return [];
  if (/public-officer/.test(p.id)&&!/공무원/.test(age)) return [];
  const pc = programCountries(p);
  if(wanted.length && pc.length && !wanted.some(c=>pc.includes(c))) return [];
  if(category==='university') {
   if(/석사/.test(p.title)&&!/석사/.test(interest)) return [];
   if(/편입/.test(p.title)&&!/편입/.test(interest)) return [];
   if(/의대|약대|간호/.test(p.title)&&!/(의대|약대|간호)/.test(interest)) return [];
  }
  if(category==='art' && /석사|편입/.test(p.title)&&!(/석사/.test(p.title)&&/석사/.test(interest))&&!(/편입/.test(p.title)&&/편입/.test(interest))) return [];
  if(category==='junior') {
   if(/캠프/.test(interest)&&!/캠프/.test(p.title)) return [];
   if(/아이 혼자/.test(interest)&&/부모|가족|무상교육/.test(p.title)) return [];
   if(/부모 동반/.test(interest)&&/아이 혼자/.test(p.title)) return [];
  }
  if(p.id==='long-term-language'&&/4주|3개월|단기/.test(answers[3]||'')) return [];
  if(p.id==='short-term-abroad'&&/6개월|1년/.test(answers[3]||'')) return [];
  let score=10;
  const reasons=[`${answers[0]} 관심 분야에 해당하는 공식 안내입니다.`];
  if(wanted.some(c=>pc.includes(c))){score+=12;reasons.push(`희망 국가 ${wanted.filter(c=>pc.includes(c)).join('·')} 관련 프로그램입니다.`);}
  if(p.id==='thirty-plus-abroad'){score+=25;reasons.push('30대 이상을 위한 연수 플랜입니다.');}
  if(/^learn-[^-]+$|^learn-new-zealand$|^school-[^-]+$|^univ-[^-]+$/.test(p.id)) score+=5;
  const tokens=interest.split(/[\s·,/]+/).filter(t=>t.length>1&&!/미정|상담|추천/.test(t));
  const matches=tokens.filter(t=>(p.title+' '+p.description).includes(t));
  if(matches.length){score+=matches.length*8;reasons.push(`관심 내용 '${matches.join('·')}'이 공식 소개에 포함돼 있어요.`);}
  if(p.id==='short-term-abroad' && /4주|단기|1개월|3개월/.test(answers[3]||'')){score+=15;reasons.push('짧은 연수 기간을 계획할 때 참고할 수 있는 가이드입니다.');}
  if(p.id==='long-term-language' && /6개월|1년/.test(answers[3]||'')){score+=15;reasons.push('6개월 이상 연수를 다루는 안내입니다.');}
  return [{program:p,score,reasons, countryConfirmed:!wanted.length||wanted.some(c=>pc.includes(c))}];
 }).sort((a,b)=>b.score-a.score||a.program.id.localeCompare(b.program.id));
}
export function getQuestions(answers:string[]) {
 const category=categoryOf(answers[0]||'');
 return [
 {title:'어떤 유학을 생각하고 계세요?', options:['어학연수','해외대학','조기유학·캠프','아트유학','아직 잘 모르겠어요']},
 {title:category==='junior'?'유학을 떠나는 자녀의 학년은 어떻게 되나요?':'현재 학년 또는 연령대를 알려주세요.',options:category==='junior'?['초등학생','중학생','고등학생']:['고등학생','대학생','20대 성인','30대 직장인','40대 이상']},
 {title:'마음에 두고 있는 나라가 있나요?',options:[...countryOptions,'추천받고 싶어요']},
 {title:'언제, 얼마나 떠나고 싶으세요?',options:['이번 겨울 · 4주','내년 상반기 · 3개월','내년 하반기 · 6개월','1년 이상','아직 미정']},
 {title:'학비·숙소·생활비를 포함한 총예산은요?',options:['1,000만 원 이하','1,000~2,000만 원','2,000만 원 이상','상담하며 정할게요']},
 category==='university'?{title:'희망하는 진학 과정이나 전공을 알려주세요.',options:['학부','파운데이션','편입','석사','의대','약대','간호','아직 미정']}:category==='art'?{title:'어떤 준비가 가장 필요한가요? 전공도 함께 적어주세요.',options:['포트폴리오','학부 진학','석사 진학','미대 편입','패션 디자인','아직 미정']}:category==='junior'?{title:'어떤 방식의 유학을 생각하세요?',options:['부모 동반','아이 혼자','관리형 유학','캠프','아직 미정']}:{title:'가장 관심 있는 연수 목적을 골라주세요.',options:['일반 영어','비즈니스 영어','리프레시','워킹홀리데이','인턴십','아직 미정']}
 ];
}
