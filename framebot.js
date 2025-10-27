// ===== Injetar Meta Viewport para Responsividade em Mobile =====
const metaViewport = document.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(metaViewport);

// ===== Injetar Link de Fontes =====
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap';
fontLink.rel = 'preload';
fontLink.as = 'style';
fontLink.onload = function() { this.rel = 'stylesheet'; };
document.head.appendChild(fontLink);

// ===== Injetar CSS (leve, fluido, inspirado no Inter) =====
const style = document.createElement('style');
style.textContent = `
:root {
  --bg-color: #f8f8f8;
  --text-color: #000;
  --accent-color: #AC865C;
  --accent-light: #D3AD83;
  --secondary-bg: #fff;
  --border-color: rgba(0,0,0,0.1);
  --shadow-color: rgba(0,0,0,0.1);
  --input-bg: #fff;
  --msg-bg: #f0f0f0;
  --user-msg-bg: #AC865C;
  --typing-color: #888;
  --note-bg: #fff9f2;
}
body.dark {
  --bg-color: #141414;
  --text-color: #fff;
  --secondary-bg: #1a1a1a;
  --border-color: rgba(255,255,255,0.1);
  --shadow-color: rgba(0,0,0,0.5);
  --input-bg: #2b2b2b;
  --msg-bg: #2a2a2a;
  --user-msg-bg: #D3AD83;
  --typing-color: #aaa;
  --note-bg: #2a2a2a;
}
body {font-family:'Montserrat',sans-serif;margin:0;color:var(--text-color)}
.c{position:fixed;bottom:10px;right:10px;width:360px;max-width:95%;height:80%;background:var(--secondary-bg);border-radius:16px;box-shadow:0 4px 16px var(--shadow-color);display:flex;flex-direction:column;overflow:hidden;z-index:9999;transition:transform .2s ease}
.h{background:var(--accent-color);color:#fff;padding:12px;display:flex;align-items:center;gap:8px;font-weight:500;font-size:15px;position:relative}
.logo-circles{display:flex;gap:6px;align-items:center}
.circle{width:44px;height:44px;border-radius:50%;overflow:hidden;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.15)}
.circle img{width:100%;height:100%;object-fit:cover}
.m{position:absolute;right:10px;top:50%;transform:translateY(-50%);cursor:pointer;display:flex;flex-direction:column;gap:3px}
.m span{width:18px;height:2px;background:#fff;border-radius:2px}
.b{flex:1;padding:12px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;font-size:13px;scroll-behavior:smooth}
.msg{display:flex;gap:6px;animation:msgIn .2s ease forwards;opacity:0}
.msg img{width:26px;height:26px;border-radius:50%;flex-shrink:0}
.msg.user-msg{justify-content:flex-end}
.bb{background:var(--msg-bg);padding:8px 12px;border-radius:14px;max-width:80%;word-break:break-word;position:relative}
.user-msg .bb{background:var(--user-msg-bg);color:#fff}
.bt{font-size:10px;color:#999;margin-top:4px;display:block;text-align:right}
.btns{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.btn{padding:6px 10px;border-radius:18px;cursor:pointer;font-size:13px;border:1.5px solid var(--accent-color);background:transparent;color:var(--accent-color);transition:all .2s ease;font-weight:500}
.btn:hover{background:var(--accent-color);color:#fff}
.p{background:var(--accent-color);color:#fff}
.f{font-size:11px;padding:8px;border-top:1px solid var(--border-color);text-align:center;line-height:14px;background:var(--note-bg);margin:0}
.f a,.link{color:var(--accent-color);font-weight:600;text-decoration:underline;text-decoration-thickness:1px}
.o{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;z-index:10000}
.oc{background:var(--secondary-bg);padding:20px;border-radius:16px;text-align:center;display:flex;flex-direction:column;gap:12px;min-width:240px;box-shadow:0 6px 20px var(--shadow-color)}
.oc button{padding:10px 16px;background:var(--accent-color);color:#fff;border:none;border-radius:18px;cursor:pointer;font-size:14px;font-weight:500}
.close-x{position:absolute;top:8px;right:8px;font-size:20px;cursor:pointer;color:#555}
.input-box{display:flex;align-items:center;gap:8px;margin:4px 8px 6px;padding:8px 12px;background:var(--accent-color);border-radius:20px}
.input-box input{border:none;outline:none;flex:1;background:none;color:#fff;font-size:16px}
.input-box input::placeholder{color:#fff;opacity:0.7}
.send-btn{border:2px solid #fff;background:transparent;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;transition:background .2s ease}
.send-btn:hover{background:rgba(255,255,255,.1)}
.send-btn svg{width:18px;height:18px;stroke:#fff;fill:none;stroke-width:1.8}
.center-end{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:11px;color:#888;animation:fadein .5s;display:none;background:var(--note-bg);padding:8px 16px;border-radius:16px}
.typing-bubble .bb{background:var(--msg-bg);padding:6px 10px}
.dots{display:flex;gap:5px;align-items:center}
.dot{width:7px;height:7px;border-radius:50%;background:#ccc;opacity:.4;animation:blink .9s infinite}
.dot:nth-child(2){animation-delay:.2s}
.dot:nth-child(3){animation-delay:.4s}
.initial-screen{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;height:100%;text-align:center;padding:20px;gap:16px;color:var(--text-color)}
.initial-screen p{font-size:14px;color:var(--typing-color);margin:0}
.recent-msg{background:var(--msg-bg);padding:10px 14px;border-radius:18px;cursor:pointer;display:flex;align-items:center;gap:10px;width:100%;box-shadow:0 1px 3px var(--shadow-color);font-size:13px}
.recent-msg:hover{transform:translateY(-1px)}
.recent-msg .delete-btn{margin-left:auto;color:#ff4d4d;cursor:pointer;font-size:16px}
.privacy-note{background:var(--note-bg);padding:10px 14px;border-radius:16px;font-size:11px;color:var(--typing-color);text-align:center;margin:8px 16px 0;box-shadow:0 1px 3px var(--shadow-color)}
.scroll-top-btn{position:absolute;bottom:80px;right:16px;background:var(--accent-color);color:#fff;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity .2s ease;z-index:10;font-size:18px}
.scroll-top-btn.show{opacity:1}
@keyframes msgIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
@keyframes blink{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}
@keyframes fadein{from{opacity:0}to{opacity:1}}
@media(max-width:480px){.c{height:90%;width:95%;right:2.5%;bottom:5%}}
@media(prefers-reduced-motion:reduce){*, .msg, .dot{animation:none !important;transition:none !important}}
`;
document.head.appendChild(style);

// ===== Injetar HTML =====
const chatContainer = document.createElement('div');
chatContainer.innerHTML = `
<div class="c" id="cb">
  <div class="h">
    <div class="logo-circles">
      <div class="circle"><img src="https://framerusercontent.com/images/uKxosbf9vgV1bHLVDN6DrMHmgE.png" alt="Frame"></div>
      <div class="circle"><img src="https://framerusercontent.com/images/uKxosbf9vgV1bHLVDN6DrMHmgE.png" alt="Frame"></div>
      <div class="circle"><img src="https://framerusercontent.com/images/yCLuCvLmAusOiyCw3BYHiuymEMM.png" alt="Fabi"></div>
    </div>
    <div class="m" onclick="openMenu()">
      <div class="menu-icon"><span></span><span></span><span></span></div>
    </div>
  </div>
  <div class="b" id="bd"></div>
  <div class="input-box">
    <input type="text" id="userInput" placeholder="Digite sua mensagem…">
    <button class="send-btn" id="sendBtn">
      <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
  </div>
  <div class="f">
    Ao continuar neste chat, você concorda<br>
    com os <a href="https://frameag.com/termos" target="_blank" class="link">Termos e Condições</a> da Frame.
  </div>
</div>
<div class="o" id="ov">
  <div class="oc" id="menuOverlay">
    <div class="close-x" onclick="closeMenu()">X</div>
    <button onclick="toggleDarkMode()">Modo Escuro</button>
    <button onclick="clearChatHistory()">Limpar Histórico</button>
    <button onclick="location.href='https://frameag.com/models'">Catálogo</button>
    <button onclick="window.open('https://t.me/suporteframebot?start=chatbot-site-menu','_blank')">Atendimento Humano</button>
  </div>
</div>
<div id="chatEnd" class="center-end">Este chat foi encerrado.</div>
<div class="scroll-top-btn" id="scrollTopBtn" onclick="scrollToTop()">Up</div>
`;
document.body.appendChild(chatContainer);

// ===== Variáveis e Funções =====
let typingShownThisFlow = false;
let messageHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
let userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
let lastMessage = localStorage.getItem('lastMessage') || null;
let isChatInitiated = false;
const MAX_HISTORY = 50;
const p = "https://framerusercontent.com/images/yCLuCvLmAusOiyCw3BYHiuymEMM.png";
const b = document.getElementById('bd');
const chatEndMsg = document.getElementById('chatEnd');

function showTypingIndicator() {
  let typing = document.createElement('div');
  typing.className = 'msg typing-bubble';
  typing.innerHTML = `
    <img src="${p}">
    <div class="bb">
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  `;
  b.appendChild(typing);
  b.scrollTop = b.scrollHeight;
  return typing;
}

function am(text, btn = null, delay = 0, user = false) {
  let typingEl;
  if (!user && !typingShownThisFlow) {
    typingEl = showTypingIndicator();
    typingShownThisFlow = true;
  }
  setTimeout(() => {
    if (!user && typingEl) typingEl.remove();
    let m = document.createElement('div');
    m.className = 'msg' + (user ? ' user-msg' : '');
    let bb = document.createElement('div');
    bb.className = 'bb';
    bb.innerHTML = text.replace(/<a /g, '<a target="_blank" ');
    if (btn) {
      let w = document.createElement('div');
      w.className = 'btns';
      btn.forEach(o => {
        let b2 = document.createElement('button');
        b2.className = 'btn' + (o.p ? ' p' : '');
        b2.innerText = o.l;
        b2.onclick = o.a;
        w.appendChild(b2);
      });
      bb.appendChild(w);
    }
    bb.innerHTML += '<span class="bt">agora</span>';
    if (user) { m.append(bb); } else { m.append(document.createElement('img').src = p, bb); m.children[0].alt = 'Fabi'; }
    b.appendChild(m);
    b.scrollTop = b.scrollHeight;
    const entry = { text, btns: btn, user };
    messageHistory.push(entry);
    if (messageHistory.length > MAX_HISTORY) messageHistory.shift();
    localStorage.setItem('chatHistory', JSON.stringify(messageHistory));
    if (!user) localStorage.setItem('lastMessage', text);
  }, delay + (user ? 0 : 500));
}

// ===== Fluxos (mesmo do antigo, com delays menores) =====
function perguntarSatisfacao() {
  am("Minha explicação acima te ajudou?", [
    { l: "Sim, tudo esclarecido", p: 1, a: () => {
        am("Perfeito! Agradecemos pelo contato.");
        setTimeout(() => { chatEndMsg.style.display = 'block'; }, 700);
      }},
    { l: "Não, preciso de ajuda", a: () => { fh(); am('Ou envie email para: <span class="semibold link">contato@frameag.com</span>'); }}
  ], 600);
}

function processUserMessage(text) {
  am(text, null, 0, true);
  let t = text.toLowerCase();
  if (t.includes("denunciar")) {
    am('Denuncie anonimamente em <a href="https://frameag.com/report" target="_blank" class="link">frameag.com/report</a>.');
    return;
  }
  if (t.includes("humano") || t.includes("analista") || t.includes("falar com a gente")) {
    fh();
    setTimeout(() => am('Ou envie email para: <span class="semibold link">contato@frameag.com</span>'), 600);
    return;
  }
  if (t.includes("seguro") || t.includes("segurança")) {
    am('Sim, a Frame é segura. Autenticação em 3 etapas e time 24h. <a href="https://frameag.com/blog/verificacao" target="_blank" class="link">Saiba mais</a>');
    setTimeout(perguntarSatisfacao, 700);
    return;
  }
  am("Não entendi. Vamos tentar de novo?", [
    { l: "Voltar", p: 1, a: () => { inicio(); am('Ou envie email para: <span class="semibold link">contato@frameag.com</span>'); }}
  ], 500);
}

document.getElementById('userInput').addEventListener('keypress', e => {
  if (e.key === 'Enter' && e.target.value.trim() !== "") {
    processUserMessage(e.target.value.trim());
    e.target.value = "";
  }
});
document.getElementById('sendBtn').addEventListener('click', () => {
  const input = document.getElementById('userInput');
  if (input.value.trim() !== "") {
    processUserMessage(input.value.trim());
    input.value = "";
  }
});

// Fluxos (mantidos, com delays menores)
function menuPT() { b.innerHTML = '<div class="l">Chat ao vivo</div>'; am("É ótimo ter você aqui."); am("Sua relação com a Frame?", [{l:"Contratante / Assinante",p:1,a:cmPT},{l:"Criadora / Anunciante",a:crPT}], 600); }
function cmPT() { b.innerHTML = '<div class="l">Chat ao vivo</div>'; am("Como posso ajudar?"); am("Selecione:", [{l:"Quero contratar",p:1,a:ctPT},{l:"Sobre segurança",a:()=>{am('Frame é segura. 3 etapas + time 24h. <a href="https://frameag.com/blog/verificacao" target="_blank" class="link">Saiba mais</a>');setTimeout(perguntarSatisfacao,700)}},{l:"Reportar",a:()=>{am('Denuncie em <a href="https://frameag.com/report" target="_blank" class="link">frameag.com/report</a>')}}},{l:"Problemas com cadastro",a:cadastroPT},{l:"Falar com humano",a:()=>{fh();setTimeout(()=>{am('Ou email: <span class="semibold link">contato@frameag.com</span>')},600)}},{l:"Voltar",a:inicio},{l:"Quero Premium",p:1,a:premiumPT}], 600); }
function cadastroPT() { b.innerHTML = '<div class="l">Chat ao vivo</div>'; am("Sinto muito pelo problema."); am("Qual situação?", [{l:"Não recebi código",a:problemaCodigo},{l:"Perdi e-mail",a:problemaEmail},{l:"Não sei login",a:problemaLogin},{l:"Voltar",a:cmPT}], 600); }
function problemaCodigo() { b.innerHTML = '<div class="l">Chat ao vivo</div>'; am("Verifique spam, confirme e-mail, aguarde, reenvie."); am("Ainda não? Entre em contato:", [{l:"Ir para atendimento",p:1,a:fh},{l:"Voltar",a:cadastroPT}], 1000); }
function problemaEmail() { b.innerHTML = '<div class="l">Chat ao vivo</div>'; am("Recupere o e-mail ou atualize conosco."); am("Precisará de Frame Authentic."); am("Para atualizar:", [{l:"Ir para atendimento",p:1,a:fh},{l:"Voltar",a:cadastroPT}], 1400); }
function problemaLogin() { b.innerHTML = '<div class="l">Chat ao vivo</div>'; am("Acesse <a href='https://frameag.com/cadastro' target='_blank' class='link'>frameag.com/cadastro</a>"); am("Vídeo tutorial: <a href='https://' target='_blank' class='link'>https://</a>"); am("Voltar?", [{l:"Sim",a:cadastroPT}], 1000); }
function premiumPT() { am('Premium: catálogo sem anúncios, galerias sexy, suporte prioritário.'); am('Clique:', [{l:"Quero Premium",p:1,a:()=>window.open('https://frameag.com/premium','_blank')}], 1000); }
function ctPT() { b.innerHTML = '<div class="l">Chat ao vivo</div>'; am("Você tem 18 anos ou mais?", [{l:"Sim",p:1,a:()=>{am('Explore: <a href="https://frameag.com/models" target="_blank" class="link">frameag.com/models</a>');am("Já escolheu? Fale com o time:",[{l:"Ir para atendimento 24h",p:1,a:()=>open('https://t.me/suporteframebot?start=catalogo-site','_blank')}],500);setTimeout(perguntarSatisfacao,1000)}},{l:"Não",a:()=>{am("Acesso apenas para maiores de 18 anos.")}}]); }
function crPT() { b.innerHTML = '<div class="l">Chat ao vivo</div>'; am("Para criadoras: acesse <a href=https://frameag.com/login target=_blank class=link>frameag.com/login</a>"); am('+18, Frame Authentic e Termos.'); am('Ajuda? Central de Atendimento.', [{l:"Voltar",a:inicio}], 1400); setTimeout(perguntarSatisfacao, 2000); }
function fh() { am("Vou te direcionar para um atendente.", [{l:"Ir para atendimento",p:1,a:()=>open('https://t.me/suporteframebot?start=chatbot-site','_blank')}]); }
function inicio() {
  typingShownThisFlow = false;
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Olá, boas-vindas ao atendimento virtual da Frame :)");
  am("24 horas por dia!", null, 500);
  am("Selecione seu idioma:", [
    { l: "Português", p: 1, a: menuPT },
    { l: "English", a: () => alert("Visit: frameag.com/en") },
    { l: "Español", a: () => alert("Visite: frameag.com/es") }
  ], 1000);
}

// Menu
function openMenu(){ document.getElementById('ov').style.display = 'flex'; }
function closeMenu(){ document.getElementById('ov').style.display = 'none'; }
function toggleDarkMode(){ document.body.classList.toggle('dark'); localStorage.setItem('darkMode', document.body.classList.contains('dark')); }
function clearChatHistory(){ if(confirm('Limpar histórico?')){ messageHistory=[]; localStorage.removeItem('chatHistory'); localStorage.removeItem('lastMessage'); b.innerHTML=''; isChatInitiated=false; inicio(); } }
function scrollToTop(){ b.scroll({ top: 0, behavior: 'smooth' }); }
b.addEventListener('scroll', () => document.getElementById('scrollTopBtn').classList.toggle('show', b.scrollTop > 200));

// Inicializar
window.onload = () => {
  if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark');
  inicio();
};