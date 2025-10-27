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

// ===== Injetar CSS (melhorado para maior fluidez, modernidade, correções de dark mode, centralização, fontes 16px, conexões de círculos) =====
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
  --note-bg: #fff9f2;
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
  --note-bg: #2a2a2a;
}

body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  color: var(--text-color);
}

.c {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 380px;
  max-width: 95%;
  height: 90%; /* Aumentado para melhor visual em desktop e mobile */
  background: var(--secondary-bg);
  border-radius: 24px;
  box-shadow: 0 8px 30px var(--shadow-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  transition: all 0.4s ease-in-out;
}

.h {
  background: var(--accent-color);
  color: #fff;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  font-weight: 500;
  font-size: 18px;
  position: relative;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.h h2 {
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
}

.logo-circles {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -10px; /* Sobreposição para 'conexão' */
}

.circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  z-index: 1;
  position: relative;
}

.circle::before {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 15px;
  background: #fff;
  z-index: -1;
}

.circle:last-child::before {
  display: none;
}

.circle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
}

.circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.m {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: all 0.3s ease;
}

.m span {
  width: 28px;
  height: 3px;
  background: #fff;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.m:hover span {
  background: var(--accent-light);
}

.b {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 15px;
  scroll-behavior: smooth;
  position: relative;
}

.msg {
  display: flex;
  gap: 10px;
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
  max-width: 100%;
  transition: opacity 0.3s ease;
}

.msg img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 2px 5px var(--shadow-color);
}

.msg.user-msg {
  justify-content: flex-end;
}

.bb {
  background: var(--msg-bg);
  padding: 12px 16px;
  border-radius: 20px;
  max-width: 75%;
  word-break: break-word;
  box-shadow: 0 2px 4px var(--shadow-color);
  transition: all 0.3s ease;
  position: relative;
}

.bb:hover {
  box-shadow: 0 3px 6px var(--shadow-color);
}

.user-msg .bb {
  background: var(--user-msg-bg);
  color: #fff;
}

.bt {
  display: block;
  margin-top: 6px;
  font-size: 11px;
  color: var(--typing-color);
  text-align: right;
  opacity: 0.8;
}

.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 10px 16px;
  border-radius: 24px;
  cursor: pointer;
  font-size: 14px;
  border: 2px solid var(--accent-color);
  background: transparent;
  color: var(--accent-color);
  transition: all 0.4s ease;
  font-weight: 500;
}

.btn:hover {
  background: var(--accent-color);
  color: #fff;
  transform: translateY(-2px);
}

.p {
  background: var(--accent-color);
  color: #fff;
}

.f {
  font-size: 12px;
  padding: 10px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  line-height: 16px;
  margin-bottom: 10px;
  color: var(--text-color);
  background: var(--note-bg);
  border-radius: 12px;
}

.f a, .link {
  color: var(--accent-color);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  transition: color 0.3s ease;
}

.f a:hover {
  color: var(--accent-light);
}

.o {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadein 0.4s ease;
  backdrop-filter: blur(5px);
}

.oc {
  background: var(--secondary-bg);
  padding: 28px;
  border-radius: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 280px;
  position: relative;
  box-shadow: 0 8px 25px var(--shadow-color);
  transition: transform 0.4s ease;
  transform: scale(0.95);
}

.o.show .oc {
  transform: scale(1);
}

.oc button {
  padding: 12px 20px;
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.4s ease;
}

.oc button:hover {
  background: var(--accent-light);
  transform: translateY(-2px);
}

.close-x {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.close-x:hover {
  color: var(--accent-color);
}

.input-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 16px;
  padding: 12px 16px;
  background: var(--accent-color);
  border-radius: 32px;
  transition: all 0.4s ease;
  box-shadow: 0 4px 10px var(--shadow-color);
  position: relative;
}

.input-box.focused {
  box-shadow: 0 6px 15px var(--shadow-color);
  transform: translateY(-4px);
}

.input-box input {
  border: none;
  outline: none;
  flex: 1;
  background: none;
  color: #fff;
  font-size: 16px; /* Previne zoom no iOS */
}

.input-box input::placeholder {
  color: rgba(255,255,255,0.8);
  font-size: 16px;
}

.send-btn {
  border: 2px solid #fff;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  outline: none;
  padding: 0;
  transition: all 0.4s ease;
}

.send-btn:hover {
  background: rgba(255,255,255,0.2);
  transform: rotate(20deg);
}

.send-btn svg {
  width: 22px;
  height: 22px;
  stroke: #fff;
  fill: none;
  stroke-width: 2.2;
}

.center-end {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 13px;
  color: var(--typing-color);
  animation: fadein 0.6s ease;
  display: none;
  padding: 12px 20px;
  background: var(--note-bg);
  border-radius: 20px;
  box-shadow: 0 4px 10px var(--shadow-color);
}

.semibold {
  font-weight: 600;
}

.typing-bubble .bb {
  background: var(--msg-bg);
  padding: 8px 12px;
}

.dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent-light);
  opacity: 0.4;
  animation: blink 1.4s infinite ease-in-out;
}

.dot:nth-child(2) { animation-delay: 0.3s; }
.dot:nth-child(3) { animation-delay: 0.6s; }

@keyframes blink {
  0% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.4; transform: scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}

.initial-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  text-align: center;
  padding: 24px;
  gap: 24px;
  animation: fadeIn 0.6s ease;
  color: var(--text-color);
}

.initial-screen p {
  font-size: 1rem;
  color: var(--typing-color);
  margin: 0;
}

.recent-msg {
  background: var(--msg-bg);
  padding: 14px 18px;
  border-radius: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.4s ease;
  width: 100%;
  box-shadow: 0 2px 5px var(--shadow-color);
  color: var(--text-color);
}

.recent-msg:hover {
  background: var(--border-color);
  transform: translateY(-2px);
}

.recent-msg .delete-btn {
  margin-left: auto;
  color: #ff4d4d;
  cursor: pointer;
  font-size: 18px;
  transition: color 0.3s ease;
}

.recent-msg .delete-btn:hover {
  color: #cc0000;
}

.mini-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  padding: 0 16px;
}

.mini-form input {
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  background: var(--input-bg);
  color: var(--text-color);
  font-size: 16px; /* Previne zoom */
  transition: border 0.3s ease;
}

.mini-form input:focus {
  border: 1px solid var(--accent-color);
  box-shadow: 0 0 0 3px rgba(171,134,91,0.2);
}

.media-preview {
  max-width: 100%;
  border-radius: 20px;
  margin-top: 10px;
  box-shadow: 0 4px 10px var(--shadow-color);
  transition: transform 0.3s ease;
}

.media-preview:hover {
  transform: scale(1.02);
}

.scroll-top-btn {
  position: absolute;
  bottom: 100px;
  right: 24px;
  background: var(--accent-color);
  color: #fff;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.4s ease;
  z-index: 10;
  font-size: 20px;
}

.scroll-top-btn.show {
  opacity: 1;
  transform: translateY(0);
}

.scroll-top-btn:hover {
  transform: scale(1.1);
}

.loading-spinner {
  width: 44px;
  height: 44px;
  border: 5px solid var(--border-color);
  border-top: 5px solid var(--accent-color);
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
  margin: 24px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.privacy-note {
  background: var(--note-bg);
  padding: 12px 16px;
  border-radius: 20px;
  font-size: 13px;
  color: var(--typing-color);
  text-align: center;
  margin: 12px;
  box-shadow: 0 2px 5px var(--shadow-color);
}

@media (max-width: 480px) {
  .c {
    height: 96%;
    bottom: 2%;
  }
  .input-box.focused {
    position: fixed;
    bottom: 0;
    left: 2.5%;
    width: 95%;
    margin: 0;
    border-radius: 32px 32px 0 0;
    box-shadow: 0 -4px 15px var(--shadow-color);
  }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
`;
document.head.appendChild(style);

// ===== Injetar HTML (melhorado para premium look, privacy note, dynamic header) =====
const chatContainer = document.createElement('div');
chatContainer.innerHTML = `
<div class="c" id="cb" role="dialog" aria-label="Chatbot da Frame" aria-live="polite">
  <div class="h" id="header">
    <h2 id="welcomeText">Olá! Tudo bem? Como podemos ajudar?</h2>
    <div class="logo-circles">
      <div class="circle"><img src="https://framerusercontent.com/images/uKxosbf9vgV1bHLVDN6DrMHmgE.png" alt="Símbolo Frame 1"></div>
      <div class="circle"><img src="https://framerusercontent.com/images/uKxosbf9vgV1bHLVDN6DrMHmgE.png" alt="Símbolo Frame 2"></div>
      <div class="circle"><img src="https://framerusercontent.com/images/yCLuCvLmAusOiyCw3BYHiuymEMM.png" alt="Assistente Fabi" title="Fabi - Assistente Virtual"></div>
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
    <button onclick="toggleDarkMode()">Alternar Modo Escuro</button>
    <button onclick="clearChatHistory()">Limpar Histórico de Chat</button>
    <button onclick="location.href='https://frameag.com/models'">Voltar ao Catálogo de Modelos</button>
    <button onclick="window.open('https://t.me/suporteframebot?start=chatbot-site-menu','_blank')">Atendimento Humano</button>
  </div>
</div>
<div id="chatEnd" class="center-end">Este chat foi encerrado.</div>
<div class="scroll-top-btn" id="scrollTopBtn" onclick="scrollToTop()" aria-label="Voltar ao topo">↑</div>
<div class="loading-spinner" id="loadingSpinner" style="display:none;"></div>
`;
document.body.appendChild(chatContainer);

// ===== Variáveis de controle (adicionadas flags para iniciação, limites) =====
let typingShownThisFlow = false;
let messageHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
let userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
let lastMessage = localStorage.getItem('lastMessage') || null;
let floodCount = 0;
let lastSendTime = 0;
let isChatInitiated = false;
const MAX_HISTORY = 50;
const p = "https://framerusercontent.com/images/yCLuCvLmAusOiyCw3BYHiuymEMM.png"; // Foto da Fabi
const b = document.getElementById('bd');
const welcomeText = document.getElementById('welcomeText');
const inputBox = document.getElementById('inputBox');
const userInput = document.getElementById('userInput');
const mediaInput = document.getElementById('mediaInput');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const header = document.getElementById('header');

// ===== Função de sanitização para prevenir XSS =====
function sanitize(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===== Inicialização com verificação de estado =====
function initChat() {
  if (userInfo) {
    welcomeText.textContent = `Olá ${userInfo.name.split(' ')[0]}! Tudo bem?`;
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
  inputBox.addEventListener('focusin', () => inputBox.classList.add('focused'));
  inputBox.addEventListener('focusout', () => inputBox.classList.remove('focused'));
  trapFocus(document.getElementById('ov'));
  if (messageHistory.length > 0) {
    loadChat();
  }
}

// ===== Mostrar tela inicial (melhorada para premium) =====
function showInitialScreen() {
  b.innerHTML = `
    <div class="initial-screen">
      <p>Mensagens</p>
      <div class="privacy-note">No atendimento, podemos solicitar dados pessoais conforme necessário. Acesse nossa Política de Privacidade no site ou app.</div>
      <div class="recent-msg" id="recentMsg" style="display:none;"></div>
      <button onclick="startChat()" class="btn p">Iniciar Atendimento</button>
    </div>
  `;
}

// ===== Mostrar mensagem recente (com sanitização) =====
function showRecentMessage(msg) {
  const recent = document.getElementById('recentMsg');
  if (recent) {
    recent.innerHTML = `
      <img src="${p}" alt="Fabi">
      ${sanitize(msg)}
      <span class="delete-btn" onclick="deleteRecent()">✕</span>
    `;
    recent.style.display = 'flex';
  }
}

// ===== Deletar mensagem recente =====
function deleteRecent() {
  localStorage.removeItem('lastMessage');
  showInitialScreen();
}

// ===== Iniciar chat e mini-form (com fontes 16px, centralizado) =====
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

// ===== Salvar info do usuário e atualizar header =====
function saveUserInfo() {
  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  if (name && email) {
    userInfo = { name, email };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    welcomeText.textContent = `Fabi.`;
    loadChat();
  }
}

// ===== Carregar chat com lazy loading e limite =====
function loadChat() {
  loadingSpinner.style.display = 'block';
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
    b.innerHTML = '';
    messageHistory.slice(-MAX_HISTORY).forEach(msg => am(msg.text, msg.btns, 0, msg.user));
    if (!isChatInitiated) {
      inicio();
      isChatInitiated = true;
    }
  }, 600);
}

// ===== Indicador de digitação melhorado =====
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

// ===== Adicionar mensagem (com sanitização, timestamp separado, history limit) =====
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
    m.setAttribute('role', 'log');
    let i = document.createElement('img');
    i.src = user ? '' : p;
    i.alt = user ? '' : 'Fabi';
    let bb = document.createElement('div');
    bb.className = 'bb';
    bb.innerHTML = sanitize(text);
    let bt = document.createElement('span');
    bt.className = 'bt';
    bt.textContent = 'agora';
    bb.appendChild(bt);
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
    if (user) {
      m.append(bb);
    } else {
      m.append(i, bb);
    }
    b.appendChild(m);
    b.scrollTop = b.scrollHeight;
    const entry = { text, btns, user };
    messageHistory.push(entry);
    if (messageHistory.length > MAX_HISTORY) messageHistory.shift();
    localStorage.setItem('chatHistory', JSON.stringify(messageHistory));
    if (!user) localStorage.setItem('lastMessage', text);
  }, delay + (user ? 0 : 1000));
}

// ===== Processar mensagem do usuário (restaurado original, respostas mais longas, sem cláusulas) =====
function processUserMessage(text) {
  const now = Date.now();
  if (now - lastSendTime < 10000 && ++floodCount > 5) {
    am("Por favor, evite enviar mensagens repetidas rapidamente. Aguarde um momento.");
    userInput.disabled = true;
    setTimeout(() => { userInput.disabled = false; floodCount = 0; }, 10000);
    return;
  }
  floodCount = floodCount > 0 ? floodCount : 1;
  lastSendTime = now;

  am(text, null, 0, true);
  let t = text.toLowerCase();

  if (t.includes("denunciar")) {
    am('Na Frame, levamos segurança muito a sério. Caso encontre irregularidades em anúncios do nosso site, acesse <a href=https://frameag.com/report target=_blank class=link>frameag.com/report</a> e denuncie anonimamente. Isso ajuda a manter a plataforma segura para todos.');
    perguntarSatisfacao();
    return;
  }
  if (t.includes("humano") || t.includes("analista") || t.includes("falar com a gente")) {
    fh();
    am('Se preferir, você também pode enviar um email para: <span class="semibold link">contato@frameag.com</span>. Nossa equipe está pronta para ajudar com qualquer dúvida mais complexa.');
    return;
  }
  if (t.includes("seguro") || t.includes("segurança")) {
    am('Você pode ter se perguntado se a Frame é segura, e sim, é. Aqui, garantimos autenticação em três etapas e contamos com um time de segurança disponível 24h. Além disso, usamos tecnologias avançadas para proteger seus dados e interações. Saiba mais em <a href=https://frameag.com/blog/verificacao target=_blank class=link>nosso blog sobre verificação</a>.');
    perguntarSatisfacao();
    return;
  }
  if (t.includes("termos") || t.includes("condições") || t.includes("politica de privacidade")) {
    am('Nossos Termos e Condições detalham como usamos e protegemos seus dados. Você pode acessá-los em <a href=https://frameag.com/termos target=_blank class=link>frameag.com/termos</a>. Para privacidade, focamos em conformidade com leis como LGPD, garantindo transparência e segurança.');
    perguntarSatisfacao();
    return;
  }
  if (t.includes("criadora") || t.includes("anunciante") || t.includes("agenciada")) {
    am('Criadoras podem ser agenciadas, recebendo suporte completo, ou anunciantes independentes com ferramentas de promoção. Para se cadastrar, acesse <a href=https://frameag.com/login target=_blank class=link>frameag.com/login</a>, confirme +18 anos e passe pela verificação. Oferecemos marketing, análises e mais para maximizar resultados.');
    perguntarSatisfacao();
    return;
  }
  if (t.includes("contratante") || t.includes("assinante") || t.includes("premium")) {
    am('Como contratante, você tem acesso a perfis completos, agendamentos e comunicação segura. O Premium desbloqueia catálogo sem anúncios, galerias exclusivas e suporte prioritário. Visite <a href=https://frameag.com/premium target=_blank class=link>frameag.com/premium</a> para mais detalhes e assinatura.');
    perguntarSatisfacao();
    return;
  }
  if (t.includes("dados pessoais") || t.includes("lgpd") || t.includes("exclusão de dados")) {
    am('Tratamos dados com cuidado, conforme LGPD. Você pode acessar, corrigir ou excluir dados via juridico@frameag.com. Para casos de banimento, retemos dados necessários para prevenção de fraudes, mas sempre com transparência.');
    perguntarSatisfacao();
    return;
  }
  if (t.includes("idioma") || t.includes("english") || t.includes("español")) {
    if (t.includes("english")) {
      am('For English support, please visit our dedicated page: <a href="https://frameag.com/en" target="_blank" class="link">frameag.com/en</a>. There, you can get assistance in your preferred language.');
    } else if (t.includes("español")) {
      am('Para atención en español, visite nuestra página dedicada: <a href="https://frameag.com/es" target="_blank" class="link">frameag.com/es</a>. Allí, puede obtener asistencia en su idioma preferido.');
    } else {
      am('Por favor, selecione o idioma no menu inicial para melhor atendimento.');
    }
    return;
  }
  if (t.includes("definições") || t.includes("o que é plataforma")) {
    am('A Frame é uma plataforma especializada em conectar criadoras de conteúdo com contratantes, oferecendo ferramentas de gestão, promoção e segurança. Atuamos como provedora de tecnologia, sem intermediar negociações diretas.');
    perguntarSatisfacao();
    return;
  }

  am("Não consegui entender sua solicitação. Vamos tentar novamente? Me descreva mais detalhes sobre o que precisa, como segurança, cadastro ou premium.");
  am("", [
    { l: "Voltar ao menu", p: 1, a: inicio }
  ], 500);
}

// ===== Envio de mídia com preview e limpeza =====
mediaInput.addEventListener('change', () => {
  const file = mediaInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      const preview = document.createElement('img');
      preview.src = e.target.result;
      preview.className = 'media-preview';
      preview.alt = 'Pré-visualização da mídia';
      am('Mídia anexada:', null, 0, true);
      b.lastChild.querySelector('.bb').appendChild(preview);
      mediaInput.value = ''; // Limpa após uso
    };
    reader.readAsDataURL(file);
  }
});

// ===== Input listener com auto-emoji expandido =====
userInput.addEventListener('input', e => {
  let val = e.target.value;
  val = val.replace(/:\)/g, '😊').replace(/<3/g, '❤️').replace(/:D/g, '😄').replace(/:\(/g, '😔');
  e.target.value = val;
});

userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter' && e.target.value.trim() !== "") {
    processUserMessage(e.target.value.trim());
    e.target.value = "";
    userInput.focus(); // Foco após envio
  }
});

document.getElementById('sendBtn').addEventListener('click', () => {
  if (userInput.value.trim() !== "") {
    processUserMessage(userInput.value.trim());
    userInput.value = "";
    userInput.focus();
  }
});

// ===== Perguntar satisfação (mais amigável) =====
function perguntarSatisfacao() {
  am("Minha explicação ajudou a esclarecer sua dúvida? Estou aqui para refinar ou explicar mais se necessário.");
  am("", [
    { l: "Sim, tudo esclarecido!", p: 1, a: () => {
        am("Perfeito! Agradecemos pelo contato e estamos sempre à disposição para mais ajuda.");
        setTimeout(() => { document.getElementById('chatEnd').style.display = 'block'; }, 1000);
      }},
    { l: "Não, preciso de mais detalhes", a: () => { 
        fh(); 
        am('Se preferir, envie um email para: <span class="semibold link">contato@frameag.com</span> com mais informações sobre sua dúvida.');
      }}
  ], 800);
}

// ===== Fluxos restaurados e expandidos (sem cláusulas, mais detalhados) =====
function menuPT() {
  am("É ótimo ter você em nossa plataforma. Vamos personalizar o atendimento.");
  am("Me conte, qual é a sua relação com a Frame hoje? Isso ajuda a direcionar melhor as opções.");
  am("", [
    { l: "Contratante / Assinante", p: 1, a: cmPT },
    { l: "Criadora / Anunciante", a: crPT }
  ], 800);
}

function cmPT() {
  am("Certo! Como contratante, veja as principais formas como posso ajudar você.");
  am("Selecione uma opção abaixo para prosseguirmos:");
  am("", [
    { l: "Quero contratar uma modelo", p: 1, a: ctPT },
    { l: "Sobre segurança", a: () => { 
        am('Você pode ter se perguntado se a Frame é segura, e sim, é. Aqui, garantimos autenticação em três etapas e contamos com um time de segurança disponível 24h. Saiba mais detalhes em nosso blog sobre verificação.');
        setTimeout(perguntarSatisfacao, 800);
      }},
    { l: "Reportar modelo anonimamente", a: () => { 
        am('Na Frame, levamos segurança muito a sério. Caso encontre irregularidades em anúncios do nosso site, acesse frameag.com/report e denuncie anonimamente. Sua contribuição é importante para manter a comunidade segura.');
      }},
    { l: "Tive problemas com cadastro", a: cadastroPT },
    { l: "Falar com humano", a: () => { 
        fh(); 
        setTimeout(() => {
          am('Se preferir, você também pode enviar um email para: <span class="semibold link">contato@frameag.com</span>.');
        }, 700);
      }},
    { l: "Voltar", a: inicio },
    { l: "Quero me tornar Premium", p: 1, a: premiumPT }
  ], 800);
}

function cadastroPT() {
  am("Poxa, sinto muito que tenha tido problemas com seu cadastro. Vamos resolver isso passo a passo.");
  am("Qual dessas situações melhor se aplica ao seu caso? Escolha para eu guiar você.");
  am("", [
    { l: "Não recebi o código de ativação", a: problemaCodigo },
    { l: "Perdi o acesso ao meu e-mail", a: problemaEmail },
    { l: "Não sei como realizar meu login", a: problemaLogin },
    { l: "Voltar", a: cmPT }
  ], 800);
}

function problemaCodigo() {
  am("Se o código de ativação não chegou, aqui vão algumas dicas rápidas para verificar:");
  am("1. Verifique a caixa de spam ou lixo eletrônico no seu e-mail.<br>2. Confirme se o e-mail cadastrado está correto no site.<br>3. Aguarde alguns minutos, pois pode haver atraso.<br>4. Tente reenviar o código diretamente pela página de cadastro.");
  am("Se o problema persistir após essas verificações, entre em contato com nossa equipe para assistência personalizada:");
  am("", [
    { l: "Ir para atendimento", p: 1, a: fh },
    { l: "Voltar", a: cadastroPT }
  ], 1400);
}

function problemaEmail() {
  am("Se você perdeu acesso ao e-mail usado no cadastro, não se preocupe, há soluções:");
  am("1. Tente recuperar a conta de e-mail diretamente no provedor (como Gmail ou Outlook).<br>2. Se não for possível, podemos ajudar a atualizar o e-mail na sua conta Frame.");
  am("Importante: Para segurança, você precisará confirmar dados pessoais e passar pela verificação Frame Authentic antes da atualização.");
  am("Para prosseguir com a atualização:");
  am("", [
    { l: "Ir para atendimento", p: 1, a: fh },
    { l: "Voltar", a: cadastroPT }
  ], 2000);
}

function problemaLogin() {
  am("Para iniciar ou recuperar seu login, acesse a Área de Cadastro em <a href='https://frameag.com/cadastro' target='_blank' class='link'>frameag.com/cadastro</a> e siga os passos intuitivos.");
  am("Se ainda tiver dúvidas, assista ao nosso vídeo tutorial completo: <a href='https://' target='_blank' class='link'>https://</a>. Ele cobre tudo desde o início.");
  am("Deseja voltar ao menu de problemas com cadastro para outras opções?");
  am("", [
    { l: "Sim, voltar", a: cadastroPT }
  ], 1400);
}

function premiumPT() {
  am("No Premium, você desbloqueia vantagens exclusivas que elevam sua experiência na Frame.");
  am("Acesso ao catálogo completo sem anúncios, galerias sexy exclusivas, atendimento prioritário 24h e análises personalizadas para melhores escolhas.");
  am("Para se tornar Premium e conhecer todos os benefícios em detalhes, clique abaixo:");
  am("", [{ l: "Quero ser Premium", p: 1, a: () => window.open('https://frameag.com/premium','_blank') }], 1400);
}

function ctPT() {
  am("Antes de prosseguirmos, confirme se você possui 18 anos ou mais, pois nossos serviços são exclusivos para maiores de idade.");
  am("", [
    { l: "Sim", p: 1, a: () => { 
        am('Ótimo! Antes de contratar, explore todas as modelos em nosso catálogo completo: <a href="https://frameag.com/models" target="_blank" class="link">frameag.com/models</a>. Lá você encontra perfis detalhados e opções variadas.');
        am("Se já decidiu qual modelo contratar, fale diretamente com nosso time para assistência rápida e segura:");
        am("", [{ l: "Ir para atendimento 24h", p: 1, a: () => window.open('https://t.me/suporteframebot?start=catalogo-site', '_blank') }], 500);
        setTimeout(perguntarSatisfacao, 1000);
      }},
    { l: "Não", a: () => { 
        am("Desculpe, não podemos prosseguir. O ecossistema da Frame é projetado exclusivamente para usuários maiores de 18 anos, priorizando responsabilidade e conformidade legal.");
      }}
  ]);
}

function crPT() {
  am("Perfeito, vou te passar as principais informações para criadoras de conteúdo na Frame.");
  am("Para se cadastrar, acesse <a href=https://frameag.com/login target=_blank class=link>frameag.com/login</a> e siga as instruções simples. O processo é rápido e seguro.");
  am("É necessário ter mais de 18 anos, passar pela aprovação no Frame Authentic (nossa verificação de identidade) e concordar com os Termos e Condições para garantir um ambiente profissional.");
  am("Se precisar de ajuda adicional, como dicas de otimização de perfil ou marketing, acesse sua Área de Login e clique em 'Central de Atendimento'. Estamos aqui para maximizar seus resultados!");
  am("", [
    { l: "Voltar ao menu", a: inicio }
  ], 2000);
  setTimeout(perguntarSatisfacao, 2600);
}

function fh() { 
  am("Certo! Vou te direcionar agora para um atendente humano da Frame, que pode oferecer suporte personalizado e resolver questões mais específicas.");
  am("", [{ l: "Ir para atendimento", p: 1, a: () => window.open('https://t.me/suporteframebot?start=chatbot-site', '_blank') }]); 
}

function inicio() {
  typingShownThisFlow = false;
  if (isChatInitiated) return; // Evita duplicação se já iniciado
  am("Olá, boas-vindas ao atendimento virtual da Frame :)");
  am("Estamos aqui para te ajudar 24 horas por dia, com respostas rápidas e precisas!");
  am("Selecione seu idioma para começarmos:");
  am("", [
    { l: "Português", p: 1, a: menuPT },
    { l: "English", a: () => alert("Visit: frameag.com/en for English support.") },
    { l: "Español", a: () => alert("Visite: frameag.com/es para atención en español.") }
  ], 1600);
  isChatInitiated = true;
}

// ===== Menu overlay com focus trap =====
function openMenu() {
  const ov = document.getElementById('ov');
  ov.style.display = 'flex';
  ov.classList.add('show');
  document.getElementById('menuOverlay').querySelector('button').focus();
}

function closeMenu() {
  const ov = document.getElementById('ov');
  ov.style.display = 'none';
  ov.classList.remove('show');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

function clearChatHistory() {
  if (confirm('Tem certeza que deseja limpar o histórico? Isso não pode ser desfeito.')) {
    messageHistory = [];
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('lastMessage');
    b.innerHTML = '';
    isChatInitiated = false;
    initChat();
  }
}

function scrollToTop() {
  b.scroll({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
  scrollTopBtn.classList.toggle('show', b.scrollTop > 300);
}

// ===== Trap focus no overlay para A11y =====
function trapFocus(element) {
  const focusable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  element.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

// ===== Error handling expandido =====
window.addEventListener('error', () => {
  am('Ocorreu um erro inesperado. Por favor, recarregue a página ou contate suporte.');
});

// ===== Inicializar =====
window.onload = initChat;