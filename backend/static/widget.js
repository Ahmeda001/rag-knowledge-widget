(()=>{var Ae=Object.defineProperty;var Ce=(r,e,t)=>e in r?Ae(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var U=(r,e,t)=>()=>{if(t)throw t[0];try{return r&&(e=r(r=0)),e}catch(s){throw t=[s],s}};var ve=(r,e)=>()=>{try{return e||r((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};var x=(r,e,t)=>Ce(r,typeof e!="symbol"?e+"":e,t);var le,ie=U(()=>{le=`/* :host {\r
  all: initial;\r
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\r
}\r
\r
.widget-container {\r
  position: fixed;\r
  bottom: 20px;\r
  right: 20px;\r
  z-index: 999999;\r
}\r
\r
.chat-bubble {\r
  width: 56px;\r
  height: 56px;\r
  border-radius: 50%;\r
  background-color: #2563eb;\r
  color: #ffffff;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  cursor: pointer;\r
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\r
  font-size: 24px;\r
}\r
\r
.chat-box {\r
  display: none;\r
  width: 350px;\r
  height: 480px;\r
  background-color: #ffffff;\r
  border-radius: 12px;\r
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\r
  flex-direction: column;\r
  margin-bottom: 12px;\r
  overflow: hidden;\r
  border: 1px solid #e5e7eb;\r
}\r
\r
.chat-box.open {\r
  display: flex;\r
}\r
\r
.chat-header {\r
  background-color: #2563eb;\r
  color: white;\r
  padding: 12px 16px;\r
  font-weight: 600;\r
  font-size: 14px;\r
}\r
\r
.chat-messages {\r
  flex: 1;\r
  padding: 12px;\r
  overflow-y: auto;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 8px;\r
}\r
\r
.msg {\r
  max-width: 80%;\r
  padding: 8px 12px;\r
  border-radius: 8px;\r
  font-size: 13px;\r
  line-height: 1.4;\r
  word-wrap: break-word;\r
}\r
\r
.msg.user {\r
  align-self: flex-end;\r
  background-color: #2563eb;\r
  color: white;\r
}\r
\r
.msg.bot {\r
  align-self: flex-start;\r
  background-color: #f3f4f6;\r
  color: #111827;\r
}\r
\r
.chat-input-area {\r
  display: flex;\r
  padding: 8px;\r
  border-top: 1px solid #e5e7eb;\r
}\r
\r
.chat-input {\r
  flex: 1;\r
  border: 1px solid #d1d5db;\r
  border-radius: 6px;\r
  padding: 8px;\r
  font-size: 13px;\r
  outline: none;\r
}\r
\r
.chat-submit {\r
  background-color: #2563eb;\r
  color: white;\r
  border: none;\r
  border-radius: 6px;\r
  margin-left: 6px;\r
  padding: 0 12px;\r
  cursor: pointer;\r
  font-size: 13px;\r
} */\r
\r
\r
:host {\r
  all: initial;\r
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\r
  box-sizing: border-box;\r
}\r
\r
*, *::before, *::after {\r
  box-sizing: inherit;\r
}\r
\r
/* 1. CONTAINER & FLOATING LAUNCHER */\r
.widget-container {\r
  position: fixed;\r
  bottom: 24px;\r
  right: 24px;\r
  z-index: 999999;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: flex-end;\r
}\r
\r
.chat-bubble {\r
  width: 58px;\r
  height: 58px;\r
  border-radius: 50%;\r
  background-color: #E4572E;\r
  color: #FFFFFF;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  cursor: pointer;\r
  border: 2px solid #1C1712;\r
  box-shadow: 4px 4px 0 0 #1C1712;\r
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.15s ease, box-shadow 0.2s ease;\r
}\r
\r
.chat-bubble:hover {\r
  transform: scale(1.06) translate(-2px, -2px);\r
  background-color: #d04b23;\r
  box-shadow: 6px 6px 0 0 #1C1712;\r
}\r
\r
.chat-bubble:active {\r
  transform: scale(0.96) translate(0, 0);\r
  box-shadow: 2px 2px 0 0 #1C1712;\r
}\r
\r
/* 2. MAIN CHAT BOX */\r
.chat-box {\r
  display: flex;\r
  flex-direction: column;\r
  width: 380px;\r
  height: 540px;\r
  max-width: calc(100vw - 32px);\r
  max-height: calc(100vh - 100px);\r
  background-color: #FFFFFF;\r
  border-radius: 20px;\r
  border: 2px solid #1C1712;\r
  box-shadow: 8px 8px 0 0 #1C1712;\r
  margin-bottom: 16px;\r
  overflow: hidden;\r
  opacity: 0;\r
  visibility: hidden;\r
  transform: translateY(20px) scale(0.95);\r
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.25s;\r
}\r
\r
.chat-box.open {\r
  opacity: 1;\r
  visibility: visible;\r
  transform: translateY(0) scale(1);\r
}\r
\r
.chat-header {\r
  background-color: #FBF7F0;\r
  border-bottom: 2px solid #1C1712;\r
  padding: 16px;\r
  font-weight: 700;\r
  color: #1C1712;\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
}\r
\r
/* 3. MESSAGES AREA */\r
.chat-messages {\r
  flex: 1;\r
  padding: 16px;\r
  overflow-y: auto;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 14px;\r
  background-color: #FAFAFA;\r
}\r
\r
.msg {\r
  padding: 10px 14px;\r
  border-radius: 14px;\r
  font-size: 13.5px;\r
  line-height: 1.5;\r
  word-break: break-word;\r
}\r
\r
.msg.user {\r
  align-self: flex-end;\r
  background-color: #1C1712;\r
  color: #FFFFFF;\r
  border-bottom-right-radius: 4px;\r
  max-width: 82%;\r
}\r
\r
/* 4. BOT WRAPPER & MARKDOWN BUBBLE */\r
.bot-msg-wrapper {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: flex-start;\r
  gap: 6px;\r
  max-width: 85%;\r
}\r
\r
.msg.bot {\r
  width: 100%;\r
  min-height: 24px;\r
  background-color: #FFFFFF;\r
  color: #1C1712;\r
  border: 1.5px solid #1C1712;\r
  border-bottom-left-radius: 4px;\r
  box-shadow: 2.5px 2.5px 0 0 #1C1712;\r
  padding: 12px 14px;\r
}\r
\r
.msg.bot p {\r
  margin: 0 0 8px 0;\r
}\r
\r
.msg.bot p:last-child {\r
  margin-bottom: 0;\r
}\r
\r
.msg.bot ul, .msg.bot ol {\r
  margin: 4px 0 8px 0;\r
  padding-left: 18px;\r
}\r
\r
.msg.bot li {\r
  margin-bottom: 4px;\r
}\r
\r
.msg.bot strong {\r
  color: #1C1712;\r
  font-weight: 600;\r
}\r
\r
/* 5. TYPING / PROCESSING INDICATOR */\r
.typing-indicator {\r
  display: flex;\r
  align-items: center;\r
  gap: 5px;\r
  padding: 10px 14px;\r
  background-color: #FFFFFF;\r
  border: 1.5px solid #1C1712;\r
  border-radius: 14px;\r
  border-bottom-left-radius: 4px;\r
  box-shadow: 2.5px 2.5px 0 0 #1C1712;\r
  width: fit-content;\r
}\r
\r
.typing-indicator span {\r
  width: 7px;\r
  height: 7px;\r
  background-color: #E4572E;\r
  border-radius: 50%;\r
  display: inline-block;\r
  animation: typingBounce 1.4s infinite ease-in-out both;\r
}\r
\r
.typing-indicator span:nth-child(1) { animation-delay: 0s; }\r
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }\r
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }\r
\r
@keyframes typingBounce {\r
  0%, 80%, 100% {\r
    transform: scale(0.6);\r
    opacity: 0.4;\r
  }\r
  40% {\r
    transform: scale(1.1);\r
    opacity: 1;\r
  }\r
}\r
\r
/* 6. SOURCE PILLS */\r
.sources-container {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 6px;\r
  margin-top: 2px;\r
}\r
\r
.source-pill {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 5px;\r
  padding: 4px 10px;\r
  background-color: #FBF7F0;\r
  border: 1px solid #1C1712;\r
  border-radius: 20px;\r
  font-size: 11px;\r
  font-weight: 500;\r
  color: #1C1712;\r
  box-shadow: 1px 1px 0 0 #1C1712;\r
  line-height: 1.2;\r
}\r
\r
.source-pill svg {\r
  flex-shrink: 0;\r
  fill: #E4572E;\r
}\r
\r
/* 7. INPUT FOOTER */\r
.chat-input-area {\r
  display: flex;\r
  align-items: center;\r
  padding: 12px;\r
  background-color: #FFFFFF;\r
  border-top: 2px solid #1C1712;\r
  gap: 8px;\r
}\r
\r
.chat-input {\r
  flex: 1;\r
  border: 1.5px solid #1C1712;\r
  border-radius: 12px;\r
  padding: 10px 14px;\r
  font-size: 13.5px;\r
  color: #1C1712;\r
  background-color: #FBF7F0;\r
  outline: none;\r
}\r
\r
.chat-submit {\r
  background-color: #E4572E;\r
  color: #FFFFFF;\r
  border: 1.5px solid #1C1712;\r
  border-radius: 12px;\r
  padding: 8px 14px;\r
  font-weight: 600;\r
  cursor: pointer;\r
  box-shadow: 2px 2px 0 0 #1C1712;\r
}`});async function ae(r,e,t,s,n){let i=await fetch(`${r}/api/v1/chat/stream`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace_id:e,query:t})});if(!i.ok){let o=await i.json().catch(()=>({}));throw new Error(`Server returned ${i.status}: ${JSON.stringify(o)}`)}let a=i.body.getReader(),l=new TextDecoder("utf-8"),c="";for(;;){let{done:o,value:h}=await a.read();if(o)break;c+=l.decode(h,{stream:!0});let p=c.replace(/\r\n/g,`
`).split(`

`);c=p.pop()||"";for(let d of p){let f=d.split(`
`);for(let g of f){let b=g.trim();if(b.startsWith("data: "))try{let m=b.replace(/^data:\s*/,""),w=JSON.parse(m);w.type==="sources"&&n?n(w.data):w.type==="text"&&s&&w.data&&s(w.data)}catch(m){console.error("[widget] Error parsing SSE line:",m,b)}}}}}var oe=U(()=>{});function Y(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}function xe(r){P=r}function L(r){let e=[];return t=>{let s=Math.max(0,Math.min(3,t-1)),n=e[s];return n||(n=r(s),e[s]=n),n}}function u(r,e=""){let t=typeof r=="string"?r:r.source,s={replace:(n,i)=>{let a=typeof i=="string"?i:i.source;return a=a.replace(y.caret,"$1"),t=t.replace(n,a),s},getRegex:()=>new RegExp(t,e)};return s}function z(r,e){if(e){if(y.escapeTest.test(r))return r.replace(y.escapeReplace,he)}else if(y.escapeTestNoEncode.test(r))return r.replace(y.escapeReplaceNoEncode,he);return r}function ue(r){try{r=encodeURI(r).replace(y.percentDecode,"%")}catch{return null}return r}function de(r,e){let t=r.replace(y.findPipe,(i,a,l)=>{let c=!1,o=a;for(;--o>=0&&l[o]==="\\";)c=!c;return c?"|":" |"}),s=t.split(y.splitPipe),n=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;n<s.length;n++)s[n]=s[n].trim().replace(y.slashPipe,"|");return s}function C(r,e,t){let s=r.length;if(s===0)return"";let n=0;for(;n<s;){let i=r.charAt(s-n-1);if(i===e&&!t)n++;else if(i!==e&&t)n++;else break}return r.slice(0,s-n)}function ge(r){let e=r.split(`
`),t=e.length-1;for(;t>=0&&y.blankLine.test(e[t]);)t--;return e.length-t<=2?r:e.slice(0,t+1).join(`
`)}function $t(r,e){if(r.indexOf(e[1])===-1)return-1;let t=0;for(let s=0;s<r.length;s++)if(r[s]==="\\")s++;else if(r[s]===e[0])t++;else if(r[s]===e[1]&&(t--,t<0))return s;return t>0?-2:-1}function Rt(r,e=0){let t=e,s="";for(let n of r)if(n==="	"){let i=4-t%4;s+=" ".repeat(i),t+=i}else s+=n,t++;return s}function ke(r,e,t,s,n){let i=e.href,a=e.title||null,l=r[1].replace(n.other.outputLinkReplace,"$1");s.state.inLink=!0;let c={type:r[0].charAt(0)==="!"?"image":"link",raw:t,href:i,title:a,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,c}function Tt(r,e,t){let s=r.match(t.other.indentCodeCompensation);if(s===null)return e;let n=s[1];return e.split(`
`).map(i=>{let a=i.match(t.other.beginningSpace);if(a===null)return i;let[l]=a;return l.length>=n.length?i.slice(n.length):i}).join(`
`)}function k(r,e){return E.parse(r,e)}function At(...r){return E.use(...r),k.defaults=E.defaults,xe(k.defaults),k}var P,_,Ee,y,Pe,Le,Fe,N,Ie,V,fe,be,Be,K,qe,ee,Ne,Me,G,te,De,me,He,Oe,Ze,re,ce,Qe,je,Ge,Ue,we,We,A,F,M,Xe,Je,ye,Ye,Ve,Ke,Se,et,tt,rt,nt,$e,st,it,lt,at,ot,ct,pt,ht,ut,dt,gt,kt,xt,ft,Z,bt,Re,Te,mt,pe,ne,wt,W,yt,H,B,St,he,Q,R,j,se,T,O,q,zt,E,Pt,Lt,Ft,It,Bt,qt,ze=U(()=>{P=Y();_={exec:()=>null};Ee=((r="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+r)}catch{return!1}})(),y={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:r=>new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:L(r=>new RegExp(`^ {0,${r}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:L(r=>new RegExp(`^ {0,${r}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:L(r=>new RegExp(`^ {0,${r}}(?:\`\`\`|~~~)`)),headingBeginRegex:L(r=>new RegExp(`^ {0,${r}}#`)),htmlBeginRegex:L(r=>new RegExp(`^ {0,${r}}<(?:[a-z].*>|!--)`,"i")),blockquoteBeginRegex:L(r=>new RegExp(`^ {0,${r}}>`))},Pe=/^(?:[ \t]*(?:\n|$))+/,Le=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Fe=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,N=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ie=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,V=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,fe=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,be=u(fe).replace(/bull/g,V).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Be=u(fe).replace(/bull/g,V).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),K=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,qe=/^[^\n]+/,ee=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ne=u(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ee).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Me=u(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,V).getRegex(),G="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",te=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,De=u("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",te).replace("tag",G).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),me=r=>u(K).replace("hr",N).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list",r).replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",G).getRegex(),He=me(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),Oe=me(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),Ze=u(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Oe).getRegex(),re={blockquote:Ze,code:Le,def:Ne,fences:Fe,heading:Ie,hr:N,html:De,lheading:be,list:Me,newline:Pe,paragraph:He,table:_,text:qe},ce=u("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",N).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",G).getRegex(),Qe={...re,lheading:Be,table:ce,paragraph:u(K).replace("hr",N).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ce).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",G).getRegex()},je={...re,html:u(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",te).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:u(K).replace("hr",N).replace("heading",` *#{1,6} *[^
]`).replace("lheading",be).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Ge=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ue=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,we=/^( {2,}|\\)\n(?!\s*$)/,We=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,A=/[\p{P}\p{S}]/u,F=/[\s\p{P}\p{S}]/u,M=/[^\s\p{P}\p{S}]/u,Xe=u(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,F).getRegex(),Je=/[\p{Pi}\p{Ps}"']/u,ye=/(?!~)[\p{P}\p{S}]/u,Ye=/(?!~)[\s\p{P}\p{S}]/u,Ve=/(?:[^\s\p{P}\p{S}]|~)/u,Ke=u(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ee?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Se=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,et=u(Se,"u").replace(/punct/g,A).getRegex(),tt=u(Se,"u").replace(/punct/g,ye).getRegex(),rt=/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,nt=u(rt,"u").replace(/openQuote/g,Je).replace(/punct/g,A).getRegex(),$e="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",st=u($e,"gu").replace(/notPunctSpace/g,M).replace(/punctSpace/g,F).replace(/punct/g,A).getRegex(),it=u($e,"gu").replace(/notPunctSpace/g,Ve).replace(/punctSpace/g,Ye).replace(/punct/g,ye).getRegex(),lt="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)",at=u(lt,"gu").replace(/notPunctSpace/g,M).replace(/punctSpace/g,F).replace(/punct/g,A).getRegex(),ot=u("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,M).replace(/punctSpace/g,F).replace(/punct/g,A).getRegex(),ct="^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)",pt=u(ct,"gu").replace(/notPunctSpace/g,M).replace(/punctSpace/g,F).replace(/punct/g,A).getRegex(),ht=u(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,A).getRegex(),ut="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",dt=u(ut,"gu").replace(/notPunctSpace/g,M).replace(/punctSpace/g,F).replace(/punct/g,A).getRegex(),gt=u(/\\(punct)/,"gu").replace(/punct/g,A).getRegex(),kt=u(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),xt=u(te).replace("(?:-->|$)","-->").getRegex(),ft=u("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",xt).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Z=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,bt=u(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",Z).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Re=u(/^!?\[(label)\]\[(ref)\]/).replace("label",Z).replace("ref",ee).getRegex(),Te=u(/^!?\[(ref)\](?:\[\])?/).replace("ref",ee).getRegex(),mt=u("reflink|nolink(?!\\()","g").replace("reflink",Re).replace("nolink",Te).getRegex(),pe=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ne={_backpedal:_,anyPunctuation:gt,autolink:kt,blockSkip:Ke,br:we,code:Ue,del:_,delLDelim:_,delRDelim:_,emStrongLDelim:et,emStrongRDelimAst:st,emStrongRDelimUnd:ot,escape:Ge,link:bt,nolink:Te,punctuation:Xe,reflink:Re,reflinkSearch:mt,tag:ft,text:We,url:_},wt={...ne,emStrongLDelim:nt,emStrongRDelimAst:at,emStrongRDelimUnd:pt,link:u(/^!?\[(label)\]\((.*?)\)/).replace("label",Z).getRegex(),reflink:u(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Z).getRegex()},W={...ne,emStrongRDelimAst:it,emStrongLDelim:tt,delLDelim:ht,delRDelim:dt,url:u(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",pe).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:u(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",pe).getRegex()},yt={...W,br:u(we).replace("{2,}","*").getRegex(),text:u(W.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},H={normal:re,gfm:Qe,pedantic:je},B={normal:ne,gfm:W,breaks:yt,pedantic:wt},St={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},he=r=>St[r];Q=class{constructor(r){x(this,"options");x(this,"rules");x(this,"lexer");this.options=r||P}space(r){let e=this.rules.block.newline.exec(r);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(r){let e=this.rules.block.code.exec(r);if(e){let t=this.options.pedantic?e[0]:ge(e[0]),s=t.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t,codeBlockStyle:"indented",text:s}}}fences(r){let e=this.rules.block.fences.exec(r);if(e){let t=e[0],s=Tt(t,e[3]||"",this.rules);return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:s}}}heading(r){let e=this.rules.block.heading.exec(r);if(e){let t=e[2].trim();if(this.rules.other.endingHash.test(t)){let s=C(t,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(t=s.trim())}return{type:"heading",raw:C(e[0],`
`),depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(r){let e=this.rules.block.hr.exec(r);if(e)return{type:"hr",raw:C(e[0],`
`)}}blockquote(r){let e=this.rules.block.blockquote.exec(r);if(e){let t=C(e[0],`
`).split(`
`),s="",n="",i=[];for(;t.length>0;){let a=!1,l=[],c;for(c=0;c<t.length;c++)if(this.rules.other.blockquoteStart.test(t[c]))l.push(t[c]),a=!0;else if(!a)l.push(t[c]);else break;t=t.slice(c);let o=l.join(`
`),h=o.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${o}`:o,n=n?`${n}
${h}`:h;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,i,!0),this.lexer.state.top=p,t.length===0)break;let d=i.at(-1);if(d?.type==="code")break;if(d?.type==="blockquote"){let f=d,g=t.join(`
`),b=f.raw+`
`+g.replace(this.rules.other.blockquoteSetextReplace2,""),m=this.blockquote(b);i[i.length-1]=m,s=`${s}
${g}`,n=n.substring(0,n.length-f.text.length)+m.text;break}else if(d?.type==="list"){let f=d,g=f.raw+`
`+t.join(`
`),b=this.list(g);i[i.length-1]=b,s=s.substring(0,s.length-d.raw.length)+b.raw,n=n.substring(0,n.length-f.raw.length)+b.raw,t=g.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:i,text:n}}}list(r){let e=this.rules.block.list.exec(r);if(e){let t=e[1].trim(),s=t.length>1,n={type:"list",raw:"",ordered:s,start:s?+t.slice(0,-1):"",loose:!1,items:[]};t=s?`\\d{1,9}\\${t.slice(-1)}`:`\\${t}`,this.options.pedantic&&(t=s?t:"[*+-]");let i=this.rules.other.listItemRegex(t),a=!1;for(;r;){let c=!1,o="",h="";if(!(e=i.exec(r))||this.rules.block.hr.test(r))break;o=e[0],r=r.substring(o.length);let p=Rt(e[2].split(`
`,1)[0],e[1].length),d=r.split(`
`,1)[0],f=!p.trim(),g=0;if(this.options.pedantic?(g=2,h=p.trimStart()):f?g=e[1].length+1:(g=p.search(this.rules.other.nonSpaceChar),g=g>4?1:g,h=p.slice(g),g+=e[1].length),f&&this.rules.other.blankLine.test(d)&&(o+=d+`
`,r=r.substring(d.length+1),c=!0),!c){let b=this.rules.other.nextBulletRegex(g),m=this.rules.other.hrRegex(g),w=this.rules.other.fencesBeginRegex(g),v=this.rules.other.headingBeginRegex(g),D=this.rules.other.htmlBeginRegex(g),I=this.rules.other.blockquoteBeginRegex(g);for(;r;){let S=r.split(`
`,1)[0],$;if(d=S,this.options.pedantic?(d=d.replace(this.rules.other.listReplaceNesting,"  "),$=d):$=d.replace(this.rules.other.tabCharGlobal,"    "),w.test(d)||v.test(d)||D.test(d)||I.test(d)||b.test(d)||m.test(d))break;if($.search(this.rules.other.nonSpaceChar)>=g||!d.trim())h+=`
`+$.slice(g);else{if(f||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||w.test(p)||v.test(p)||m.test(p))break;h+=`
`+d}f=!d.trim(),o+=S+`
`,r=r.substring(S.length+1),p=$.slice(g)}}n.loose||(a?n.loose=!0:this.rules.other.doubleBlankLine.test(o)&&(a=!0)),n.items.push({type:"list_item",raw:o,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),n.raw+=o}let l=n.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let c of n.items)if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),!n.loose){let o=c.tokens.filter(p=>p.type==="space"),h=o.length>0&&o.some(p=>this.rules.other.anyLine.test(p.raw));n.loose=h}for(let c of n.items){let o=c.tokens[0];if(c.task&&(o?.type==="text"||o?.type==="paragraph")){c.text=c.text.replace(this.rules.other.listReplaceTask,""),o.raw=o.raw.replace(this.rules.other.listReplaceTask,""),o.text=o.text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}let h=this.rules.other.listTaskCheckbox.exec(c.raw);if(h){let p={type:"checkbox",raw:h[0]+" ",checked:h[0]!=="[ ]"};c.checked=p.checked,n.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=p.raw+c.tokens[0].raw,c.tokens[0].text=p.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(p)):c.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):c.tokens.unshift(p)}}else c.task&&(c.task=!1)}if(n.loose)for(let c of n.items){c.loose=!0;for(let o of c.tokens)o.type==="text"&&(o.type="paragraph")}return n}}html(r){let e=this.rules.block.html.exec(r);if(e){let t=ge(e[0]);return{type:"html",block:!0,raw:t,pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:t}}}def(r){let e=this.rules.block.def.exec(r);if(e){let t=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:t,raw:C(e[0],`
`),href:s,title:n}}}table(r){let e=this.rules.block.table.exec(r);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let t=de(e[1]),s=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:C(e[0],`
`),header:[],align:[],rows:[]};if(t.length===s.length){for(let a of s)this.rules.other.tableAlignRight.test(a)?i.align.push("right"):this.rules.other.tableAlignCenter.test(a)?i.align.push("center"):this.rules.other.tableAlignLeft.test(a)?i.align.push("left"):i.align.push(null);for(let a=0;a<t.length;a++)i.header.push({text:t[a],tokens:this.lexer.inline(t[a]),header:!0,align:i.align[a]});for(let a of n)i.rows.push(de(a,i.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[c]})));return i}}lheading(r){let e=this.rules.block.lheading.exec(r);if(e){let t=e[1].trim();return{type:"heading",raw:C(e[0],`
`),depth:e[2].charAt(0)==="="?1:2,text:t,tokens:this.lexer.inline(t)}}}paragraph(r){let e=this.rules.block.paragraph.exec(r);if(e){let t=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(r){let e=this.rules.block.text.exec(r);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(r){let e=this.rules.inline.escape.exec(r);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(r){let e=this.rules.inline.tag.exec(r);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(r){let e=this.rules.inline.link.exec(r);if(e){let t=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;let i=C(t.slice(0,-1),"\\");if((t.length-i.length)%2===0)return}else{let i=$t(e[2],"()");if(i===-2)return;if(i>-1){let a=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,a).trim(),e[3]=""}}let s=e[2],n="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(s);i&&(s=i[1],n=i[3])}else n=e[3]?e[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?s=s.slice(1):s=s.slice(1,-1)),ke(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(r,e){let t;if((t=this.rules.inline.reflink.exec(r))||(t=this.rules.inline.nolink.exec(r))){let s=(t[2]||t[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=e[s.toLowerCase()];if(!n){let i=t[0].charAt(0);return{type:"text",raw:i,text:i}}return ke(t,n,t[0],this.lexer,this.rules)}}emStrong(r,e,t=""){let s=this.rules.inline.emStrongLDelim.exec(r);if(!(!s||!s[1]&&!s[2]&&!s[3]&&!s[4]||s[4]&&t.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[3])||!t||this.rules.inline.punctuation.exec(t))){let n=[...s[0]].length-1,i,a,l=n,c=0,o=s[0][0],h=t===o,p=o==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(p.lastIndex=0,e=e.slice(-1*r.length+n);(s=p.exec(e))!==null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(a=[...i].length,s[3]||s[4]){l+=a;continue}else if(s[5]||s[6]){if(n%3&&!((n+a)%3)){c+=a;continue}if(h)break}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let d=[...s[0]][0].length,f=r.slice(0,n+s.index+d+a);if(Math.min(n,a)%2){let b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}let g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(r){let e=this.rules.inline.code.exec(r);if(e){let t=e[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(t),n=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return s&&n&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:e[0],text:t}}}br(r){let e=this.rules.inline.br.exec(r);if(e)return{type:"br",raw:e[0]}}del(r,e,t=""){let s=this.rules.inline.delLDelim.exec(r);if(s&&(!s[1]||!t||this.rules.inline.punctuation.exec(t))){let n=[...s[0]].length-1,i,a,l=n,c=this.rules.inline.delRDelim;for(c.lastIndex=0,e=e.slice(-1*r.length+n);(s=c.exec(e))!==null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i||(a=[...i].length,a!==n))continue;if(s[3]||s[4]){l+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l);let o=[...s[0]][0].length,h=r.slice(0,n+s.index+o+a),p=h.slice(n,-n);return{type:"del",raw:h,text:p,tokens:this.lexer.inlineTokens(p)}}}}autolink(r){let e=this.rules.inline.autolink.exec(r);if(e){let t,s;return e[2]==="@"?(t=e[1],s="mailto:"+t):(t=e[1],s=t),{type:"link",raw:e[0],text:t,href:s,tokens:[{type:"text",raw:t,text:t}]}}}url(r){let e;if(e=this.rules.inline.url.exec(r)){let t,s;if(e[2]==="@")t=e[0],s="mailto:"+t;else{let n;do n=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(n!==e[0]);t=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:t,href:s,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(r){let e=this.rules.inline.text.exec(r);if(e){let t=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:t}}}},R=class X{constructor(e){x(this,"tokens");x(this,"options");x(this,"state");x(this,"inlineQueue");x(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||P,this.options.tokenizer=this.options.tokenizer||new Q,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:y,block:H.normal,inline:B.normal};this.options.pedantic?(t.block=H.pedantic,t.inline=B.pedantic):this.options.gfm&&(t.block=H.gfm,this.options.breaks?t.inline=B.breaks:t.inline=B.gfm),this.tokenizer.rules=t}static get rules(){return{block:H,inline:B}}static lex(e,t){return new X(t).lex(e)}static lexInline(e,t){return new X(t).inlineTokens(e)}lex(e){e=e.replace(y.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let s=this.inlineQueue[t];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],s=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(y.tabCharGlobal,"    ").replace(y.spaceLine,""));let n=1/0;for(;e;){if(e.length<n)n=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let i;if(this.options.extensions?.block?.some(l=>(i=l.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))continue;if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length);let l=t.at(-1);i.raw.length===1&&l!==void 0?l.raw+=`
`:t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length);let l=t.at(-1);l?.type==="paragraph"||l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+i.raw,l.text+=`
`+i.text,this.inlineQueue.at(-1).src=l.text):t.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length);let l=t.at(-1);l?.type==="paragraph"||l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+i.raw,l.text+=`
`+i.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},t.push(i));continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),t.push(i);continue}let a=e;if(this.options.extensions?.startBlock){let l=1/0,c=e.slice(1),o;this.options.extensions.startBlock.forEach(h=>{o=h.call({lexer:this},c),typeof o=="number"&&o>=0&&(l=Math.min(l,o))}),l<1/0&&l>=0&&(a=e.substring(0,l+1))}if(this.state.top&&(i=this.tokenizer.paragraph(a))){let l=t.at(-1);s&&l?.type==="paragraph"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+i.raw,l.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):t.push(i),s=a.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length);let l=t.at(-1);l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+i.raw,l.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):t.push(i);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let s=e;if(this.tokens.links){let l=Object.keys(this.tokens.links);l.length>0&&(s=s.replace(this.tokenizer.rules.inline.reflinkSearch,c=>l.includes(c.slice(c.lastIndexOf("[")+1,-1))?"["+"a".repeat(c.length-2)+"]":c))}s=s.replace(this.tokenizer.rules.inline.anyPunctuation,l=>"+".repeat(l.length)),s=s.replace(this.tokenizer.rules.inline.blockSkip,(l,c,o)=>{let h=o?o.length:0;return l.slice(0,h)+"["+"a".repeat(l.length-h-2)+"]"}),s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let n=!1,i="",a=1/0;for(;e;){if(e.length<a)a=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}n||(i=""),n=!1;let l;if(this.options.extensions?.inline?.some(o=>(l=o.call({lexer:this},e,t))?(e=e.substring(l.raw.length),t.push(l),!0):!1))continue;if(l=this.tokenizer.escape(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.tag(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.link(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(l.raw.length);let o=t.at(-1);l.type==="text"&&o?.type==="text"?(o.raw+=l.raw,o.text+=l.text):t.push(l);continue}if(l=this.tokenizer.emStrong(e,s,i)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.codespan(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.br(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.del(e,s,i)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.autolink(e)){e=e.substring(l.raw.length),t.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(e))){e=e.substring(l.raw.length),t.push(l);continue}let c=e;if(this.options.extensions?.startInline){let o=1/0,h=e.slice(1),p;this.options.extensions.startInline.forEach(d=>{p=d.call({lexer:this},h),typeof p=="number"&&p>=0&&(o=Math.min(o,p))}),o<1/0&&o>=0&&(c=e.substring(0,o+1))}if(l=this.tokenizer.inlineText(c)){e=e.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),n=!0;let o=t.at(-1);o?.type==="text"?(o.raw+=l.raw,o.text+=l.text):t.push(l);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t="Infinite loop on byte: "+e;if(this.options.silent)console.error(t);else throw new Error(t)}},j=class{constructor(r){x(this,"options");x(this,"parser");this.options=r||P}space(r){return""}code({text:r,lang:e,escaped:t}){let s=(e||"").match(y.notSpaceStart)?.[0],n=r.replace(y.endingNewline,"")+`
`;return s?'<pre><code class="language-'+z(s)+'">'+(t?n:z(n,!0))+`</code></pre>
`:"<pre><code>"+(t?n:z(n,!0))+`</code></pre>
`}blockquote({tokens:r}){return`<blockquote>
${this.parser.parse(r)}</blockquote>
`}html({text:r}){return r}def(r){return""}heading({tokens:r,depth:e}){return`<h${e}>${this.parser.parseInline(r)}</h${e}>
`}hr(r){return`<hr>
`}list(r){let e=r.ordered,t=r.start,s="";for(let a=0;a<r.items.length;a++){let l=r.items[a];s+=this.listitem(l)}let n=e?"ol":"ul",i=e&&t!==1?' start="'+t+'"':"";return"<"+n+i+`>
`+s+"</"+n+`>
`}listitem(r){return`<li>${this.parser.parse(r.tokens)}</li>
`}checkbox({checked:r}){return"<input "+(r?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:r}){return`<p>${this.parser.parseInline(r)}</p>
`}table(r){let e="",t="";for(let n=0;n<r.header.length;n++)t+=this.tablecell(r.header[n]);e+=this.tablerow({text:t});let s="";for(let n=0;n<r.rows.length;n++){let i=r.rows[n];t="";for(let a=0;a<i.length;a++)t+=this.tablecell(i[a]);s+=this.tablerow({text:t})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+s+`</table>
`}tablerow({text:r}){return`<tr>
${r}</tr>
`}tablecell(r){let e=this.parser.parseInline(r.tokens),t=r.header?"th":"td";return(r.align?`<${t} align="${r.align}">`:`<${t}>`)+e+`</${t}>
`}strong({tokens:r}){return`<strong>${this.parser.parseInline(r)}</strong>`}em({tokens:r}){return`<em>${this.parser.parseInline(r)}</em>`}codespan({text:r}){return`<code>${z(r,!0)}</code>`}br(r){return"<br>"}del({tokens:r}){return`<del>${this.parser.parseInline(r)}</del>`}link({href:r,title:e,tokens:t}){let s=this.parser.parseInline(t),n=ue(r);if(n===null)return s;r=n;let i='<a href="'+r+'"';return e&&(i+=' title="'+z(e)+'"'),i+=">"+s+"</a>",i}image({href:r,title:e,text:t,tokens:s}){s&&(t=this.parser.parseInline(s,this.parser.textRenderer));let n=ue(r);if(n===null)return z(t);r=n;let i=`<img src="${r}" alt="${z(t)}"`;return e&&(i+=` title="${z(e)}"`),i+=">",i}text(r){return"tokens"in r&&r.tokens?this.parser.parseInline(r.tokens):"escaped"in r&&r.escaped?r.text:z(r.text)}},se=class{strong({text:r}){return r}em({text:r}){return r}codespan({text:r}){return r}del({text:r}){return r}html({text:r}){return r}text({text:r}){return r}link({text:r}){return""+r}image({text:r}){return""+r}br(){return""}checkbox({raw:r}){return r}},T=class J{constructor(e){x(this,"options");x(this,"renderer");x(this,"textRenderer");this.options=e||P,this.options.renderer=this.options.renderer||new j,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new se}static parse(e,t){return new J(t).parse(e)}static parseInline(e,t){return new J(t).parseInline(e)}parse(e){this.renderer.parser=this;let t="";for(let s=0;s<e.length;s++){let n=e[s];if(this.options.extensions?.renderers?.[n.type]){let a=n,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","checkbox","html","def","paragraph","text"].includes(a.type)){t+=l||"";continue}}let i=n;switch(i.type){case"space":{t+=this.renderer.space(i);break}case"hr":{t+=this.renderer.hr(i);break}case"heading":{t+=this.renderer.heading(i);break}case"code":{t+=this.renderer.code(i);break}case"table":{t+=this.renderer.table(i);break}case"blockquote":{t+=this.renderer.blockquote(i);break}case"list":{t+=this.renderer.list(i);break}case"checkbox":{t+=this.renderer.checkbox(i);break}case"html":{t+=this.renderer.html(i);break}case"def":{t+=this.renderer.def(i);break}case"paragraph":{t+=this.renderer.paragraph(i);break}case"text":{t+=this.renderer.text(i);break}default:{let a='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let s="";for(let n=0;n<e.length;n++){let i=e[n];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","checkbox","strong","em","codespan","br","del","text"].includes(i.type)){s+=l||"";continue}}let a=i;switch(a.type){case"escape":{s+=t.text(a);break}case"html":{s+=t.html(a);break}case"link":{s+=t.link(a);break}case"image":{s+=t.image(a);break}case"checkbox":{s+=t.checkbox(a);break}case"strong":{s+=t.strong(a);break}case"em":{s+=t.em(a);break}case"codespan":{s+=t.codespan(a);break}case"br":{s+=t.br(a);break}case"del":{s+=t.del(a);break}case"text":{s+=t.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},q=(O=class{constructor(r){x(this,"options");x(this,"block");this.options=r||P}preprocess(r){return r}postprocess(r){return r}processAllTokens(r){return r}emStrongMask(r){return r}provideLexer(r=this.block){return r?R.lex:R.lexInline}provideParser(r=this.block){return r?T.parse:T.parseInline}},x(O,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),x(O,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),O),zt=class{constructor(...r){x(this,"defaults",Y());x(this,"options",this.setOptions);x(this,"parse",this.parseMarkdown(!0));x(this,"parseInline",this.parseMarkdown(!1));x(this,"Parser",T);x(this,"Renderer",j);x(this,"TextRenderer",se);x(this,"Lexer",R);x(this,"Tokenizer",Q);x(this,"Hooks",q);this.use(...r)}walkTokens(r,e){let t=[];for(let s of r)switch(t=t.concat(e.call(this,s)),s.type){case"table":{let n=s;for(let i of n.header)t=t.concat(this.walkTokens(i.tokens,e));for(let i of n.rows)for(let a of i)t=t.concat(this.walkTokens(a.tokens,e));break}case"list":{let n=s;t=t.concat(this.walkTokens(n.items,e));break}default:{let n=s;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(i=>{let a=n[i].flat(1/0);t=t.concat(this.walkTokens(a,e))}):n.tokens&&(t=t.concat(this.walkTokens(n.tokens,e)))}}return t}use(...r){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return r.forEach(t=>{let s={...t};if(s.async=this.defaults.async||s.async||!1,t.extensions&&(t.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let i=e.renderers[n.name];i?e.renderers[n.name]=function(...a){let l=n.renderer.apply(this,a);return l===!1&&(l=i.apply(this,a)),l}:e.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[n.level];i?i.unshift(n.tokenizer):e[n.level]=[n.tokenizer],n.start&&(n.level==="block"?e.startBlock?e.startBlock.push(n.start):e.startBlock=[n.start]:n.level==="inline"&&(e.startInline?e.startInline.push(n.start):e.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(e.childTokens[n.name]=n.childTokens)}),s.extensions=e),t.renderer){let n=this.defaults.renderer||new j(this.defaults);for(let i in t.renderer){if(!(i in n))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let a=i,l=t.renderer[a],c=n[a];n[a]=(...o)=>{let h=l.apply(n,o);return h===!1&&(h=c.apply(n,o)),h||""}}s.renderer=n}if(t.tokenizer){let n=this.defaults.tokenizer||new Q(this.defaults);for(let i in t.tokenizer){if(!(i in n))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let a=i,l=t.tokenizer[a],c=n[a];n[a]=(...o)=>{let h=l.apply(n,o);return h===!1&&(h=c.apply(n,o)),h}}s.tokenizer=n}if(t.hooks){let n=this.defaults.hooks||new q;for(let i in t.hooks){if(!(i in n))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let a=i,l=t.hooks[a],c=n[a];q.passThroughHooks.has(i)?n[a]=o=>{if(this.defaults.async&&q.passThroughHooksRespectAsync.has(i))return(async()=>{let p=await l.call(n,o);return c.call(n,p)})();let h=l.call(n,o);return c.call(n,h)}:n[a]=(...o)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(n,o);return p===!1&&(p=await c.apply(n,o)),p})();let h=l.apply(n,o);return h===!1&&(h=c.apply(n,o)),h}}s.hooks=n}if(t.walkTokens){let n=this.defaults.walkTokens,i=t.walkTokens;s.walkTokens=function(a){let l=[];return l.push(i.call(this,a)),n&&(l=l.concat(n.call(this,a))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(r){return this.defaults={...this.defaults,...r},this}lexer(r,e){return R.lex(r,e??this.defaults)}parser(r,e){return T.parse(r,e??this.defaults)}parseMarkdown(r){return(e,t)=>{let s={...t},n={...this.defaults,...s},i=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&s.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(n.hooks&&(n.hooks.options=n,n.hooks.block=r),n.async)return(async()=>{let a=n.hooks?await n.hooks.preprocess(e):e,l=await(n.hooks?await n.hooks.provideLexer(r):r?R.lex:R.lexInline)(a,n),c=n.hooks?await n.hooks.processAllTokens(l):l;n.walkTokens&&await Promise.all(this.walkTokens(c,n.walkTokens));let o=await(n.hooks?await n.hooks.provideParser(r):r?T.parse:T.parseInline)(c,n);return n.hooks?await n.hooks.postprocess(o):o})().catch(i);try{n.hooks&&(e=n.hooks.preprocess(e));let a=(n.hooks?n.hooks.provideLexer(r):r?R.lex:R.lexInline)(e,n);n.hooks&&(a=n.hooks.processAllTokens(a)),n.walkTokens&&this.walkTokens(a,n.walkTokens);let l=(n.hooks?n.hooks.provideParser(r):r?T.parse:T.parseInline)(a,n);return n.hooks&&(l=n.hooks.postprocess(l)),l}catch(a){return i(a)}}}onError(r,e){return t=>{if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,r){let s="<p>An error occurred:</p><pre>"+z(t.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(t);throw t}}},E=new zt;k.options=k.setOptions=function(r){return E.setOptions(r),k.defaults=E.defaults,xe(k.defaults),k};k.getDefaults=Y;k.defaults=P;k.use=At;k.walkTokens=function(r,e){return E.walkTokens(r,e)};k.parseInline=E.parseInline;k.Parser=T;k.parser=T.parse;k.Renderer=j;k.TextRenderer=se;k.Lexer=R;k.lexer=R.lex;k.Tokenizer=Q;k.Hooks=q;k.parse=k;Pt=k.options,Lt=k.setOptions,Ft=k.walkTokens,It=k.parseInline,Bt=T.parse,qt=R.lex});var Ct=ve(()=>{ie();oe();ze();k.setOptions({gfm:!0,breaks:!0});(function(){let r=document.currentScript||document.querySelector("script[data-workspace-id]"),e=r?.getAttribute("data-workspace-id"),t=r?.getAttribute("data-api-url")||"http://127.0.0.1:8000";if(!e){console.error("Widget Script Error: Missing data-workspace-id attribute.");return}let s=document.createElement("div");document.body.appendChild(s);let n=s.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=le,n.appendChild(i);let a=document.createElement("div");a.className="widget-container",a.innerHTML=`
    <div class="chat-box" id="chat-box">
      <div class="chat-header">AI Support Assistant</div>
      <div class="chat-messages" id="messages"></div>
      <div class="chat-input-area">
        <input type="text" class="chat-input" id="input" placeholder="Ask a question..." />
        <button class="chat-submit" id="send-btn">Send</button>
      </div>
    </div>
    <div class="chat-bubble" id="bubble">\u{1F4AC}</div>
  `,n.appendChild(a);let l=n.querySelector("#bubble"),c=n.querySelector("#chat-box"),o=n.querySelector("#messages"),h=n.querySelector("#input"),p=n.querySelector("#send-btn");l.addEventListener("click",()=>{c.classList.toggle("open")});async function d(){let f=h.value.trim();if(!f)return;h.value="";let g=document.createElement("div");g.className="msg user",g.textContent=f,o.appendChild(g);let b=document.createElement("div");b.className="bot-msg-wrapper";let m=document.createElement("div");m.className="typing-indicator",m.innerHTML="<span></span><span></span><span></span>",b.appendChild(m);let w=document.createElement("div");w.className="msg bot",w.style.display="none";let v=document.createElement("div");v.className="sources-container",b.appendChild(w),b.appendChild(v),o.appendChild(b),o.scrollTop=o.scrollHeight;let D="",I=[];try{await ae(t,e,f,async S=>{m.parentNode&&m.remove(),w.style.display==="none"&&(w.style.display="block"),D+=S;let $=await k.parse(D);w.innerHTML=$,o.scrollTop=o.scrollHeight},S=>{I=S||[]}),I.length>0&&(v.innerHTML="",I.forEach(S=>{let $=document.createElement("div");$.className="source-pill",$.innerHTML=`
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            <span>Source: ${S.label}</span>
          `,v.appendChild($)}),o.scrollTop=o.scrollHeight)}catch(S){console.error("[widget] Chat error:",S),m.parentNode&&m.remove(),w.style.display="block",w.textContent="Sorry, an error occurred while generating a response."}}p.addEventListener("click",d),h.addEventListener("keypress",f=>{f.key==="Enter"&&d()})})()});Ct();})();
