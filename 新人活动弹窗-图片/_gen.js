const fs = require('fs');
const path = require('path');
const OUT = __dirname;

const HEAD = `<!DOCTYPE html><html lang="zh-Hant"><head><meta charset="UTF-8">
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  html,body{width:385px;height:550px;overflow:hidden;
    font-family:-apple-system,BlinkMacSystemFont,"PingFang TC","PingFang SC","Microsoft YaHei",sans-serif;}
  .popup{width:385px;height:550px;background:#fff;border-radius:24px;overflow:hidden;
    display:flex;flex-direction:column;}
  .art{height:312px;position:relative;display:flex;align-items:center;justify-content:center;}
  .halo{position:absolute;width:240px;height:240px;border-radius:50%;top:36px;filter:blur(2px);z-index:0;}
  .art svg{position:relative;z-index:1;}
  .body{flex:1;padding:4px 30px 30px;text-align:center;display:flex;flex-direction:column;}
  .title{font-size:27px;font-weight:800;color:#1a1a1a;letter-spacing:.5px;}
  .sub{margin-top:12px;font-size:15px;color:#8a8f96;line-height:1.5;}
  .sub b{font-weight:800;}
  .o{color:#ff7a18;}
  .cta{margin-top:auto;width:100%;height:56px;border-radius:28px;background:#111;color:#fff;
    display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:800;letter-spacing:1px;}
  .confetti{position:absolute;border-radius:2px;z-index:1;}
</style></head><body>`;
const FOOT = `</body></html>`;

const ART = {
  coin: `<svg viewBox="0 0 230 230" width="230" height="230">
    <defs><radialGradient id="coin1" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#ffd07a"/><stop offset="55%" stop-color="#ff9a2e"/><stop offset="100%" stop-color="#f5750f"/></radialGradient></defs>
    <line x1="115" y1="2" x2="115" y2="48" stroke="#d4d8de" stroke-width="4"/>
    <path d="M96 48 L115 62 L134 48 M96 48 L100 80 M134 48 L130 80 M115 62 L115 86" fill="none" stroke="#aab0b6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="115" cy="180" rx="58" ry="13" fill="rgba(245,117,15,.12)"/>
    <circle cx="115" cy="146" r="66" fill="url(#coin1)"/>
    <circle cx="115" cy="146" r="66" fill="none" stroke="#ffe2a8" stroke-width="6" opacity=".75"/>
    <circle cx="115" cy="146" r="49" fill="none" stroke="#fff" stroke-width="3" opacity=".4"/>
    <path d="M101 124 h26 a14 14 0 0 1 0 28 h-18 v18 M109 118 v62" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="92" cy="120" rx="14" ry="8" fill="#fff" opacity=".45" transform="rotate(-30 92 120)"/></svg>`,
  box: `<svg viewBox="0 0 230 230" width="230" height="230">
    <defs><linearGradient id="boxFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a7bff"/><stop offset="1" stop-color="#5a45e0"/></linearGradient>
    <linearGradient id="boxTop" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a99bff"/><stop offset="1" stop-color="#8a7bff"/></linearGradient></defs>
    <ellipse cx="115" cy="186" rx="66" ry="14" fill="rgba(90,69,224,.14)"/>
    <rect x="58" y="100" width="114" height="86" rx="10" fill="url(#boxFront)"/>
    <polygon points="58,100 115,76 172,100 115,124" fill="url(#boxTop)"/>
    <rect x="104" y="100" width="22" height="86" fill="#ffd17a"/>
    <polygon points="104,100 115,76 126,76 137,100 126,124" fill="#ffdf9a" opacity=".9"/>
    <path d="M115 76 c-22 -30 -52 -10 -26 8 M115 76 c22 -30 52 -10 26 8" fill="none" stroke="#ffd17a" stroke-width="8" stroke-linecap="round"/>
    <text x="115" y="160" text-anchor="middle" font-size="42" font-weight="800" fill="#fff" opacity=".95">?</text></svg>`,
  stack: `<svg viewBox="0 0 230 230" width="230" height="230">
    <defs><radialGradient id="coin3" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="#ffd884"/><stop offset="60%" stop-color="#ffab2e"/><stop offset="100%" stop-color="#f5860f"/></radialGradient></defs>
    <ellipse cx="115" cy="192" rx="66" ry="13" fill="rgba(245,134,15,.12)"/>
    <ellipse cx="115" cy="172" rx="52" ry="18" fill="#e08a14"/><rect x="63" y="150" width="104" height="22" fill="#f5a623"/><ellipse cx="115" cy="150" rx="52" ry="18" fill="url(#coin3)"/>
    <ellipse cx="115" cy="130" rx="44" ry="15" fill="#e08a14"/><rect x="71" y="112" width="88" height="18" fill="#f5a623"/><ellipse cx="115" cy="112" rx="44" ry="15" fill="url(#coin3)"/>
    <circle cx="115" cy="78" r="40" fill="url(#coin3)"/><circle cx="115" cy="78" r="40" fill="none" stroke="#ffe2a8" stroke-width="4" opacity=".8"/>
    <text x="115" y="92" text-anchor="middle" font-size="38" font-weight="900" fill="#fff">$</text></svg>`,
  trophy: `<svg viewBox="0 0 230 230" width="230" height="230">
    <defs><linearGradient id="cup" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe19a"/><stop offset="1" stop-color="#f5a623"/></linearGradient></defs>
    <ellipse cx="115" cy="196" rx="64" ry="13" fill="rgba(245,166,35,.14)"/>
    <rect x="92" y="158" width="46" height="14" rx="4" fill="#e08a14"/><rect x="78" y="172" width="74" height="16" rx="6" fill="#f5a623"/><rect x="106" y="132" width="18" height="30" fill="#e8951a"/>
    <path d="M70 60 h90 v18 a45 45 0 0 1 -90 0 z" fill="url(#cup)"/>
    <path d="M70 64 h-18 a16 16 0 0 0 16 22 M160 64 h18 a16 16 0 0 1 -16 22" fill="none" stroke="#f5a623" stroke-width="9" stroke-linecap="round"/>
    <text x="115" y="86" text-anchor="middle" font-size="30" font-weight="900" fill="#fff">$</text>
    <circle cx="60" cy="50" r="4" fill="#ffc24d"/><circle cx="172" cy="46" r="5" fill="#ff7a18"/><circle cx="180" cy="92" r="4" fill="#ffc24d"/></svg>`,
  cal: `<svg viewBox="0 0 230 230" width="230" height="230">
    <defs><linearGradient id="cal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a4d"/><stop offset="1" stop-color="#ff6a2c"/></linearGradient></defs>
    <ellipse cx="115" cy="194" rx="62" ry="12" fill="rgba(255,106,44,.14)"/>
    <rect x="58" y="64" width="114" height="116" rx="16" fill="#fff" stroke="#f0f0f2" stroke-width="2"/>
    <rect x="58" y="64" width="114" height="34" rx="16" fill="url(#cal)"/><rect x="58" y="80" width="114" height="18" fill="url(#cal)"/>
    <rect x="84" y="50" width="12" height="26" rx="6" fill="#ffb98a"/><rect x="134" y="50" width="12" height="26" rx="6" fill="#ffb98a"/>
    <path d="M88 132 l18 18 l34 -38" fill="none" stroke="#ff6a2c" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="178" cy="70" r="5" fill="#ffc24d"/><circle cx="50" cy="116" r="4" fill="#ff7a18"/></svg>`,
};

const CONFETTI = `<script>(function(){const w=document.getElementById('cf');if(!w)return;const c=['#ff7a18','#ffc24d','#5e7cff','#00c566','#ff5e9a'];const pos=[[20,30],[60,15],[120,40],[180,20],[40,90],[150,80],[90,120],[200,100],[10,150],[170,150],[55,170],[110,60],[30,60],[190,55],[75,45],[140,130]];for(let i=0;i<pos.length;i++){const e=document.createElement('div');e.className='confetti';const s=6+(i%5);e.style.width=s+'px';e.style.height=(s+3)+'px';e.style.background=c[i%c.length];e.style.left=pos[i][0]+'px';e.style.top=pos[i][1]+'px';e.style.opacity=.9;e.style.transform='rotate('+(i*47%360)+'deg)';w.appendChild(e);}})();</script>`;

const cards = [
  {f:'01-幸運抓抓樂', halo:'#fff0dc', art:`<div id="cf" style="position:relative;width:230px;height:230px;">${ART.coin}</div>`, title:'幸運抓抓樂', sub:'完成報名即可參與瓜分 <b class="o">$50,000</b>', cta:'立即參與', extra:CONFETTI},
  {f:'02-新人開盲盒', halo:'#ece8ff', art:ART.box, title:'新人開盲盒', sub:'註冊即送神秘盲盒，<b class="o">100% 必中</b><br>最高可得 <b style="color:#1a1a1a">1,000 USDT</b>', cta:'開盒領獎', extra:''},
  {f:'03-新人註冊禮', halo:'#ffe9d2', art:ART.stack, title:'新人註冊禮', sub:'完成註冊立領 <b class="o">$100</b> 體驗金<br>輕鬆開啟你的交易之旅', cta:'立即報名領取', extra:''},
  {f:'04-百萬獎池瓜分', halo:'#fff3d0', art:ART.trophy, title:'百萬獎池瓜分', sub:'報名即享資格，瓜分 <b class="o">$1,000,000</b><br>人人有份 · 上不封頂', cta:'立即瓜分', extra:''},
  {f:'05-新人簽到禮', halo:'#ffe2d6', art:ART.cal, title:'新人簽到禮', sub:'報名後連續簽到 7 天<br>最高領取 <b class="o">288 USDT</b> 獎勵', cta:'報名並簽到', extra:''},
];

cards.forEach(c=>{
  const html = `${HEAD}<div class="popup">
    <div class="art"><div class="halo" style="background:radial-gradient(circle,${c.halo},transparent 68%);"></div>${c.art}</div>
    <div class="body"><div class="title">${c.title}</div><div class="sub">${c.sub}</div><div class="cta">${c.cta}</div></div>
  </div>${c.extra}${FOOT}`;
  fs.writeFileSync(path.join(OUT, c.f + '.html'), html);
  console.log('wrote', c.f + '.html');
});
