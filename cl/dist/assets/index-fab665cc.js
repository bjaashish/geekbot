(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const f="/assets/bot-61bdb6bf.svg",m="/assets/user-bcdeb18e.svg",c=document.querySelector("form"),a=document.querySelector("#chat_container");let l;function p(t){t.textContent="",l=setInterval(()=>{t.textContent+=".",t.textContent==="...."&&(t.textContent="")},300)}function g(t,n){let o=0,s=setInterval(()=>{o<n.length?(t.innerHTML+=n.charAt(o),o++):clearInterval(s)},20)}function h(){const t=Date.now(),o=Math.random().toString(16);return`id-${t}-${o}`}function d(t,n,o){return`
        <div class="wrapper ${t&&"ai"}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${t?f:m} 
                      alt="${t?"bot":"user"}" 
                    />
                </div>
                <div class="message" id=${o}>${n}</div>
            </div>
        </div>
    `}const u=async t=>{t.preventDefault();const n=new FormData(c);a.innerHTML+=d(!1,n.get("prompt")),c.reset();const o=h();a.innerHTML+=d(!0," ",o),a.scrollTop=a.scrollHeight;const s=document.getElementById(o);p(s);const e=await fetch("https://qbot-dodd.onrender.com/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:n.get("prompt")})});if(clearInterval(l),s.innerHTML=" ",e.ok){const i=(await e.json()).bot.trim();g(s,i)}else{const r=await e.text();s.innerHTML="Something went wrong",alert(r)}};c.addEventListener("submit",u);c.addEventListener("keyup",t=>{t.keyCode===13&&u(t)});
