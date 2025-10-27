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

// ===== Injetar CSS (evoluído com inspiração no invoice.js, mais moderno, fluido, elegante, com dark mode opcional) =====
const style = document.createElement('style');
style.textContent = `
:root {
  --bg-color: #f8f8f8;
  --text-color: #000;
  --accent-color: #AB865B;
  --accent-light: #D3AD83;
  --secondary-bg: #fff;
  --border-color: rgba(0,0,0,0.1);
  --shadow-color: rgba(0,0,0,0.1);
  --input-bg: #fff;
  --beige-bg: #f5f2ed;
  --msg-bg: #f0f0f0;
  --user-msg-bg: #AB865B;
  --typing-color: #888;
}

body.dark {
  --bg-color: #141414;
  --text-color: #fff;
  --secondary-bg: #1a1a1a;
  --border-color: rgba(255,255,255,0.1);
  --shadow-color: rgba(0,0,0,0.5);
  --input-bg: #2b2b2b;
  --beige-bg: #1a1a1a;
  --msg-bg: #2a2a2a;
  --user-msg-bg: #D3AD83;
  --typing-color: #aaa;
}

body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
}

.c {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 360px;
  max-width: 95%;
  height: 85%; /* Aumentado ligeiramente para mais altura vertical */
  background: var(--secondary-bg);
  border-radius: 20px;
  box-shadow: 0 4px 20px var(--shadow-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  transition: all 0.3s ease;
}

.h {
  background: var(--accent-color);
  color: #fff;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  font-weight: 600;
  font-size: 16px;
  position: relative;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.logo-circles {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.circle:hover {
  transform: scale(1.05);
}

.circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.m {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.m span {
  width: 24px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.b {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
  scroll-behavior: smooth;
}

.msg {
  display: flex;
  gap: 8px;
  animation: fadeIn 0.4s ease;
  max-width: 100%;
}

.msg img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
}

.msg.user-msg {
  justify-content: flex-end;
}

.bb {
  background: var(--msg-bg);
  padding: 10px 14px;
  border-radius: 18px;
  max-width: 80%;
  word-break: break-word;
  box-shadow: 0 1px 2px var(--shadow-color);
  transition: all 0.2s ease;
}

.user-msg .bb {
  background: var(--user-msg-bg);
  color: #fff;
}

.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.btn {
  padding: 8px 14px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  border: 2px solid var(--accent-color);
  background: transparent;
  color: var(--accent-color);
  transition: all 0.3s ease;
}

.btn:hover {
  background: var(--accent-color);
  color: #fff;
}

.p {
  background: var(--accent-color);
  color: #fff;
}

.f {
  font-size: 11px;
  padding: 8px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  line-height: 14px;
  margin-bottom: 8px;
  color: var(--text-color);
}

.f a, .link {
  color: var(--accent-color);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 1px;
}

.o {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadein 0.3s ease;
}

.oc {
  background: var(--secondary-bg);
  padding: 24px;
  border-radius: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 240px;
  position: relative;
  box-shadow: 0 4px 20px var(--shadow-color);
  transition: transform 0.3s ease;
}

.oc button {
  padding: 10px 16px;
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.3s ease;
}

.oc button:hover {
  background: var(--accent-light);
}

.close-x {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 20px;
  cursor: pointer;
  color: var(--text-color);
}

.input-box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 12px;
  padding: 10px 14px;
  background: var(--accent-color);
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px var(--shadow-color);
}

.input-box:focus-within {
  border: 1px solid var(--accent-light);
}

.input-box input {
  border: none;
  outline: none;
  flex: 1;
  background: none;
  color: #fff;
  font-size: 15px;
}

.input-box input::placeholder {
  color: rgba(255,255,255,0.7);
}

.send-btn {
  border: 2px solid #fff;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  outline: none;
  padding: 0;
  transition: all 0.3s ease;
}

.send-btn:hover {
  background: rgba(255,255,255,0.15);
}

.send-btn svg {
  width: 20px;
  height: 20px;
  stroke: #fff;
  fill: none;
  stroke-width: 2;
}

.center-end {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: var(--typing-color);
  animation: fadein 0.5s ease;
  display: none;
}

.semibold {
  font-weight: 600;
}

.typing-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  color: var(--typing-color);
  text-align: left;
  margin-left: 40px;
}

.typing-bubble .bb {
  background: var(--msg-bg);
}

.dots {
  display: flex;
  gap: 6px;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-color);
  opacity: 0.35;
  animation: blink 1.2s infinite ease-in-out;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0% { opacity: 0.2; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-2px); }
  100% { opacity: 0.2; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}

.initial-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 20px;
  gap: 20px;
  animation: fadeIn 0.5s ease;
}

.initial-screen h2 {
  font-size: 1.4rem;
  color: var(--text-color);
  margin: 0;
}

.initial-screen p {
  font-size: 0.9rem;
  color: #666;
}

.recent-msg {
  background: var(--msg-bg);
  padding: 12px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.recent-msg:hover {
  background: var(--border-color);
}

.recent-msg .delete-btn {
  margin-left: auto;
  color: #f00;
  cursor: pointer;
}

.mini-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.mini-form input {
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background: var(--input-bg);
  color: var(--text-color);
}

.media-preview {
  max-width: 100%;
  border-radius: 18px;
  margin-top: 8px;
  box-shadow: 0 2px 5px var(--shadow-color);
}

.scroll-top-btn {
  position: absolute;
  bottom: 80px;
  right: 20px;
  background: var(--accent-color);
  color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.scroll-top-btn.show {
  opacity: 1;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .c { height: 95%; /* Aumentado ligeiramente para mobile */ bottom: 2.5%; right: 2.5%; }
  .input-box:focus-within { margin-bottom: 100px; /* Simula 'subida' no mobile */ }
}

@media (prefers-reduced-motion: reduce) {
  .msg, .dot { animation: none; }
}
`;
document.head.appendChild(style);

// ===== Injetar HTML (evoluído com tela inicial, círculos, menu com três linhas) =====
const chatContainer = document.createElement('div');
chatContainer.innerHTML = `
<div class="c" id="cb" role="dialog" aria-label="Chatbot da Frame" aria-live="polite">
  <div class="h">
    <h2 id="welcomeText">Olá! Tudo bem? Como podemos ajudar?</h2>
    <div class="logo-circles">
      <div class="circle"><img src="https://framerusercontent.com/images/yCLuCvLmAusOiyCw3BYHiuymEMM.png" alt="Assistente Fabi" title="Fabi - Assistente Virtual"></div>
      <div class="circle"><img src="https://framerusercontent.com/images/uKxosbf9vgV1bHLVDN6DrMHmgE.png" alt="Símbolo Frame"></div>
      <div class="circle"><img src="https://framerusercontent.com/images/uKxosbf9vgV1bHLVDN6DrMHmgE.png" alt="Símbolo Frame"></div>
    </div>
    <div class="m" onclick="openMenu()" role="button" aria-label="Abrir menu" tabindex="0">
      <span></span><span></span><span></span>
    </div>
  </div>
  <div class="b" id="bd"></div>
  <div class="input-box" id="inputBox">
    <input type="text" id="userInput" placeholder="Envie uma mensagem..." aria-label="Digite sua mensagem">
    <input type="file" id="mediaInput" accept="image/*,video/*" style="display:none;">
    <button class="send-btn" id="sendBtn" aria-label="Enviar mensagem">
      <svg viewBox="0 0 24 24">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  </div>
  <div class="f">
    Ao continuar neste chat, você concorda<br>
    com os <a href="https://frameag.com/termos" target="_blank" class="link">Termos e Condições</a> da Frame.
  </div>
</div>
<div class="o" id="ov" role="dialog" aria-modal="true">
  <div class="oc" id="menuOverlay">
    <div class="close-x" onclick="closeMenu()" role="button" aria-label="Fechar menu">✕</div>
    <button onclick="toggleDarkMode()">Modo Escuro</button>
    <button onclick="clearChatHistory()">Apagar Histórico</button>
    <button onclick="location.href='https://frameag.com/models'">Voltar para o catálogo</button>
    <button onclick="open('https://t.me/suporteframebot?start=chatbot-site-menu','_blank')">Ir para atendimento humano</button>
  </div>
</div>
<div id="chatEnd" class="center-end">Este chat foi encerrado.</div>
<div class="scroll-top-btn" id="scrollTopBtn" onclick="scrollToTop()" aria-label="Voltar ao topo">↑</div>
<div class="loading-spinner" id="loadingSpinner" style="display:none;"></div>
`;
document.body.appendChild(chatContainer);

// ===== Variáveis de controle =====
let typingShownThisFlow = false;
let messageHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
let userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
let lastMessage = localStorage.getItem('lastMessage') || null;
let floodCount = 0;
let lastSendTime = 0;
const p = "https://framerusercontent.com/images/yCLuCvLmAusOiyCw3BYHiuymEMM.png"; // Foto da Fabi
const b = document.getElementById('bd');
const welcomeText = document.getElementById('welcomeText');
const inputBox = document.getElementById('inputBox');
const userInput = document.getElementById('userInput');
const mediaInput = document.getElementById('mediaInput');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const loadingSpinner = document.getElementById('loadingSpinner');

// ===== Inicialização com tela inicial e localStorage =====
function initChat() {
  if (userInfo) {
    welcomeText.textContent = `Olá ${userInfo.name.split(' ')[0]}, tudo bem? Como podemos ajudar?`;
    if (lastMessage) {
      showRecentMessage(lastMessage);
    }
  } else {
    showInitialScreen();
  }
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }
  b.addEventListener('scroll', handleScroll);
}

// ===== Mostrar tela inicial =====
function showInitialScreen() {
  b.innerHTML = `
    <div class="initial-screen">
      <p>Mensagens</p>
      <div class="recent-msg" id="recentMsg" style="display:none;">
        Mensagem recente
      </div>
      <button onclick="startChat()" class="btn p">Iniciar atendimento</button>
    </div>
  `;
}

// ===== Mostrar mensagem recente =====
function showRecentMessage(msg) {
  const recent = document.getElementById('recentMsg');
  if (recent) {
    recent.innerHTML = `
      <img src="${p}" alt="Fabi">
      ${msg}
      <span class="delete-btn" onclick="deleteRecent()">✕</span>
    `;
    recent.style.display = 'flex';
  }
}

// ===== Deletar recente =====
function deleteRecent() {
  localStorage.removeItem('lastMessage');
  showInitialScreen();
}

// ===== Iniciar chat e mini-form =====
function startChat() {
  if (!userInfo) {
    b.innerHTML = `
      <div class="mini-form">
        <input type="text" id="nameInput" placeholder="Seu nome" aria-label="Digite seu nome">
        <input type="email" id="emailInput" placeholder="Seu e-mail" aria-label="Digite seu e-mail">
        <button onclick="saveUserInfo()" class="btn p">Continuar</button>
      </div>
    `;
  } else {
    loadChat();
  }
}

// ===== Salvar info do usuário =====
function saveUserInfo() {
  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  if (name && email) {
    userInfo = { name, email };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    welcomeText.textContent = `Olá ${name.split(' ')[0]}, tudo bem? Como podemos ajudar?`;
    loadChat();
  }
}

// ===== Carregar chat com lazy loading =====
function loadChat() {
  loadingSpinner.style.display = 'block';
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
    b.innerHTML = '';
    messageHistory.forEach(msg => am(msg.text, msg.btns, 0, msg.user));
    inicio();
  }, 500); // Simula lazy load
}

// ===== Funções auxiliares evoluídas =====
function showTypingIndicator() {
  let typing = document.createElement('div');
  typing.className = 'msg typing-bubble';
  typing.innerHTML = `
    <img src="${p}" alt="Fabi">
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

function am(text, btn, delay = 0, user = false) {
  let typingEl;
  if (!user && !typingShownThisFlow) {
    typingEl = showTypingIndicator();
    typingShownThisFlow = true;
  }
  setTimeout(() => {
    if (!user && typingEl) typingEl.remove();
    let m = document.createElement('div');
    m.className = 'msg' + (user ? ' user-msg' : '');
    m.setAttribute('role', 'log');
    let i = document.createElement('img');
    i.src = user ? '' : p;
    i.alt = user ? '' : 'Fabi';
    let bb = document.createElement('div');
    bb.className = 'bb';
    bb.innerHTML = text + '<span class="bt">agora</span>';
    if (btn) {
      let w = document.createElement('div');
      w.className = 'btns';
      btn.forEach(o => {
        let b2 = document.createElement('button');
        b2.className = 'btn' + (o.p ? ' p' : '');
        b2.innerText = o.l;
        b2.onclick = o.a;
        b2.setAttribute('role', 'button');
        w.appendChild(b2);
      });
      bb.appendChild(w);
    }
    if (user) { m.append(bb); } else { m.append(i, bb); }
    b.appendChild(m);
    b.scrollTop = b.scrollHeight;
    if (!user) messageHistory.push({ text, btns, user: false });
    else messageHistory.push({ text, btns: null, user: true });
    localStorage.setItem('chatHistory', JSON.stringify(messageHistory));
    localStorage.setItem('lastMessage', text);
  }, delay + (user ? 0 : 800));
}

// ===== Processar mensagem do usuário (evoluído com mais inteligência baseada em Termos) =====
function processUserMessage(text) {
  const now = Date.now();
  if (now - lastSendTime < 10000 && ++floodCount > 5) {
    am("Por favor, evite enviar mensagens repetidas rapidamente. Aguarde um momento.", null, 0, false);
    userInput.disabled = true;
    setTimeout(() => { userInput.disabled = false; floodCount = 0; }, 10000);
    return;
  }
  floodCount = floodCount > 0 ? floodCount : 1;
  lastSendTime = now;

  am(text, null, 0, true);
  let t = text.toLowerCase();

  // Evoluído com base em Termos e Condições
  if (t.includes("denunciar") || t.includes("reportar")) {
    am('Na Frame, levamos segurança muito a sério (conforme Cláusula 1.3 dos Termos). Caso encontre irregularidades, acesse <a href=https://frameag.com/report target=_blank class=link>frameag.com/report</a> e denuncie anonimamente.');
    perguntarSatisfacao();
    return;
  }
  if (t.includes("humano") || t.includes("analista") || t.includes("atendimento humano")) {
    fh();
    am('Se preferir, envie um email para: <span class="semibold link">contato@frameag.com</span> (Cláusula 1.5 dos Termos).');
    return;
  }
  if (t.includes("seguro") || t.includes("segurança") || t.includes("time de segurança")) {
    am('Sim, a Frame é segura (Cláusula 1.3). Usamos autenticação em três etapas e IA para moderação (Cláusula 1.4). Saiba mais em <a href=https://frameag.com/blog/verificacao target=_blank class=link>nosso blog</a>.');
    perguntarSatisfacao();
    return;
  }
  if (t.includes("termos") || t.includes("condições") || t.includes("politica de privacidade")) {
    am('Nossos Termos e Condições estão disponíveis em <a href=https://frameag.com/termos target=_blank class=link>frameag.com/termos</a>. Eles regulam o uso da plataforma (Cláusula 18). Para privacidade, veja Cláusula 19.');
    perguntarSatisfacao();
    return;
  }
  if (t.includes("criadora") || t.includes("anunciante") || t.includes("agenciada")) {
    am('Criadoras podem ser agenciadas ou anunciantes independentes (Cláusula 1.1.4). Para cadastro, acesse <a href=https://frameag.com/login target=_blank class=link>frameag.com/login</a>. Deve ter +18 anos e concordar com Termos.');
    perguntarSatisfacao();
    return;
  }
  if (t.includes("contratante") || t.includes("assinante") || t.includes("premium")) {
    am('Contratantes têm acesso a agendamentos e comunicação direta (Cláusula 1.1.3). Para Premium, desbloqueie vantagens em <a href=https://frameag.com/premium target=_blank class=link>frameag.com/premium</a>.');
    perguntarSatisfacao();
    return;
  }
  if (t.includes("dados pessoais") || t.includes("lgpd") || t.includes("exclusão de dados")) {
    am('Tratamos dados conforme LGPD (Cláusula 19). Para exclusão ou correção, contate juridico@frameag.com. Banidos permanentes não podem solicitar exclusão (Cláusula 19.6).');
    perguntarSatisfacao();
    return;
  }
  if (t.includes("idioma") || t.includes("english") || t.includes("español")) {
    if (t.includes("english")) {
      am('For English support, please visit: <a href="https://frameag.com/en" target="_blank" class="link">frameag.com/en</a>.');
    } else if (t.includes("español")) {
      am('Para atención en español, visite: <a href="https://frameag.com/es" target="_blank" class="link">frameag.com/es</a>.');
    } else {
      am('Selecione o idioma no menu inicial.');
    }
    return;
  }
  if (t.includes("definições") || t.includes("o que é plataforma")) {
    am('A Plataforma é um ecossistema para criadoras e contratantes (Cláusula 1.1). Oferecemos tecnologia e gestão, sem responsabilidade por conteúdos gerados por usuários.');
    perguntarSatisfacao();
    return;
  }

  // Fallback
  am("Não consegui entender. Vamos tentar novamente? (Baseado nos Termos, posso ajudar com segurança, cadastro, etc.)", [
    { l: "Voltar ao início", p: 1, a: inicio }
  ], 500);
}

// ===== Envio de mídia com preview =====
mediaInput.addEventListener('change', () => {
  const file = mediaInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      const preview = document.createElement('img');
      preview.src = e.target.result;
      preview.className = 'media-preview';
      am('Mídia anexada: <br>', null, 0, true);
      b.lastChild.querySelector('.bb').appendChild(preview);
    };
    reader.readAsDataURL(file);
  }
});

// ===== Input listener com auto-emoji =====
userInput.addEventListener('input', e => {
  let val = e.target.value;
  val = val.replace(/:\)/g, '😊').replace(/<3/g, '❤️'); // Auto-replace simples
  e.target.value = val;
});

userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter' && e.target.value.trim() !== "") {
    processUserMessage(e.target.value.trim());
    e.target.value = "";
  }
});

document.getElementById('sendBtn').addEventListener('click', () => {
  if (userInput.value.trim() !== "") {
    processUserMessage(userInput.value.trim());
    userInput.value = "";
  }
});

// ===== Perguntar satisfação =====
function perguntarSatisfacao() {
  am("Minha explicação te ajudou?", [
    { l: "Sim, obrigado!", p: 1, a: () => {
        am("Ótimo! Estamos à disposição. (Cláusula 1.5)");
        setTimeout(() => { document.getElementById('chatEnd').style.display = 'block'; }, 800);
      }},
    { l: "Não, preciso de mais ajuda", a: () => { 
        fh(); 
        am('Ou envie email para: <span class="semibold link">contato@frameag.com</span>');
      }}
  ], 800);
}

// ===== Fluxos evoluídos =====
function menuPT() {
  b.innerHTML += '<div class="l">Chat ao vivo</div>';
  am("É ótimo ter você aqui (conforme Termos).");
  am("Qual sua relação com a Frame? (Cláusula 1.1)", [
    { l: "Contratante / Assinante", p: 1, a: cmPT },
    { l: "Criadora / Anunciante", a: crPT }
  ], 800);
}

function cmPT() {
  b.innerHTML += '<div class="l">Chat ao vivo</div>';
  am("Veja como posso ajudar (Direitos de Contratante - Cláusula 1.1.3)...");
  am("Selecione:", [
    { l: "Contratar modelo", p: 1, a: ctPT },
    { l: "Sobre segurança", a: () => am('Segura com IA e time 24h (Cláusula 1.3/1.4). <a href=https://frameag.com/blog/verificacao target=_blank class=link>Saiba mais</a>.') },
    { l: "Reportar anonimamente", a: () => am('Acesse <a href=https://frameag.com/report target=_blank class=link>frameag.com/report</a> (Cláusula 1.3).') },
    { l: "Problemas com cadastro", a: cadastroPT },
    { l: "Falar com humano", a: fh },
    { l: "Voltar", a: inicio },
    { l: "Tornar Premium", p: 1, a: premiumPT }
  ], 800);
  perguntarSatisfacao();
}

function cadastroPT() {
  am("Sinto pelo problema no cadastro (Cláusula 19). Qual situação?", [
    { l: "Não recebi código", a: problemaCodigo },
    { l: "Perdi e-mail", a: problemaEmail },
    { l: "Não sei login", a: problemaLogin },
    { l: "Voltar", a: cmPT }
  ], 800);
}

function problemaCodigo() {
  am("Verifique spam, e-mail correto e reenvie. Persiste? Contate-nos (Cláusula 1.5).", [
    { l: "Atendimento", p: 1, a: fh },
    { l: "Voltar", a: cadastroPT }
  ]);
}

function problemaEmail() {
  am("Recupere e-mail ou atualize conosco via Frame Authentic (Cláusula 19).", [
    { l: "Atendimento", p: 1, a: fh },
    { l: "Voltar", a: cadastroPT }
  ]);
}

function problemaLogin() {
  am("Acesse <a href='https://frameag.com/cadastro' target='_blank' class='link'>Área de Cadastro</a>. Tutorial: <a href='https://' target='_blank' class='link'>https://</a>", [
    { l: "Voltar", a: cadastroPT }
  ]);
}

function premiumPT() {
  am('Premium: Catálogo sem ads, galerias, prioridade (Cláusula 1.1.3).', [
    { l: "Ser Premium", p: 1, a: () => window.open('https://frameag.com/premium','_blank') }
  ]);
}

function ctPT() {
  am("Você tem +18? (Obrigatório pelos Termos)", [
    { l: "Sim", p: 1, a: () => { 
        am('Veja catálogo: <a href="https://frameag.com/models" target="_blank" class="link">frameag.com/models</a>.');
        am("Decidiu? Fale conosco:", [{ l: "Atendimento 24h", p: 1, a: () => open('https://t.me/suporteframebot?start=catalogo-site', '_blank') }]); 
      }},
    { l: "Não", a: () => am("Não podemos prosseguir (+18 obrigatório - Termos).") }
  ]);
}

function crPT() {
  am('Para criadoras: Cadastre em <a href=https://frameag.com/login target=_blank class=link>frameag.com/login</a> (+18, Frame Authentic, Termos - Cláusula 1.1.4).');
  am('Ajuda? Acesse Central de Atendimento na Área de Login.', [
    { l: "Voltar", a: inicio }
  ]);
}

function fh() { 
  am("Direcionando para humano (Cláusula 1.5).", [{ l: "Ir para atendimento", p: 1, a: () => open('https://t.me/suporteframebot?start=chatbot-site', '_blank') }]); 
}

function inicio() {
  typingShownThisFlow = false;
  am("Olá, bem-vindo ao atendimento virtual da Frame :)");
  am("Aqui 24h! (Cláusula 1.5)", null, 800);
  am("Idioma:", [
    { l: "Português", p: 1, a: menuPT },
    { l: "English", a: () => am('For English: <a href="https://frameag.com/en" target="_blank" class="link">frameag.com/en</a>') },
    { l: "Español", a: () => am('Para español: <a href="https://frameag.com/es" target="_blank" class="link">frameag.com/es</a>') }
  ], 1600);
}

// ===== Menu e funções adicionais =====
function openMenu() { document.getElementById('ov').style.display = 'flex'; }
function closeMenu() { document.getElementById('ov').style.display = 'none'; }
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}
function clearChatHistory() {
  messageHistory = [];
  localStorage.removeItem('chatHistory');
  localStorage.removeItem('lastMessage');
  b.innerHTML = '';
  initChat();
}
function scrollToTop() {
  b.scrollTop = 0;
}
function handleScroll() {
  scrollTopBtn.classList.toggle('show', b.scrollTop > 200);
}

// ===== Inicializar =====
window.onload = initChat;