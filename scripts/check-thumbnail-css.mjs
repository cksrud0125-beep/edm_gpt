const html=await (await fetch('https://www.edmuhak.com/programs')).text();
const links=[...html.matchAll(/<link[^>]*href="([^"]+\.css[^\"]*)"/g)].map(m=>new URL(m[1], 'https://www.edmuhak.com').href);
for(const url of links){const css=await(await fetch(url)).text();const rules=css.match(/--edm-f-h[35](?:-ls)?:[^;}]+|--edm-font[^;}]+|font-family:[^;}]+/g)||[];if(rules.length)console.log(url, rules.join('\n'));}
