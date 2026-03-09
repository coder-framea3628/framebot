// ===== Injetar Meta Viewport para Responsividade em Mobile =====
const metaViewport = document.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(metaViewport);

// ===== Injetar LZ-String para Compressão =====
const lzScript = document.createElement('script');
lzScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js';
lzScript.onload = () => { initChat(); };
lzScript.onerror = () => {
  console.error('Falha ao carregar LZ-String. Usando fallback sem compressão.');
  LZString = { compress: (d) => d, decompress: (d) => d };
  initChat();
};
document.head.appendChild(lzScript);

// ===== Injetar Canvas Confetti =====
const confettiScript = document.createElement('script');
confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
document.head.appendChild(confettiScript);

// ===== Injetar Fontes: Montserrat + Inter =====
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap';
fontLink.rel = 'preload';
fontLink.as = 'style';
fontLink.onload = function() { this.rel = 'stylesheet'; };
document.head.appendChild(fontLink);

// ===== Injetar CSS Premium =====
const style = document.createElement('style');
style.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

:root {
  --bg-color: #f8f5f1;
  --text-color: #1a1a1a;
  --accent-color: #AB865B;
  --accent-light: #D3AD83;
  --accent-dark: #8a6a45;
  --secondary-bg: #ffffff;
  --border-color: rgba(171,134,91,0.15);
  --shadow-color: rgba(0,0,0,0.08);
  --shadow-deep: rgba(0,0,0,0.18);
  --input-bg: #fff;
  --beige-bg: #f5f2ed;
  --msg-bg: #f0ece6;
  --user-msg-bg: #AB865B;
  --typing-color: #888;
  --note-bg: #faf6f1;
  --header-gradient: linear-gradient(135deg,#AB865B 0%,#c9a070 60%,#D3AD83 100%);
  --sheet-bg: #ffffff;
  --sheet-radius: 28px;
}

body.dark {
  --bg-color: #141414;
  --text-color: #f0f0f0;
  --secondary-bg: #1c1c1c;
  --border-color: rgba(211,173,131,0.12);
  --shadow-color: rgba(0,0,0,0.5);
  --shadow-deep: rgba(0,0,0,0.7);
  --input-bg: #252525;
  --beige-bg: #1a1a1a;
  --msg-bg: #2a2a2a;
  --user-msg-bg: #c9994e;
  --typing-color: #aaa;
  --note-bg: #222;
  --header-gradient: linear-gradient(135deg,#7a5c37 0%,#AB865B 60%,#c9a070 100%);
  --sheet-bg: #1c1c1c;
}

* { box-sizing: border-box; }

body {
  font-family: 'Montserrat', 'Inter', sans-serif;
  margin: 0;
  color: var(--text-color);
  -webkit-font-smoothing: antialiased;
}

/* ===== CONTAINER PRINCIPAL ===== */
.c {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: var(--secondary-bg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
}

/* ===== HEADER ===== */
.h {
  background: var(--header-gradient);
  color: #fff;
  padding: 14px 16px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 15px;
  position: relative;
  box-shadow: 0 2px 16px rgba(171,134,91,0.3);
  flex-shrink: 0;
  min-height: 72px;
}
.h-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
.h-name {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}
.h-status {
  font-size: 11px;
  font-weight: 400;
  opacity: 0.85;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 2px;
  font-family: 'Inter', sans-serif;
}
.h-status::before {
  content: '';
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #4ddb6a;
  box-shadow: 0 0 6px #4ddb6a;
  animation: statusPulse 2s ease-in-out infinite;
}
@keyframes statusPulse {
  0%,100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.logo-circles {
  display: flex;
  align-items: center;
  gap: -4px;
  flex-shrink: 0;
}
.circle {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid rgba(255,255,255,0.4);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0;
}
.circle:hover { transform: scale(1.08); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
.circle img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

.h-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
.h-icon-btn {
  background: rgba(255,255,255,0.15);
  border: none;
  cursor: pointer;
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease;
  outline: none;
}
.h-icon-btn:hover { background: rgba(255,255,255,0.28); transform: scale(1.08); }
.h-icon-btn svg { width: 18px; height: 18px; stroke: #fff; fill: none; stroke-width: 2; }

/* ===== CORPO DO CHAT ===== */
.b {
  flex: 1;
  padding: 16px 14px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-size: 14px;
  scroll-behavior: smooth;
  position: relative;
  background: var(--beige-bg);
  background-image: radial-gradient(circle at 20% 80%, rgba(211,173,131,0.06) 0%, transparent 60%),
                    radial-gradient(circle at 80% 20%, rgba(171,134,91,0.04) 0%, transparent 60%);
}

/* ===== MENSAGENS ===== */
.msg {
  display: flex;
  gap: 8px;
  animation: msgSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards;
  opacity: 0;
  max-width: 100%;
}
.msg.user-msg { justify-content: flex-end; }
.msg.user-msg .bb { background: var(--user-msg-bg); color: #fff; border-radius: 20px 20px 4px 20px; }

.msg-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 2px 6px var(--shadow-color);
  object-fit: cover;
  align-self: flex-end;
}

.bb {
  background: var(--secondary-bg);
  padding: 11px 15px;
  border-radius: 20px 20px 20px 4px;
  max-width: 78%;
  word-break: break-word;
  box-shadow: 0 1px 4px var(--shadow-color);
  transition: box-shadow 0.2s ease;
  position: relative;
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-color);
}
.bb:hover { box-shadow: 0 2px 8px var(--shadow-color); }
.bb.error { background: #fde8e8; color: #9b1c1c; border: 1px solid rgba(220,38,38,0.2); }

.bt {
  display: block;
  margin-top: 4px;
  font-size: 10px;
  color: var(--typing-color);
  text-align: right;
  opacity: 0.7;
  font-family: 'Inter', sans-serif;
}
.user-msg .bt { color: rgba(255,255,255,0.7); }

/* ===== QUICK REPLIES / BOTÕES ===== */
.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}
.btn {
  padding: 9px 16px;
  border-radius: 24px;
  cursor: pointer;
  font-size: 13px;
  border: 1.5px solid var(--accent-color);
  background: transparent;
  color: var(--accent-color);
  transition: all 0.25s ease;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 6px;
}
.btn:hover {
  background: var(--accent-color);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(171,134,91,0.25);
}
.btn.p {
  background: var(--accent-color);
  color: #fff;
  box-shadow: 0 2px 8px rgba(171,134,91,0.2);
}
.btn.p:hover {
  background: var(--accent-dark);
  box-shadow: 0 4px 14px rgba(171,134,91,0.35);
}
.btn:disabled, .btn.clicked {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ===== TYPING INDICATOR ===== */
.typing-bubble .bb { padding: 12px 16px; min-width: 56px; }
.dots { display: flex; gap: 5px; align-items: center; height: 16px; }
.dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--accent-color);
  opacity: 0.4;
  animation: dotBounce 1.4s infinite ease-in-out;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes dotBounce {
  0%,60%,100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-6px); opacity: 1; }
}

/* ===== ANIMAÇÕES ===== */
@keyframes msgSlideIn {
  from { opacity: 0; transform: translateY(12px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes msgSlideInRight {
  from { opacity: 0; transform: translateX(12px) scale(0.97); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes sheetSlideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes sheetSlideDown {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
}
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes statusPulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }

.msg.user-msg { animation: msgSlideInRight 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }

/* ===== INPUT BOX PREMIUM ===== */
.input-area {
  background: var(--secondary-bg);
  padding: 10px 12px 12px;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
  position: relative;
}
.input-box {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0 8px 0 16px;
  background: var(--beige-bg);
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px var(--shadow-color), inset 0 1px 3px rgba(0,0,0,0.04);
  border: 1.5px solid var(--border-color);
  min-height: 56px;
  position: relative;
}
.input-box.focused {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(171,134,91,0.12), 0 2px 10px var(--shadow-color);
}
.input-box input {
  border: none;
  outline: none;
  flex: 1;
  background: none;
  color: var(--text-color);
  font-size: 15px;
  padding: 14px 0;
  min-width: 0;
  font-family: 'Inter', sans-serif;
}
.input-box input::placeholder {
  color: var(--typing-color);
  opacity: 0.7;
}
.emoji-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  width: 38px; height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;
}
.emoji-btn:hover { background: rgba(171,134,91,0.1); transform: scale(1.1); }
.emoji-btn svg { width: 22px; height: 22px; fill: var(--accent-color); }

.send-btn {
  background: var(--accent-color);
  border: none;
  cursor: pointer;
  width: 40px; height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  flex-shrink: 0;
  margin-left: 4px;
  box-shadow: 0 2px 8px rgba(171,134,91,0.3);
}
.send-btn:hover {
  background: var(--accent-dark);
  transform: scale(1.08);
  box-shadow: 0 4px 14px rgba(171,134,91,0.4);
}
.send-btn:active { transform: scale(0.95); }
.send-btn svg { width: 20px; height: 20px; stroke: #fff; fill: none; stroke-width: 2.2; }

/* ===== FOOTER NOTE ===== */
.f {
  font-size: 10px;
  text-align: center;
  line-height: 1.5;
  padding: 4px 12px 0;
  color: var(--typing-color);
  font-family: 'Inter', sans-serif;
}
.f a, .link {
  color: var(--accent-color);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  transition: color 0.2s ease;
  target: _blank;
}
.f a:hover, .link:hover { color: var(--accent-dark); }

/* ===== TELA INICIAL ===== */
.initial-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px 16px;
  gap: 16px;
  animation: fadeIn 0.4s ease;
  color: var(--text-color);
  min-height: 100%;
}
.initial-hero {
  text-align: center;
  padding: 8px 0 4px;
}
.initial-hero h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 6px;
  color: var(--text-color);
}
.initial-hero p {
  font-size: 0.85rem;
  color: var(--typing-color);
  margin: 0;
  font-family: 'Inter', sans-serif;
}
.privacy-note {
  background: var(--note-bg);
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 11.5px;
  color: var(--typing-color);
  text-align: center;
  width: 100%;
  box-shadow: 0 1px 4px var(--shadow-color);
  border: 1px solid var(--border-color);
  line-height: 1.5;
  font-family: 'Inter', sans-serif;
}
.start-btn {
  width: 100%;
  padding: 16px;
  border-radius: 24px;
  background: var(--header-gradient);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.02em;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 16px rgba(171,134,91,0.35);
}
.start-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(171,134,91,0.45); }
.start-btn:active { transform: translateY(0); }

.faq-card {
  background: var(--secondary-bg);
  padding: 14px 16px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 1px 6px var(--shadow-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}
.faq-card:hover { box-shadow: 0 4px 14px var(--shadow-color); transform: translateY(-2px); }
.faq-card-icon {
  width: 40px; height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.faq-card-icon svg { width: 20px; height: 20px; stroke: #fff; fill: none; stroke-width: 2; }
.faq-card-text { flex: 1; min-width: 0; }
.faq-card-text strong { display: block; font-size: 13px; font-weight: 600; }
.faq-card-text span { font-size: 11px; color: var(--typing-color); font-family: 'Inter', sans-serif; }
.faq-card-arrow { opacity: 0.5; flex-shrink: 0; }
.faq-card-arrow svg { width: 16px; height: 16px; stroke: var(--text-color); fill: none; }

/* ===== RECENT MSG ===== */
.recent-msg {
  background: var(--secondary-bg);
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
  border: 1px solid var(--border-color);
  font-size: 13px;
}
.recent-msg:hover { box-shadow: 0 4px 12px var(--shadow-color); transform: translateY(-1px); }
.recent-msg img { width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0; }
.recent-msg .delete-btn { margin-left: auto; color: #f87171; cursor: pointer; font-size: 14px; padding: 4px; }

/* ===== OVERLAYS GERAIS ===== */
.o {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: none;
  align-items: flex-end;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
.o.show { display: flex; }

/* ===== BOTTOM SHEET ===== */
.bottom-sheet {
  background: var(--sheet-bg);
  border-radius: var(--sheet-radius) var(--sheet-radius) 0 0;
  padding: 0 0 28px;
  width: 100%;
  max-width: 560px;
  box-shadow: 0 -4px 32px var(--shadow-deep);
  animation: sheetSlideUp 0.38s cubic-bezier(0.34,1.20,0.64,1) forwards;
  max-height: 92vh;
  overflow-y: auto;
  position: relative;
}
.sheet-handle {
  width: 44px; height: 4px;
  border-radius: 2px;
  background: var(--border-color);
  margin: 12px auto 20px;
}
.sheet-header {
  padding: 0 20px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 4px;
}
.sheet-title {
  font-size: 17px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  color: var(--text-color);
  margin: 0;
}
.sheet-close {
  background: var(--note-bg);
  border: none;
  cursor: pointer;
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s ease;
}
.sheet-close:hover { background: var(--border-color); }
.sheet-close svg { width: 16px; height: 16px; stroke: var(--text-color); fill: none; stroke-width: 2; }

/* ===== BOTTOM SHEET: HANDOFF ===== */
.handoff-options {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
}
.handoff-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 18px 8px;
  border-radius: 20px;
  background: var(--note-bg);
  border: 1.5px solid var(--border-color);
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
  color: var(--text-color);
}
.handoff-option:hover {
  background: var(--accent-color);
  color: #fff;
  border-color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(171,134,91,0.3);
}
.handoff-option:hover .handoff-icon { background: rgba(255,255,255,0.2); }
.handoff-icon {
  width: 52px; height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
  display: flex; align-items: center; justify-content: center;
  transition: background 0.25s ease;
}
.handoff-icon svg { width: 24px; height: 24px; stroke: #fff; fill: none; stroke-width: 2; }
.handoff-label {
  font-size: 11.5px;
  font-weight: 600;
  text-align: center;
  line-height: 1.3;
  font-family: 'Inter', sans-serif;
}

/* ===== MENU OVERLAY ===== */
.menu-sheet {
  background: var(--sheet-bg);
  border-radius: var(--sheet-radius) var(--sheet-radius) 0 0;
  padding: 0 0 28px;
  width: 100%;
  max-width: 560px;
  box-shadow: 0 -4px 32px var(--shadow-deep);
  animation: sheetSlideUp 0.38s cubic-bezier(0.34,1.20,0.64,1) forwards;
}
.menu-list { padding: 8px 16px; }
.menu-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 12px;
  border-radius: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}
.menu-item:hover { background: var(--note-bg); }
.menu-icon {
  width: 38px; height: 38px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.menu-icon svg { width: 18px; height: 18px; stroke: #fff; fill: none; stroke-width: 2; }
.menu-item.danger .menu-icon { background: linear-gradient(135deg, #f87171, #ef4444); }
.menu-item.danger { color: #ef4444; }
.menu-divider { height: 1px; background: var(--border-color); margin: 4px 12px; }

/* ===== FAQ ACCORDION ===== */
.faq-sheet-body { padding: 8px 16px 0; }
.faq-item {
  border-radius: 16px;
  background: var(--note-bg);
  border: 1px solid var(--border-color);
  margin-bottom: 10px;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}
.faq-item:hover { box-shadow: 0 2px 10px var(--shadow-color); }
.faq-q {
  padding: 14px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 13.5px;
  color: var(--text-color);
  font-family: 'Montserrat', sans-serif;
  user-select: none;
}
.faq-q svg {
  width: 18px; height: 18px;
  stroke: var(--accent-color);
  fill: none;
  stroke-width: 2;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}
.faq-item.open .faq-q svg { transform: rotate(180deg); }
.faq-a {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.3s ease;
  font-size: 13px;
  line-height: 1.6;
  color: var(--typing-color);
  font-family: 'Inter', sans-serif;
  padding: 0 16px;
}
.faq-item.open .faq-a { max-height: 300px; padding: 0 16px 14px; }

/* ===== FEEDBACK BOTTOM SHEET ===== */
.rating-grid {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 0 20px 16px;
  justify-content: center;
}
.rating-pill {
  width: 46px; height: 46px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  background: var(--note-bg);
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  transition: all 0.2s ease;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Montserrat', sans-serif;
}
.rating-pill:hover { border-color: var(--accent-color); background: var(--accent-color); color: #fff; transform: scale(1.1); }
.rating-pill.selected { border-color: var(--accent-color); background: var(--accent-color); color: #fff; box-shadow: 0 3px 10px rgba(171,134,91,0.4); }

.feedback-options-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 20px 16px;
}
.feedback-chip {
  padding: 8px 14px;
  border-radius: 20px;
  border: 1.5px solid var(--border-color);
  background: var(--note-bg);
  cursor: pointer;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--text-color);
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
}
.feedback-chip.selected {
  background: var(--accent-color);
  color: #fff;
  border-color: var(--accent-color);
}
.feedback-textarea {
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 1.5px solid var(--border-color);
  border-radius: 16px;
  font-size: 14px;
  resize: vertical;
  background: var(--note-bg);
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  transition: border-color 0.2s ease;
}
.feedback-textarea:focus { outline: none; border-color: var(--accent-color); }
.feedback-submit {
  width: 100%;
  padding: 16px;
  border-radius: 20px;
  background: var(--header-gradient);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 3px 12px rgba(171,134,91,0.3);
}
.feedback-submit:hover { transform: translateY(-2px); box-shadow: 0 5px 16px rgba(171,134,91,0.4); }

/* ===== CONFIRMAÇÃO ===== */
.confirm-sheet {
  background: var(--sheet-bg);
  border-radius: var(--sheet-radius) var(--sheet-radius) 0 0;
  padding: 20px 20px 32px;
  width: 100%;
  max-width: 560px;
  box-shadow: 0 -4px 32px var(--shadow-deep);
  animation: sheetSlideUp 0.38s cubic-bezier(0.34,1.20,0.64,1) forwards;
}
.confirm-btns { display: flex; gap: 10px; margin-top: 16px; }
.confirm-btns .btn { flex: 1; justify-content: center; padding: 13px; font-size: 14px; }

/* ===== EMOJI PICKER ===== */
#emojiOverlay {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: var(--secondary-bg);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 20px var(--shadow-deep);
  padding: 12px;
  z-index: 10002;
  display: none;
  animation: fadeIn 0.2s ease;
  border: 1px solid var(--border-color);
  border-bottom: none;
  max-height: 280px;
  overflow: hidden;
  flex-direction: column;
}
#emojiOverlay.open { display: flex; }
.emoji-search-wrap { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; padding: 8px 12px; background: var(--note-bg); border-radius: 12px; border: 1px solid var(--border-color); }
.emoji-search-wrap svg { width: 16px; height: 16px; stroke: var(--typing-color); fill: none; flex-shrink: 0; }
#emojiSearch { border: none; outline: none; background: none; font-size: 14px; flex: 1; color: var(--text-color); font-family: 'Inter', sans-serif; }
.emoji-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px; overflow-y: auto; flex: 1; }
.emoji-btn-grid {
  font-size: 22px;
  background: none; border: none;
  cursor: pointer;
  padding: 6px 2px;
  border-radius: 8px;
  transition: transform 0.15s ease, background 0.15s ease;
}
.emoji-btn-grid:hover { transform: scale(1.25); background: var(--note-bg); }

/* ===== BLOCO / AVISO ===== */
.modal-sheet {
  background: var(--sheet-bg);
  border-radius: var(--sheet-radius) var(--sheet-radius) 0 0;
  padding: 0 0 28px;
  width: 100%;
  max-width: 560px;
  box-shadow: 0 -4px 32px var(--shadow-deep);
  animation: sheetSlideUp 0.38s cubic-bezier(0.34,1.20,0.64,1) forwards;
  max-height: 80vh;
  overflow-y: auto;
}
.modal-body { padding: 0 20px; }
.modal-icon-wrap {
  width: 60px; height: 60px;
  border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
}
.modal-icon-wrap svg { width: 28px; height: 28px; stroke: #fff; fill: none; stroke-width: 2; }
.modal-icon-wrap.warning { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
.modal-icon-wrap.error { background: linear-gradient(135deg, #ef4444, #f87171); }
.modal-icon-wrap.success { background: linear-gradient(135deg, #10b981, #34d399); }
.modal-icon-wrap.info { background: linear-gradient(135deg, var(--accent-color), var(--accent-light)); }
.modal-title { font-size: 17px; font-weight: 700; text-align: center; margin: 0 0 8px; font-family: 'Montserrat', sans-serif; }
.modal-text { font-size: 13.5px; text-align: center; color: var(--typing-color); margin: 0 0 20px; line-height: 1.6; font-family: 'Inter', sans-serif; }

/* ===== LOADING SPINNER ===== */
.spinner-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.7);
  z-index: 10;
  backdrop-filter: blur(2px);
  border-radius: inherit;
}
body.dark .spinner-overlay { background: rgba(0,0,0,0.5); }
.spinner {
  width: 36px; height: 36px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--accent-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* ===== REDIRECT OVERLAY ===== */
.redirect-center {
  background: var(--sheet-bg);
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  box-shadow: 0 8px 32px var(--shadow-deep);
  min-width: 220px;
}
.redirect-center p { margin: 0; font-weight: 600; font-family: 'Montserrat', sans-serif; color: var(--text-color); }

/* ===== MISC ===== */
.chat-date-divider {
  text-align: center;
  font-size: 10.5px;
  color: var(--typing-color);
  opacity: 0.7;
  margin: 4px 0;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
}
.chat-date-divider::before, .chat-date-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-color);
}

.scroll-top-btn {
  position: absolute;
  bottom: 80px; right: 16px;
  background: var(--accent-color);
  color: #fff;
  border-radius: 50%;
  width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(171,134,91,0.4);
  border: none;
  font-size: 16px;
}
.scroll-top-btn.show { opacity: 1; }
.scroll-top-btn:hover { transform: scale(1.1); }

.offline-warning {
  position: fixed;
  top: 80px; left: 50%;
  transform: translateX(-50%);
  background: rgba(239,68,68,0.95);
  color: #fff;
  padding: 8px 18px;
  border-radius: 20px;
  z-index: 10010;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  display: none;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  font-family: 'Inter', sans-serif;
}

.warning-note {
  background: var(--note-bg);
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 12.5px;
  color: var(--typing-color);
  text-align: center;
  margin: 4px 0;
  border: 1px solid var(--border-color);
  animation: fadeIn 0.3s ease;
  font-family: 'Inter', sans-serif;
}
.blocked-chat { pointer-events: none; opacity: 0.5; }

.timer-note { font-size: 13px; color: var(--typing-color); text-align: center; font-family: 'Inter', sans-serif; }

/* ===== LANG POPUP ===== */
#langOverlay .modal-sheet { text-align: center; }

/* ===== DATE INPUT ===== */
input[type="date"] {
  padding: 12px 14px;
  border: 1.5px solid var(--border-color);
  border-radius: 14px;
  background: var(--note-bg);
  color: var(--text-color);
  font-size: 15px;
  width: 100%;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.2s ease;
}
input[type="date"]:focus { outline: none; border-color: var(--accent-color); }

/* ===== SCROLLBAR PERSONALIZADA ===== */
.b::-webkit-scrollbar { width: 4px; }
.b::-webkit-scrollbar-track { background: transparent; }
.b::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 2px; }

/* ===== MOBILE ===== */
@media (max-width: 600px) {
  .c { border-radius: 0; }
  .handoff-options { gap: 8px; }
  .handoff-option { padding: 14px 6px; }
  .handoff-icon { width: 44px; height: 44px; }
  .emoji-grid { grid-template-columns: repeat(6, 1fr); }
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
`;
document.head.appendChild(style);

// ===== Injetar HTML =====
const chatContainer = document.createElement('div');
chatContainer.innerHTML = `
<div class="c" id="cb" role="dialog" aria-label="Chatbot da Frame Agency" aria-live="polite">

  <!-- HEADER -->
  <div class="h" id="header">
    <div class="circle" style="margin-right:4px;">
      <img src="https://framerusercontent.com/images/wWIH1Nc4iXNLDhzo8ocpzNjiQY.png" alt="Fabi - Assistente Virtual Frame">
    </div>
    <div class="h-info">
      <span class="h-name">Fabi · Frame Agency</span>
      <span class="h-status">Online agora</span>
    </div>
    <div class="h-actions">
      <button class="h-icon-btn" id="menuBtn" aria-label="Menu" title="Menu">
        <svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </div>

  <!-- OFFLINE WARNING -->
  <div id="offlineWarning" class="offline-warning" role="alert">Você está offline</div>

  <!-- CORPO -->
  <div class="b" id="bd"></div>

  <!-- SCROLL TOP -->
  <button class="scroll-top-btn" id="scrollTopBtn" onclick="scrollToTop()" aria-label="Voltar ao topo">↑</button>

  <!-- SPINNER LOCAL -->
  <div id="localSpinner" style="display:none; position:absolute; inset:0; z-index:50; display:none; align-items:center; justify-content:center; background:rgba(255,255,255,0.6); backdrop-filter:blur(2px);">
    <div class="spinner"></div>
  </div>

  <!-- INPUT AREA -->
  <div class="input-area" id="inputArea" style="display:none;">
    <div id="emojiOverlay">
      <div class="emoji-search-wrap">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" id="emojiSearch" placeholder="Buscar emoji..." oninput="filterEmojis()">
      </div>
      <div class="emoji-grid" id="emojiGrid"></div>
    </div>
    <div class="input-box" id="inputBox">
      <input type="text" id="userInput" placeholder="Envie uma mensagem..." aria-label="Digite sua mensagem" maxlength="500">
      <button class="emoji-btn" id="emojiBtn" aria-label="Emojis" title="Emojis">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
      </button>
      <button class="send-btn" id="sendBtn" aria-label="Enviar">
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      </button>
    </div>
    <div class="f">
      Ao continuar, você concorda com os
      <a href="https://frameag.com/termos" target="_blank" rel="noopener noreferrer" class="link">Termos e Condições</a> da Frame.
    </div>
  </div>

  <div id="inputWarningEl" class="warning-note" style="display:none; margin:4px 12px 8px;">Complete a etapa acima para continuar</div>
</div>

<!-- ===== MENU BOTTOM SHEET ===== -->
<div class="o" id="menuOverlay" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="menu-sheet">
    <div class="sheet-handle"></div>
    <div class="sheet-header">
      <h2 class="sheet-title">Menu</h2>
      <button class="sheet-close" onclick="closeMenu()" aria-label="Fechar menu">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="menu-list">
      <button class="menu-item" onclick="toggleDarkMode(); closeMenu();" id="darkModeMenuItem">
        <div class="menu-icon"><svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></div>
        <span id="darkModeLabel">Modo Escuro</span>
      </button>
      <div class="menu-divider"></div>
      <button class="menu-item" onclick="editProfile(); closeMenu();">
        <div class="menu-icon"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
        <span>Editar meu Perfil</span>
      </button>
      <button class="menu-item" onclick="clearChatHistory(); closeMenu();" class="danger">
        <div class="menu-icon" style="background:linear-gradient(135deg,#f87171,#ef4444);"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg></div>
        <span>Limpar Histórico</span>
      </button>
      <button class="menu-item" onclick="showRedirectLoading('https://frameag.com/models', false); closeMenu();">
        <div class="menu-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg></div>
        <span>Catálogo de Modelos</span>
      </button>
      <div class="menu-divider"></div>
      <button class="menu-item" onclick="showFeedbackSheet(); closeMenu();">
        <div class="menu-icon" style="background:linear-gradient(135deg,#f59e0b,#fbbf24);"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
        <span>Avaliar Experiência</span>
      </button>
      <button class="menu-item" onclick="showHandoffSheet(); closeMenu();">
        <div class="menu-icon"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
        <span>Falar com Humano</span>
      </button>
    </div>
  </div>
</div>

<!-- ===== HANDOFF BOTTOM SHEET ===== -->
<div class="o" id="handoffOverlay" role="dialog" aria-modal="true" aria-label="Escolha como falar conosco">
  <div class="bottom-sheet">
    <div class="sheet-handle"></div>
    <div class="sheet-header">
      <h2 class="sheet-title">Como prefere falar com a gente?</h2>
      <button class="sheet-close" onclick="closeHandoffSheet()" aria-label="Fechar">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <p style="font-size:13px;color:var(--typing-color);padding:0 20px 12px;margin:0;font-family:'Inter',sans-serif;">Escolha o canal mais conveniente para você:</p>
    <div class="handoff-options">
      <a class="handoff-option" id="handoffTelegram" href="https://t.me/suporteframebot?start=chatbot-site" target="_blank" rel="noopener noreferrer" onclick="closeHandoffSheet()">
        <div class="handoff-icon">
          <svg viewBox="0 0 24 24"><path d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-16.7 6.4A2.1 2.1 0 002.5 11c0 .85.55 1.6 1.326 1.877l4.145 1.48 1.62 5.2c.223.71.872 1.2 1.613 1.2.488 0 .944-.18 1.3-.5l2.35-2.176 4.276 3.123c.44.32.968.5 1.51.5.99 0 1.87-.65 2.148-1.6l3.527-13.27A2.16 2.16 0 0021.198 2.433z" fill="currentColor"/></svg>
        </div>
        <span class="handoff-label">Chat 24h<br>Telegram</span>
      </a>
      <a class="handoff-option" href="mailto:contato@frameag.com?subject=Solicita%C3%A7%C3%A3o%20de%20suporte%20-%20Frame&body=Ol%C3%A1%2C%20time%20Frame!%20Gostaria%20de%20solicitar%20ajuda%20para%3A%0A%0A" onclick="closeHandoffSheet()">
        <div class="handoff-icon">
          <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <span class="handoff-label">Enviar<br>E-mail</span>
      </a>
      <div class="handoff-option" onclick="closeHandoffSheet()">
        <div class="handoff-icon" style="background:linear-gradient(135deg,#6b7280,#9ca3af);">
          <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <span class="handoff-label">Continuar<br>aqui</span>
      </div>
    </div>
  </div>
</div>

<!-- ===== FAQ BOTTOM SHEET ===== -->
<div class="o" id="faqOverlay" role="dialog" aria-modal="true" aria-label="Perguntas Frequentes">
  <div class="bottom-sheet" style="max-height:88vh;">
    <div class="sheet-handle"></div>
    <div class="sheet-header">
      <h2 class="sheet-title">Perguntas Frequentes</h2>
      <button class="sheet-close" onclick="closeFaqSheet()" aria-label="Fechar FAQ">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="faq-sheet-body" id="faqContent"></div>
    <div style="padding:16px 20px 0;">
      <button class="start-btn" onclick="closeFaqSheet(); startChat();">Iniciar atendimento</button>
    </div>
  </div>
</div>

<!-- ===== FEEDBACK BOTTOM SHEET ===== -->
<div class="o" id="feedbackOverlay" role="dialog" aria-modal="true" aria-label="Avaliar experiência">
  <div class="bottom-sheet">
    <div class="sheet-handle"></div>
    <div class="sheet-header">
      <h2 class="sheet-title">Avalie sua experiência</h2>
      <button class="sheet-close" onclick="closeFeedbackSheet()" aria-label="Fechar avaliação">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <p style="font-size:13px;color:var(--typing-color);padding:0 20px 12px;margin:0;font-family:'Inter',sans-serif;" id="feedbackSubtitle">O quanto você recomendaria a Frame para um amigo?</p>
    <div class="rating-grid" id="ratingGrid">
      <!-- gerado por JS -->
    </div>
    <div id="feedbackOptionsWrap" style="display:none;">
      <p style="font-size:13.5px;font-weight:600;padding:0 20px 10px;margin:0;font-family:'Montserrat',sans-serif;" id="feedbackOptionsTitle"></p>
      <div class="feedback-options-grid" id="feedbackChips"></div>
    </div>
    <div style="padding:0 20px 12px;">
      <textarea class="feedback-textarea" id="feedbackText" placeholder="Deixe aqui seu comentário (opcional)..." rows="3"></textarea>
    </div>
    <div style="padding:0 20px;">
      <button class="feedback-submit" id="submitFeedback" onclick="submitFeedback()">Enviar feedback</button>
    </div>
  </div>
</div>

<!-- ===== CONFIRM SHEET ===== -->
<div class="o" id="confirmOverlay" role="dialog" aria-modal="true">
  <div class="confirm-sheet">
    <div class="sheet-handle"></div>
    <p id="confirmMessage" style="font-size:15px;font-weight:600;margin:0 0 8px;font-family:'Montserrat',sans-serif;"></p>
    <p id="confirmSubMessage" style="font-size:13px;color:var(--typing-color);margin:0;font-family:'Inter',sans-serif;"></p>
    <div class="confirm-btns">
      <button id="confirmYes" class="btn p">Sim, continuar</button>
      <button onclick="closeConfirm()" class="btn">Cancelar</button>
    </div>
  </div>
</div>

<!-- ===== WARNING SHEET ===== -->
<div class="o" id="warningOverlay" role="dialog" aria-modal="true">
  <div class="modal-sheet">
    <div class="sheet-handle"></div>
    <div class="modal-body" style="padding-bottom:28px;">
      <div class="modal-icon-wrap warning" style="margin-top:8px;">
        <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </div>
      <h3 class="modal-title" id="warningTitle">Atenção</h3>
      <p class="modal-text" id="warningMessage"></p>
      <button class="btn p" style="width:100%;justify-content:center;padding:14px;" onclick="closeWarningSheet()">Entendi</button>
    </div>
  </div>
</div>

<!-- ===== BLOCK SHEET ===== -->
<div class="o" id="blockOverlay" role="dialog" aria-modal="true">
  <div class="modal-sheet">
    <div class="sheet-handle"></div>
    <div class="modal-body" style="padding-bottom:28px;">
      <div class="modal-icon-wrap error" style="margin-top:8px;">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
      </div>
      <h3 class="modal-title">Chat Bloqueado</h3>
      <p class="modal-text" id="blockMessage"></p>
      <p class="timer-note" id="blockTimer"></p>
      <p class="modal-text" style="margin-top:4px;">Para suporte: <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a></p>
      <button id="ageConfirmBtn" style="display:none;width:100%;justify-content:center;margin-bottom:10px;" class="btn p" onclick="showAgeConfirmSheet()">Confirmar Minha Idade</button>
      <button class="btn" style="width:100%;justify-content:center;" onclick="closeBlockSheet()">Fechar</button>
    </div>
  </div>
</div>

<!-- ===== AGE CONFIRM SHEET ===== -->
<div class="o" id="ageConfirmOverlay" role="dialog" aria-modal="true">
  <div class="modal-sheet">
    <div class="sheet-handle"></div>
    <div class="modal-body" style="padding-bottom:28px;">
      <div class="modal-icon-wrap info" style="margin-top:8px;">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
      <h3 class="modal-title">Confirme sua Idade</h3>
      <p class="modal-text">Informe sua data de nascimento para validarmos que você é maior de 18 anos.</p>
      <input type="date" id="birthDate" aria-label="Data de nascimento" style="margin-bottom:16px;">
      <button onclick="validateAge()" class="btn p" style="width:100%;justify-content:center;padding:14px;">Confirmar</button>
    </div>
  </div>
</div>

<!-- ===== LANG SHEET ===== -->
<div class="o" id="langOverlay" role="dialog" aria-modal="true">
  <div class="modal-sheet">
    <div class="sheet-handle"></div>
    <div class="modal-body" style="padding-bottom:28px;">
      <div class="modal-icon-wrap info" style="margin-top:8px;">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      </div>
      <h3 class="modal-title">Idioma</h3>
      <p class="modal-text" id="langMessage"></p>
      <button id="langButton" class="btn p" style="width:100%;justify-content:center;padding:14px;margin-bottom:10px;"></button>
      <button onclick="closeLangSheet()" class="btn" style="width:100%;justify-content:center;">Fechar</button>
    </div>
  </div>
</div>

<!-- ===== REDIRECT OVERLAY ===== -->
<div class="o" id="redirectOverlay" style="align-items:center;justify-content:center;">
  <div class="redirect-center">
    <div class="spinner"></div>
    <p>Redirecionando...</p>
  </div>
</div>

<!-- ===== CLOSE ACTIONS POPUP ===== -->
<div id="closePopup" style="display:none; position:fixed; z-index:10005; background:var(--secondary-bg); border-radius:16px; box-shadow:0 4px 24px var(--shadow-deep); padding:10px; min-width:180px; border:1px solid var(--border-color);">
  <button onclick="resetFlow()" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:transparent;border:none;color:var(--text-color);cursor:pointer;font-size:13px;font-family:'Inter',sans-serif;width:100%;transition:background 0.2s;" onmouseover="this.style.background='var(--note-bg)'" onmouseout="this.style.background='transparent'">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
    Reiniciar Chat
  </button>
  <button onclick="exportHistory()" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:transparent;border:none;color:var(--text-color);cursor:pointer;font-size:13px;font-family:'Inter',sans-serif;width:100%;transition:background 0.2s;" onmouseover="this.style.background='var(--note-bg)'" onmouseout="this.style.background='transparent'">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
    Exportar Histórico
  </button>
  <button onclick="finalizeChat()" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:transparent;border:none;color:#ef4444;cursor:pointer;font-size:13px;font-family:'Inter',sans-serif;width:100%;transition:background 0.2s;" onmouseover="this.style.background='var(--note-bg)'" onmouseout="this.style.background='transparent'">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
    Encerrar Chat
  </button>
</div>
`;
document.body.appendChild(chatContainer);

// ===== VARIÁVEIS DE CONTROLE =====
let typingShownThisFlow = false;
let messageHistory = [];
let userInfo = null; // { name, email }
let lastMessage = localStorage.getItem('lastMessage') || null;
let floodCount = 0;
let lastSendTime = 0;
let floodTimeout = null;
let isChatInitiated = false;
let messageQueue = [];
const MAX_HISTORY = 50;
const MAX_STORAGE_SIZE = 1024 * 1024 * 5;
const HISTORY_AGE_LIMIT = 15 * 24 * 60 * 60 * 1000;
let inactivityTimer;
const INACTIVITY_TIMEOUT = 3 * 60 * 1000;
const MAX_CHAR_LIMIT = 500;

// Foto da assistente (nova URL obrigatória)
const FABI_PHOTO = "https://framerusercontent.com/images/wWIH1Nc4iXNLDhzo8ocpzNjiQY.png";

const bd = document.getElementById('bd');
const inputArea = document.getElementById('inputArea');
const userInput = document.getElementById('userInput');
const inputBox = document.getElementById('inputBox');
const scrollTopBtn = document.getElementById('scrollTopBtn');

let isChatBlocked = localStorage.getItem('isChatBlocked') === 'true';
let blockType = localStorage.getItem('blockType') || null;
let blockEndTime = parseInt(localStorage.getItem('blockEndTime')) || 0;
let currentFlowType = null;
let currentTopic = localStorage.getItem('currentTopic') || null;
let badWordCount = 0;
let badFormAttempts = 0;
let chatStartTime = localStorage.getItem('chatStartTime') || null;
let sending = false;
let selectedRating = 0;
let selectedFeedbackChips = [];

// Coleta conversacional
let awaitingName = false;
let awaitingEmail = false;

// Contexto de handoff (para reconhecer texto nas escolhas)
let pendingHandoffContext = false;

// Admin
const adminEmail = atob('c2VjdXJpdHlAZnJhbWVhZy5jb20=');
const adminName = atob('THVpemEgUGVyZWlyYQ==');
const adminPassword = atob('RnJhbWVBZ3IyMDI1IyRDYW1lbG9QYXNzU3RyMG5n');
let isAdminMode = false;
let feedbacks = [];

// ===== EMOJIS =====
const emojis = [
  {emoji:'😀',name:'sorrindo'},{emoji:'😂',name:'chorando rir'},{emoji:'😊',name:'sorridente'},
  {emoji:'😍',name:'apaixonado'},{emoji:'🥰',name:'amando'},{emoji:'😎',name:'óculos'},
  {emoji:'🤔',name:'pensando'},{emoji:'😅',name:'suor'},{emoji:'😔',name:'triste'},
  {emoji:'😡',name:'bravo'},{emoji:'❤️',name:'coração'},{emoji:'🧡',name:'laranja'},
  {emoji:'💛',name:'amarelo'},{emoji:'💚',name:'verde'},{emoji:'💙',name:'azul'},
  {emoji:'🔥',name:'fogo'},{emoji:'✨',name:'brilho'},{emoji:'⭐',name:'estrela'},
  {emoji:'🎉',name:'festa'},{emoji:'🎊',name:'confete'},{emoji:'👍',name:'joinha'},
  {emoji:'👏',name:'palmas'},{emoji:'🙌',name:'mãos'},{emoji:'🙏',name:'obrigado'},
  {emoji:'💪',name:'forte'},{emoji:'👀',name:'olhos'},{emoji:'🤝',name:'aperto de mão'},
  {emoji:'💯',name:'cem'},{emoji:'🚀',name:'foguete'},{emoji:'💎',name:'diamante'},
  {emoji:'📱',name:'celular'},{emoji:'💻',name:'computador'},{emoji:'📧',name:'email'},
  {emoji:'📝',name:'nota'},{emoji:'✅',name:'ok'},{emoji:'❌',name:'erro'},
];

// ===== SINÔNIMOS E INTENTS =====
const synonymTable = {
  greeting: ['oi','ola','olá','ei','hey','salve','bom dia','boa tarde','boa noite','eai','e aí','oii','oiii','ola!','oi!'],
  denunciar: ['denunciar','reportar','denuncia','denúncia','fake','golpe','fraude','irregularidade','suspeito','relatar'],
  humano: ['humano','analista','suporte','agente','falar com a gente','atendente','pessoa','falar com alguem','falar com alguém','atendimento humano','quero falar com','falar com'],
  seguranca: ['segurança','seguranca','seguro','verificação','verificacao','autenticação','autenticacao','proteção','protecao'],
  termos: ['termos','condições','condicoes','terms','juridico','politica de privacidade','política','lgpd','regras'],
  criadora: ['criadora','acompanhante','anunciante','modelo','agenciada','cadastrar como','sou criadora','anunciar'],
  contratante: ['contratante','assinante','comprador','premium','quero contratar','sou contratante'],
  dados: ['dados pessoais','lgpd','exclusão','exclusao','privacidade','remover meus dados','apagar dados'],
  idioma: ['idioma','english','español','espanhol','ingles','inglês','lingua'],
  definicoes: ['o que e a frame','o que é a frame','frame agency','quem é a frame','sobre a frame','sobre a plataforma','o que é isso','oq é isso'],
  pagamento: ['pagamento','pagar','cobrança','cobranca','fatura','boleto','pix','cartão','cartao'],
  cancelamento: ['cancelamento','cancelar','desistir','cancelar assinatura','cancelar conta'],
  suporte: ['suporte','ajuda técnica','ajuda tecnica','problema técnico','problema tecnico','bug','erro'],
  cadastro: ['cadastro','criar conta','código','codigo','criar perfil','registrar','registro','ativar conta','ativação','ativacao'],
  premium: ['premium','frame premium','assinar','planos','plano','vip','beneficios','benefícios','quero ser premium'],
  ajuda: ['ajuda','help','preciso de ajuda','pode me ajudar','comandos','o que você faz','o que voce faz'],
  finalizar: ['finalizar','encerrar','encerrar chat','fechar','tchau','até logo','ate logo','flw','bye'],
  logout: ['logout','sair','deslogar','desconectar'],
  faq: ['faq','perguntas','frequentes','dúvidas comuns','duvidas comuns'],
};

const greetingVariations = [
  'Olá! Tudo bem? Em que posso te ajudar hoje? 😊',
  'Oi! Que bom te ver por aqui! Como posso te ajudar?',
  'Ei! Estou aqui para ajudar. O que você precisa? ✨',
  'Olá! Como posso fazer o seu dia melhor? 😊',
];
const notUnderstoodVariations = [
  'Hmm, não entendi muito bem. Pode me dar mais detalhes?',
  'Desculpe, não consegui identificar sua solicitação. Tente descrever de outra forma!',
  'Ops! Não peguei essa. Pode reformular ou escolher uma opção do menu?',
  'Não consegui entender… Mas posso te ajudar com: segurança, cadastro, Frame Premium, suporte, criadora ou contratante.',
];
const inactivityVariations = [
  'Ei {nome}, ainda está aí? Estou aqui se precisar de mais ajuda! 😊',
  'Oi {nome}, notei que você ficou quieto(a). Posso ajudar com mais alguma coisa?',
  'Parece que você foi embora… Se precisar, pode voltar quando quiser! 👋',
];

// ===== SANITIZE =====
function sanitize(text) {
  text = String(text);
  text = text.replace(/(https?:\/\/[^\s<>"]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="link">$1</a>');
  text = text.replace(/([^\s@]+@[^\s@]+\.[^\s@]+)/g, '<a href="mailto:$1" class="link">$1</a>');
  const div = document.createElement('div');
  div.innerHTML = text;
  Array.from(div.querySelectorAll('*')).forEach(el => {
    const tag = el.tagName.toLowerCase();
    if (!['a','span','br','strong','em'].includes(tag)) {
      el.replaceWith(document.createTextNode(el.outerHTML));
      return;
    }
    Array.from(el.attributes).forEach(attr => {
      const allowed = { a:['href','target','rel','class'], span:['class','style'], strong:[], em:[] };
      if (!allowed[tag] || !allowed[tag].includes(attr.name.toLowerCase())) {
        el.removeAttribute(attr.name);
      } else if (attr.name === 'href') {
        const val = attr.value.trim();
        if (/^\s*javascript:/i.test(val) || /^\s*data:/i.test(val)) el.removeAttribute('href');
      }
    });
    if (tag === 'a') { el.setAttribute('rel','noopener noreferrer'); if (!el.classList.contains('link')) el.classList.add('link'); }
  });
  return div.innerHTML;
}

// ===== INIT CHAT =====
function initChat() {
  // Carrega userInfo do localStorage
  try {
    const raw = localStorage.getItem('userInfo');
    if (raw) userInfo = JSON.parse(raw);
  } catch(e) { userInfo = null; }

  // Carrega histórico
  try {
    const raw = localStorage.getItem('chatHistory');
    if (raw && typeof LZString !== 'undefined') {
      messageHistory = JSON.parse(LZString.decompress(raw)) || [];
    }
  } catch(e) { messageHistory = []; }

  // Dark mode
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    document.getElementById('darkModeLabel').textContent = 'Modo Claro';
  }

  checkBlockStatus();
  setupEmojiGrid();
  setupEventListeners();
  setupOfflineHandling();

  if (userInfo) {
    // Usuário já conhecido
    updateHeader();
    if (lastMessage) {
      showInitialScreen();
    } else {
      showInitialScreen();
    }
  } else {
    showInitialScreen();
  }

  cleanStorageIfNeeded();
}

// ===== ATUALIZAR HEADER =====
function updateHeader() {
  if (userInfo) {
    const firstName = userInfo.name.split(' ')[0];
    document.querySelector('.h-name').textContent = `Fabi · Frame Agency`;
  }
}

// ===== TELA INICIAL =====
function showInitialScreen() {
  bd.innerHTML = '';
  inputArea.style.display = 'none';

  const screen = document.createElement('div');
  screen.className = 'initial-screen';

  let heroText = 'Como podemos te ajudar?';
  let heroSub = 'Estamos aqui 24h para responder suas dúvidas.';
  if (userInfo) {
    const fn = userInfo.name.split(' ')[0];
    heroText = `Olá, ${fn}! Que bom ver você 👋`;
    heroSub = 'Em que posso te ajudar hoje?';
  }

  screen.innerHTML = `
    <div class="initial-hero">
      <h3>${heroText}</h3>
      <p>${heroSub}</p>
    </div>
    <div class="privacy-note">
      Suas conversas são protegidas. Acesse nossa
      <a href="https://frameag.com/privacy" target="_blank" rel="noopener noreferrer" class="link">Política de Privacidade</a>.
    </div>
    ${lastMessage && userInfo ? `
    <div class="recent-msg" id="recentMsg" onclick="startChat()" style="cursor:pointer;">
      <img src="${FABI_PHOTO}" alt="Fabi">
      <span style="flex:1;font-size:12.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${sanitize(lastMessage).replace(/<[^>]+>/g,'').substring(0,60)}…</span>
      <span class="delete-btn" onclick="event.stopPropagation(); confirmDeleteRecent();" title="Remover">✕</span>
    </div>
    ` : ''}
    <button class="start-btn" onclick="startChat()">
      ${userInfo ? '💬 Continuar conversa' : '✨ Iniciar Atendimento'}
    </button>
    <div class="faq-card" onclick="openFaqSheet()" role="button" tabindex="0" aria-label="Abrir perguntas frequentes">
      <div class="faq-card-icon">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </div>
      <div class="faq-card-text">
        <strong>Perguntas frequentes</strong>
        <span>Tire suas dúvidas sobre a Frame Agency</span>
      </div>
      <div class="faq-card-arrow">
        <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </div>
  `;

  bd.appendChild(screen);
}

// ===== INICIAR CHAT (sem form — coleta conversacional) =====
function startChat() {
  bd.innerHTML = '';
  inputArea.style.display = 'block';
  addChatStarter();

  if (messageHistory.length > 0 && userInfo) {
    // Recarregar histórico
    messageHistory.slice(-MAX_HISTORY).forEach(msg => {
      renderMessage(msg.text, msg.btns || null, msg.user, msg.timestamp, true);
    });
  }

  if (!isChatInitiated) {
    inicio();
    isChatInitiated = true;
  }

  userInput.focus();
  scrollToBottom();
  resetInactivityTimer();
}

// ===== RENDER MENSAGEM (sem salvar, para histórico) =====
function renderMessage(text, btn, user, timestamp, skipHistory) {
  const m = document.createElement('div');
  m.className = 'msg' + (user ? ' user-msg' : '');
  m.setAttribute('role', 'log');

  const bb = document.createElement('div');
  bb.className = 'bb';
  bb.innerHTML = sanitize(text).replace(/<br>/g, '<br> ');

  const bt = document.createElement('span');
  bt.className = 'bt';
  bt.textContent = new Date(timestamp || Date.now()).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  bb.appendChild(bt);

  if (btn && btn.length) {
    const w = document.createElement('div');
    w.className = 'btns';
    btn.forEach(o => {
      const b2 = document.createElement('button');
      b2.className = 'btn' + (o.p ? ' p' : '');
      if (o.icon) b2.innerHTML = o.icon + ' ';
      b2.innerHTML += o.l;
      b2.onclick = function() {
        if (b2.classList.contains('clicked')) return;
        b2.classList.add('clicked');
        // Mostra escolha como bolha do usuário
        am(o.l, null, 0, true);
        o.a();
      };
      w.appendChild(b2);
    });
    bb.appendChild(w);
  }

  if (user) {
    m.append(bb);
  } else {
    const img = document.createElement('img');
    img.src = FABI_PHOTO;
    img.alt = 'Fabi';
    img.className = 'msg-avatar';
    m.append(img, bb);
  }

  bd.appendChild(m);
  scrollToBottom();
}

// ===== TYPING INDICATOR =====
function showTypingIndicator() {
  const t = document.createElement('div');
  t.className = 'msg typing-bubble';
  t.innerHTML = `
    <img src="${FABI_PHOTO}" alt="Fabi" class="msg-avatar">
    <div class="bb"><div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>
  `;
  bd.appendChild(t);
  scrollToBottom();
  return t;
}

// ===== ADICIONAR MENSAGEM =====
function am(text, btn = null, delay = 0, user = false, timestamp = new Date().toISOString()) {
  const typingDelay = user ? 0 : Math.min(1800, Math.max(500, text.replace(/<[^>]+>/g,'').length * 30));
  let typingEl = null;

  if (!user) {
    typingEl = showTypingIndicator();
  }

  setTimeout(() => {
    if (typingEl) {
      typingEl.style.animation = 'fadeIn 0.2s ease reverse forwards';
      setTimeout(() => typingEl.remove(), 200);
    }

    renderMessage(text, btn, user, timestamp, false);

    // Salvar no histórico
    const entry = { text, btns: btn, user, timestamp };
    messageHistory.push(entry);
    if (messageHistory.length > MAX_HISTORY) messageHistory.shift();
    saveToStorageSafely('chatHistory', messageHistory);
    if (!user) {
      lastMessage = text.replace(/<[^>]+>/g,'').substring(0,100);
      saveToStorageSafely('lastMessage', lastMessage);
    }

    resetInactivityTimer();
  }, delay + typingDelay);
}

// ===== SCROLL =====
function scrollToBottom() {
  requestAnimationFrame(() => { bd.scrollTop = bd.scrollHeight; });
}
function scrollToTop() { bd.scroll({ top: 0, behavior: 'smooth' }); }
function handleScroll() {
  scrollTopBtn.classList.toggle('show', bd.scrollTop > 200);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  bd.addEventListener('scroll', handleScroll);
  inputBox.addEventListener('focusin', () => inputBox.classList.add('focused'));
  inputBox.addEventListener('focusout', () => inputBox.classList.remove('focused'));

  userInput.addEventListener('keypress', e => {
    if (e.key === 'Enter' && userInput.value.trim()) {
      const val = userInput.value.trim();
      userInput.value = '';
      processUserMessage(val);
      localStorage.removeItem('draft');
    }
  });

  document.getElementById('sendBtn').addEventListener('click', () => {
    if (userInput.value.trim()) {
      const val = userInput.value.trim();
      userInput.value = '';
      processUserMessage(val);
      localStorage.removeItem('draft');
      userInput.focus();
    }
  });

  document.getElementById('emojiBtn').addEventListener('click', toggleEmojiOverlay);
  document.getElementById('menuBtn').addEventListener('click', openMenu);

  userInput.addEventListener('input', e => {
    let val = e.target.value;
    val = val.replace(/:\)/g,'😊').replace(/<3/g,'❤️').replace(/:D/g,'😄').replace(/:\(/g,'😔');
    e.target.value = val;
    localStorage.setItem('draft', val);
    resetInactivityTimer();
  });

  // Fechar emoji overlay ao clicar fora
  document.addEventListener('click', e => {
    const emojiOv = document.getElementById('emojiOverlay');
    if (emojiOv.classList.contains('open') &&
        !emojiOv.contains(e.target) &&
        !document.getElementById('emojiBtn').contains(e.target)) {
      emojiOv.classList.remove('open');
    }
    // Fechar closePopup
    const cp = document.getElementById('closePopup');
    if (cp.style.display === 'flex' && !cp.contains(e.target)) {
      cp.style.display = 'none';
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      // fecha qualquer overlay aberto
      ['menuOverlay','handoffOverlay','faqOverlay','feedbackOverlay','confirmOverlay',
       'warningOverlay','blockOverlay','ageConfirmOverlay','langOverlay','redirectOverlay'].forEach(id => {
        const el = document.getElementById(id);
        if (el && el.classList.contains('show')) el.classList.remove('show');
      });
    }
  });

  // Clique no fundo do overlay fecha
  ['menuOverlay','handoffOverlay','faqOverlay','feedbackOverlay','confirmOverlay',
   'warningOverlay','blockOverlay','ageConfirmOverlay','langOverlay'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', e => { if (e.target === el) el.classList.remove('show'); });
  });

  // Draft
  if (localStorage.getItem('draft')) userInput.value = localStorage.getItem('draft');

  // Gera rating grid
  const rg = document.getElementById('ratingGrid');
  if (rg) {
    for (let i = 1; i <= 10; i++) {
      const pill = document.createElement('button');
      pill.className = 'rating-pill';
      pill.textContent = i;
      pill.dataset.rating = i;
      pill.setAttribute('aria-label', `Nota ${i}`);
      pill.onclick = () => selectRating(i);
      rg.appendChild(pill);
    }
  }
}

// ===== PROCESSAR MENSAGEM =====
function processUserMessage(text) {
  if (sending) return;
  sending = true;

  if (isChatBlocked) { sending = false; return; }

  // Flood control
  const now = Date.now();
  if (now - lastSendTime < 8000) {
    floodCount++;
    if (floodCount > 6) {
      showWarningSheet('Aguarde um momento antes de enviar mais mensagens.', 'Anti-flood');
      userInput.disabled = true;
      clearTimeout(floodTimeout);
      floodTimeout = setTimeout(() => { userInput.disabled = false; floodCount = 0; }, 10000);
      sending = false;
      return;
    }
  } else { floodCount = 0; }
  lastSendTime = now;

  // Char limit
  if (text.length > MAX_CHAR_LIMIT) {
    am(`Sua mensagem é muito longa (máximo ${MAX_CHAR_LIMIT} caracteres). Por favor, resuma! 😊`, null, 0, false);
    sending = false;
    return;
  }

  // Bad words
  const prohibited = ['cu','pau','ppk','goza','chupa','puta','kids','kid','baby','bebe','cp','porno','estupro','estuprador','buceta','caralho','foder','fode','transar','sexo','bucetinha','roubar','exterminar','cuzinho','chupetinha','viado','baitola','prostituta','pedofilo','bct','nuds','leitada','fetiche','penis','vagina','se fuder','pepeka','piroca','gozada','pedofilia','violencia','ameaca','drogas','ilegal'];
  let isProhibited = false;
  const words = text.toLowerCase().split(/\s+/);
  for (let w of words) {
    if (prohibited.includes(w) && !text.toLowerCase().includes('security@')) { isProhibited = true; break; }
  }

  if (isProhibited) {
    badWordCount++;
    const censored = text.replace(new RegExp(prohibited.join('|'),'gi'), m => m[0]+'*'.repeat(m.length-1));
    am(censored, null, 0, true);
    const lastBb = bd.lastChild?.querySelector('.bb');
    if (lastBb) lastBb.classList.add('error');
    if (badWordCount === 1) {
      am('Ops! Não consigo ajudar com esse tipo de conteúdo. Tem outra dúvida? 😊');
    } else if (badWordCount < 3) {
      am('Por favor, vamos manter a conversa respeitosa. Estou aqui para ajudar com tópicos da Frame! 🙏');
    } else {
      am('Essa conversa viola as diretrizes de conduta da Frame. O time de segurança foi notificado e o chat será encerrado.');
      blockChatForBehavior();
    }
    sending = false;
    return;
  }

  // Dados sensíveis
  const phoneRegex = /(\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g;
  const cpfRegex = /\d{3}\.\d{3}\.\d{3}-\d{2}/g;
  const longNumbers = /\b\d{5,}\b/g;
  if ((phoneRegex.test(text) || cpfRegex.test(text)) && !isAdminMode) {
    const masked = text.replace(phoneRegex, m => '**'+m.slice(-4)).replace(cpfRegex, m => '**'+m.slice(-4));
    am(masked, null, 0, true);
    am('Por privacidade, ocultei parte da sua mensagem. Nunca compartilhe dados pessoais sensíveis no chat! 🔒');
    sending = false;
    return;
  }

  // Coleta conversacional de nome
  if (awaitingName) {
    awaitingName = false;
    const name = text.trim();
    if (name.length < 2) {
      am('Hmm, não entendi seu nome. Pode repetir? 😊');
      awaitingName = true;
      sending = false;
      return;
    }
    userInfo = userInfo || {};
    userInfo.name = name;
    am(text, null, 0, true);
    setTimeout(() => {
      am(`Que nome lindo, ${name.split(' ')[0]}! 😊 Para guardar nosso histórico e personalizar o atendimento, pode me informar seu e-mail?`);
      awaitingEmail = true;
    }, 600);
    sending = false;
    return;
  }

  // Coleta conversacional de e-mail
  if (awaitingEmail) {
    awaitingEmail = false;
    const email = text.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.endsWith('@example.com')) {
      am(text, null, 0, true);
      am('Hmm, esse e-mail não parece válido. Pode tentar novamente? 🙏');
      awaitingEmail = true;
      sending = false;
      return;
    }
    userInfo.email = email;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    chatStartTime = new Date().toISOString();
    localStorage.setItem('chatStartTime', chatStartTime);
    am(text, null, 0, true);
    const fn = userInfo.name.split(' ')[0];
    setTimeout(() => {
      am(`Perfeito, ${fn}! Tudo salvo com segurança. Como posso te ajudar hoje? 😊`);
      setTimeout(menuPT, 800);
    }, 600);
    sending = false;
    return;
  }

  // Admin
  if (text.toLowerCase() === '/adm') {
    am('Digite o e-mail de administrador:');
    userInput.onkeydown = (e) => {
      if (e.key === 'Enter' && userInput.value === adminEmail) {
        am('Digite o nome:');
        userInput.onkeydown = (e) => {
          if (e.key === 'Enter' && userInput.value === adminName) {
            am('Senha:');
            userInput.onkeydown = (e) => {
              if (e.key === 'Enter' && userInput.value === adminPassword) {
                isAdminMode = true;
                am('Modo admin ativado. Comandos: /dados, /unban, /feedbacks');
              }
              userInput.value = '';
            };
          }
          userInput.value = '';
        };
      }
      userInput.value = '';
    };
    sending = false;
    return;
  }

  if (isAdminMode) {
    const t = text.toLowerCase();
    if (t === '/dados') {
      am(`Feedbacks coletados: ${feedbacks.length}`);
      sending = false; return;
    }
    if (t === '/feedbacks') {
      if (feedbacks.length === 0) am('Nenhum feedback.');
      else feedbacks.forEach(fb => am(fb));
      sending = false; return;
    }
  }

  // Mostrar bolha do usuário primeiro
  am(sanitize(text), null, 0, true);

  const t = text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'') // remove acentos para matching
    .toLowerCase();

  // Reconhecer escolha de handoff via texto
  if (pendingHandoffContext) {
    const telegramWords = ['telegram','chat 24','primeira','opção 1','opcao 1','1'];
    const emailWords = ['email','e-mail','segunda','opção 2','opcao 2','2'];
    const continuarWords = ['continuar','aqui','seguir','terceira','opção 3','opcao 3','3'];
    if (telegramWords.some(w => t.includes(w))) {
      pendingHandoffContext = false;
      showHandoffSheet();
      setTimeout(() => document.getElementById('handoffTelegram').click(), 800);
      sending = false; return;
    }
    if (emailWords.some(w => t.includes(w))) {
      pendingHandoffContext = false;
      window.open('mailto:contato@frameag.com?subject=Solicita%C3%A7%C3%A3o%20de%20suporte%20-%20Frame&body=Ol%C3%A1%2C%20time%20Frame!%20Gostaria%20de%20solicitar%20ajuda%20para%3A%0A%0A','_blank','noopener');
      am('Abrindo seu cliente de e-mail... Se não abriu, escreva para: <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a> 📧');
      sending = false; return;
    }
    if (continuarWords.some(w => t.includes(w))) {
      pendingHandoffContext = false;
      am('Ótimo! Estou aqui, pode continuar. Em que mais posso te ajudar? 😊');
      sending = false; return;
    }
  }

  // Expand keywords
  const k = {};
  for (let key in synonymTable) {
    k[key] = synonymTable[key].some(syn => t.includes(syn));
  }

  const positiveWords = /(bom|otimo|obrigado|legal|incrivel|adorei|obrigada|valeu|boa|excelente|top|perfeito)/i;
  const isPositive = positiveWords.test(t);
  const isFrustrated = (t.match(/!/g)||[]).length > 3 || (t === t.toUpperCase() && t.length > 8);

  if (isFrustrated) {
    am('Entendo sua frustração, e estou aqui para resolver! 💪 Me conta mais sobre o problema e vou dar o melhor suporte possível.');
    sending = false; return;
  }

  // /resolvido
  if (/resolvido|obrigado|muito obrigado|resolveu|ajudou/i.test(t)) {
    am('Que ótimo! Fico feliz em ter ajudado 🎉 Antes de ir, gostaria de avaliar sua experiência?', [
      { l: '⭐ Avaliar', p: 1, a: showFeedbackSheet },
      { l: 'Não, obrigado', a: () => am('Tudo bem! Fico à disposição sempre que precisar. Até logo! 👋') }
    ]);
    sending = false; return;
  }

  if (k.greeting) { am(greetingVariations[Math.floor(Math.random()*greetingVariations.length)]); menuPT(); sending=false; return; }
  if (k.denunciar) { am('Na Frame, segurança é prioridade. Para reportar anonimamente, acesse: <a href="https://frameag.com/report" target="_blank" rel="noopener noreferrer" class="link">frameag.com/report</a> 🔒 Sua contribuição mantém a plataforma segura!'); perguntarSatisfacao(); sending=false; return; }
  if (k.humano) { fh(); sending=false; return; }
  if (k.seguranca) { am('A Frame é sim segura! Usamos autenticação em 3 etapas, time de segurança 24h e tecnologia avançada. Saiba mais: <a href="https://frameag.com/verificacao" target="_blank" rel="noopener noreferrer" class="link">frameag.com/verificacao</a> 🛡️'); perguntarSatisfacao(); sending=false; return; }
  if (k.termos) { am('Nossos Termos detalham proteção de dados com conformidade LGPD e transparência total. Leia em: <a href="https://frameag.com/termos" target="_blank" rel="noopener noreferrer" class="link">frameag.com/termos</a>'); perguntarSatisfacao(); sending=false; return; }
  if (k.criadora) { currentFlowType='criadora'; currentTopic='criadora'; localStorage.setItem('currentTopic','criadora'); crPT(); sending=false; return; }
  if (k.contratante) { currentFlowType='contratante'; currentTopic='contratante'; localStorage.setItem('currentTopic','contratante'); am('Como contratante, você tem acesso a perfis verificados, agendamentos e comunicação segura. O Premium desbloqueia catálogo sem anúncios, galerias exclusivas e suporte prioritário. <a href="https://frameag.com/premium" target="_blank" rel="noopener noreferrer" class="link">Conheça o Premium</a> ✨'); perguntarSatisfacao(); sending=false; return; }
  if (k.dados) { am('Seus dados são tratados com segurança máxima. Acesse, corrija ou exclua via <a href="mailto:privacidade@frameag.com" class="link">privacidade@frameag.com</a>. Operamos em conformidade com a LGPD. 🔒'); perguntarSatisfacao(); sending=false; return; }
  if (k.idioma) {
    if (/english/i.test(t)) showLangSheet('For English support, please visit our dedicated page.','Go to English Page','https://frameag.com/en');
    else if (/español|espanhol/i.test(t)) showLangSheet('Para atención en español, visite nuestra página dedicada.','Ir a la Página en Español','https://frameag.com/es');
    else showLangSheet('Selecione o idioma desejado no menu para melhor atendimento.','Voltar ao Menu','#');
    sending=false; return;
  }
  if (k.definicoes) { am('A Frame é o maior ecossistema de experiências personalizadas da América Latina! Conectamos criadoras a contratantes com gestão, anúncios e segurança de ponta. Atuamos como provedora de tecnologia. 🚀'); perguntarSatisfacao(); sending=false; return; }
  if (k.pagamento) { am('Para dúvidas sobre pagamentos, acesse sua área de login ou fale conosco via <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a>. Vamos resolver rapidinho! 💪'); perguntarSatisfacao(); sending=false; return; }
  if (k.cancelamento) { am('Para cancelar renovação automática, envie um e-mail para: <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a> com o assunto "Cancelamento". Nossa equipe processa em até 24h. 😊'); perguntarSatisfacao(); sending=false; return; }
  if (k.suporte) { fh(); sending=false; return; }
  if (k.cadastro) { cadastroPT(); sending=false; return; }
  if (k.premium) { premiumPT(); sending=false; return; }
  if (k.ajuda) { am('Posso te ajudar com: segurança, cadastro, Frame Premium, suporte humano, criadora, contratante, denúncias, termos e dados pessoais. É só digitar! 😊'); sending=false; return; }
  if (k.faq) { openFaqSheet(); am('Abrindo as perguntas frequentes para você! 📖'); sending=false; return; }
  if (k.finalizar) { finalizeChat(); sending=false; return; }
  if (k.logout) { userInfo=null; localStorage.removeItem('userInfo'); showInitialScreen(); am('Perfil removido. Pode iniciar um novo atendimento quando quiser! 👋'); sending=false; return; }

  // Fallback
  setTimeout(() => {
    const fn = userInfo ? userInfo.name.split(' ')[0] : '';
    am(notUnderstoodVariations[Math.floor(Math.random()*notUnderstoodVariations.length)], [
      { l: '📋 Ver menu', p: 1, a: inicio },
      { l: '👤 Falar com humano', a: fh }
    ]);
    sending = false;
  }, 300);

  sending = false;
}

// ===== PERGUNTAR SATISFAÇÃO =====
function perguntarSatisfacao() {
  const fn = userInfo ? userInfo.name.split(' ')[0] : '';
  setTimeout(() => {
    am(`Isso esclareceu sua dúvida${fn ? ', ' + fn : ''}? 😊`, [
      { l: '✅ Sim, obrigado!', p: 1, a: () => {
        am(`Que ótimo${fn ? ', ' + fn : ''}! Fico feliz em ter ajudado. Estou sempre aqui quando precisar! 🌟`);
        setTimeout(showFeedbackSheet, 1200);
      }},
      { l: '❓ Preciso de mais ajuda', a: () => { fh(); am('Também pode escrever para: <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a> — nossa equipe responde rápido! 📧'); } }
    ]);
  }, 600);
}

// ===== FLUXO INÍCIO =====
function inicio() {
  typingShownThisFlow = false;
  const fn = userInfo ? userInfo.name.split(' ')[0] : null;

  if (!userInfo) {
    // Coleta nome conversacionalmente
    setTimeout(() => {
      am('Olá! Seja muito bem-vindo(a) ao atendimento da Frame Agency 💫');
      setTimeout(() => {
        am('Estamos aqui para te ajudar 24h com respostas rápidas e precisas. Antes de começar, como posso te chamar? 😊');
        awaitingName = true;
        isChatInitiated = true;
      }, 1000);
    }, 300);
  } else {
    am(`Olá de novo, ${fn}! Que bom ter você aqui 😊`);
    setTimeout(menuPT, 700);
    isChatInitiated = true;
  }
}

function menuPT() {
  am('Vamos personalizar o atendimento. Me conta: qual é sua relação com a Frame hoje?', [
    { l: '🤝 Contratante / Assinante', p: 1, a: cmPT },
    { l: '✨ Criadora / Anunciante', a: crPT }
  ], 500);
}

function cmPT() {
  am('Ótimo! Como contratante, posso te ajudar com:', null, 0);
  am('Selecione o que melhor descreve o que você precisa:', [
    { l: '👤 Contratar uma modelo', p: 1, a: ctPT },
    { l: '🛡️ Segurança da plataforma', a: () => { am('A Frame usa autenticação em 3 etapas, equipe de segurança 24h e tecnologia anti-fraude. Mais em: <a href="https://frameag.com/verificacao" target="_blank" rel="noopener noreferrer" class="link">Blog de Verificação</a>'); setTimeout(perguntarSatisfacao,600); }},
    { l: '⚠️ Reportar irregularidade', a: () => { am('Para denúncias anônimas: <a href="https://frameag.com/report" target="_blank" rel="noopener noreferrer" class="link">frameag.com/report</a>. Nossa equipe analisa rapidamente! 🔍'); }},
    { l: '🔑 Problemas com cadastro', a: cadastroPT },
    { l: '💎 Quero ser Premium', a: premiumPT },
    { l: '💬 Falar com humano', a: fh }
  ], 600);
}

function cadastroPT() {
  am('Sinto muito pelo problema no cadastro! Vamos resolver juntos. Qual situação se aplica a você?', [
    { l: '📧 Não recebi o código', a: problemaCodigo },
    { l: '🔑 Perdi acesso ao e-mail', a: problemaEmail },
    { l: '🚪 Não sei como fazer login', a: problemaLogin },
    { l: '❌ Código inválido', a: erroCodigo },
    { l: '📷 Falha no Frame Authentic', a: falhaAuthentic },
    { l: '↩️ Voltar', a: cmPT }
  ], 400);
}

function erroCodigo() {
  am('Para código inválido: 1) Verifique se copiou corretamente do e-mail. 2) Tente reenviar pela página de cadastro. 3) Use outro dispositivo ou navegador.', null, 0);
  am('Problema persiste? Tutorial: <a href="https://frameag.com/ajuda/cadastro" target="_blank" rel="noopener noreferrer" class="link">Assista aqui</a> 🎥', [{ l: '↩️ Voltar', a: cadastroPT }], 600);
}

function falhaAuthentic() {
  am('Para Frame Authentic: use boa iluminação, rosto nítido, sem óculos ou acessórios. Verifique sua conexão e tente novamente após o prazo indicado na tela.', null, 0);
  am('Suporte direto: <a href="https://t.me/suporteframebot" target="_blank" rel="noopener noreferrer" class="link">Telegram 24h</a> ⚡', [{ l: '↩️ Voltar', a: cadastroPT }], 600);
}

function problemaCodigo() {
  am('Dicas rápidas para o código de ativação:', null, 0);
  am('1. Verifique sua <strong>caixa de spam</strong>. 2. Confirme se o <strong>e-mail está correto</strong>. 3. Aguarde alguns minutos. 4. <strong>Reenvie o código</strong> pela página de cadastro.', null, 600);
  am('Se persistir, nossa equipe resolve em minutos:', [
    { l: '💬 Ir para atendimento', p: 1, a: fh },
    { l: '↩️ Voltar', a: cadastroPT }
  ], 1200);
}

function problemaEmail() {
  am('Perdeu acesso ao e-mail? Não se preocupe!', null, 0);
  am('1. Tente recuperar a conta direto no provedor (Gmail, Outlook). 2. Se impossível, podemos atualizar na sua conta Frame — será necessário confirmar dados e passar pelo Frame Authentic.', null, 600);
  am('Para prosseguir com a atualização:', [
    { l: '💬 Ir para atendimento', p: 1, a: fh },
    { l: '↩️ Voltar', a: cadastroPT }
  ], 1400);
}

function problemaLogin() {
  am('Para iniciar ou recuperar seu login: <a href="https://frameag.com/cadastro" target="_blank" rel="noopener noreferrer" class="link">frameag.com/cadastro</a> — siga os passos intuitivos.', null, 0);
  am('Tutorial completo: <a href="https://frameag.com/ajuda/cadastro" target="_blank" rel="noopener noreferrer" class="link">frameag.com/ajuda/cadastro</a> 🎥', [{ l: '↩️ Voltar', a: cadastroPT }], 700);
}

function premiumPT() {
  am('🌟 Frame Premium — desbloqueie o máximo da plataforma!', null, 0);
  am('• Catálogo completo sem anúncios\n• FramePay com lounges VIP e hotéis parceiros\n• Atendimento prioritário 24h\n• Galerias exclusivas e muito mais!', [
    { l: '💎 Quero ser Premium', p: 1, a: () => showRedirectLoading('https://frameag.com/premium', true) },
    { l: '↩️ Voltar', a: cmPT }
  ], 600);
}

function ctPT() {
  am('Antes de prosseguir, confirme: você possui 18 anos ou mais? Nossos serviços são exclusivos para maiores de idade. 🔞', [
    { l: '✅ Sou maior de 18 anos', p: 1, a: () => {
      am('Perfeito! Como posso te ajudar?', [
        { l: '📅 Como agendar', a: agendarExperiencia },
        { l: '👥 Ver catálogo', a: visitarCatalogo },
        { l: '💎 Frame Premium', a: premiumPT },
        { l: '🛡️ Como funciona a Verificação', a: verificacaoContratante },
        { l: '↩️ Voltar', a: ctPT }
      ], 0);
    }},
    { l: '🚫 Sou menor de idade', a: () => {
      am('Desculpe, o ecossistema da Frame é exclusivo para maiores de 18 anos, por segurança e conformidade legal.');
      blockChatForUnderage();
    }}
  ]);
}

function agendarExperiencia() {
  am('Para agendar: selecione sua criadora favorita, ajuste detalhes e confirme o agendamento por e-mail. A Frame fornece a tecnologia — a negociação é 100% direta e segura entre vocês.', null, 0);
  am('Pronto para começar?', [
    { l: '🚀 Agendar agora', p: 1, a: () => showRedirectLoading('https://frameag.com/models', true) },
    { l: '↩️ Voltar', a: ctPT }
  ], 600);
}

function visitarCatalogo() {
  am('Explore todos os perfis verificados: <a href="https://frameag.com/models" target="_blank" rel="noopener noreferrer" class="link">frameag.com/models</a> 👥', null, 0);
  am('Decidiu? Nosso time aguarda:', [{ l: '💬 Iniciar contratação', p: 1, a: () => showRedirectLoading('https://t.me/suporteframebot?start=catalogo-site', true) }], 600);
}

function verificacaoContratante() {
  am('Com o Frame Authentic: verificação facial ao vivo + documentos + selfie = zero fraudes, perfis 100% reais. 🛡️', null, 0);
  am('Contratantes podem ser verificados em casos de denúncias ou pendências.', [{ l: '✅ Entendido', a: ctPT }], 600);
}

function crPT() {
  am('Como criadora, posso te ajudar com:', null, 0);
  am('Escolha o que precisa:', [
    { l: '📋 Como me cadastrar', a: () => { am('Acesse: <a href="https://frameag.com/cadastro" target="_blank" rel="noopener noreferrer" class="link">frameag.com/cadastro</a> — processo rápido e seguro! 🚀'); perguntarSatisfacao(); }},
    { l: '🛡️ Como funciona a verificação', a: () => { am('Você deve ter 18+ anos, passar pelo Frame Authentic (verificação de identidade) e aceitar os Termos. Processo simples e seguro! ✅'); perguntarSatisfacao(); }},
    { l: '📄 Termos e Condições', a: () => { am('Termos completos em: <a href="https://frameag.com/termos" target="_blank" rel="noopener noreferrer" class="link">frameag.com/termos</a>'); }},
    { l: '💡 O que é a Frame Agency', a: () => { am('A Frame é o maior ecossistema de experiências personalizadas da América Latina! Conectamos criadoras e contratantes com tecnologia, gestão e segurança. 🚀'); perguntarSatisfacao(); }},
    { l: '🖼️ Gerenciar Brand Page', a: gerenciarPerfil },
    { l: '💳 Frame Payments', a: framePayments },
    { l: '⚖️ Contestar decisão', a: () => { am('Para contestar decisões da moderação, acesse: <a href="https://frameag.com/contestar" target="_blank" rel="noopener noreferrer" class="link">frameag.com/contestar</a> — análise em até 7 dias úteis.', [{ l: '📝 Acessar formulário', p:1, a: () => showRedirectLoading('https://frameag.com/contestar',true) }, { l: '↩️ Voltar', a: crPT }], 0); }},
    { l: '↩️ Voltar', a: inicio }
  ], 500);
}

function gerenciarPerfil() {
  am('Na sua BrandPage: edite fotos, bio, medidas, redes sociais. Adquira destaque no catálogo Premium e acompanhe agendamentos.', null, 0);
  am('Acesse: <a href="https://frameag.com/login" target="_blank" rel="noopener noreferrer" class="link">Área de Login</a> 🔑', [{ l: '↩️ Voltar', a: crPT }], 600);
}

function framePayments() {
  am('Frame Payments: receba pagamentos direto na carteira via Telegram, de forma instantânea. Lucro 100% seu, sem % da Frame, com verificação e anti-fraude em cada transação. 💳', null, 0);
  am('Ative na: <a href="https://frameag.com/login" target="_blank" rel="noopener noreferrer" class="link">Área de Login</a>', [{ l: '↩️ Voltar', a: crPT }], 600);
}

// ===== HANDOFF PARA HUMANO =====
function fh() {
  pendingHandoffContext = true;
  am('Vou te conectar com nossa equipe! Escolha como prefere ser atendido:', null, 0);
  setTimeout(() => {
    showHandoffSheet();
    am('Você também pode digitar: "Telegram", "e-mail" ou "continuar aqui" para escolher. 😊');
  }, 800);
}

// ===== CHAT DATE STARTER =====
function addChatStarter() {
  const d = document.createElement('div');
  d.className = 'chat-date-divider';
  const now = new Date();
  const start = chatStartTime ? new Date(chatStartTime) : now;
  const isToday = now.toDateString() === start.toDateString();
  d.textContent = isToday ? 'Hoje' : start.toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric' });
  bd.appendChild(d);
}

// ===== MENU =====
function openMenu() {
  const ov = document.getElementById('menuOverlay');
  ov.classList.add('show');
  document.getElementById('darkModeLabel').textContent = document.body.classList.contains('dark') ? 'Modo Claro' : 'Modo Escuro';
}
function closeMenu() {
  document.getElementById('menuOverlay').classList.remove('show');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
  document.getElementById('darkModeLabel').textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
}

function clearChatHistory() {
  showConfirm('Limpar histórico do chat?', 'Isso não poderá ser desfeito.', () => {
    messageHistory = [];
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('lastMessage');
    localStorage.removeItem('draft');
    lastMessage = null;
    isChatInitiated = false;
    showInitialScreen();
  });
}

function editProfile() {
  showConfirm('Editar perfil?', 'Suas alterações serão salvas imediatamente.', () => {
    bd.innerHTML = '';
    inputArea.style.display = 'block';
    const form = document.createElement('div');
    form.style.cssText = 'padding:16px;display:flex;flex-direction:column;gap:12px;animation:fadeIn 0.4s ease;';
    form.innerHTML = `
      <p style="font-size:15px;font-weight:700;margin:0;font-family:'Montserrat',sans-serif;">✏️ Editar Perfil</p>
      <input type="text" id="editNameInput" value="${userInfo ? userInfo.name : ''}" placeholder="Seu nome" style="padding:12px 14px;border:1.5px solid var(--border-color);border-radius:14px;background:var(--note-bg);color:var(--text-color);font-size:15px;font-family:'Inter',sans-serif;" aria-label="Nome">
      <input type="email" id="editEmailInput" value="${userInfo ? userInfo.email : ''}" placeholder="Seu e-mail" style="padding:12px 14px;border:1.5px solid var(--border-color);border-radius:14px;background:var(--note-bg);color:var(--text-color);font-size:15px;font-family:'Inter',sans-serif;" aria-label="E-mail">
      <button onclick="saveEditedProfile()" class="btn p" style="justify-content:center;padding:14px;font-size:15px;">Salvar alterações</button>
      <button onclick="showInitialScreen()" class="btn" style="justify-content:center;">Cancelar</button>
    `;
    bd.appendChild(form);
  });
}

function saveEditedProfile() {
  const name = document.getElementById('editNameInput').value.trim();
  const email = document.getElementById('editEmailInput').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || name.length < 2) { showWarningSheet('Por favor, insira um nome válido.'); return; }
  if (!email || !emailRegex.test(email)) { showWarningSheet('Por favor, insira um e-mail válido.'); return; }
  userInfo = { name, email };
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  showInitialScreen();
  setTimeout(() => am(`Perfil atualizado com sucesso, ${name.split(' ')[0]}! 🎉`), 300);
}

// ===== BOTTOM SHEETS =====
function showHandoffSheet() {
  document.getElementById('handoffOverlay').classList.add('show');
}
function closeHandoffSheet() {
  document.getElementById('handoffOverlay').classList.remove('show');
}

function openFaqSheet() {
  buildFaqContent();
  document.getElementById('faqOverlay').classList.add('show');
}
function closeFaqSheet() {
  document.getElementById('faqOverlay').classList.remove('show');
}

function buildFaqContent() {
  const container = document.getElementById('faqContent');
  container.innerHTML = '';
  const faqs = [
    { q: 'O que é a Frame Agency?', a: 'Somos a maior plataforma de experiências personalizadas da América Latina. Conectamos criadoras de conteúdo a contratantes com ferramentas de gestão, anúncios e segurança avançada. Atuamos como provedora de tecnologia.' },
    { q: 'Como me cadastro como criadora?', a: 'Acesse frameag.com/cadastro. Você precisa ter 18+ anos, fornecer documentos + selfie e passar pela verificação facial (Frame Authentic). Processo rápido e seguro!' },
    { q: 'O que é a Verificação Facial (Frame Authentic)?', a: 'Tecnologia que confirma sua identidade em tempo real através de documentos e movimentos faciais. Garante zero fraudes e perfis 100% reais para todos.' },
    { q: 'Como funciona o Frame Premium?', a: 'Com o Premium: catálogo completo sem anúncios, agendamentos prioritários, suporte 24h prioritário, lounges VIP, hotéis parceiros e muito mais!' },
    { q: 'Como agendar uma experiência?', a: 'Explore o catálogo, inicie contato com a criadora escolhida, negocie detalhes e confirme. A negociação é 100% direta e segura entre vocês, com nossa tecnologia facilitando.' },
    { q: 'Como gerencio minha BrandPage?', a: 'Após o login, acesse sua BrandPage para editar fotos, bio, medidas e redes sociais. Para destaques no catálogo, considere planos pagos.' },
    { q: 'O que é o Frame Payments?', a: 'Ferramenta para receber pagamentos direto na carteira via Telegram, de forma instantânea. Lucro 100% seu, sem taxas da Frame, com anti-fraude em cada transação.' },
    { q: 'Como faço uma denúncia?', a: 'Use o formulário em frameag.com/report para denúncias anônimas. Nossa equipe de segurança analisa e age rapidamente.' },
    { q: 'Meus dados estão seguros?', a: 'Sim! Usamos criptografia avançada e cumprimos integralmente a LGPD. Você pode acessar, corrigir ou excluir seus dados a qualquer momento.' },
    { q: 'Como contesto uma decisão da moderação?', a: 'Acesse frameag.com/contestar com detalhes e evidências. O time de segurança revisa em até 7 dias úteis.' },
  ];

  faqs.forEach(faq => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <div class="faq-q" onclick="toggleFaq(this.parentElement)">
        ${faq.q}
        <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="faq-a">${faq.a}</div>
    `;
    container.appendChild(item);
  });
}

function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ===== FEEDBACK =====
function showFeedbackSheet() {
  selectedRating = 0;
  selectedFeedbackChips = [];
  document.querySelectorAll('.rating-pill').forEach(p => p.classList.remove('selected'));
  document.getElementById('feedbackOptionsWrap').style.display = 'none';
  document.getElementById('feedbackText').value = '';
  document.getElementById('feedbackOverlay').classList.add('show');
}
function closeFeedbackSheet() {
  document.getElementById('feedbackOverlay').classList.remove('show');
}

function selectRating(rating) {
  selectedRating = rating;
  selectedFeedbackChips = [];
  document.querySelectorAll('.rating-pill').forEach(p => {
    p.classList.toggle('selected', parseInt(p.dataset.rating) === rating);
  });
  const wrap = document.getElementById('feedbackOptionsWrap');
  const chips = document.getElementById('feedbackChips');
  const title = document.getElementById('feedbackOptionsTitle');
  chips.innerHTML = '';
  wrap.style.display = 'block';

  let label = '', options = [];
  if (rating <= 3) { label = 'O que motivou essa nota?'; options = ['Respostas lentas','Informação incorreta','Interface confusa','Faltou opções','Outros']; }
  else if (rating <= 7) { label = 'Como podemos melhorar?'; options = ['Mais opções de ajuda','Respostas mais rápidas','Interface melhor','Mais detalhes','Outros']; }
  else { label = 'O que você mais gostou? 🎉'; options = ['Agilidade','Resolveu meu problema','Interface intuitiva','Atendimento amigável','Outros']; }

  title.textContent = label;
  options.forEach(opt => {
    const chip = document.createElement('button');
    chip.className = 'feedback-chip';
    chip.textContent = opt;
    chip.onclick = () => {
      chip.classList.toggle('selected');
      const idx = selectedFeedbackChips.indexOf(opt);
      if (idx === -1) selectedFeedbackChips.push(opt);
      else selectedFeedbackChips.splice(idx, 1);
    };
    chips.appendChild(chip);
  });
}

function submitFeedback() {
  if (!selectedRating) { showWarningSheet('Por favor, selecione uma nota de 1 a 10.'); return; }
  const text = document.getElementById('feedbackText').value.trim();
  if (text) feedbacks.push(`Nota ${selectedRating}: ${text} [${selectedFeedbackChips.join(', ')}]`);
  closeFeedbackSheet();
  if (selectedRating >= 8) {
    try { if (typeof confetti !== 'undefined') confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); } catch(e) {}
  }
  setTimeout(() => {
    am('Muito obrigada pelo seu feedback! Ele foi enviado ao nosso time responsável. Sua opinião é essencial para melhorarmos 💛');
    if ('vibrate' in navigator) navigator.vibrate(60);
  }, 300);
}

// ===== CONFIRMAÇÃO =====
function showConfirm(title, subtitle, yesCallback) {
  document.getElementById('confirmMessage').textContent = title;
  document.getElementById('confirmSubMessage').textContent = subtitle || '';
  const btn = document.getElementById('confirmYes');
  btn.onclick = () => { yesCallback(); closeConfirm(); };
  document.getElementById('confirmOverlay').classList.add('show');
  setTimeout(() => btn.focus(), 100);
}
function closeConfirm() { document.getElementById('confirmOverlay').classList.remove('show'); }

// ===== WARNING =====
function showWarningSheet(message, title) {
  document.getElementById('warningTitle').textContent = title || 'Atenção';
  document.getElementById('warningMessage').textContent = message;
  document.getElementById('warningOverlay').classList.add('show');
}
function closeWarningSheet() { document.getElementById('warningOverlay').classList.remove('show'); }

// ===== LANG =====
function showLangSheet(message, buttonText, url) {
  document.getElementById('langMessage').textContent = message;
  const btn = document.getElementById('langButton');
  btn.textContent = buttonText;
  btn.onclick = () => {
    if (url !== '#') window.open(url, '_blank', 'noopener,noreferrer');
    else inicio();
    closeLangSheet();
  };
  document.getElementById('langOverlay').classList.add('show');
}
function closeLangSheet() { document.getElementById('langOverlay').classList.remove('show'); }

// ===== BLOCK =====
function showBlockSheet(message) {
  document.getElementById('blockMessage').textContent = message;
  document.getElementById('blockOverlay').classList.add('show');
}
function closeBlockSheet() {
  document.getElementById('blockOverlay').classList.remove('show');
  document.getElementById('ageConfirmBtn').style.display = 'none';
}

function blockChatForUnderage() {
  isChatBlocked = true; blockType = 'underage';
  localStorage.setItem('isChatBlocked','true'); localStorage.setItem('blockType','underage');
  inputArea.style.pointerEvents = 'none'; inputArea.style.opacity = '0.4';
  userInput.disabled = true;
  messageHistory = []; localStorage.removeItem('chatHistory'); localStorage.removeItem('lastMessage');
  showBlockSheet('Chat bloqueado por declaração de idade inapropriada para o ecossistema da Frame. Confirme sua idade para continuar.');
  document.getElementById('ageConfirmBtn').style.display = 'block';
}

function blockChatForBehavior() {
  isChatBlocked = true; blockType = 'behavior';
  blockEndTime = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem('isChatBlocked','true'); localStorage.setItem('blockType','behavior');
  localStorage.setItem('blockEndTime', blockEndTime);
  inputArea.style.pointerEvents = 'none'; inputArea.style.opacity = '0.4';
  userInput.disabled = true;
  messageHistory = []; localStorage.removeItem('chatHistory'); localStorage.removeItem('lastMessage');
  showBlockSheet('Você foi bloqueado por comportamento inadequado. Poderá usar o chat novamente em:');
  startBlockTimer();
}

function checkBlockStatus() {
  if (!isChatBlocked) return;
  inputArea.style.pointerEvents = 'none'; inputArea.style.opacity = '0.4';
  userInput.disabled = true;
  if (blockType === 'behavior') {
    if (Date.now() >= blockEndTime) { removeBlock(); }
    else { showBlockSheet('Bloqueado por comportamento inadequado. Disponível novamente em:'); startBlockTimer(); }
  } else if (blockType === 'underage') {
    showBlockSheet('Chat bloqueado por declaração de idade inapropriada. Confirme sua idade para continuar.');
    document.getElementById('ageConfirmBtn').style.display = 'block';
  }
}

function removeBlock() {
  isChatBlocked = false; blockType = null; blockEndTime = 0;
  localStorage.removeItem('isChatBlocked'); localStorage.removeItem('blockType'); localStorage.removeItem('blockEndTime');
  inputArea.style.pointerEvents = ''; inputArea.style.opacity = '';
  userInput.disabled = false;
}

function startBlockTimer() {
  const el = document.getElementById('blockTimer');
  function update() {
    const rem = blockEndTime - Date.now();
    if (rem <= 0) { removeBlock(); closeBlockSheet(); return; }
    const h = Math.floor(rem / 3600000), m = Math.floor((rem % 3600000) / 60000);
    el.textContent = `${h}h ${m}min restantes`;
  }
  update(); setInterval(update, 60000);
}

// ===== AGE CONFIRM =====
function showAgeConfirmSheet() {
  closeBlockSheet();
  document.getElementById('ageConfirmOverlay').classList.add('show');
}
function closeAgeConfirmSheet() { document.getElementById('ageConfirmOverlay').classList.remove('show'); }

function validateAge() {
  const val = document.getElementById('birthDate').value;
  if (!val) { showWarningSheet('Por favor, informe uma data válida.'); return; }
  const age = (Date.now() - new Date(val).getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  if (age >= 18) {
    localStorage.setItem('ageConfirmed','true');
    removeBlock();
    closeAgeConfirmSheet();
    am('Idade confirmada! Agora você pode usar o ecossistema da Frame Agency. 🎉');
  } else {
    closeAgeConfirmSheet();
    showWarningSheet('Você deve ter ao menos 18 anos para acessar o ecossistema da Frame Agency.');
  }
}

// ===== EMOJI =====
function toggleEmojiOverlay() {
  const ov = document.getElementById('emojiOverlay');
  ov.classList.toggle('open');
}
function closeEmojiOverlay() { document.getElementById('emojiOverlay').classList.remove('open'); }

function setupEmojiGrid() {
  const grid = document.getElementById('emojiGrid');
  if (!grid) return;
  emojis.forEach(obj => {
    const btn = document.createElement('button');
    btn.className = 'emoji-btn-grid';
    btn.textContent = obj.emoji;
    btn.dataset.name = obj.name;
    btn.setAttribute('aria-label', obj.name);
    btn.onclick = () => {
      userInput.value += obj.emoji;
      userInput.focus();
      closeEmojiOverlay();
    };
    grid.appendChild(btn);
  });
}

function filterEmojis() {
  const q = document.getElementById('emojiSearch').value.toLowerCase();
  document.querySelectorAll('.emoji-btn-grid').forEach(btn => {
    btn.style.display = btn.dataset.name.includes(q) ? '' : 'none';
  });
}

// ===== REDIRECT =====
function showRedirectLoading(url, openInBlank = false) {
  const ov = document.getElementById('redirectOverlay');
  ov.classList.add('show');
  setTimeout(() => {
    ov.classList.remove('show');
    if (openInBlank) window.open(url, '_blank', 'noopener,noreferrer');
    else window.location.href = url;
  }, 1800);
}

// ===== FINALIZAR / REINICIAR =====
function finalizeChat() {
  showConfirm('Encerrar este atendimento?', 'Isso voltará à tela inicial.', () => {
    resetFlow();
  });
}

function resetFlow() {
  messageHistory = [];
  localStorage.removeItem('chatHistory'); localStorage.removeItem('lastMessage'); localStorage.removeItem('draft');
  lastMessage = null;
  isChatInitiated = false;
  currentFlowType = null; currentTopic = null;
  localStorage.removeItem('currentTopic');
  awaitingName = false; awaitingEmail = false;
  pendingHandoffContext = false;
  showInitialScreen();
}

function exportHistory() {
  const lines = messageHistory.map(m => {
    const who = m.user ? 'Você' : 'Fabi (Frame Agency)';
    const time = new Date(m.timestamp).toLocaleString('pt-BR');
    const txt = m.text.replace(/<[^>]+>/g,'');
    return `[${time}] ${who}: ${txt}`;
  }).join('\n\n');
  const blob = new Blob([lines || 'Histórico vazio.'], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'historico_frame_chat.txt'; a.click();
  URL.revokeObjectURL(url);
}

function confirmDeleteRecent() {
  showConfirm('Remover mensagem recente?', 'A mensagem será removida da tela inicial.', () => {
    localStorage.removeItem('lastMessage');
    lastMessage = null;
    showInitialScreen();
  });
}

function toggleClosePopup() {
  const cp = document.getElementById('closePopup');
  const rect = document.getElementById('menuBtn').getBoundingClientRect();
  cp.style.top = (rect.bottom + 8) + 'px';
  cp.style.right = (window.innerWidth - rect.right) + 'px';
  cp.style.display = cp.style.display === 'flex' ? 'none' : 'flex';
  cp.style.flexDirection = 'column';
}

// ===== INACTIVIDADE =====
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  if (!isChatInitiated) return;
  inactivityTimer = setTimeout(() => {
    const fn = userInfo ? userInfo.name.split(' ')[0] : '';
    am(inactivityVariations[Math.floor(Math.random()*inactivityVariations.length)].replace('{nome}', fn));
  }, INACTIVITY_TIMEOUT);
}

// ===== OFFLINE =====
function setupOfflineHandling() {
  const el = document.getElementById('offlineWarning');
  window.addEventListener('offline', () => {
    el.textContent = '⚠️ Você está offline';
    el.style.background = 'rgba(239,68,68,0.95)';
    el.style.display = 'block';
  });
  window.addEventListener('online', () => {
    el.textContent = '✅ Conexão restabelecida';
    el.style.background = 'rgba(16,185,129,0.95)';
    el.style.display = 'block';
    while (messageQueue.length > 0) processUserMessage(messageQueue.shift());
    setTimeout(() => { el.style.display = 'none'; }, 3000);
  });
  if (!navigator.onLine) el.style.display = 'block';
}

// ===== STORAGE =====
function saveToStorageSafely(key, value) {
  try {
    if (key === 'chatHistory') {
      const filtered = (Array.isArray(value) ? value : []).filter(m => Date.now() - new Date(m.timestamp).getTime() < HISTORY_AGE_LIMIT);
      if (typeof LZString !== 'undefined') localStorage.setItem(key, LZString.compress(JSON.stringify(filtered)));
    } else {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
  } catch(e) {
    if (e.name === 'QuotaExceededError') { cleanStorageIfNeeded(); }
    else console.error('Storage error:', e);
  }
}

function cleanStorageIfNeeded() {
  try {
    let size = 0;
    for (let k in localStorage) { if (localStorage.hasOwnProperty(k)) size += (localStorage[k].length + k.length) * 2; }
    if (size > MAX_STORAGE_SIZE * 0.8) {
      messageHistory = messageHistory.slice(-Math.floor(MAX_HISTORY / 2));
      if (typeof LZString !== 'undefined') localStorage.setItem('chatHistory', LZString.compress(JSON.stringify(messageHistory)));
    }
  } catch(e) { console.error('cleanStorage error:', e); }
}

// ===== ERROS =====
window.addEventListener('error', e => { console.error('[FrameBot]', e.message); });

// ===== INICIALIZAÇÃO =====
window.onload = () => {
  if (typeof LZString === 'undefined') {
    // Aguarda LZ-String carregar (o script já chama initChat no onload)
    return;
  }
  initChat();
};