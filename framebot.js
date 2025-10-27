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
  right: 20px;
  width: 380px;
  max-width: 95%;
  height: 90%; /* Aumentado para melhor visual em desktop e mobile */
  background: var(--secondary-bg);
  border-radius: 16px;
  box-shadow: 0 4px 15px var(--shadow-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  transition: all 0.3s ease-in-out;
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
  font-weight: 500;
  font-size: 16px;
  position: relative;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.1);
}

.h h2 {
  margin: 0;
  font-size: 1.2rem;
  text-align: center;
}

.logo-circles {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px; /* Lado a lado */
}

.circle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1;
  position: relative;
}

.circle:hover {
  transform: scale(1.1);
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
  transition: all 0.2s ease;
}

.m span {
  width: 24px;
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
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
  scroll-behavior: smooth;
  position: relative;
}

.msg {
  display: flex;
  gap: 8px;
  animation: fadeIn 0.4s ease forwards;
  opacity: 0;
  max-width: 100%;
  transition: opacity 0.3s ease;
}

.msg img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 1px 3px var(--shadow-color);
}

.msg.user-msg {
  justify-content: flex-end;
}

.bb {
  background: var(--msg-bg);
  padding: 10px 14px;
  border-radius: 16px;
  max-width: 75%;
  word-break: break-word;
  box-shadow: 0 1px 3px var(--shadow-color);
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
  margin-top: 4px;
  font-size: 10px;
  color: var(--typing-color);
  text-align: right;
  opacity: 0.8;
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
  border: 1px solid var(--accent-color);
  background: transparent;
  color: var(--accent-color);
  transition: all 0.3s ease;
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
  font-size: 11px;
  padding: 8px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  line-height: 14px;
  margin-bottom: 8px;
  color: var(--text-color);
  background: var(--note-bg);
  border-radius: 10px;
}

.f a, .link {
  color: var(--accent-color);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 1px;
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
  background: rgba(0,0,0,0.6);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadein 0.3s ease;
  backdrop-filter: blur(3px);
}

.oc {
  background: var(--secondary-bg);
  padding: 24px;
  border-radius: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 260px;
  position: relative;
  box-shadow: 0 4px 15px var(--shadow-color);
  transition: transform 0.3s ease;
  transform: scale(0.95);
}

.o.show .oc {
  transform: scale(1);
}

.oc button {
  padding: 10px 18px;
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.oc button:hover {
  background: var(--accent-light);
  transform: translateY(-1px);
}

.close-x {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
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
  gap: 8px;
  margin: 8px 12px;
  padding: 10px 14px;
  background: var(--accent-color);
  border-radius: 28px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px var(--shadow-color);
  position: relative;
  overflow: visible;
}

.input-box.focused {
  box-shadow: 0 3px 10px var(--shadow-color);
  transform: translateY(-2px);
}

.input-box input {
  border: none;
  outline: none;
  flex: 1;
  background: none;
  color: #fff;
  font-size: 16px;
  padding-right: 56px;
  min-width: 0;
  height: 44px;
}

.input-box input::placeholder {
  color: rgba(255,255,255,0.8);
  font-size: 16px;
}

.emoji-btn {
  background: transparent;
  border: none;
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
  position: absolute;
  right: 56px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
}

.emoji-btn:hover {
  background: rgba(255,255,255,0.2);
}

.emoji-btn svg {
  width: 20px;
  height: 20px;
  fill: #fff;
}

.send-btn {
  border: 1px solid #fff;
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
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
}

.send-btn:hover {
  background: rgba(255,255,255,0.2);
  transform: rotate(10deg);
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
  animation: fadein 0.4s ease;
  display: none;
  padding: 10px 18px;
  background: var(--note-bg);
  border-radius: 16px;
  box-shadow: 0 2px 8px var(--shadow-color);
}

.semibold {
  font-weight: 600;
}

.typing-bubble .bb {
  background: var(--msg-bg);
  padding: 6px 10px;
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
  background: var(--accent-light);
  opacity: 0.4;
  animation: blink 1.2s infinite ease-in-out;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.4; transform: scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(-10px) scale(0.98); }
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
  padding: 20px;
  gap: 20px;
  animation: fadeIn 0.4s ease;
  color: var(--text-color);
}

.initial-screen p {
  font-size: 0.9rem;
  color: var(--typing-color);
  margin: 0;
}

.recent-msg {
  background: var(--msg-bg);
  padding: 12px 16px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 1px 4px var(--shadow-color);
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
  gap: 12px;
  width: 100%;
  padding: 0 12px;
}

.mini-form p {
  font-size: 1rem;
  color: var(--text-color);
  text-align: center;
  margin-bottom: 8px;
}

.mini-form input {
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background: var(--input-bg);
  color: var(--text-color);
  font-size: 16px; /* Previne zoom */
  transition: border 0.2s ease;
}

.mini-form input[type="checkbox"] {
  accent-color: var(--accent-color);
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.mini-form input[type="checkbox"]:hover {
  transform: scale(1.1);
}

.mini-form input:focus {
  border: 1px solid var(--accent-color);
  box-shadow: 0 0 0 2px rgba(171,134,91,0.15);
}

.mini-form input.error {
  border: 1px solid #ff4d4d;
  box-shadow: 0 0 0 2px rgba(255,77,77,0.15);
}

.mini-form .checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-color);
}

.mini-form .checkbox-label a {
  color: var(--accent-color);
  text-decoration: underline;
}

.media-preview {
  max-width: 100%;
  border-radius: 16px;
  margin-top: 8px;
  box-shadow: 0 2px 8px var(--shadow-color);
  transition: transform 0.2s ease;
}

.media-preview:hover {
  transform: scale(1.01);
}

.media-cancel {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4d4d;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
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
  transition: opacity 0.3s ease, transform 0.3s ease;
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

.privacy-note {
  background: var(--note-bg);
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 12px;
  color: var(--typing-color);
  text-align: center;
  margin: 10px;
  box-shadow: 0 1px 4px var(--shadow-color);
}

.warning-note {
  background: var(--note-bg);
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 12px;
  color: var(--typing-color);
  text-align: center;
  margin: 8px 0;
  box-shadow: 0 1px 4px var(--shadow-color);
  animation: fadeIn 0.4s ease forwards;
  opacity: 0;
}

.blocked-chat {
  pointer-events: none;
  opacity: 0.5;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  padding: 16px;
}

.emoji-btn-grid {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.timer-note {
  font-size: 12px;
  color: var(--typing-color);
  text-align: center;
}

@media (max-width: 480px) {
  .c {
    height: 96%;
    bottom: 2%;
    right: 2.5%;
    width: 95%;
    max-width: none;
  }
  .input-box.focused {
    position: fixed;
    bottom: 0;
    left: 2.5%;
    width: 95%;
    margin: 0;
    border-radius: 28px 28px 0 0;
    box-shadow: 0 -2px 10px var(--shadow-color);
  }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
`;
document.head.appendChild(style);

// ===== Injetar HTML  =====
const chatContainer = document.createElement('div');
chatContainer.innerHTML = `
<div class="c" id="cb" role="dialog" aria-label="Chatbot da Frame" aria-live="polite">
  <div class="h" id="header">
    <h2 id="welcomeText"></h2>
    <div class="logo-circles">
      <div class="circle"><img src="https://framerusercontent.com/images/uKxosbf9vgV1bHLVDN6DrMHmgE.png" alt="Símbolo Frame 1"></div>
      <div class="circle"><img src="https://framerusercontent.com/images/uKxosbf9vgV1bHLVDN6DrMHmgE.png" alt="Símbolo Frame 2"></div>
      <div class="circle"><img src="https://framerusercontent.com/images/yCLuCvLmAusOiyCw3BYHiuymEMM.png" alt="Assistente Fabi" title="Fabi - Assistente Virtual"></div>
    </div>
    <div class="m" onclick="openMenu()" role="button" aria-label="Abrir menu" tabindex="0" aria-expanded="false" aria-controls="menuOverlay">
      <span></span><span></span><span></span>
    </div>
  </div>
  <div class="b" id="bd"></div>
  <div class="input-box" id="inputBox">
    <input type="text" id="userInput" placeholder="Envie uma mensagem..." aria-label="Digite sua mensagem">
    <button class="emoji-btn" id="emojiBtn" aria-label="Selecionar emoji">
      <svg viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42c-.78-.79-2.04-.79-2.82 0-.78.79-.78 2.05 0 2.83.78.79 2.04.79 2.82 0 .78-.78.78-2.04 0-2.83zm-6.18 0c-.78-.79-2.04-.79-2.82 0-.78.79-.78 2.05 0 2.83.78.79 2.04.79 2.82 0 .78-.78.78-2.04 0-2.83zm5.59 5.42c-.5 1.25-1.72 2-3 2s-2.5-.75-3-2h-2c.64 2.14 2.73 3.75 5 3.75s4.36-1.61 5-3.75h-2z"/>
      </svg>
    </button>
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
    <button id="darkModeBtn" onclick="toggleDarkMode()">Utilizar Modo Escuro</button>
    <button onclick="clearChatHistory()">Limpar Histórico do Chat</button>
    <button onclick="editProfile()">Editar meu Perfil</button>
    <button onclick="showRedirectLoading(); location.href='https://frameag.com/models'">Visitar Catálogo de Modelos</button>
    <button onclick="showRedirectLoading(); window.open('https://t.me/suporteframebot?start=chatbot-site-menu','_blank')">Atendimento Humano</button>
    <button onclick="exportHistory()">Baixar Transcrição</button>
  </div>
</div>
<div id="chatEnd" class="center-end">Este chat foi encerrado.</div>
<div class="scroll-top-btn" id="scrollTopBtn" onclick="scrollToTop()" aria-label="Voltar ao topo">↑</div>
<div class="loading-spinner" id="loadingSpinner" style="display:none;"></div>
<div class="o" id="confirmOverlay" role="dialog" aria-modal="true">
  <div class="oc" id="confirmContent">
    <div class="close-x" onclick="closeConfirm()" role="button" aria-label="Fechar confirmação">✕</div>
    <p id="confirmMessage"></p>
    <button id="confirmYes" class="btn p">Sim</button>
    <button onclick="closeConfirm()" class="btn">Não</button>
  </div>
</div>
<div class="o" id="langOverlay" role="dialog" aria-modal="true">
  <div class="oc" id="langContent">
    <div class="close-x" onclick="closeLangPopup()" role="button" aria-label="Fechar popup de idioma">✕</div>
    <p id="langMessage"></p>
    <button id="langButton" class="btn p"></button>
  </div>
</div>
<div class="warning-note" id="inputWarning" style="display:none;">Complete a etapa acima para digitar</div>
<div class="o" id="emojiOverlay" role="dialog" aria-modal="true">
  <div class="oc">
    <div class="close-x" onclick="closeEmojiOverlay()" role="button" aria-label="Fechar emojis">✕</div>
    <div class="emoji-grid" id="emojiGrid"></div>
  </div>
</div>
<div class="o" id="blockOverlay" role="dialog" aria-modal="true">
  <div class="oc">
    <div class="close-x" onclick="closeBlockPopup()" role="button" aria-label="Fechar aviso de bloqueio">✕</div>
    <p id="blockMessage"></p>
    <p class="timer-note" id="blockTimer"></p>
    <p>Para suporte, envie email para <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a></p>
  </div>
</div>
<div class="o" id="warningOverlay" role="dialog" aria-modal="true">
  <div class="oc">
    <div class="close-x" onclick="closeWarningPopup()" role="button" aria-label="Fechar aviso">✕</div>
    <p id="warningMessage"></p>
    <button onclick="closeWarningPopup()" class="btn p">Entendi</button>
  </div>
</div>
`;
document.body.appendChild(chatContainer);

// ===== Variáveis de controle (adicionadas flags para iniciação, limites) =====
let typingShownThisFlow = false;
let messageHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
let userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
let lastMessage = localStorage.getItem('lastMessage') || null;
let floodCount = 0;
let lastSendTime = 0;
let floodTimeout = null;
let isChatInitiated = false;
const MAX_HISTORY = 50;
const MAX_STORAGE_SIZE = 1024 * 1024 * 5; // 5MB limite aproximado para localStorage
const HISTORY_AGE_LIMIT = 15 * 24 * 60 * 60 * 1000; // 15 dias em ms
const p = "https://framerusercontent.com/images/yCLuCvLmAusOiyCw3BYHiuymEMM.png"; // Foto da Fabi
const b = document.getElementById('bd');
const welcomeText = document.getElementById('welcomeText');
const inputBox = document.getElementById('inputBox');
const userInput = document.getElementById('userInput');
const mediaInput = document.getElementById('mediaInput');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const header = document.getElementById('header');
const inputWarning = document.getElementById('inputWarning');
let isChatBlocked = localStorage.getItem('isChatBlocked') === 'true';
let blockType = localStorage.getItem('blockType') || null;
let blockEndTime = parseInt(localStorage.getItem('blockEndTime')) || 0;
let currentFlowType = null; // Para rastrear fluxo atual (ex: 'criadora' ou 'contratante')
let mediaPreviewEl = null;
let badWordCount = 0;
let badFormAttempts = 0;
let lastBadFormMessage = null;
const emojis = ['😊', '😂', '❤️', '👍', '🙌', '🎉', '🔥', '😍', '😎', '🤔', '😢', '😡', '✨', '🌟', '🚀'];

// ===== Função de sanitização para prevenir XSS =====
function sanitize(text) {
  const allowedTags = ['a', 'span'];
  const allowedAttrs = { a: ['href', 'target', 'class', 'rel'], span: ['class'] };
  const div = document.createElement('div');
  div.innerHTML = text;
  const elements = div.querySelectorAll('*');
  elements.forEach(el => {
    const tag = el.tagName.toLowerCase();
    if (!allowedTags.includes(tag)) {
      el.replaceWith(document.createTextNode(el.outerHTML));
    } else {
      [...el.attributes].forEach(attr => {
        if (!allowedAttrs[tag].includes(attr.name.toLowerCase())) {
          el.removeAttribute(attr.name);
        }
      });
      if (tag === 'a') {
        el.setAttribute('rel', 'noopener noreferrer');
      }
    }
  });
  return div.innerHTML;
}

// ===== Inicialização com verificação de estado =====
function initChat() {
  checkBlockStatus();
  if (userInfo) {
    welcomeText.textContent = `Olá ${userInfo.name.split(' ')[0]}, tudo bem? Como podemos ajudar?`;
    if (lastMessage) {
      showRecentMessage(lastMessage);
    } else {
      showInitialScreen();
    }
  } else {
    welcomeText.textContent = `Olá! Tudo bem? Como podemos ajudar?`;
    showInitialScreen();
  }
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    document.getElementById('darkModeBtn').textContent = 'Retornar ao Modo Claro';
  }
  b.addEventListener('scroll', handleScroll);
  inputBox.addEventListener('focusin', () => inputBox.classList.add('focused'));
  inputBox.addEventListener('focusout', () => inputBox.classList.remove('focused'));
  trapFocus(document.getElementById('ov'));
  if (messageHistory.length > 0) {
    loadChat();
  }
  document.addEventListener('keydown', handleKeyboardShortcuts);
  userInput.addEventListener('focus', () => {
    if (!isChatInitiated || isChatBlocked) {
      showInputWarning();
    }
  });
  cleanStorageIfNeeded();
  setupEmojiGrid();
}

// ===== Mostrar tela inicial (melhorada para premium) =====
function showInitialScreen() {
  b.innerHTML = `
    <div class="initial-screen">
      <p>Mensagens</p>
      <div class="privacy-note">No atendimento, podemos solicitar dados adicionais conforme necessário. Acesse nossa Política de Privacidade no site.</div>
      <div class="recent-msg" id="recentMsg" style="display:none;"></div>
      <button onclick="startChat()" class="btn p">Iniciar Atendimento</button>
    </div>
  `;
  inputBox.style.display = 'none';
}

// ===== Mostrar mensagem recente (com sanitização) =====
function showRecentMessage(msg) {
  const recent = document.getElementById('recentMsg');
  if (recent) {
    recent.innerHTML = `
      <img src="${p}" alt="Fabi">
      ${sanitize(msg)}
      <span class="delete-btn" onclick="confirmDeleteRecent()">✕</span>
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
        <p>Queremos te conhecer melhor</p>
        <input type="text" id="nameInput" placeholder="Informe seu nome" aria-label="Digite seu nome">
        <input type="email" id="emailInput" placeholder="Qual o seu e-mail?" aria-label="Digite seu e-mail">
        <label class="checkbox-label">
          <input type="checkbox" id="ageCheckbox" checked>
          Declaro ser maior de 18 anos e aceito os Termos da Frame Agency</a>
        </label>
        <button onclick="saveUserInfo()" class="btn p">Continuar</button>
      </div>
    `;
  } else {
    loadChat();
  }
  inputBox.style.display = 'block';
}

// ===== Salvar info do usuário e atualizar header =====
function saveUserInfo() {
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const ageCheckbox = document.getElementById('ageCheckbox');
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  if (ageCheckbox && !ageCheckbox.checked) {
    showWarningPopup('Você deve declarar ser maior de 18 anos e aceitar os nossos termos para continuar no chat.');
    return;
  }
  if (validateUserInput(name, email)) {
    userInfo = { name, email };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    welcomeText.textContent = `Olá ${userInfo.name.split(' ')[0]}, tudo bem? Como podemos ajudar?`;
    loadChat();
    badFormAttempts = 0;
    lastBadFormMessage = null;
  } else if (badFormAttempts < 3) {
    badFormAttempts++;
    if (badFormAttempts === 3) {
      showWarningPopup('3 tentativas inválidas do cadastro. Por favor, corrija os campos destacados para continuar.');
    }
  }
}

// ===== Carregar chat com lazy loading e limite =====
function loadChat() {
  loadingSpinner.style.display = 'block';
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
    b.innerHTML = '';
    messageHistory.slice(-MAX_HISTORY).forEach(msg => am(msg.text, msg.btns, 0, msg.user, msg.timestamp));
    if (!isChatInitiated) {
      inicio();
      isChatInitiated = true;
    }
  }, 500);
}

// ===== Indicador de digitação melhorado =====
function showTypingIndicator(delay) {
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
function am(text, btn = null, delay = 0, user = false, timestamp = new Date().toISOString()) {
  let typingEl;
  const typingDelay = Math.min(2000, text.length * 50 + 600); // Delay proporcional ao texto
  if (!user && !typingShownThisFlow) {
    typingEl = showTypingIndicator(typingDelay);
    typingShownThisFlow = true;
  }
  setTimeout(() => {
    if (!user && typingEl) {
      typingEl.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => typingEl.remove(), 300);
    }
    let m = document.createElement('div');
    m.className = 'msg' + (user ? ' user-msg' : '');
    m.setAttribute('role', 'log');
    let bb = document.createElement('div');
    bb.className = 'bb';
    bb.innerHTML = sanitize(text);
    let bt = document.createElement('span');
    bt.className = 'bt';
    bt.textContent = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
    const entry = { text, btns, user, timestamp };
    messageHistory.push(entry);
    if (messageHistory.length > MAX_HISTORY) messageHistory.shift();
    saveToStorageSafely('chatHistory', messageHistory);
    if (!user) saveToStorageSafely('lastMessage', text);
  }, delay + (user ? 0 : typingDelay));
}

// ===== Processar mensagem do usuário  =====
function processUserMessage(text) {
  if (isChatBlocked) return;
  const prohibited = /(cu|pau|ppk|goza|chupa|puta|kids|kid|baby|bebe|cp|porno|estupro|estuprador|buceta|caralho|foder|fode|transar|sexo|pedofilo|pedofilia|violencia|ameaca|drogas|ilegal)/i;
  if (prohibited.test(text.toLowerCase())) {
    badWordCount++;
    if (badWordCount === 1) {
      am('Desculpe, mas não posso ajudar com esse tipo de conteúdo. Se você tiver outra pergunta ou precisar de assistência em um tópico diferente, estou aqui para ajudar!');
    } else if (badWordCount < 3) {
      am('Por favor, mantenha a conversa respeitosa. Estou aqui para ajudar com tópicos adequados a Frame.');
    } else {
      am('Essa conversa desrespeita os padrões de segurança e conduta da Frame. Por esse motivo, a interação será encerrada e o time de segurança da plataforma foi acionado. Qualquer tentativa de violar os termos poderá resultar em bloqueio e medidas legais.');
      blockChatForBehavior();
    }
    return;
  }
  badWordCount = 0;
  loadingSpinner.style.display = 'block';
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
  }, 600);
  const now = Date.now();
  if (now - lastSendTime < 10000) {
    floodCount++;
    if (floodCount > 5) {
      showWarningPopup('Aguarde um momento para enviar. Tente novamente em breve.');
      userInput.disabled = true;
      clearTimeout(floodTimeout);
      floodTimeout = setTimeout(() => {
        userInput.disabled = false;
        floodCount = 0;
      }, 10000);
      return;
    }
  } else {
    floodCount = 0;
  }
  lastSendTime = now;

  am(text, null, 0, true);
  let t = text.toLowerCase();
  const keywords = {
    greeting: /(oi|ola|bom dia|boa tarde|boa noite|ola tudo bem|ei|hey|salve)/i,
    denunciar: /denunciar/i,
    humano: /(humano|analista|suporte|agente|falar com a gente)/i,
    seguranca: /segur(an(c|a|o)|ança)/i,
    termos: /(termos|condições|terms|politica de privacidade)/i,
    criadora: /(criadora|anunciante|modelo|agenciada)/i,
    contratante: /(contratante|assinante|comprador|premium)/i,
    dados: /(dados pessoais|lgpd|exclusão de dados)/i,
    idioma: /(idioma|english|español)/i,
    definicoes: /(definições|sobre|about|oq é a frame|o que e a frame|frame agency|quem é|o que é a plataforma)/i,
    pagamento: /pagamento/i,
    cancelamento: /cancelamento/i,
    suporte: /suporte/i,
    cadastro: /cadastro|registrar/i,
    premium: /premium/i,
    ajuda: /ajuda|help|comandos/i,
    logout: /logout|sair/i
  };

  if (keywords.greeting.test(t)) {
    am('Olá! Tudo bem? Como posso ajudar você hoje?');
    menuPT();
    return;
  }
  if (keywords.denunciar.test(t)) {
    am('Na Frame, levamos segurança muito a sério. Caso encontre irregularidades em anúncios do nosso site, acesse <a href="https://frameag.com/report" target="_blank" class="link">frameag.com/report</a> e denuncie anonimamente. Isso ajuda a manter a plataforma segura para todos.');
    perguntarSatisfacao();
    return;
  }
  if (keywords.humano.test(t)) {
    fh();
    am('Se preferir, você também pode enviar um email para: <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a>. Nossa equipe está pronta para ajudar com qualquer dúvida mais complexa.');
    return;
  }
  if (keywords.seguranca.test(t)) {
    am('Você pode ter se perguntado se a Frame é segura, e sim, é. Aqui, garantimos autenticação em três etapas e contamos com um time de segurança disponível 24h. Além disso, usamos tecnologias avançadas para proteger seus dados e interações. Saiba mais em <a href="https://frameag.com/verificacao" target="_blank" class="link">nosso blog sobre verificação</a>.');
    perguntarSatisfacao();
    return;
  }
  if (keywords.termos.test(t)) {
    am('Nossos Termos e Condições detalham como usamos e protegemos seus dados. Você pode acessá-los em <a href="https://frameag.com/termos" target="_blank" class="link">frameag.com/termos</a>. Para privacidade, focamos em conformidade com leis como LGPD, garantindo transparência e segurança.');
    perguntarSatisfacao();
    return;
  }
  if (keywords.criadora.test(t)) {
    if (currentFlowType && currentFlowType !== 'criadora') {
      resetFlow();
    }
    currentFlowType = 'criadora';
    am('Criadoras podem ser agenciadas, recebendo suporte completo, ou anunciantes independentes com ferramentas de promoção. Para se cadastrar, acesse <a href="https://frameag.com/login" target="_blank" class="link">frameag.com/login</a>, confirme +18 anos e passe pelo Frame Authentic.');
    perguntarSatisfacao();
    return;
  }
  if (keywords.contratante.test(t)) {
    if (currentFlowType && currentFlowType !== 'contratante') {
      resetFlow();
    }
    currentFlowType = 'contratante';
    am('Como contratante, você tem acesso a perfis completos, agendamentos e comunicação segura. O Premium desbloqueia catálogo sem anúncios, galerias exclusivas e suporte prioritário. Visite <a href="https://frameag.com/premium" target="_blank" class="link">frameag.com/premium</a> para mais detalhes e assinatura.');
    perguntarSatisfacao();
    return;
  }
  if (keywords.dados.test(t)) {
    am('Tratamos dados com total segurança. Você pode acessar, corrigir ou excluir dados via privacidade@frameag.com. Para casos de banimento, retemos dados necessários para prevenção de fraudes, mas sempre com transparência.');
    perguntarSatisfacao();
    return;
  }
  if (keywords.idioma.test(t)) {
    if (/english/i.test(t)) {
      showLangPopup('For English support, please visit our dedicated page.', 'Go to English Page', 'https://frameag.com/en');
    } else if (/español/i.test(t)) {
      showLangPopup('Para atención en español, visite nuestra página dedicada.', 'Ir a la Página en Español', 'https://frameag.com/es');
    } else {
      showLangPopup('Por favor, selecione o idioma no menu inicial para melhor atendimento.', 'Voltar ao Menu', '#');
    }
    return;
  }
  if (keywords.definicoes.test(t)) {
    am('A Frame é uma plataforma especializada em conectar criadoras de conteúdo com contratantes, oferecendo ferramentas de gestão, promoção e segurança. Atuamos como provedora de tecnologia, sem intermediar negociações diretas.');
    perguntarSatisfacao();
    return;
  }
  if (keywords.pagamento.test(t)) {
    am('Para dúvidas sobre pagamentos, acesse sua área de login ou entre em contato via suporte.');
    perguntarSatisfacao();
    return;
  }
  if (keywords.cancelamento.test(t)) {
    am('Para cancelamentos, revise os termos e solicite via email para contato@frameag.com.');
    perguntarSatisfacao();
    return;
  }
  if (keywords.suporte.test(t)) {
    fh();
    return;
  }
  if (keywords.cadastro.test(t)) {
    cadastroPT();
    return;
  }
  if (keywords.premium.test(t)) {
    premiumPT();
    return;
  }
  if (keywords.ajuda.test(t)) {
    am('Aqui vai uma lista de tópicos que posso ajudar: segurança, cadastro, premium, suporte humano, criadora, contratante, denúncia, termos, dados pessoais. Digite um deles para mais info!');
    return;
  }
  if (keywords.logout.test(t)) {
    userInfo = null;
    localStorage.removeItem('userInfo');
    showInitialScreen();
    am('Logout realizado com sucesso. Inicie o atendimento novamente quando quiser!');
    return;
  }

  loadingSpinner.style.display = 'block';
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
    am("Não consegui entender sua solicitação. Vamos tentar novamente? Me descreva mais detalhes sobre o que precisa, como segurança e cadastro.", [
      { l: "Voltar ao menu", p: 1, a: () => { resetFlow(); inicio(); } }
    ], 500);
  }, 600);
}

// ===== Envio de mídia com preview e limpeza =====
mediaInput.addEventListener('change', () => {
  const file = mediaInput.files[0];
  if (file) {
    loadingSpinner.style.display = 'block';
    setTimeout(() => {
      loadingSpinner.style.display = 'none';
    }, 600);
    const reader = new FileReader();
    reader.onload = e => {
      const isVideo = file.type.startsWith('video/');
      mediaPreviewEl = document.createElement(isVideo ? 'video' : 'img');
      mediaPreviewEl.src = e.target.result;
      mediaPreviewEl.className = 'media-preview';
      mediaPreviewEl.alt = 'Pré-visualização da mídia';
      if (isVideo) {
        mediaPreviewEl.controls = true;
        mediaPreviewEl.muted = true;
      }
      const cancelBtn = document.createElement('span');
      cancelBtn.className = 'media-cancel';
      cancelBtn.textContent = '✕';
      cancelBtn.onclick = () => {
        mediaPreviewEl.remove();
        cancelBtn.remove();
        mediaInput.value = '';
      };
      am('Mídia anexada:', null, 0, true);
      const bb = b.lastChild.querySelector('.bb');
      bb.appendChild(mediaPreviewEl);
      bb.appendChild(cancelBtn);
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

document.getElementById('emojiBtn').addEventListener('click', openEmojiOverlay);

// ===== Perguntar satisfação (mais amigável) =====
function perguntarSatisfacao() {
  const nome = userInfo ? userInfo.name.split(' ')[0] : '';
  am(`Minha explicação ajudou a esclarecer sua dúvida, ${nome}? Estou aqui para explicar mais se necessário.`, [
    { l: "Sim, tudo esclarecido!", p: 1, a: () => {
        am(`Perfeito, ${nome}! Agradecemos pelo contato e estamos sempre à disposição para mais ajuda.`);
        setTimeout(() => { document.getElementById('chatEnd').style.display = 'block'; showInitialScreen(); }, 600);
      }},
    { l: "Não, preciso de mais detalhes", a: () => { 
        fh(); 
        am('Se preferir, envie um email para: <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a> com mais informações sobre sua dúvida.');
      }}
  ], 600);
}

// ===== Fluxos restaurados e expandidos  =====
function menuPT() {
  am("É ótimo ter você em nossa plataforma. Vamos personalizar o atendimento.");
  am("Me conta, qual é a sua relação com a Frame hoje? Isso ajuda a direcionar melhor as opções.", [
    { l: "Contratante / Assinante", p: 1, a: cmPT },
    { l: "Criadora / Anunciante", a: crPT }
  ], 600);
}

function cmPT() {
  am("Certo! Como contratante, veja como posso ajudar você.");
  am("Selecione uma opção abaixo para prosseguirmos:", [
    { l: "Quero contratar uma modelo", p: 1, a: ctPT },
    { l: "Sobre segurança", a: () => { 
        am('Você pode ter se perguntado se a Frame é segura, e sim, é. Aqui, garantimos autenticação em três etapas e contamos com um time de segurança disponível 24h. Saiba mais detalhes em nosso blog sobre verificação.');
        setTimeout(perguntarSatisfacao, 600);
      }},
    { l: "Reportar modelo anonimamente", a: () => { 
        am('Na Frame, levamos segurança muito a sério. Caso encontre irregularidades em anúncios do nosso site, acesse frameag.com/report e denuncie anonimamente. Sua contribuição é importante para manter a comunidade segura.');
      }},
    { l: "Tive problemas com cadastro", a: cadastroPT },
    { l: "Falar com humano", a: () => { 
        fh(); 
        setTimeout(() => {
          am('Se preferir, você também pode enviar um email para: <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a>.');
        }, 500);
      }},
    { l: "Voltar", a: inicio },
    { l: "Quero me tornar Premium", p: 1, a: premiumPT }
  ], 600);
}

function cadastroPT() {
  resetFlowForError();
  am("Poxa, sinto muito que tenha tido problemas com seu cadastro. Vamos resolver isso passo a passo.");
  am("Qual dessas situações melhor se aplica ao seu caso? Escolha para eu guiar você.", [
    { l: "Não recebi o código de ativação", a: problemaCodigo },
    { l: "Perdi o acesso ao meu e-mail", a: problemaEmail },
    { l: "Não sei como realizar meu login", a: problemaLogin },
    { l: "Voltar", a: cmPT }
  ], 600);
}

function problemaCodigo() {
  am("Se o código de ativação não chegou, aqui vão algumas dicas rápidas para verificar:");
  am("1. Verifique a caixa de spam ou lixo eletrônico no seu e-mail.");
  am("2. Confirme se o e-mail cadastrado está correto no site.");
  am("3. Aguarde alguns minutos, pois pode haver atraso.");
  am("4. Tente reenviar o código diretamente pela página de cadastro.");
  am("Se o problema persistir após essas verificações, entre em contato com nossa equipe para assistência personalizada:", [
    { l: "Ir para atendimento", p: 1, a: fh },
    { l: "Voltar", a: cadastroPT }
  ], 1000);
}

function problemaEmail() {
  am("Se você perdeu acesso ao e-mail usado no cadastro, não se preocupe, há soluções:");
  am("1. Tente recuperar a conta de e-mail diretamente no provedor (como Gmail ou Outlook).");
  am("2. Se não for possível, podemos ajudar a atualizar o e-mail na sua conta Frame.");
  am("Importante: Para segurança, você precisará confirmar dados pessoais e passar pela verificação Frame Authentic antes da atualização.");
  am("Para prosseguir com a atualização:", [
    { l: "Ir para atendimento", p: 1, a: fh },
    { l: "Voltar", a: cadastroPT }
  ], 1500);
}

function problemaLogin() {
  am("Para iniciar ou recuperar seu login, acesse a Área de Cadastro em <a href='https://frameag.com/cadastro' target='_blank' class='link'>frameag.com/cadastro</a> e siga os passos intuitivos.");
  am("Se ainda tiver dúvidas, assista ao nosso vídeo tutorial completo: <a href='https://' target='_blank' class='link'>https://</a>. Ele cobre tudo desde o início.");
  am("Deseja voltar ao menu de problemas com cadastro para outras opções?", [
    { l: "Sim, voltar", a: cadastroPT }
  ], 1000);
}

function premiumPT() {
  am("No Premium, você desbloqueia vantagens exclusivas que elevam sua experiência na Frame.");
  am("Acesso ao catálogo completo sem anúncios, galerias sexy exclusivas, atendimento prioritário 24h e análises personalizadas para melhores escolhas.");
  am("Para se tornar Premium e conhecer todos os benefícios em detalhes, clique abaixo:", [{ l: "Quero ser Premium", p: 1, a: () => { showRedirectLoading(); window.open('https://frameag.com/premium','_blank'); } }], 1000);
}

function ctPT() {
  am("Antes de prosseguirmos, confirme se você possui 18 anos ou mais, pois nossos serviços são exclusivos para maiores de idade.", [
    { l: "Sou maior de 18 anos", p: 1, a: () => { 
        am('Ótimo! Antes de contratar, explore todas as modelos em nosso catálogo completo: <a href="https://frameag.com/models" target="_blank" class="link">frameag.com/models</a>. Lá você encontra perfis verificados e opções detalhadas.');
        am("Se já decidiu qual modelo contratar, fale diretamente com nosso time para discutir os detalhes com segurança:", [{ l: "Ir para atendimento 24h", p: 1, a: () => { showRedirectLoading(); window.open('https://t.me/suporteframebot?start=catalogo-site', '_blank'); } }], 400);
        setTimeout(perguntarSatisfacao, 800);
      }},
    { l: "Sou menor", a: () => { 
        am("Desculpe, não podemos prosseguir. O ecossistema da Frame é projetado exclusivamente para usuários maiores de 18 anos, priorizando responsabilidade e conformidade legal.");
        blockChatForUnderage();
      }}
  ]);
}

function crPT() {
  am("Perfeito, vou te passar as principais informações para criadoras de conteúdo na Frame.");
  am("Para se cadastrar, acesse <a href=https://frameag.com/login target=_blank class=link>frameag.com/login</a> e siga as instruções simples. O processo é rápido e seguro.");
  am("É necessário ter mais de 18 anos, passar pela aprovação no Frame Authentic (nossa verificação de identidade) e concordar com os Termos e Condições para garantir um ambiente profissional.");
  am("Se precisar de ajuda adicional, como dicas de otimização de perfil, acesse sua Área de Login e clique em 'Central de Atendimento'. Estamos aqui para maximizar seus resultados!");
  am("", [
    { l: "Voltar ao menu", a: inicio }
  ], 1500);
  setTimeout(perguntarSatisfacao, 2000);
}

function fh() { 
  am("Certo! Vou te direcionar agora para um atendente humano da Frame, que pode oferecer suporte personalizado e resolver questões mais específicas.", [{ l: "Ir para atendimento", p: 1, a: () => { showRedirectLoading(); window.open('https://t.me/suporteframebot?start=chatbot-site', '_blank'); } }]); 
}

function inicio() {
  typingShownThisFlow = false;
  if (isChatInitiated) return; // Evita duplicação se já iniciado
  am("Olá, boas-vindas ao atendimento virtual da Frame :)");
  am("Estamos aqui para te ajudar 24 horas por dia, com respostas rápidas e precisas!");
  am("Selecione seu idioma para começarmos:", [
    { l: "Português", p: 1, a: menuPT },
    { l: "English", a: () => showLangPopup('For English support, please visit our dedicated page.', 'Go to English Page', 'https://frameag.com/en') },
    { l: "Español", a: () => showLangPopup('Para atención en español, visite nuestra página dedicada.', 'Ir a la Página en Español', 'https://frameag.com/es') }
  ], 800);
  isChatInitiated = true;
}

// ===== Menu overlay com focus trap =====
function openMenu() {
  const ov = document.getElementById('ov');
  ov.style.display = 'flex';
  ov.classList.add('show');
  document.querySelector('.m').setAttribute('aria-expanded', 'true');
  document.getElementById('menuOverlay').querySelector('button').focus();
}

function closeMenu() {
  const ov = document.getElementById('ov');
  ov.style.display = 'none';
  ov.classList.remove('show');
  document.querySelector('.m').setAttribute('aria-expanded', 'false');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  const btn = document.getElementById('darkModeBtn');
  btn.textContent = document.body.classList.contains('dark') ? 'Retornar ao Modo Claro' : 'Utilizar Modo Escuro';
}

function clearChatHistory() {
  showConfirm('Tem certeza que deseja limpar o histórico do chat? Isso não pode ser desfeito.', () => {
    messageHistory = [];
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('lastMessage');
    b.innerHTML = '';
    isChatInitiated = false;
    initChat();
  });
}

function editProfile() {
  showConfirm('Tem certeza que deseja editar seu perfil? Alterações serão salvas imediatamente na próxima etapa.', () => {
    b.innerHTML = `
      <div class="mini-form">
        <p>Edite seu perfil</p>
        <input type="text" id="nameInput" value="${userInfo ? userInfo.name : ''}" placeholder="Seu nome" aria-label="Digite seu nome">
        <input type="email" id="emailInput" value="${userInfo ? userInfo.email : ''}" placeholder="Seu e-mail" aria-label="Digite seu e-mail">
        <button onclick="saveUserInfo()" class="btn p">Salvar alterações</button>
      </div>
    `;
  });
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

// ===== Error handling expandido (removido o handler global para evitar loops, usar console) =====
window.addEventListener('error', (e) => {
  console.error('Erro no chatbot:', e.message);
});

// ===== Inicializar =====
window.onload = initChat;

// ===== Funções adicionais =====
function cleanStorageIfNeeded() {
  try {
    const storageSize = new Blob(Object.values(localStorage)).size;
    if (storageSize > MAX_STORAGE_SIZE * 0.8) {
      messageHistory = messageHistory.slice(-MAX_HISTORY / 2);
      localStorage.setItem('chatHistory', JSON.stringify(messageHistory));
    }
  } catch (e) {
    console.error('Erro ao limpar storage:', e);
  }
}

function saveToStorageSafely(key, value) {
  try {
    if (key === 'chatHistory') {
      value = value.filter(msg => Date.now() - new Date(msg.timestamp).getTime() < HISTORY_AGE_LIMIT);
    }
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      cleanStorageIfNeeded();
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    } else {
      console.error('Erro ao salvar no storage:', e);
    }
  }
}

function handleKeyboardShortcuts(e) {
  if (e.key === 'Enter' && document.activeElement === userInput && userInput.value.trim() !== '') {
    processUserMessage(userInput.value.trim());
    userInput.value = '';
  }
  if (e.key === 'Escape' && document.getElementById('ov').style.display === 'flex') {
    closeMenu();
  } else if (e.key === 'Escape' && document.getElementById('confirmOverlay').style.display === 'flex') {
    closeConfirm();
  } else if (e.key === 'Escape' && document.getElementById('langOverlay').style.display === 'flex') {
    closeLangPopup();
  } else if (e.key === 'Escape' && document.getElementById('emojiOverlay').style.display === 'flex') {
    closeEmojiOverlay();
  } else if (e.key === 'Escape' && document.getElementById('blockOverlay').style.display === 'flex') {
    closeBlockPopup();
  } else if (e.key === 'Escape' && document.getElementById('warningOverlay').style.display === 'flex') {
    closeWarningPopup();
  }
}

function showLangPopup(message, buttonText, url) {
  document.getElementById('langMessage').textContent = message;
  const langButton = document.getElementById('langButton');
  langButton.textContent = buttonText;
  langButton.onclick = () => {
    if (url !== '#') {
      window.open(url, '_blank');
    } else {
      inicio();
    }
    closeLangPopup();
  };
  const langOv = document.getElementById('langOverlay');
  langOv.style.display = 'flex';
  langOv.classList.add('show');
  langButton.focus();
}

function closeLangPopup() {
  const langOv = document.getElementById('langOverlay');
  langOv.style.display = 'none';
  langOv.classList.remove('show');
}

function showConfirm(message, yesCallback) {
  document.getElementById('confirmMessage').textContent = message;
  const confirmYes = document.getElementById('confirmYes');
  confirmYes.onclick = () => {
    yesCallback();
    closeConfirm();
  };
  const confirmOv = document.getElementById('confirmOverlay');
  confirmOv.style.display = 'flex';
  confirmOv.classList.add('show');
  confirmYes.focus();
}

function closeConfirm() {
  const confirmOv = document.getElementById('confirmOverlay');
  confirmOv.style.display = 'none';
  confirmOv.classList.remove('show');
}

function exportHistory() {
  const transcript = messageHistory.map(msg => {
    const sender = msg.user ? 'Você' : 'Fabi - Frame Agency';
    return `[${new Date(msg.timestamp).toLocaleString()}] ${sender}: ${msg.text}`;
  }).join('\n\n');
  const blob = new Blob([transcript], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transcricao_chat_frame.txt';
  a.click();
  URL.revokeObjectURL(url);
}

function resetFlow() {
  messageHistory = [];
  localStorage.removeItem('chatHistory');
  localStorage.removeItem('lastMessage');
  b.innerHTML = '';
  isChatInitiated = false;
  currentFlowType = null;
  initChat();
}

function resetFlowForError() {
  messageHistory = [];
  localStorage.removeItem('chatHistory');
  localStorage.removeItem('lastMessage');
  b.innerHTML = '';
  isChatInitiated = false;
  currentFlowType = null;
}

function blockChatForUnderage() {
  isChatBlocked = true;
  blockType = 'underage';
  localStorage.setItem('isChatBlocked', 'true');
  localStorage.setItem('blockType', 'underage');
  inputBox.classList.add('blocked-chat');
  userInput.disabled = true;
  am('Para liberação, envie um email para contato@frameag.com com uma selfie nítida ao lado de um documento oficial (RG ou CNH).');
  messageHistory = [];
  localStorage.removeItem('chatHistory');
  localStorage.removeItem('lastMessage');
  showBlockPopup('Chat bloqueado por declaração de idade inapropriada para os serviços da Frame Agency. Envie email para liberação.');
}

function blockChatForBehavior() {
  isChatBlocked = true;
  blockType = 'behavior';
  blockEndTime = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem('isChatBlocked', 'true');
  localStorage.setItem('blockType', 'behavior');
  localStorage.setItem('blockEndTime', blockEndTime);
  inputBox.classList.add('blocked-chat');
  userInput.disabled = true;
  messageHistory = [];
  localStorage.removeItem('chatHistory');
  localStorage.removeItem('lastMessage');
  showBlockPopup('Você foi bloqueado por comportamento inadequado e poderá utilizar esse chat em: ');
  startBlockTimer();
}

function checkBlockStatus() {
  if (isChatBlocked) {
    inputBox.classList.add('blocked-chat');
    userInput.disabled = true;
    if (blockType === 'behavior') {
      if (Date.now() >= blockEndTime) {
        removeBlock();
      } else {
        showBlockPopup('Você foi bloqueado por comportamento inadequado e poderá utilizar esse chat em: ');
        startBlockTimer();
      }
    } else if (blockType === 'underage') {
      showBlockPopup('Chat bloqueado por declaração de idade inapropriada para os serviços da Frame Agency. Envie email para liberação.');
    }
  }
}

function removeBlock() {
  isChatBlocked = false;
  blockType = null;
  blockEndTime = 0;
  localStorage.removeItem('isChatBlocked');
  localStorage.removeItem('blockType');
  localStorage.removeItem('blockEndTime');
  inputBox.classList.remove('blocked-chat');
  userInput.disabled = false;
}

function startBlockTimer() {
  const timerEl = document.getElementById('blockTimer');
  function updateTimer() {
    const remaining = blockEndTime - Date.now();
    if (remaining <= 0) {
      removeBlock();
      closeBlockPopup();
      return;
    }
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    timerEl.textContent = `${hours}h ${minutes}min`;
  }
  updateTimer();
  setInterval(updateTimer, 60000);
}

function showBlockPopup(message) {
  document.getElementById('blockMessage').textContent = message;
  const blockOv = document.getElementById('blockOverlay');
  blockOv.style.display = 'flex';
  blockOv.classList.add('show');
}

function closeBlockPopup() {
  const blockOv = document.getElementById('blockOverlay');
  blockOv.style.display = 'none';
  blockOv.classList.remove('show');
}

function confirmDeleteRecent() {
  showConfirm('Tem certeza que deseja deletar esta mensagem recente?', deleteRecent);
}

function validateUserInput(name, email) {
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const prohibited = /(cu|pau|ppk|goza|chupa|puta|kids|kid|baby|bebe|cp|porno|estupro|estuprador|buceta|caralho|foder|fode|transar|sexo|pedofilo|putinha|estuprar|gostosa|tesao|tesão|ninfeta|ninfetinha|matar|esfolar|pedofilia|violencia|ameaca|drogas|ilegal)/i;
  let valid = true;
  if (!name) {
    nameInput.classList.add('error');
    valid = false;
  } else {
    nameInput.classList.remove('error');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailInput.classList.add('error');
    valid = false;
  } else {
    emailInput.classList.remove('error');
  }
  if (prohibited.test(name) || prohibited.test(email)) {
    valid = false;
    nameInput.classList.add('error');
    emailInput.classList.add('error');
    if (lastBadFormMessage) {
      lastBadFormMessage.remove();
    }
    lastBadFormMessage = document.createElement('div');
    lastBadFormMessage.className = 'warning-note';
    lastBadFormMessage.textContent = 'Por favor, evite utilizar palavras inadequadas em seu nome ou e-mail. Ajuste para continuar o atendimento';
    document.querySelector('.mini-form').appendChild(lastBadFormMessage);
  }
  return valid;
}

function showInputWarning() {
  inputWarning.style.display = 'block';
  setTimeout(() => {
    inputWarning.style.display = 'none';
  }, 3000);
}

function showRedirectLoading() {
  loadingSpinner.style.display = 'block';
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
  }, 2000); // Tempo suficiente para redirect
}

function openEmojiOverlay() {
  const emojiOv = document.getElementById('emojiOverlay');
  emojiOv.style.display = 'flex';
  emojiOv.classList.add('show');
}

function closeEmojiOverlay() {
  const emojiOv = document.getElementById('emojiOverlay');
  emojiOv.style.display = 'none';
  emojiOv.classList.remove('show');
}

function setupEmojiGrid() {
  const grid = document.getElementById('emojiGrid');
  emojis.forEach(emoji => {
    const btn = document.createElement('button');
    btn.className = 'emoji-btn-grid';
    btn.textContent = emoji;
    btn.onclick = () => {
      userInput.value += emoji;
      userInput.focus();
      closeEmojiOverlay();
    };
    grid.appendChild(btn);
  });
}

function showWarningPopup(message) {
  document.getElementById('warningMessage').textContent = message;
  const warningOv = document.getElementById('warningOverlay');
  warningOv.style.display = 'flex';
  warningOv.classList.add('show');
}

function closeWarningPopup() {
  const warningOv = document.getElementById('warningOverlay');
  warningOv.style.display = 'none';
  warningOv.classList.remove('show');
}