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

// ===== Injetar CSS (ajustado para fluidez, animações discretas, tamanhos reduzidos, espaçamentos compactos, estilo flat premium, layout inspirado em Inter) =====
const style = document.createElement('style');
style.textContent = `
:root {
  --bg-color: #f8f8f8;
  --text-color: #000;
  --accent-color: #AB865B;
  --accent-light: #D3AD83;
  --secondary-bg: #fff;
  --border-color: rgba(0,0,0,0.1);
  --shadow-color: rgba(0,0,0,0.05); /* Suavizado para flat premium */
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
  --shadow-color: rgba(0,0,0,0.3); /* Suavizado */
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
  bottom: 10px; /* Ajustado como antigo */
  right: 10px;
  width: 360px;
  max-width: 95%;
  height: 80%; /* Ajustado como antigo para compacto */
  background: var(--secondary-bg);
  border-radius: 8px; /* Reduzido para flat */
  box-shadow: 0 4px 12px var(--shadow-color); /* Suavizado */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  transition: all 0.3s ease-in-out; /* Mais rápida */
}

.h {
  background: var(--accent-color);
  color: #fff;
  padding: 12px; /* Reduzido para header contido */
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Ajustado para estilo Inter */
  gap: 8px;
  font-weight: 500;
  font-size: 15px; /* Reduzido */
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05); /* Suavizado */
}

.h h2 {
  margin: 0;
  font-size: 15px;
  text-align: left;
}

.logo-circles {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px; /* Compacto, lado a lado como Inter */
}

.circle {
  width: 42px; /* Reduzido */
  height: 42px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1); /* Suavizado */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1;
  position: relative;
}

.circle:hover {
  transform: scale(1.05);
  box-shadow: 0 3px 8px rgba(0,0,0,0.15);
}

.circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.m {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.2s ease; /* Mais rápida */
}

.m span {
  width: 22px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.m:hover span {
  background: var(--accent-light);
}

.b {
  flex: 1;
  padding: 12px; /* Reduzido para compacto */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px; /* Reduzido */
  font-size: 13px; /* Reduzido */
  scroll-behavior: smooth;
  position: relative;
}

.msg {
  display: flex;
  gap: 6px;
  animation: fadeIn 0.3s ease forwards; /* Mais rápida e discreta */
  opacity: 0;
  max-width: 100%;
  transition: opacity 0.2s ease;
}

.msg img {
  width: 28px; /* Reduzido */
  height: 28px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 1px 3px var(--shadow-color); /* Suavizado */
}

.msg.user-msg {
  justify-content: flex-end;
}

.bb {
  background: var(--msg-bg);
  padding: 8px 12px; /* Reduzido para compacto */
  border-radius: 14px; /* Reduzido */
  max-width: 80%;
  word-break: break-word;
  box-shadow: 0 1px 2px var(--shadow-color); /* Suavizado */
  transition: all 0.2s ease;
  position: relative;
}

.bb:hover {
  box-shadow: 0 2px 4px var(--shadow-color);
}

.user-msg .bb {
  background: var(--user-msg-bg);
  color: #fff;
}

.bt {
  display: block;
  margin-top: 4px; /* Reduzido */
  font-size: 10px;
  color: var(--typing-color);
  text-align: right;
  opacity: 0.8;
}

.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px; /* Reduzido */
  margin-top: 6px; /* Reduzido */
}

.btn {
  padding: 8px 12px; /* Reduzido */
  border-radius: 18px;
  cursor: pointer;
  font-size: 13px; /* Reduzido */
  border: 2px solid var(--accent-color);
  background: transparent;
  color: var(--accent-color);
  transition: all 0.2s ease; /* Mais rápida */
  font-weight: 500;
}

.btn:hover {
  background: var(--accent-color);
  color: #fff;
  transform: translateY(-1px);
}

.p {
  background: var(--accent-color);
  color: #fff;
}

.f {
  font-size: 11px; /* Reduzido */
  padding: 8px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  line-height: 14px;
  margin-bottom: 8px; /* Reduzido */
  color: var(--text-color);
  background: var(--note-bg);
  border-radius: 8px;
}

.f a, .link {
  color: var(--accent-color);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 1px; /* Ajustado para discreto */
  transition: color 0.2s ease;
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
  background: rgba(0,0,0,0.5);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadein 0.3s ease;
  backdrop-filter: blur(3px); /* Suavizado */
}

.oc {
  background: var(--secondary-bg);
  padding: 20px; /* Reduzido */
  border-radius: 12px; /* Reduzido */
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Reduzido */
  min-width: 240px;
  position: relative;
  box-shadow: 0 4px 12px var(--shadow-color); /* Suavizado */
  transition: transform 0.3s ease;
  transform: scale(0.98);
}

.o.show .oc {
  transform: scale(1);
}

.oc button {
  padding: 8px 14px; /* Reduzido */
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.oc button:hover {
  background: var(--accent-light);
  transform: translateY(-1px);
}

.close-x {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 18px;
  cursor: pointer;
  color: var(--text-color);
  transition: color 0.2s ease;
}

.close-x:hover {
  color: var(--accent-color);
}

.input-box {
  display: flex;
  align-items: center;
  gap: 6px; /* Reduzido */
  margin: 6px 12px 8px; /* Reduzido */
  padding: 8px 12px;
  background: var(--accent-color);
  border-radius: 20px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px var(--shadow-color); /* Suavizado */
  position: relative;
}

.input-box.focused {
  box-shadow: 0 3px 8px var(--shadow-color);
  transform: translateY(-2px);
}

.input-box input {
  border: none;
  outline: none;
  flex: 1;
  background: none;
  color: #fff;
  font-size: 15px; /* Ajustado para prevenir zoom, reduzido */
}

.input-box input::placeholder {
  color: rgba(255,255,255,0.7);
  font-size: 15px;
}

.send-btn {
  border: 2px solid #fff;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px; /* Reduzido */
  height: 32px;
  border-radius: 50%;
  outline: none;
  padding: 0;
  transition: all 0.2s ease;
}

.send-btn:hover {
  background: rgba(255,255,255,0.15);
  transform: rotate(10deg);
}

.send-btn svg {
  width: 18px;
  height: 18px;
  stroke: #fff;
  fill: none;
  stroke-width: 1.8;
}

.center-end {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: var(--typing-color);
  animation: fadein 0.4s ease;
  display: none;
  padding: 8px 16px;
  background: var(--note-bg);
  border-radius: 14px;
  box-shadow: 0 2px 6px var(--shadow-color);
}

.semibold {
  font-weight: 600;
}

.typing-bubble .bb {
  background: var(--msg-bg);
  padding: 6px 10px; /* Reduzido */
}

.dots {
  display: flex;
  gap: 5px;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-light);
  opacity: 0.35;
  animation: blink 1.2s infinite ease-in-out;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0% { opacity: 0.35; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-1px); }
  100% { opacity: 0.35; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); } /* Discreto translateY como antigo */
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}

.initial-screen {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Ajustado para estilo Inter, não centralizado */
  justify-content: flex-start;
  height: 100%;
  padding: 12px; /* Reduzido */
  gap: 12px; /* Reduzido */
  animation: fadeIn 0.4s ease;
  color: var(--text-color);
}

.initial-screen p {
  font-size: 14px; /* Reduzido, mas mantido para form */
  color: var(--typing-color);
  margin: 0;
}

.recent-msg {
  background: var(--msg-bg);
  padding: 10px 14px; /* Reduzido */
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  width: 100%;
  box-shadow: 0 1px 3px var(--shadow-color); /* Suavizado */
  color: var(--text-color);
}

.recent-msg:hover {
  background: var(--border-color);
  transform: translateY(-1px);
}

.recent-msg .delete-btn {
  margin-left: auto;
  color: #ff4d4d;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.2s ease;
}

.recent-msg .delete-btn:hover {
  color: #cc0000;
}

.mini-form {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Reduzido */
  width: 100%;
  padding: 0 12px;
}

.mini-form p {
  font-size: 14px; /* Mantido para form */
  color: var(--text-color);
  text-align: left; /* Ajustado */
  margin-bottom: 6px;
}

.mini-form input {
  padding: 8px 12px; /* Reduzido */
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--input-bg);
  color: var(--text-color);
  font-size: 14px; /* Reduzido */
  transition: border 0.2s ease;
}

.mini-form input:focus {
  border: 1px solid var(--accent-color);
  box-shadow: 0 0 0 2px rgba(171,134,91,0.15); /* Suavizado */
}

.media-preview {
  max-width: 100%;
  border-radius: 14px;
  margin-top: 6px;
  box-shadow: 0 2px 6px var(--shadow-color);
  transition: transform 0.2s ease;
}

.media-preview:hover {
  transform: scale(1.01);
}

.scroll-top-btn {
  position: absolute;
  bottom: 80px;
  right: 16px;
  background: var(--accent-color);
  color: #fff;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 10;
  font-size: 18px;
}

.scroll-top-btn.show {
  opacity: 1;
  transform: translateY(0);
}

.scroll-top-btn:hover {
  transform: scale(1.05);
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 16px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.privacy-note {
  background: var(--note-bg);
  padding: 8px 12px; /* Reduzido */
  border-radius: 14px;
  font-size: 12px;
  color: var(--typing-color);
  text-align: left;
  margin: 8px 0;
  box-shadow: 0 1px 3px var(--shadow-color);
}

@media (max-width: 480px) {
  .c {
    height: 90%; /* Ajustado para mobile como antigo */
    bottom: 10px;
    right: 2.5%;
    width: 95%;
  }
  .input-box.focused {
    position: fixed;
    bottom: 0;
    left: 2.5%;
    width: 95%;
    margin: 0;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -2px 8px var(--shadow-color);
  }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
`;
document.head.appendChild(style);

// ===== Injetar HTML (ajustado para layout mais compacto e similar a Inter) =====
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

// ===== Variáveis de controle (mantidas, com ajustes finos para fluidez) =====
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

// ===== Função de sanitização ajustada para permitir HTML seguro em mensagens do bot =====
function sanitize(text, allowHtml = false) {
  if (allowHtml) {
    // Permitir tags seguras como <a>, <span>, <br> para bot
    const allowed = text.replace(/<script.*?>.*?<\/script>/gi, '')
                        .replace(/<iframe.*?>.*?<\/iframe>/gi, '')
                        .replace(/onclick=".*?"/gi, '');
    const div = document.createElement('div');
    div.innerHTML = allowed;
    return div.innerHTML;
  } else {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
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

// ===== Mostrar tela inicial (ajustada para mais similar a Inter: seções compactas, mensagens recentes) =====
function showInitialScreen() {
  b.innerHTML = `
    <div class="initial-screen">
      <p>Mensagens</p>
      <div class="recent-msg" id="recentMsg" style="display:none;"></div>
      <div class="privacy-note">No atendimento, podemos solicitar dados pessoais conforme necessário. Acesse nossa Política de Privacidade no site ou app.</div>
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
      ${sanitize(msg, true)}
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

// ===== Iniciar chat e mini-form (com fontes ajustadas, layout compacto) =====
function startChat() {
  if (!userInfo) {
    b.innerHTML = `
      <div class="mini-form">
        <p>Vamos te conhecer melhor</p>
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
  }, 500); /* Reduzido delay */
}

// ===== Indicador de digitação ajustado =====
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

// ===== Adicionar mensagem (ajustada para HTML em bot, delays reduzidos, rolagem suave) =====
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
    let bb = document.createElement('div');
    bb.className = 'bb';
    bb.innerHTML = (user ? sanitize(text) : sanitize(text, true));
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
      let i = document.createElement('img');
      i.src = p;
      i.alt = 'Fabi';
      m.append(i, bb);
    }
    b.appendChild(m);
    b.scrollTop = b.scrollHeight;
    const entry = { text, btns, user };
    messageHistory.push(entry);
    if (messageHistory.length > MAX_HISTORY) messageHistory.shift();
    localStorage.setItem('chatHistory', JSON.stringify(messageHistory));
    if (!user) localStorage.setItem('lastMessage', text);
  }, delay + (user ? 0 : 600)); /* Reduzido para 600ms */
}

// ===== Processar mensagem do usuário (mantido, com respostas fluídas) =====
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

// ===== Perguntar satisfação (mais amigável, delays reduzidos) =====
function perguntarSatisfacao() {
  am("Minha explicação ajudou a esclarecer sua dúvida? Estou aqui para refinar ou explicar mais se necessário.", [
    { l: "Sim, tudo esclarecido!", p: 1, a: () => {
        am("Perfeito! Agradecemos pelo contato e estamos sempre à disposição para mais ajuda.");
        setTimeout(() => { document.getElementById('chatEnd').style.display = 'block'; }, 600);
      }},
    { l: "Não, preciso de mais detalhes", a: () => { 
        fh(); 
        am('Se preferir, envie um email para: <span class="semibold link">contato@frameag.com</span> com mais informações sobre sua dúvida.');
      }}
  ], 500); /* Junto em uma bolha, delay reduzido */
}

// ===== Fluxos restaurados e expandidos (delays reduzidos para ritmo natural, botões juntos onde possível) =====
function menuPT() {
  am("É ótimo ter você em nossa plataforma. Vamos personalizar o atendimento.");
  am("Me conte, qual é a sua relação com a Frame hoje? Isso ajuda a direcionar melhor as opções.", [
    { l: "Contratante / Assinante", p: 1, a: cmPT },
    { l: "Criadora / Anunciante", a: crPT }
  ], 500); /* Delay reduzido, botões juntos */
}

function cmPT() {
  am("Certo! Como contratante, veja as principais formas como posso ajudar você.");
  am("Selecione uma opção abaixo para prosseguirmos:", [
    { l: "Quero contratar uma modelo", p: 1, a: ctPT },
    { l: "Sobre segurança", a: () => { 
        am('Você pode ter se perguntado se a Frame é segura, e sim, é. Aqui, garantimos autenticação em três etapas e contamos com um time de segurança disponível 24h. Saiba mais detalhes em nosso blog sobre verificação.');
        setTimeout(perguntarSatisfacao, 500);
      }},
    { l: "Reportar modelo anonimamente", a: () => { 
        am('Na Frame, levamos segurança muito a sério. Caso encontre irregularidades em anúncios do nosso site, acesse frameag.com/report e denuncie anonimamente. Sua contribuição é importante para manter a comunidade segura.');
      }},
    { l: "Tive problemas com cadastro", a: cadastroPT },
    { l: "Falar com humano", a: () => { 
        fh(); 
        setTimeout(() => {
          am('Se preferir, você também pode enviar um email para: <span class="semibold link">contato@frameag.com</span>.');
        }, 500);
      }},
    { l: "Voltar", a: inicio },
    { l: "Quero me tornar Premium", p: 1, a: premiumPT }
  ], 500); /* Delay reduzido */
}

function cadastroPT() {
  am("Poxa, sinto muito que tenha tido problemas com seu cadastro. Vamos resolver isso passo a passo.");
  am("Qual dessas situações melhor se aplica ao seu caso? Escolha para eu guiar você.", [
    { l: "Não recebi o código de ativação", a: problemaCodigo },
    { l: "Perdi o acesso ao meu e-mail", a: problemaEmail },
    { l: "Não sei como realizar meu login", a: problemaLogin },
    { l: "Voltar", a: cmPT }
  ], 500);
}

function problemaCodigo() {
  am("Se o código de ativação não chegou, aqui vão algumas dicas rápidas para verificar:");
  am("1. Verifique a caixa de spam ou lixo eletrônico no seu e-mail.<br>2. Confirme se o e-mail cadastrado está correto no site.<br>3. Aguarde alguns minutos, pois pode haver atraso.<br>4. Tente reenviar o código diretamente pela página de cadastro.");
  am("Se o problema persistir após essas verificações, entre em contato com nossa equipe para assistência personalizada:", [
    { l: "Ir para atendimento", p: 1, a: fh },
    { l: "Voltar", a: cadastroPT }
  ], 700); /* Junto botões, delay reduzido */
}

function problemaEmail() {
  am("Se você perdeu acesso ao e-mail usado no cadastro, não se preocupe, há soluções:");
  am("1. Tente recuperar a conta de e-mail diretamente no provedor (como Gmail ou Outlook).<br>2. Se não for possível, podemos ajudar a atualizar o e-mail na sua conta Frame.");
  am("Importante: Para segurança, você precisará confirmar dados pessoais e passar pela verificação Frame Authentic antes da atualização.");
  am("Para prosseguir com a atualização:", [
    { l: "Ir para atendimento", p: 1, a: fh },
    { l: "Voltar", a: cadastroPT }
  ], 700); /* Delay reduzido */
}

function problemaLogin() {
  am("Para iniciar ou recuperar seu login, acesse a Área de Cadastro em <a href='https://frameag.com/cadastro' target='_blank' class='link'>frameag.com/cadastro</a> e siga os passos intuitivos.");
  am("Se ainda tiver dúvidas, assista ao nosso vídeo tutorial completo: <a href='https://' target='_blank' class='link'>https://</a>. Ele cobre tudo desde o início.");
  am("Deseja voltar ao menu de problemas com cadastro para outras opções?", [
    { l: "Sim, voltar", a: cadastroPT }
  ], 700); /* Delay reduzido, botões juntos */
}

function premiumPT() {
  am("No Premium, você desbloqueia vantagens exclusivas que elevam sua experiência na Frame.");
  am("Acesso ao catálogo completo sem anúncios, galerias sexy exclusivas, atendimento prioritário 24h e análises personalizadas para melhores escolhas.");
  am("Para se tornar Premium e conhecer todos os benefícios em detalhes, clique abaixo:", [{ l: "Quero ser Premium", p: 1, a: () => window.open('https://frameag.com/premium','_blank') }], 700); /* Delay reduzido, botões juntos */
}

function ctPT() {
  am("Antes de prosseguirmos, confirme se você possui 18 anos ou mais, pois nossos serviços são exclusivos para maiores de idade.", [
    { l: "Sim", p: 1, a: () => { 
        am('Ótimo! Antes de contratar, explore todas as modelos em nosso catálogo completo: <a href="https://frameag.com/models" target="_blank" class="link">frameag.com/models</a>. Lá você encontra perfis detalhados e opções variadas.');
        am("Se já decidiu qual modelo contratar, fale diretamente com nosso time para assistência rápida e segura:", [{ l: "Ir para atendimento 24h", p: 1, a: () => window.open('https://t.me/suporteframebot?start=catalogo-site', '_blank') }], 500);
        setTimeout(perguntarSatisfacao, 700);
      }},
    { l: "Não", a: () => { 
        am("Desculpe, não podemos prosseguir. O ecossistema da Frame é projetado exclusivamente para usuários maiores de 18 anos, priorizando responsabilidade e conformidade legal.");
      }}
  ]); /* Botões juntos */
}

function crPT() {
  am("Perfeito, vou te passar as principais informações para criadoras de conteúdo na Frame.");
  am("Para se cadastrar, acesse <a href=https://frameag.com/login target=_blank class=link>frameag.com/login</a> e siga as instruções simples. O processo é rápido e seguro.");
  am("É necessário ter mais de 18 anos, passar pela aprovação no Frame Authentic (nossa verificação de identidade) e concordar com os Termos e Condições para garantir um ambiente profissional.");
  am("Se precisar de ajuda adicional, como dicas de otimização de perfil ou marketing, acesse sua Área de Login e clique em 'Central de Atendimento'. Estamos aqui para maximizar seus resultados!", [
    { l: "Voltar ao menu", a: inicio }
  ], 700); /* Delay reduzido, botões juntos na última */
  setTimeout(perguntarSatisfacao, 1200);
}

function fh() { 
  am("Certo! Vou te direcionar agora para um atendente humano da Frame, que pode oferecer suporte personalizado e resolver questões mais específicas.", [{ l: "Ir para atendimento", p: 1, a: () => window.open('https://t.me/suporteframebot?start=chatbot-site', '_blank') }]); 
}

function inicio() {
  typingShownThisFlow = false;
  if (isChatInitiated) return; // Evita duplicação se já iniciado
  am("Olá, boas-vindas ao atendimento virtual da Frame :)");
  am("Estamos aqui para te ajudar 24 horas por dia, com respostas rápidas e precisas!", null, 500); /* Delay reduzido */
  am("Selecione seu idioma para começarmos:", [
    { l: "Português", p: 1, a: menuPT },
    { l: "English", a: () => alert("Visit: frameag.com/en for English support.") },
    { l: "Español", a: () => alert("Visite: frameag.com/es para atención en español.") }
  ], 700); /* Delay reduzido */
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
  scrollTopBtn.classList.toggle('show', b.scrollTop > 200); /* Ajustado para aparecer mais cedo */
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

// ===== Error handling expandido (removido o handler global para evitar loops, usar console) =====
window.addEventListener('error', (e) => {
  console.error('Erro no chatbot:', e.message);
});

// ===== Inicializar =====
window.onload = initChat;