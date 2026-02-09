/**
 * FRAMEBOT - Chatbot Standalone Premium
 * Otimizado para Frame Agency
 * Versão: 2.0 (Premium UI/UX)
 */

(function() {
  // =================================================================
  // 1. CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
  // =================================================================
  
  // URLs de Imagens
  const IMG_AVATAR_BOT = "https://framerusercontent.com/images/wWIH1Nc4iXNLDhzo8ocpzNjiQY.png";
  const IMG_LOGO_WHITE = "https://framerusercontent.com/images/JaIvmSW2LTbs0XCR7tnpcmU8xA.png"; // Usado no header se necessário ou loading
  
  // Cores
  const COLORS = {
    primary: "#B98C68",
    secondary: "#6C757D",
    bgLight: "#F4EEE5",
    bgDark: "#262626", // Dark mode ajustado
    accentLight: "#D3AD83",
    success: "#28A745",
    botBubbleLight: "#F4EEE5",
    userBubbleLight: "#B98C68",
    botBubbleDark: "#333333",
    userBubbleDark: "#D3AD83",
    textDark: "#ffffff",
    textLight: "#000000"
  };

  // Controle de Estado
  const STATE = {
    isChatInitiated: false,
    typingShown: false,
    messageHistory: [],
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    isBlocked: localStorage.getItem('isChatBlocked') === 'true',
    blockEndTime: parseInt(localStorage.getItem('blockEndTime')) || 0,
    inactivityCount: 0,
    maxInactivityMsgs: 2, // Limite de 2 mensagens
    badWordCount: 0,
    floodCount: 0,
    lastClickTime: 0
  };

  // Configurações de Tempo
  const TIMING = {
    inactivityTimeout: 3 * 60 * 1000, // 3 minutos
    typingBaseDelay: 600,
    typingCharFactor: 30 // ms por caractere
  };

  let inactivityTimer;
  let domElements = {}; // Cache de elementos DOM

  // =================================================================
  // 2. INJEÇÃO DE DEPENDÊNCIAS (CSS E LIBS)
  // =================================================================

  // Meta Viewport para evitar zoom
  if (!document.querySelector('meta[name="viewport"]')) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
  }

  // LZ-String (Compressão)
  const lzScript = document.createElement('script');
  lzScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js';
  document.head.appendChild(lzScript);

  // Canvas Confetti
  const confettiScript = document.createElement('script');
  confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
  document.head.appendChild(confettiScript);

  // Fontes (Montserrat)
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  // Estilos CSS
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --primary: ${COLORS.primary};
      --secondary: ${COLORS.secondary};
      --bg-color: ${COLORS.bgLight};
      --text-color: ${COLORS.textLight};
      --bot-bubble: ${COLORS.botBubbleLight};
      --user-bubble: ${COLORS.userBubbleLight};
      --user-text: #fff;
      --header-bg: #AB865B;
      --shadow: rgba(0,0,0,0.1);
      --overlay-bg: rgba(255,255,255,0.95);
      --input-bg: #fff;
    }

    body.dark-mode {
      --bg-color: ${COLORS.bgDark}; /* #262626 */
      --text-color: ${COLORS.textDark};
      --bot-bubble: #333333;
      --user-bubble: #D3AD83;
      --user-text: #000;
      --header-bg: #8c6a4a;
      --shadow: rgba(0,0,0,0.4);
      --overlay-bg: rgba(38,38,38,0.95);
      --input-bg: #333333;
    }

    /* Reset e Base */
    .framebot-container * { box-sizing: border-box; outline: none; -webkit-tap-highlight-color: transparent; }
    .framebot-container {
      font-family: 'Montserrat', sans-serif;
      position: fixed;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 99999;
      pointer-events: none; /* Deixa clicar no site se o chat estiver fechado/minimizado */
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
    }

    /* Janela do Chat */
    .chat-window {
      width: 100%;
      height: 100%;
      background: var(--bg-color);
      display: flex;
      flex-direction: column;
      pointer-events: auto;
      box-shadow: 0 0 20px var(--shadow);
      transition: all 0.3s ease;
      overflow: hidden;
    }

    @media (min-width: 480px) {
      .chat-window {
        width: 400px;
        height: 600px;
        border-radius: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
        /* Slide Up Animation */
        transform: translateY(20px);
        opacity: 0;
        animation: slideUp 0.5s ease forwards;
      }
    }

    @keyframes slideUp {
      to { transform: translateY(0); opacity: 1; }
    }

    /* Header */
    .chat-header {
      background: var(--header-bg);
      color: #fff;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between; /* Esquerda: Info, Direita: Menu */
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      flex-shrink: 0;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .bot-avatar-header {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      background: #fff;
      border: 2px solid rgba(255,255,255,0.2);
    }

    .bot-info h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }

    .bot-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      opacity: 0.9;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background: #28A745;
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.3);
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .menu-icon {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 24px;
    }
    .menu-icon span {
      display: block;
      width: 100%;
      height: 2px;
      background: #fff;
      border-radius: 2px;
      transition: 0.3s;
    }
    .menu-icon:hover span { background: var(--user-bubble); }

    .close-icon {
      cursor: pointer;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .close-icon svg { stroke: #fff; stroke-width: 2.5; }

    /* Corpo do Chat */
    .chat-body {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      scroll-behavior: smooth;
      background: var(--bg-color);
      user-select: none; /* Impedir seleção */
    }

    /* Mensagens */
    .message-row {
      display: flex;
      gap: 10px;
      max-width: 85%;
      animation: fadeInBubble 0.3s ease;
    }
    .message-row.bot { align-self: flex-start; }
    .message-row.user { align-self: flex-end; flex-direction: row-reverse; }

    .msg-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: auto; /* Alinhar embaixo */
      box-shadow: 0 2px 5px var(--shadow);
    }

    .msg-bubble {
      padding: 12px 16px;
      border-radius: 20px;
      font-size: 14px;
      line-height: 1.5;
      position: relative;
      box-shadow: 0 1px 2px var(--shadow);
      word-wrap: break-word;
    }

    .bot .msg-bubble {
      background: var(--bot-bubble);
      color: var(--text-color);
      border-bottom-left-radius: 4px;
    }

    .user .msg-bubble {
      background: var(--user-bubble);
      color: var(--user-text);
      border-bottom-right-radius: 4px;
    }

    .msg-time {
      font-size: 10px;
      opacity: 0.7;
      margin-top: 4px;
      text-align: right;
      display: block;
    }

    .link { color: var(--primary); font-weight: 600; text-decoration: underline; cursor: pointer; }
    body.dark-mode .link { color: #D3AD83; }

    @keyframes fadeInBubble {
      from { opacity: 0; transform: translateY(10px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* Botões de Opção */
    .options-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .option-btn {
      background: transparent;
      border: 1px solid var(--primary);
      color: var(--primary);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    body.dark-mode .option-btn { border-color: #D3AD83; color: #D3AD83; }

    .option-btn:hover {
      background: var(--primary);
      color: #fff;
      transform: translateY(-1px);
    }
    body.dark-mode .option-btn:hover { background: #D3AD83; color: #000; }

    /* Footer / Input */
    .chat-footer {
      padding: 12px 16px 8px 16px; /* Menos padding bottom para o disclaimer */
      background: var(--bg-color);
      border-top: 1px solid rgba(0,0,0,0.05);
    }
    body.dark-mode .chat-footer { border-top: 1px solid rgba(255,255,255,0.05); }

    .input-wrapper {
      display: flex;
      align-items: center;
      background: var(--input-bg);
      border-radius: 24px;
      padding: 6px 12px;
      box-shadow: 0 2px 8px var(--shadow);
      border: 1px solid transparent;
      transition: 0.3s;
    }
    .input-wrapper:focus-within { border-color: var(--primary); }

    .chat-input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 10px;
      font-size: 16px; /* Evita zoom no iOS */
      color: var(--text-color);
      font-family: 'Montserrat', sans-serif;
    }
    .chat-input::placeholder { color: #999; }

    .send-btn {
      background: var(--primary);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.2s;
      flex-shrink: 0;
    }
    .send-btn:hover { transform: scale(1.05); background: #a37857; }
    .send-btn svg { width: 18px; height: 18px; fill: none; stroke: #fff; stroke-width: 2.5; margin-left: 2px; }

    /* Disclaimer Legal */
    .legal-disclaimer {
      font-size: 10px;
      color: #999;
      text-align: center;
      padding: 8px 0 4px 0;
      line-height: 1.4;
    }
    .legal-disclaimer a { color: var(--primary); text-decoration: none; }
    .legal-disclaimer a:hover { text-decoration: underline; }

    /* Loading Spinner */
    .loading-screen {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--bg-color);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(185, 140, 104, 0.2);
      border-left-color: var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { 100% { transform: rotate(360deg); } }

    /* Typing Indicator */
    .typing { display: flex; gap: 4px; padding: 4px 8px; }
    .typing span {
      width: 6px;
      height: 6px;
      background: #999;
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out both;
    }
    .typing span:nth-child(1) { animation-delay: -0.32s; }
    .typing span:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

    /* Overlay (Menu/Feedback) */
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--overlay-bg);
      backdrop-filter: blur(5px);
      z-index: 20;
      display: none;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .overlay-content {
      width: 80%;
      max-width: 300px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .overlay-btn {
      background: var(--header-bg);
      color: #fff;
      border: none;
      padding: 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      width: 100%;
      transition: 0.2s;
    }
    .overlay-btn:hover { background: #8c6a4a; transform: translateY(-1px); }
    
    .overlay-close {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
      font-size: 24px;
      color: var(--text-color);
    }

    /* Feedback Stars */
    .star-rating { display: flex; justify-content: center; gap: 8px; margin: 10px 0; }
    .star { font-size: 32px; color: #ddd; cursor: pointer; transition: 0.2s; }
    .star.active, .star:hover { color: #FFD700; transform: scale(1.1); }
    
    .feedback-options { text-align: left; display: none; animation: fadeIn 0.3s; }
    .feedback-label { display: block; margin: 8px 0; font-size: 13px; color: var(--text-color); cursor: pointer; }
    .feedback-label input { margin-right: 8px; accent-color: var(--primary); }
    .feedback-text {
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #ccc;
      margin-top: 8px;
      font-family: inherit;
    }

    .mini-form input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background: var(--input-bg);
      color: var(--text-color);
    }

    /* Scrollbar */
    .chat-body::-webkit-scrollbar { width: 6px; }
    .chat-body::-webkit-scrollbar-track { background: transparent; }
    .chat-body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 10px; }
  `;
  document.head.appendChild(style);

  // =================================================================
  // 3. ESTRUTURA HTML (DOM)
  // =================================================================

  const container = document.createElement('div');
  container.className = 'framebot-container';
  container.innerHTML = `
    <div class="chat-window" id="fbWindow">
      <div class="loading-screen" id="fbLoading">
        <div class="spinner"></div>
      </div>

      <div class="chat-header">
        <div class="header-left">
          <img src="${IMG_AVATAR_BOT}" class="bot-avatar-header" alt="Avatar">
          <div class="bot-info">
            <h3>Atendimento - Frame</h3>
            <div class="bot-status">
              <span class="status-dot"></span> Online
            </div>
          </div>
        </div>
        <div class="header-right">
          <div class="menu-icon" id="fbMenuBtn">
            <span></span><span></span><span></span>
          </div>
          <div class="close-icon" id="fbCloseBtn" style="display:none;"> <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"></path></svg>
          </div>
        </div>
      </div>

      <div class="chat-body" id="fbBody"></div>

      <div class="chat-footer">
        <div class="input-wrapper">
          <input type="text" class="chat-input" id="fbInput" placeholder="Digite sua mensagem...">
          <button class="send-btn" id="fbSend">
            <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
          </button>
        </div>
        <div class="legal-disclaimer">
          Ao conversar, você concorda com os <a href="https://frameag.com/termos" target="_blank">Termos</a> e <a href="https://frameag.com/privacy" target="_blank">Política de Privacidade</a>.
        </div>
      </div>

      <div class="overlay" id="fbMenuOverlay">
        <div class="overlay-close" id="fbCloseMenu">&times;</div>
        <div class="overlay-content">
          <button class="overlay-btn" id="btnDarkMode">Ativar Modo Escuro</button>
          <button class="overlay-btn" id="btnClearHistory">Limpar Histórico</button>
          <button class="overlay-btn" id="btnEditProfile">Editar meu Perfil</button>
          <button class="overlay-btn" onclick="window.open('https://frameag.com/models', '_blank')">Visitar Catálogo</button>
          <button class="overlay-btn" onclick="window.open('https://t.me/suporteframebot', '_blank')">Atendimento Humano</button>
          <button class="overlay-btn" id="btnFeedback">⟡ Avaliar Experiência</button>
        </div>
      </div>

      <div class="overlay" id="fbFeedbackOverlay">
        <div class="overlay-close" id="fbCloseFeedback">&times;</div>
        <div class="overlay-content" style="max-width: 320px;">
          <h3 style="margin:0; color:var(--text-color);">Avalie o Atendimento</h3>
          <div class="star-rating" id="starRating">
            <span class="star" data-val="1">★</span>
            <span class="star" data-val="2">★</span>
            <span class="star" data-val="3">★</span>
            <span class="star" data-val="4">★</span>
            <span class="star" data-val="5">★</span>
          </div>
          <div class="feedback-options" id="feedbackOptions">
            </div>
          <button class="overlay-btn" id="btnSubmitFeedback" style="display:none; margin-top:10px;">Enviar Avaliação</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Cache Elements
  domElements = {
    window: document.getElementById('fbWindow'),
    body: document.getElementById('fbBody'),
    input: document.getElementById('fbInput'),
    sendBtn: document.getElementById('fbSend'),
    loading: document.getElementById('fbLoading'),
    menuBtn: document.getElementById('fbMenuBtn'),
    menuOverlay: document.getElementById('fbMenuOverlay'),
    closeMenu: document.getElementById('fbCloseMenu'),
    darkModeBtn: document.getElementById('btnDarkMode'),
    clearHistoryBtn: document.getElementById('btnClearHistory'),
    feedbackOverlay: document.getElementById('fbFeedbackOverlay'),
    starRating: document.getElementById('starRating'),
    feedbackOptions: document.getElementById('feedbackOptions'),
    submitFeedback: document.getElementById('btnSubmitFeedback')
  };

  // =================================================================
  // 4. LÓGICA CORE DO CHAT
  // =================================================================

  // Inicialização
  function init() {
    // Carregar histórico ou iniciar
    loadState();
    
    if (localStorage.getItem('framebot_dark') === 'true') {
      document.body.classList.add('dark-mode');
      domElements.darkModeBtn.textContent = "Desativar Modo Escuro";
    }

    if (!STATE.isChatInitiated) {
      // Simular loading inicial
      setTimeout(() => {
        domElements.loading.style.opacity = '0';
        setTimeout(() => domElements.loading.style.display = 'none', 300);
        startWelcomeFlow();
      }, 2000);
    } else {
      domElements.loading.style.display = 'none';
      renderHistory();
      addTimestampSeparator();
    }

    bindEvents();
    startInactivityTimer();
  }

  // Adicionar Mensagem (System/Bot/User)
  function addMessage(text, type = 'bot', delay = 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        // Typing indicator se for bot
        let typingEl;
        if (type === 'bot') {
          typingEl = document.createElement('div');
          typingEl.className = 'message-row bot';
          typingEl.innerHTML = `
            <img src="${IMG_AVATAR_BOT}" class="msg-avatar">
            <div class="msg-bubble typing"><span></span><span></span><span></span></div>
          `;
          domElements.body.appendChild(typingEl);
          scrollToBottom();
        }

        const actualDelay = type === 'bot' ? Math.max(600, text.length * 20) : 0; // Calculo de tempo de leitura/digitação

        setTimeout(() => {
          if (typingEl) typingEl.remove();

          const row = document.createElement('div');
          row.className = `message-row ${type}`;
          
          let avatarHtml = type === 'bot' ? `<img src="${IMG_AVATAR_BOT}" class="msg-avatar">` : '';
          
          const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          
          // Sanitize e Links
          const formattedText = sanitizeAndLinkify(text);

          row.innerHTML = `
            ${avatarHtml}
            <div class="msg-bubble">
              ${formattedText}
              <span class="msg-time">${time}</span>
            </div>
          `;
          
          domElements.body.appendChild(row);
          scrollToBottom();

          // Salvar no histórico
          STATE.messageHistory.push({ text, type, time: new Date().toISOString() });
          saveState();
          
          resolve();
        }, type === 'bot' ? actualDelay : 0);
      }, delay);
    });
  }

  // Adicionar Botões de Opção
  function addOptions(options) {
    const container = document.createElement('div');
    container.className = 'options-container';
    
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.label;
      btn.onclick = () => {
        // Desabilitar botões após clique
        const allBtns = container.querySelectorAll('.option-btn');
        allBtns.forEach(b => { b.disabled = true; b.style.opacity = '0.5'; });
        btn.style.opacity = '1';
        btn.style.borderColor = COLORS.primary;
        btn.style.background = COLORS.primary;
        btn.style.color = '#fff';
        
        handleUserResponse(opt.label, opt.action);
      };
      container.appendChild(btn);
    });

    // Adiciona ao último bubble do bot ou cria novo row se necessário
    // Simplificação: adiciona direto no body
    const wrapper = document.createElement('div');
    wrapper.className = 'message-row bot';
    wrapper.style.marginBottom = '10px';
    wrapper.innerHTML = `<div style="width:32px; flex-shrink:0;"></div>`; // Spacer do avatar
    wrapper.appendChild(container);
    domElements.body.appendChild(wrapper);
    scrollToBottom();
  }

  // Fluxo de Boas-vindas (Dividido em 2 balões)
  async function startWelcomeFlow() {
    STATE.isChatInitiated = true;
    saveState();
    
    await addMessage("Olá, boas-vindas ao atendimento virtual da Frame Agency.", 'bot');
    await addMessage("Estamos aqui para te ajudar 24h por dia, basta me informar o que precisa agora!", 'bot', 500);
    
    showInitialMenu();
  }

  // Menu Inicial
  function showInitialMenu() {
    addOptions([
      { label: "Quero tirar uma dúvida", action: 'menuDuvida' },
      { label: "Conhecer planos", action: 'flowPremium' },
      { label: "Quero me cadastrar", action: 'flowCadastro' },
      { label: "Falar com um humano", action: 'flowHumano' }
    ]);
  }

  // Processador de Resposta do Usuário
  async function handleUserResponse(text, actionKey) {
    resetInactivityTimer();
    await addMessage(text, 'user');

    // Lógica simples de roteamento
    switch(actionKey) {
      case 'menuDuvida':
        await addMessage("Qual é a sua relação com a Frame hoje? Isso ajuda a direcionar melhor as respostas.");
        addOptions([
          { label: "Sou Contratante", action: 'menuContratante' },
          { label: "Sou Criadora", action: 'menuCriadora' }
        ]);
        break;
      
      case 'menuContratante':
        await addMessage("Como contratante, selecione o tópico:");
        addOptions([
          { label: "Quero contratar", action: 'infoContratar' },
          { label: "Sobre segurança", action: 'infoSeguranca' },
          { label: "Reportar problema", action: 'infoReport' },
          { label: "Voltar", action: 'backToStart' }
        ]);
        break;

      case 'menuCriadora':
        await addMessage("Como criadora, como posso ajudar?");
        addOptions([
          { label: "Como me cadastrar", action: 'flowCadastro' },
          { label: "Verificação", action: 'infoVerificacao' },
          { label: "Frame Payments", action: 'infoPayments' },
          { label: "Voltar", action: 'backToStart' }
        ]);
        break;

      case 'flowPremium':
        await addMessage("O Frame Premium desbloqueia o catálogo completo sem anúncios e oferece atendimento prioritário.");
        await addMessage("Clique abaixo para conhecer os planos:", 'bot');
        await addMessage('<a href="https://frameag.com/premium" target="_blank" class="link">Ver Planos Premium</a>', 'bot');
        showDidThatHelp();
        break;

      case 'flowCadastro':
        await addMessage("Para se cadastrar, acesse nossa página oficial. Você precisará de documentos para verificação de idade (+18).");
        await addMessage('<a href="https://frameag.com/cadastro" target="_blank" class="link">Iniciar Cadastro</a>', 'bot');
        showDidThatHelp();
        break;

      case 'flowHumano':
        await addMessage("Para falar com nosso time, utilize nosso Telegram oficial. O atendimento é 24h.");
        await addMessage('<a href="https://t.me/suporteframebot" target="_blank" class="link">Abrir Suporte no Telegram</a>', 'bot');
        break;

      case 'infoSeguranca':
        await addMessage("A Frame utiliza autenticação em três etapas e monitoramento 24h. Somos auditados para garantir segurança total.");
        showDidThatHelp();
        break;
        
      case 'infoVerificacao':
        await addMessage("A verificação exige documento (RG/CNH) e selfie em tempo real (Liveness Check) para garantir que você é quem diz ser.");
        showDidThatHelp();
        break;

      case 'backToStart':
        showInitialMenu();
        break;

      default:
        // Se for input de texto livre (keyword matching simples simulando LLM)
        processFreeText(text);
    }
  }

  // Simulação de "LLM" via Keywords (Knowledge Base baseada no prompt)
  async function processFreeText(text) {
    const lower = text.toLowerCase();
    
    // Filtro de palavras ofensivas
    if (checkBadWords(lower)) return;

    // Respostas baseadas em conhecimento
    if (lower.includes('valor') || lower.includes('preço') || lower.includes('quanto custa')) {
      await addMessage("Os valores são definidos diretamente pelas criadoras ou pelos planos disponíveis no site. Visite o catálogo para ver detalhes.");
    } else if (lower.includes('seguro') || lower.includes('confiável')) {
      await addMessage("Sim! A Frame é líder em segurança na AL, com verificação facial obrigatória e dados criptografados.");
    } else if (lower.includes('oi') || lower.includes('olá')) {
      await addMessage("Olá! Como posso ajudar você hoje?");
      showInitialMenu();
      return;
    } else {
      // Fallback genérico inteligente
      await addMessage("Entendi. Para assuntos específicos como esse, recomendo falar com nosso especialista humano.");
      addOptions([{ label: "Falar com humano", action: 'flowHumano' }]);
      return;
    }
    
    showDidThatHelp();
  }

  function showDidThatHelp() {
    setTimeout(() => {
      addMessage("Isso ajudou com sua dúvida?", 'bot', 500).then(() => {
        addOptions([
          { label: "Sim, obrigado!", action: 'finishChat' },
          { label: "Não, preciso de mais ajuda", action: 'flowHumano' }
        ]);
      });
    }, 1000);
  }

  // Finalização e Feedback
  async function handleFinishChat() {
    await addMessage("Fico feliz em ter ajudado! 😊");
    setTimeout(() => {
       openFeedbackOverlay();
    }, 1500);
  }

  // =================================================================
  // 5. FUNÇÕES UTILITÁRIAS E SEGURANÇA
  // =================================================================

  function sanitizeAndLinkify(text) {
    // Escape HTML básico
    let clean = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // Converter Links
    clean = clean.replace(/&lt;a href="(.*?)"(.*?)&gt;(.*?)&lt;\/a&gt;/g, '<a href="$1" target="_blank" class="link">$3</a>');
    return clean;
  }

  function checkBadWords(text) {
    const badWords = ['palavrao1', 'palavrao2', 'fraude', 'golpe']; // Lista simplificada para o exemplo
    if (badWords.some(w => text.includes(w))) {
      STATE.badWordCount++;
      if (STATE.badWordCount >= 3) {
        blockChat("Comportamento inadequado detectado.");
      } else {
        addMessage("Por favor, mantenha o respeito para continuarmos o atendimento.", 'bot');
      }
      return true;
    }
    return false;
  }

  function blockChat(reason) {
    STATE.isBlocked = true;
    STATE.blockEndTime = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem('isChatBlocked', 'true');
    localStorage.setItem('blockEndTime', STATE.blockEndTime);
    domElements.input.disabled = true;
    domElements.input.placeholder = "Chat bloqueado temporariamente.";
    addMessage(`🚫 ${reason} O chat foi suspenso por 24h.`);
  }

  function scrollToBottom() {
    domElements.body.scrollTop = domElements.body.scrollHeight;
  }

  function startInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      if (STATE.inactivityCount < STATE.maxInactivityMsgs && !STATE.isBlocked) {
        STATE.inactivityCount++;
        addMessage("Ainda está por aí? Posso ajudar em algo mais?");
        scrollToBottom();
      }
    }, TIMING.inactivityTimeout);
  }

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    startInactivityTimer();
  }

  function saveState() {
    // Compressão simples para localStorage
    try {
      if(typeof LZString !== 'undefined') {
        localStorage.setItem('framebot_history', LZString.compress(JSON.stringify(STATE.messageHistory)));
      }
    } catch(e) { console.error(e); }
  }

  function loadState() {
    try {
      const data = localStorage.getItem('framebot_history');
      if (data && typeof LZString !== 'undefined') {
        STATE.messageHistory = JSON.parse(LZString.decompress(data)) || [];
      }
    } catch(e) { console.error(e); }
  }

  function renderHistory() {
    STATE.messageHistory.forEach(msg => {
      const row = document.createElement('div');
      row.className = `message-row ${msg.type}`;
      let avatarHtml = msg.type === 'bot' ? `<img src="${IMG_AVATAR_BOT}" class="msg-avatar">` : '';
      const time = new Date(msg.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      row.innerHTML = `
        ${avatarHtml}
        <div class="msg-bubble">
          ${sanitizeAndLinkify(msg.text)}
          <span class="msg-time">${time}</span>
        </div>
      `;
      domElements.body.appendChild(row);
    });
    scrollToBottom();
  }

  function addTimestampSeparator() {
    const sep = document.createElement('div');
    sep.style.textAlign = 'center';
    sep.style.fontSize = '11px';
    sep.style.color = '#999';
    sep.style.margin = '10px 0';
    sep.innerText = 'Conversa retomada';
    domElements.body.appendChild(sep);
  }

  // =================================================================
  // 6. UI: MENUS E FEEDBACK
  // =================================================================

  // Toggle Menu
  domElements.menuBtn.onclick = () => {
    domElements.menuOverlay.style.display = 'flex';
  };
  domElements.closeMenu.onclick = () => {
    domElements.menuOverlay.style.display = 'none';
  };
  
  // Dark Mode Toggle
  domElements.darkModeBtn.onclick = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('framebot_dark', isDark);
    domElements.darkModeBtn.textContent = isDark ? "Desativar Modo Escuro" : "Ativar Modo Escuro";
    domElements.menuOverlay.style.display = 'none';
  };

  // Limpar Histórico
  domElements.clearHistoryBtn.onclick = () => {
    if(confirm("Tem certeza? Isso apagará toda a conversa.")) {
      localStorage.removeItem('framebot_history');
      location.reload();
    }
  };

  // Feedback Logic
  function openFeedbackOverlay() {
    domElements.feedbackOverlay.style.display = 'flex';
  }

  domElements.feedbackOverlay.querySelector('.close-icon').onclick = () => { // Fix selector
    domElements.feedbackOverlay.style.display = 'none';
  };
  document.getElementById('fbCloseFeedback').onclick = () => {
    domElements.feedbackOverlay.style.display = 'none';
  };

  const stars = domElements.starRating.querySelectorAll('.star');
  let selectedRating = 0;

  stars.forEach(star => {
    star.onclick = () => {
      selectedRating = parseInt(star.dataset.val);
      stars.forEach(s => s.classList.remove('active'));
      star.classList.add('active');
      let prev = star.previousElementSibling;
      while(prev) { prev.classList.add('active'); prev = prev.previousElementSibling; }

      // Mostrar opções baseadas na nota
      domElements.feedbackOptions.style.display = 'block';
      domElements.feedbackOptions.innerHTML = '';
      domElements.submitFeedback.style.display = 'block';

      if (selectedRating <= 3) {
        domElements.feedbackOptions.innerHTML = `
          <p style="font-size:12px; margin-bottom:5px;">O que podemos melhorar?</p>
          <label class="feedback-label"><input type="checkbox" value="respostas"> Respostas confusas</label>
          <label class="feedback-label"><input type="checkbox" value="lento"> Atendimento lento</label>
          <label class="feedback-label"><input type="checkbox" value="naoresolveu"> Não resolveu meu problema</label>
          <input type="text" class="feedback-text" placeholder="Outro motivo (opcional)">
        `;
      } else {
        domElements.feedbackOptions.innerHTML = `
          <p style="font-size:14px; color:${COLORS.success};">Obrigado! Ficamos felizes em ajudar.</p>
          <input type="text" class="feedback-text" placeholder="Deixe um elogio (opcional)">
        `;
      }
    };
  });

  domElements.submitFeedback.onclick = () => {
    // Simular envio
    domElements.submitFeedback.textContent = "Enviando...";
    setTimeout(() => {
      domElements.feedbackOverlay.style.display = 'none';
      if(window.confetti) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      alert("Obrigado pelo seu feedback!");
    }, 1000);
  };

  // Input Handling
  domElements.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && domElements.input.value.trim() !== '') {
      const txt = domElements.input.value.trim();
      domElements.input.value = '';
      
      if (txt === '/reset') { // Comando secreto de reset
        localStorage.removeItem('framebot_history');
        location.reload();
        return;
      }
      
      handleUserResponse(txt, 'freeText');
    }
  });

  domElements.sendBtn.onclick = () => {
    if (domElements.input.value.trim() !== '') {
      const txt = domElements.input.value.trim();
      domElements.input.value = '';
      handleUserResponse(txt, 'freeText');
    }
  };

  // Inicializar
  init();

})();