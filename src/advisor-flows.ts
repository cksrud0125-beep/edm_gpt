export const conditionLabels=['유학 유형','대상','국가','기간','예산','학업 목적','출국 시기','희망 전공','성적','영어 수준·점수','희망 과정','포트폴리오','부모 동반','교육 환경','희망 도시','숙소'];
export type StarterMode='match'|'country'|'vacation'|'beginner'|'budget'|'school';
const question=(field:number,title:string,options:string[])=>({field,title,options});
export function flowQuestion(mode:StarterMode,a:string[],entry:string,q:{title:string;options:string[]}[]){
 if(!a[0])return question(0,'어떤 유학을 생각하고 계세요?',['어학연수','해외대학','조기유학·캠프','아트유학','아직 잘 모르겠어요']);
 if(a[0]==='아직 잘 모르겠어요')return question(0,'해외에서 가장 해보고 싶은 일은 무엇인가요?',['영어 실력과 해외 경험 쌓기','대학에서 전공 공부하기','자녀의 학교·캠프 알아보기','미술·디자인 진학 준비하기']);
 const art=a[0]==='아트유학',uni=a[0]==='해외대학',junior=a[0]==='조기유학·캠프';
 let order=art?[1,7,10,11,9,6,4,2]:uni?[1,7,8,9,6,4,2]:junior?[1,10,12,3,4,2,13]:[1,5,3,6,4,2];
 if(mode==='budget')order=[4,...order.filter(i=>i!==4)];
 if(mode==='country')order=[2,...order.filter(i=>i!==2)];
 if(mode==='school'&&(uni||art))order=[1,7,...order.filter(i=>i!==1&&i!==7)];
 const field=order.find(i=>!a[i])??-1;
 const qs:Record<number,{field:number;title:string;options:string[]}>= {
 1:question(1,junior?'자녀의 나이 또는 학년을 알려주세요.':uni||art?'현재 학력은 어떻게 되세요?':'현재 어떤 상황이신가요?',junior?['초등학생','중학생','고등학생']:uni||art?['고등학생','고교 졸업','대학생','대학교 졸업']:['고등학생','대학생','20대 성인','30대 직장인','40대 이상']),
 2:question(2,'마음에 두고 있는 나라가 있나요?',['캐나다','영국','미국','호주','필리핀','아일랜드','몰타','뉴질랜드','싱가포르','추천받고 싶어요']),
 3:question(3,'얼마나 다녀오고 싶으세요?',['1개월 이내','1~3개월','3~6개월','6개월~1년','1년 이상','아직 미정']),
 4:question(4,'학비·숙소·생활비를 포함한 전체 예산은 어느 정도인가요?',['1,000만원 이하','1,000~2,000만원','2,000~3,000만원','3,000만원 이상','아직 정하지 않았어요']),
 5:question(5,'어학연수를 통해 가장 얻고 싶은 건 무엇인가요?',['영어 실력 향상','회화 집중','시험 준비','해외 경험','취업·커리어','아직 잘 모르겠어요']),
 6:question(6,uni||art?'입학을 희망하는 시기는 언제인가요?':'언제 출국하고 싶으세요?',['올해 하반기','내년 상반기','내년 하반기','아직 미정']),
 7:question(7,'어떤 전공을 생각하고 계세요?',art?['디자인','순수미술','패션','건축','아직 미정']:['경영','공학·컴퓨터','의학·보건','인문·사회','아직 미정']),
 8:question(8,'현재 성적은 어느 정도인가요? 내신이나 GPA를 직접 적어도 좋아요.',['상위권','중위권','성적 상담이 필요해요','아직 미정']),
 9:question(9,'영어 수준이나 공인 점수가 있나요?',['영어 초급','영어 중급','IELTS 준비 중','TOEFL 준비 중','아직 미정']),
 10:question(10,junior?'어떤 형태를 생각하고 계세요?':'어떤 진학 과정을 생각하고 계세요?',junior?['단기 캠프','장기 유학']:['파운데이션','학부','대학원','아직 미정']),
 11:question(11,'포트폴리오는 얼마나 준비하셨나요?',['준비 전','제작 중','준비 완료','상담이 필요해요']),
 12:question(12,'부모님이 함께 가실 계획인가요?',['부모 동반','자녀 혼자','아직 미정']),
 13:question(13,'가장 중요하게 생각하는 교육 환경은 무엇인가요?',['현지 학교 적응','체계적인 생활 관리','다양한 체험','아직 미정'])};
 return qs[field]||question(-1,'',[]);
}
export function readyForResults(mode:StarterMode,a:string[]){return !!a[0]&&flowQuestion(mode,a,'',[]).field<0;}
export function eddyReaction(a:string[]){return [a[1],a[2],a[3],a[4]].filter(Boolean).join(' · ')+(a.some(Boolean)?' 조건을 확인했어요. 알려주신 내용을 이어서 반영할게요.':'어떤 유학을 생각하고 계신지 편하게 알려주세요.');}
