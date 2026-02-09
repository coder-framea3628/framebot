<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Atendimento Frame Agency</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

  <style>
    /* ===== Variaveis CSS & Temas ===== */
    :root {
      --primary-color: #AB865B; /* Accent Frame */
      --primary-hover: #D3AD83;
      --bg-light: #F4EEE5; /* Fundo Frame */
      --bg-white: #FFFFFF;
      --text-main: #262626;
      --text-sec: #6C757D;
      --bubble-bot: #F4EEE5; /* Fundo msg bot (cinza claro/bege) */
      --bubble-user: #AB865B; /* Fundo msg user */
      --text-user: #FFFFFF;
      --shadow: rgba(0, 0, 0, 0.1);
      --success: #28A745;
      --error: #DC3545;
      --radius-lg: 20px;
      --radius-sm: 8px;
      --font-family: 'Montserrat', sans-serif;
    }

    body.dark {
      --bg-light: #1A1A1A;
      --bg-white: #262626;
      --text-main: #E0E0E0;
      --text-sec: #A0A0A0;
      --bubble-bot: #333333;
      --bubble-user: #D3AD83;
      --text-user: #1A1A1A;
      --shadow: rgba(0, 0, 0, 0.5);
    }

    /* ===== Reset & Base ===== */
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    
    body {
      margin: 0;
      padding: 0;
      font-family: var(--font-family);
      background-color: transparent; /* Para embed */
      overflow: hidden;
      user-select: none; /* Bloqueia seleção geral */
    }

    /* Permite seleção em inputs e mensagens */
    input, textarea, .msg-text, .selectable { user-select: text; }

    /* ===== Loading Spinner ===== */
    #loader-screen {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: var(--bg-white);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      transition: opacity 0.5s ease;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid #f3f3f3;
      border-top: 5px solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

    /* ===== Main Chat Container ===== */
    .chat-widget {
      position: fixed;
      bottom: 0;
      right: 20px;
      width: 400px;
      height: 600px;
      max-height: 100vh;
      background: var(--bg-white);
      box-shadow: 0 -5px 25px var(--shadow);
      border-top-left-radius: var(--radius-lg);
      border-top-right-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: translateY(100%); /* Inicialmente escondido */
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
      z-index: 9999;
    }

    .chat-widget.open { transform: translateY(0); }

    /* Responsivo Mobile */
    @media (max-width: 480px) {
      .chat-widget {
        width: 100%;
        height: 100%;
        right: 0;
        bottom: 0;
        border-radius: 0;
      }
    }

    /* ===== Header ===== */
    .chat-header {
      background: var(--primary-color);
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .bot-avatar-header {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #fff;
      padding: 2px;
      object-fit: cover;
    }

    .header-text h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }

    .status-indicator {
      font-size: 12px;
      opacity: 0.9;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .status-dot {
      width: 8px; height: 8px; background: #28a745; border-radius: 50%;
    }

    .header-controls {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    /* Menu Hamburger Personalizado */
    .burger-menu {
      position: relative;
      width: 24px;
      height: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .burger-menu span {
      display: block;
      width: 100%;
      height: 2px;
      background: #fff;
      border-radius: 2px;
      transition: all 0.2s ease;
    }
    .burger-menu:hover span { background: var(--primary-hover); }

    .close-icon {
      cursor: pointer;
      transition: transform 0.2s;
    }
    .close-icon:hover { transform: scale(1.1); }

    /* ===== Body / Messages ===== */
    .chat-body {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background: var(--bg-white);
      display: flex;
      flex-direction: column;
      gap: 16px;
      scroll-behavior: smooth;
    }

    /* Scrollbar */
    .chat-body::-webkit-scrollbar { width: 6px; }
    .chat-body::-webkit-scrollbar-track { background: transparent; }
    .chat-body::-webkit-scrollbar-thumb { background: var(--text-sec); border-radius: 3px; opacity: 0.3; }

    /* Message Bubbles */
    .message {
      display: flex;
      align-items: flex-end;
      gap: 10px;
      max-width: 100%;
      opacity: 0;
      animation: fadeIn 0.3s ease forwards;
    }
    
    @keyframes fadeIn { to { opacity: 1; transform: translateY(0); } from { opacity: 0; transform: translateY(10px); } }

    .message.bot { align-self: flex-start; }
    .message.user { align-self: flex-end; flex-direction: row-reverse; }

    .avatar-bubble {
      width: 30px; height: 30px; border-radius: 50%;
      flex-shrink: 0;
      box-shadow: 0 2px 5px var(--shadow);
    }

    .bubble-content {
      padding: 12px 16px;
      border-radius: var(--radius-lg);
      font-size: 14px;
      line-height: 1.5;
      position: relative;
      box-shadow: 0 1px 2px var(--shadow);
      max-width: 80%;
      word-wrap: break-word;
    }

    .message.bot .bubble-content {
      background: var(--bubble-bot);
      color: var(--text-main);
      border-bottom-left-radius: 4px;
    }

    .message.user .bubble-content {
      background: var(--bubble-user);
      color: var(--text-user);
      border-bottom-right-radius: 4px;
    }

    .message-time {
      font-size: 10px;
      color: var(--text-sec);
      margin-top: 4px;
      text-align: right;
      display: block;
    }

    /* Links */
    .chat-link {
      color: var(--primary-color);
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
    }
    .chat-link:hover { color: var(--primary-hover); }

    /* Typing Indicator */
    .typing-indicator {
      display: flex; gap: 4px; padding: 10px 14px;
      background: var(--bubble-bot);
      border-radius: 20px;
      width: fit-content;
      margin-left: 40px; /* Offset avatar */
    }
    .typing-dot {
      width: 6px; height: 6px; background: #999; border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out both;
    }
    .typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .typing-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

    /* ===== Input Area ===== */
    .chat-footer {
      padding: 12px 20px;
      background: var(--bg-white);
      border-top: 1px solid var(--shadow);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-light);
      padding: 8px 12px;
      border-radius: 24px;
      border: 1px solid transparent;
      transition: border 0.3s;
    }
    .input-wrapper:focus-within { border-color: var(--primary-color); }

    #user-input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-size: 16px; /* Evita zoom no iOS */
      color: var(--text-main);
      padding: 8px 0;
    }

    .send-btn {
      background: var(--primary-color);
      border: none;
      width: 36px; height: 36px;
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, background 0.2s;
    }
    .send-btn:hover { background: var(--primary-hover); transform: scale(1.05); }
    .send-btn svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; }

    .footer-disclaimer {
      font-size: 10px;
      color: var(--text-sec);
      text-align: center;
      margin-top: 4px;
    }
    .footer-disclaimer a { color: var(--text-sec); text-decoration: underline; }

    /* ===== Buttons & Options ===== */
    .options-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }
    .chat-btn {
      padding: 8px 16px;
      border-radius: 20px;
      border: 1px solid var(--primary-color);
      background: transparent;
      color: var(--primary-color);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    .chat-btn:hover {
      background: var(--primary-color);
      color: #fff;
      transform: translateY(-1px);
    }
    .chat-btn.primary { background: var(--primary-color); color: #fff; }

    /* ===== Overlays (Menu, Admin, Feedback) ===== */
    .overlay {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px);
      z-index: 10001;
      display: none;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .overlay.show { opacity: 1; }

    .modal {
      background: var(--bg-white);
      padding: 24px;
      border-radius: var(--radius-lg);
      width: 90%;
      max-width: 320px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      text-align: center;
      position: relative;
    }

    .modal h2 { margin-top: 0; color: var(--primary-color); font-size: 18px; }
    .modal-close { position: absolute; top: 12px; right: 12px; cursor: pointer; color: var(--text-sec); }
    
    .menu-options button {
      display: block;
      width: 100%;
      padding: 12px;
      margin-bottom: 8px;
      border: 1px solid var(--shadow);
      border-radius: var(--radius-lg);
      background: var(--bg-white);
      color: var(--text-main);
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      transition: background 0.2s;
    }
    .menu-options button:hover { background: var(--bg-light); border-color: var(--primary-color); }

    /* Feedback Stars */
    .star-rating { display: flex; justify-content: center; gap: 8px; margin: 15px 0; }
    .star { font-size: 24px; cursor: pointer; color: #ccc; transition: color 0.2s; }
    .star.active { color: #FFD700; }
    
    .feedback-input {
      width: 100%; padding: 10px; margin-top: 10px;
      border-radius: 8px; border: 1px solid var(--shadow);
      font-family: inherit; resize: vertical;
    }

    /* Admin Panel */
    #admin-panel textarea { width: 100%; height: 100px; margin-bottom: 10px; }
    .admin-stats { font-size: 12px; text-align: left; margin-bottom: 10px; color: var(--text-main); }
    
    /* Utility Classes */
    .hidden { display: none !important; }
    .semibold { font-weight: 600; }

  </style>
</head>
<body>

  <div id="loader-screen">
    <div class="spinner"></div>
  </div>

  <div id="chat-widget" class="chat-widget">
    
    <div class="chat-header">
      <div class="header-info">
        <img src="https://framerusercontent.com/images/wWIH1Nc4iXNLDhzo8ocpzNjiQY.png" alt="Fabi" class="bot-avatar-header">
        <div class="header-text">
          <h3>Atendimento - Frame</h3>
          <div class="status-indicator"><span class="status-dot"></span> Online agora</div>
        </div>
      </div>
      <div class="header-controls">
        <div class="burger-menu" onclick="toggleMenu()">
          <span></span><span></span><span></span>
        </div>
        <div class="close-icon" onclick="minimizeChat()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
      </div>
    </div>

    <div id="chat-body" class="chat-body">
      </div>

    <div id="typing-indicator" class="typing-indicator hidden">
      <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
    </div>

    <div class="chat-footer">
      <div class="input-wrapper">
        <input type="text" id="user-input" placeholder="Digite sua mensagem..." autocomplete="off">
        <button class="send-btn" onclick="sendMessage()">
          <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
        </button>
      </div>
      <div class="footer-disclaimer">
        Ao conversar, você concorda com os <a href="https://frameag.com/termos" target="_blank">Termos</a> e <a href="https://frameag.com/privacy" target="_blank">Política de Privacidade</a>.
      </div>
    </div>
  </div>

  <div id="menu-overlay" class="overlay">
    <div class="modal">
      <span class="modal-close" onclick="toggleMenu()">✕</span>
      <h2>Menu</h2>
      <div class="menu-options">
        <button onclick="toggleDarkMode()">🌓 Alternar Modo Escuro</button>
        <button onclick="clearHistory()">🗑️ Limpar Histórico</button>
        <button onclick="editProfile()">👤 Editar meu Perfil</button>
        <button onclick="window.open('https://frameag.com/models', '_blank')">✨ Catálogo de Modelos</button>
        <button onclick="window.open('https://t.me/suporteframebot', '_blank')">👩‍💻 Atendimento Humano</button>
        <button onclick="openFeedback()">⭐ Avaliar Experiência</button>
      </div>
    </div>
  </div>

  <div id="feedback-overlay" class="overlay">
    <div class="modal">
      <span class="modal-close" onclick="closeFeedback()">✕</span>
      <h2>Avalie sua Experiência</h2>
      <div class="star-rating" id="star-rating">
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
      </div>
      <div id="feedback-details" class="hidden">
        <p id="feedback-prompt">O que podemos melhorar?</p>
        <textarea id="feedback-text" class="feedback-input" placeholder="Conte mais (opcional)"></textarea>
      </div>
      <button class="chat-btn primary" style="margin-top:15px; width:100%" onclick="submitFeedback()">Enviar Avaliação</button>
    </div>
  </div>

  <div id="admin-overlay" class="overlay">
    <div class="modal" style="max-width: 400px;">
      <span class="modal-close" onclick="closeAdmin()">✕</span>
      <h2>Painel Admin</h2>
      <div class="admin-stats" id="admin-stats"></div>
      <textarea id="kb-input" placeholder="Cole texto aqui para adicionar à Knowledge Base (simulado)"></textarea>
      <div class="menu-options">
        <button onclick="updateKB()">💾 Atualizar Knowledge Base</button>
        <button onclick="downloadLogs()">📥 Baixar Logs de Chat</button>
        <button onclick="closeAdmin()">Sair</button>
      </div>
    </div>
  </div>

  <script>
    // ===== Configuração e Estado =====
    const CONFIG = {
      botName: 'Fabi',
      botAvatar: 'https://framerusercontent.com/images/wWIH1Nc4iXNLDhzo8ocpzNjiQY.png',
      inactivityTimeout: 180000, // 3 min
      storageKey: 'frameChat_v1'
    };

    let state = {
      messages: [],
      userInfo: null,
      theme: 'light',
      isBlocked: false,
      blockUntil: 0,
      floodCount: 0,
      lastInteraction: Date.now(),
      kb: {}, // Knowledge Base
      feedbacks: []
    };

    // Palavras Proibidas (Baseado no arquivo fornecido)
    const PROHIBITED_WORDS = [
      'nudes', 'pack', 'sexting', 'pelada', 'porno', 'pornô', 'erotico', 'sexo', 'transar', 
      'foder', 'gozar', 'chupa', 'buceta', 'pau', 'pinto', 'rola', 'cu', 'bunda', 'puta', 
      'vagabunda', 'programa', 'acompanhante', 'kids', 'cp', 'estupro', 'drogas', 'ilegal'
    ];

    // Knowledge Base Inicial (Baseado nos arquivos fornecidos)
    const DEFAULT_KB = {
      'saudacao': "Olá! Tudo bem? Como posso ajudar você hoje no ecossistema da Frame?",
      'cadastro': "Para se cadastrar como criadora, acesse <a href='https://frameag.com/cadastro' target='_blank' class='link'>frameag.com/cadastro</a>. É necessário ser maior de 18 anos e passar pela verificação facial.",
      'premium': "O Frame Premium oferece catálogo completo sem anúncios e suporte prioritário. Veja os planos em <a href='https://frameag.com/premium' target='_blank' class='link'>frameag.com/premium</a>.",
      'seguranca': "A Frame é extremamente segura. Utilizamos autenticação em três etapas e temos um time de segurança 24h. Saiba mais em <a href='https://frameag.com/verificacao' target='_blank' class='link'>Blog de Verificação</a>.",
      'humano': "Para falar com nosso suporte humano, acesse nosso canal no Telegram: <a href='https://t.me/suporteframebot' target='_blank' class='link'>Clique aqui</a>.",
      'termos': "Você pode ler nossos Termos e Condições completos em <a href='https://frameag.com/termos' target='_blank' class='link'>frameag.com/termos</a>.",
      'valores': "Para visualizar valores de assinaturas ou cachês, você deve acessar o catálogo logado como assinante em <a href='https://frameag.com/models' target='_blank' class='link'>frameag.com/models</a>.",
      'sobre': "A Frame é o maior ecossistema de experiências personalizadas da América Latina, conectando criadoras e contratantes com tecnologia e segurança.",
      'pagamento': "Utilizamos o Frame Payments para transações seguras e instantâneas. Dúvidas? Fale com o suporte humano."
    };

    // ===== Inicialização =====
    window.onload = function() {
      loadState();
      applyTheme();
      
      // Spinner Timer
      setTimeout(() => {
        document.getElementById('loader-screen').style.opacity = '0';
        setTimeout(() => {
          document.getElementById('loader-screen').style.display = 'none';
          openChat(); // Auto-open
        }, 500);
      }, 2000);

      // Event Listeners
      document.getElementById('user-input').addEventListener('keypress', (e) => {
        if(e.key === 'Enter') sendMessage();
      });
      
      setupStars();
      checkInactivity();
    };

    // ===== Core Chat Logic =====

    function openChat() {
      document.getElementById('chat-widget').classList.add('open');
      if (state.messages.length === 0) {
        startFlow();
      } else {
        renderMessages();
        scrollToBottom();
      }
    }

    function minimizeChat() {
      // Opcional: Adicionar lógica para mostrar um "launcher" se o chat for fechado
      // No prompt pede "Auto-open", então minimizar pode só esconder visualmente ou reiniciar
      document.getElementById('chat-widget').classList.remove('open');
      setTimeout(() => {
        // Re-abrir como "minimized state" ou botão flutuante se desejado
        // Por hora, mantemos escondido até reload ou trigger externo
      }, 400);
    }

    function startFlow() {
      // Sequência inicial de duas bolhas
      addBotMessage("Olá, boas-vindas ao atendimento virtual da Frame Agency.");
      setTimeout(() => {
        addBotMessage("Estamos aqui para te ajudar 24h por dia, basta me informar o que precisa agora!", [
          { text: "Quero tirar uma dúvida", action: "kb_duvida" },
          { text: "Falar com um humano", action: "humano" },
          { text: "Conhecer planos", action: "premium" },
          { text: "Quero me cadastrar", action: "cadastro" }
        ]);
      }, 1000);
    }

    function sendMessage(text = null) {
      const input = document.getElementById('user-input');
      const msg = text || input.value.trim();
      
      if (!msg) return;
      if (!text) input.value = '';

      // Check Admin Command
      if (msg === '/admin') {
        const pass = prompt("Senha de Administrador:");
        if (pass === 'admin123') openAdmin();
        else alert("Senha incorreta");
        return;
      }

      // Check Moderation
      if (checkModeration(msg)) return;

      // Add User Message
      addUserMessage(msg);
      state.lastInteraction = Date.now();

      // Show Typing
      showTyping(true);

      // Process Response (Mock LLM)
      setTimeout(() => {
        const response = generateResponse(msg);
        showTyping(false);
        addBotMessage(response.text, response.options);
      }, 1500); // Delay artificial para "pensar"
    }

    function addBotMessage(text, options = null) {
      const msgObj = { sender: 'bot', text, options, time: new Date().toISOString() };
      state.messages.push(msgObj);
      saveState();
      renderMessageHTML(msgObj);
      scrollToBottom();
    }

    function addUserMessage(text) {
      const msgObj = { sender: 'user', text, time: new Date().toISOString() };
      state.messages.push(msgObj);
      saveState();
      renderMessageHTML(msgObj);
      scrollToBottom();
    }

    function renderMessages() {
      const container = document.getElementById('chat-body');
      container.innerHTML = '';
      state.messages.forEach(renderMessageHTML);
    }

    function renderMessageHTML(msg) {
      const container = document.getElementById('chat-body');
      const div = document.createElement('div');
      div.className = `message ${msg.sender}`;
      
      let avatarHTML = '';
      if (msg.sender === 'bot') {
        avatarHTML = `<img src="${CONFIG.botAvatar}" class="avatar-bubble">`;
      }

      let optionsHTML = '';
      if (msg.options) {
        optionsHTML = `<div class="options-container">
          ${msg.options.map(opt => `<button class="chat-btn" onclick="handleOption('${opt.action}')">${opt.text}</button>`).join('')}
        </div>`;
      }

      // Sanitize Text
      const sanitizedText = sanitize(msg.text);

      div.innerHTML = `
        ${avatarHTML}
        <div class="bubble-wrapper">
          <div class="bubble-content">
            ${sanitizedText}
            ${optionsHTML}
          </div>
          <span class="message-time">${new Date(msg.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      `;
      container.appendChild(div);
    }

    function handleOption(action) {
      // Lógica de ações rápidas
      const actions = {
        'kb_duvida': "Qual é a sua dúvida? (Ex: pagamentos, segurança, cadastro)",
        [cite_start]'humano': "Vou te transferir. [cite: 5] " + DEFAULT_KB.humano,
        'premium': DEFAULT_KB.premium,
        'cadastro': DEFAULT_KB.cadastro,
        'menu_inicial': () => { state.messages = []; renderMessages(); startFlow(); }
      };

      if (typeof actions[action] === 'function') {
        actions[action]();
      } else if (actions[action]) {
        addBotMessage(actions[action]);
      } else {
        // Fallback genérico busca na KB
        const response = generateResponse(action);
        addBotMessage(response.text);
      }
    }

    // ===== Mock LLM Logic =====
    function generateResponse(input) {
      const lower = input.toLowerCase();

      // Verifica KB Customizada e Padrão
      const allKB = { ...DEFAULT_KB, ...state.kb };
      
      // Simple Keyword Matching
      if (lower.includes('oi') || lower.includes('ola')) return { text: allKB.saudacao };
      if (lower.includes('cadastro') || lower.includes('criar conta')) return { text: allKB.cadastro };
      if (lower.includes('premium') || lower.includes('plano')) return { text: allKB.premium };
      if (lower.includes('segurança') || lower.includes('seguro')) return { text: allKB.seguranca };
      if (lower.includes('humano') || lower.includes('suporte') || lower.includes('atendente')) return { text: allKB.humano };
      if (lower.includes('termo')) return { text: allKB.termos };
      if (lower.includes('preço') || lower.includes('valor')) return { text: allKB.valores };
      if (lower.includes('sobre') || lower.includes('o que é')) return { text: allKB.sobre };
      if (lower.includes('pagamento')) return { text: allKB.pagamento };

      // Fallback
      return { 
        text: "Desculpe, não entendi exatamente. Você pode tentar reformular ou escolher uma opção abaixo?",
        options: [
          { text: "Falar com humano", action: "humano" },
          { text: "Voltar ao início", action: "menu_inicial" }
        ]
      };
    }

    function checkModeration(text) {
      const lower = text.toLowerCase();
      const hasBadWord = PROHIBITED_WORDS.some(word => lower.includes(word));
      
      if (hasBadWord) {
        addBotMessage("Essa conversa desrespeita os padrões de segurança e conduta da Frame. Por favor, mantenha o respeito.");
        // Incrementa contagem de bloqueio no state (simulado)
        return true;
      }
      return false;
    }

    // ===== Utilities =====
    function showTyping(show) {
      const indicator = document.getElementById('typing-indicator');
      if (show) {
        document.getElementById('chat-body').appendChild(indicator);
        indicator.classList.remove('hidden');
        scrollToBottom();
      } else {
        indicator.classList.add('hidden');
      }
    }

    function scrollToBottom() {
      const body = document.getElementById('chat-body');
      body.scrollTop = body.scrollHeight;
    }

    function sanitize(text) {
      // Converte URLs em links e previne XSS básico
      let sanitized = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      
      // Permitir tags específicas que usamos internamente (links da KB)
      sanitized = sanitized.replace(/&lt;a href='/g, "<a href='").replace(/' target='_blank' class='link'&gt;/g, "' target='_blank' class='chat-link'>").replace(/&lt;\/a&gt;/g, "</a>");
      
      // Auto-link regex simples para texto do usuário
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return sanitized.replace(urlRegex, function(url) {
        if (url.includes('href=')) return url; // Já é um link
        return `<a href="${url}" target="_blank" class="chat-link">${url}</a>`;
      });
    }

    // ===== Menu & Admin Functions =====
    function toggleMenu() {
      const overlay = document.getElementById('menu-overlay');
      overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
      setTimeout(() => overlay.classList.toggle('show'), 10);
    }

    function toggleDarkMode() {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      applyTheme();
      saveState();
      toggleMenu();
    }

    function applyTheme() {
      if (state.theme === 'dark') document.body.classList.add('dark');
      else document.body.classList.remove('dark');
    }

    function clearHistory() {
      if(confirm("Tem certeza? Isso apagará toda a conversa.")) {
        state.messages = [];
        saveState();
        renderMessages();
        startFlow();
        toggleMenu();
      }
    }

    function editProfile() {
      const nome = prompt("Como gostaria de ser chamado?");
      if (nome) {
        state.userInfo = { name: nome };
        saveState();
        alert(`Perfil atualizado para: ${nome}`);
      }
      toggleMenu();
    }

    // ===== Feedback System =====
    function openFeedback() {
      toggleMenu();
      document.getElementById('feedback-overlay').style.display = 'flex';
      setTimeout(() => document.getElementById('feedback-overlay').classList.add('show'), 10);
    }
    
    function closeFeedback() {
      document.getElementById('feedback-overlay').classList.remove('show');
      setTimeout(() => document.getElementById('feedback-overlay').style.display = 'none', 300);
    }

    let currentRating = 0;
    function setupStars() {
      document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
          currentRating = this.dataset.value;
          document.querySelectorAll('.star').forEach(s => {
            s.classList.toggle('active', s.dataset.value <= currentRating);
          });
          const details = document.getElementById('feedback-details');
          const prompt = document.getElementById('feedback-prompt');
          details.classList.remove('hidden');
          
          if (currentRating <= 3) prompt.textContent = "O que podemos melhorar?";
          else prompt.textContent = "O que você mais gostou?";
        });
      });
    }

    function submitFeedback() {
      const text = document.getElementById('feedback-text').value;
      if (currentRating > 0) {
        state.feedbacks.push({ rating: currentRating, text, date: new Date().toISOString() });
        saveState();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        closeFeedback();
        alert("Obrigada pelo seu feedback!");
      } else {
        alert("Por favor, selecione uma nota.");
      }
    }

    // ===== Admin Panel =====
    function openAdmin() {
      const overlay = document.getElementById('admin-overlay');
      document.getElementById('admin-stats').innerHTML = `
        <b>Estatísticas:</b><br>
        Mensagens totais: ${state.messages.length}<br>
        Feedbacks: ${state.feedbacks.length}<br>
        Tópicos KB Custom: ${Object.keys(state.kb).length}
      `;
      overlay.style.display = 'flex';
      setTimeout(() => overlay.classList.add('show'), 10);
    }

    function closeAdmin() {
      document.getElementById('admin-overlay').classList.remove('show');
      setTimeout(() => document.getElementById('admin-overlay').style.display = 'none', 300);
    }

    function updateKB() {
      const text = document.getElementById('kb-input').value;
      if (text) {
        // Simulação simples: Adiciona o texto como uma resposta genérica para testes
        // Numa app real, faria parsing do texto para extrair QA
        state.kb['novidade'] = text; // Exemplo
        alert("Base de conhecimento atualizada com sucesso! (Chave 'novidade' criada para teste)");
        saveState();
      }
    }

    function downloadLogs() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "chat_logs.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }

    // ===== State Management (LocalStorage + LZString) =====
    function saveState() {
      try {
        const stringified = JSON.stringify(state);
        const compressed = LZString.compress(stringified);
        localStorage.setItem(CONFIG.storageKey, compressed);
      } catch (e) {
        console.error("Erro ao salvar estado", e);
      }
    }

    function loadState() {
      try {
        const compressed = localStorage.getItem(CONFIG.storageKey);
        if (compressed) {
          const decompressed = LZString.decompress(compressed);
          state = JSON.parse(decompressed);
        }
      } catch (e) {
        console.error("Erro ao carregar estado", e);
      }
    }

    // ===== Inactivity Watcher =====
    function checkInactivity() {
      setInterval(() => {
        if (Date.now() - state.lastInteraction > CONFIG.inactivityTimeout && state.messages.length > 0) {
          // Verifica se a última msg não foi do bot já perguntando
          const lastMsg = state.messages[state.messages.length - 1];
          if (lastMsg.sender === 'user' || !lastMsg.text.includes('Ainda está aí')) {
            const name = state.userInfo ? state.userInfo.name : '';
            addBotMessage(`Ainda está aí ${name}? Gostaria de saber se ainda posso te ajudar?`);
            state.lastInteraction = Date.now(); // Reset para não spammar
          }
        }
      }, 30000); // Check a cada 30s
    }

  </script>
</body>
</html>