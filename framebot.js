// ===== Meta Viewport =====
const metaViewport = document.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(metaViewport);

// ===== LZ-String para compressão =====
const lzScript = document.createElement('script');
lzScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js';
lzScript.onload = () => { initChat(); };
lzScript.onerror = () => {
  console.error('LZ-String falhou, usando fallback.');
  window.LZString = { compress: d => d, decompress: d => d };
  initChat();
};
document.head.appendChild(lzScript);

// ===== Canvas Confetti =====
const confettiScript = document.createElement('script');
confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
document.head.appendChild(confettiScript);

// ===== Fontes =====
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap';
fontLink.rel = 'preload';
fontLink.as = 'style';
fontLink.onload = function() { this.rel = 'stylesheet'; };
document.head.appendChild(fontLink);

// ===== CSS Premium =====
const style = document.createElement('style');
style.textContent = `
:root {
  --bg-color: #f7f5f2;
  --text-color: #1a1a1a;
  --accent-color: #AB865B;
  --accent-light: #D3AD83;
  --accent-dark: #8a6840;
  --secondary-bg: #ffffff;
  --border-color: rgba(171,134,91,0.15);
  --shadow-color: rgba(0,0,0,0.08);
  --shadow-md: rgba(0,0,0,0.14);
  --input-bg: #ffffff;
  --beige-bg: #f5f1eb;
  --msg-bg: #f0ede8;
  --user-msg-bg: #AB865B;
  --typing-color: #888;
  --note-bg: #faf7f3;
  --header-gradient: linear-gradient(135deg, #AB865B 0%, #C9A070 50%, #D3AD83 100%);
  --sheet-handle: rgba(171,134,91,0.3);
  --chip-border: rgba(171,134,91,0.4);
}
body.dark {
  --bg-color: #111111;
  --text-color: #f0ede8;
  --secondary-bg: #1c1c1c;
  --border-color: rgba(211,173,131,0.12);
  --shadow-color: rgba(0,0,0,0.5);
  --shadow-md: rgba(0,0,0,0.6);
  --input-bg: #242424;
  --beige-bg: #1a1a1a;
  --msg-bg: #2a2826;
  --user-msg-bg: #C9A070;
  --typing-color: #aaa;
  --note-bg: #1e1c1a;
  --sheet-handle: rgba(211,173,131,0.2);
}
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
body {
  font-family: 'Montserrat', 'Inter', sans-serif;
  margin: 0;
  color: var(--text-color);
  background: var(--bg-color);
}
/* ===== Container principal (página dedicada full) ===== */
.c {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 400px;
  max-width: calc(100vw - 48px);
  height: calc(100vh - 48px);
  max-height: 720px;
  background: var(--secondary-bg);
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
}

@media (max-width: 480px) {
  .c {
    bottom: 0;
    right: 0;
    width: 100%;
    max-width: 100%;
    height: 100%;
    height: 100dvh;
    border-radius: 0;
    box-shadow: none;
  }
}
/* ===== Header ===== */
.h {
  background: var(--header-gradient);
  color: #fff;
  padding: 14px 16px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  flex-shrink: 0;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 2px 12px rgba(171,134,91,0.25);
}
.h-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.6);
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.h-info {
  flex: 1;
  min-width: 0;
}
.h-name {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.h-status {
  font-size: 11px;
  font-family: 'Inter', sans-serif;
  opacity: 0.85;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 1px;
}
.h-status-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 4px rgba(74,222,128,0.7);
  display: inline-block;
  animation: pulse-dot 2s infinite;
}
@keyframes pulse-dot {
  0%,100% { opacity: 1; }
  50% { opacity: 0.5; }
}
/* ===== Menu Hamburger ===== */
.menu-btn {
  position: relative;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: none;
  background: transparent;
}
.menu-btn:hover { background: rgba(255,255,255,0.15); }
.menu-btn svg { width: 22px; height: 22px; stroke: #fff; }
/* ===== Close icon ===== */
.close-icon-btn {
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: none;
  background: transparent;
}
.close-icon-btn:hover { background: rgba(255,255,255,0.15); }
.close-icon-btn svg { width: 22px; height: 22px; stroke: #fff; }
/* ===== Body do chat ===== */
.b {
  flex: 1;
  padding: 16px 14px 8px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-size: 14px;
  scroll-behavior: smooth;
  position: relative;
  background: var(--bg-color);
}
.b::-webkit-scrollbar { width: 4px; }
.b::-webkit-scrollbar-track { background: transparent; }
.b::-webkit-scrollbar-thumb { background: var(--accent-light); border-radius: 4px; opacity: 0.5; }
/* ===== Mensagens ===== */
.msg {
  display: flex;
  gap: 8px;
  animation: msgIn 0.35s cubic-bezier(0.34,1.2,0.64,1) forwards;
  opacity: 0;
  max-width: 100%;
}
.msg img.avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  object-fit: cover;
  box-shadow: 0 1px 4px var(--shadow-color);
  align-self: flex-end;
}
.msg.user-msg {
  justify-content: flex-end;
}
.msg.user-msg .avatar { display: none; }
@keyframes msgIn {
  from { opacity: 0; transform: translateY(12px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes msgInRight {
  from { opacity: 0; transform: translateX(12px) scale(0.97); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}
.msg.user-msg { animation: msgInRight 0.3s cubic-bezier(0.34,1.2,0.64,1) forwards; }
.bb {
  background: var(--msg-bg);
  padding: 10px 14px;
  border-radius: 18px 18px 18px 4px;
  max-width: 78%;
  word-break: break-word;
  box-shadow: 0 1px 4px var(--shadow-color);
  line-height: 1.5;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  position: relative;
}
.user-msg .bb {
  background: var(--user-msg-bg);
  color: #fff;
  border-radius: 18px 18px 4px 18px;
  box-shadow: 0 2px 8px rgba(171,134,91,0.3);
}
.bb.error { background: #fde8e8; color: #c0392b; }
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
/* ===== Quick reply buttons ===== */
.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 10px;
}
.btn {
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  border: 1.5px solid var(--accent-color);
  background: transparent;
  color: var(--accent-color);
  transition: all 0.22s ease;
  letter-spacing: 0.01em;
}
.btn:hover {
  background: var(--accent-color);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(171,134,91,0.25);
}
.btn.p {
  background: var(--accent-color);
  color: #fff;
  border-color: var(--accent-color);
}
.btn.p:hover { background: var(--accent-dark); border-color: var(--accent-dark); }
.btn:disabled, .btn.clicked { opacity: 0.5; pointer-events: none; }
/* ===== Input box ===== */
.input-area {
  padding: 10px 12px 12px;
  background: var(--secondary-bg);
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}
.input-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px 8px 16px;
  background: var(--beige-bg);
  border-radius: 30px;
  border: 1.5px solid var(--border-color);
  transition: all 0.25s ease;
  box-shadow: 0 2px 10px rgba(171,134,91,0.08);
  min-height: 54px;
}
.input-box.focused {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(171,134,91,0.12);
  background: var(--input-bg);
}
.input-box input {
  border: none;
  outline: none;
  flex: 1;
  background: transparent;
  color: var(--text-color);
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  min-width: 0;
  padding: 0;
}
.input-box input::placeholder {
  color: var(--typing-color);
  opacity: 0.7;
  font-size: 15px;
}
.emoji-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px; height: 34px;
  border-radius: 50%;
  outline: none;
  padding: 0;
  transition: all 0.2s ease;
  flex-shrink: 0;
  color: var(--accent-color);
}
.emoji-btn:hover { background: rgba(171,134,91,0.1); }
.emoji-btn svg { width: 20px; height: 20px; fill: var(--accent-color); }
.send-btn {
  background: var(--accent-color);
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px; height: 38px;
  border-radius: 50%;
  outline: none;
  padding: 0;
  transition: all 0.25s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(171,134,91,0.3);
}
.send-btn:hover {
  background: var(--accent-dark);
  transform: scale(1.06);
  box-shadow: 0 4px 12px rgba(171,134,91,0.4);
}
.send-btn:active { transform: scale(0.95); }
.send-btn svg { width: 18px; height: 18px; stroke: #fff; fill: none; stroke-width: 2.2; }
/* ===== Footer note ===== */
.f {
  font-size: 10.5px;
  font-family: 'Inter', sans-serif;
  text-align: center;
  line-height: 1.45;
  padding: 6px 12px 2px;
  color: var(--typing-color);
}
.f a, .link {
  color: var(--accent-color);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  transition: color 0.2s;
  cursor: pointer;
}
.f a:hover, .link:hover { color: var(--accent-dark); }
/* ===== Overlays ===== */
.o {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.55);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(3px);
  animation: fadein 0.25s ease;
}
.o.show { display: flex; }
.oc {
  background: var(--secondary-bg);
  padding: 24px;
  border-radius: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 280px;
  max-width: 320px;
  position: relative;
  box-shadow: 0 8px 30px var(--shadow-md);
  animation: scaleIn 0.3s cubic-bezier(0.34,1.2,0.64,1);
}
@keyframes scaleIn {
  from { transform: scale(0.88); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
.oc button {
  padding: 11px 18px;
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  transition: all 0.22s ease;
}
.oc button:hover { background: var(--accent-dark); transform: translateY(-1px); }
.close-x {
  position: absolute;
  top: 12px; right: 14px;
  font-size: 18px;
  cursor: pointer;
  color: var(--typing-color);
  transition: color 0.2s;
  line-height: 1;
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
}
.close-x:hover { color: var(--accent-color); background: rgba(171,134,91,0.1); }
/* ===== Bottom Sheet ===== */
.sheet-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.55);
  z-index: 10002;
  display: none;
  backdrop-filter: blur(3px);
  animation: fadein 0.25s ease;
}
.sheet-overlay.show { display: flex; align-items: flex-end; justify-content: center; }
.sheet-container {
  background: var(--secondary-bg);
  border-radius: 24px 24px 0 0;
  padding: 0 20px 28px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 -8px 40px rgba(0,0,0,0.18);
  animation: slideUp 0.38s cubic-bezier(0.34,1.1,0.64,1);
  max-height: 90vh;
  overflow-y: auto;
}
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0.6; }
  to { transform: translateY(0); opacity: 1; }
}
.sheet-handle {
  width: 40px; height: 4px;
  background: var(--sheet-handle);
  border-radius: 4px;
  margin: 14px auto 20px;
}
.sheet-title {
  font-size: 17px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  color: var(--text-color);
  margin-bottom: 6px;
  text-align: center;
}
.sheet-subtitle {
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  color: var(--typing-color);
  text-align: center;
  margin-bottom: 20px;
}
/* ===== Handoff Bottom Sheet (3 opções) ===== */
.handoff-options {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.handoff-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 18px 10px;
  border: 1.5px solid var(--border-color);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.22s ease;
  background: var(--note-bg);
  text-decoration: none;
  color: var(--text-color);
}
.handoff-option:hover {
  border-color: var(--accent-color);
  background: rgba(171,134,91,0.07);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(171,134,91,0.15);
}
.handoff-option svg { width: 28px; height: 28px; stroke: var(--accent-color); }
.handoff-option span {
  font-size: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  text-align: center;
  line-height: 1.3;
}
/* ===== Feedback Bottom Sheet ===== */
.rating-track {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 6px 0 16px;
}
.rating-star {
  flex: 1;
  height: 44px;
  border-radius: 12px;
  border: 1.5px solid var(--border-color);
  background: var(--note-bg);
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  color: var(--typing-color);
  transition: all 0.2s ease;
  display: flex; align-items: center; justify-content: center;
}
.rating-star:hover { border-color: var(--accent-color); background: rgba(171,134,91,0.08); color: var(--accent-color); }
.rating-star.selected { background: var(--accent-color); border-color: var(--accent-color); color: #fff; transform: scale(1.06); }
.feedback-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;
}
.chip {
  padding: 7px 14px;
  border-radius: 20px;
  border: 1.5px solid var(--chip-border);
  font-size: 12px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-color);
  background: var(--note-bg);
}
.chip:hover { border-color: var(--accent-color); color: var(--accent-color); }
.chip.selected { background: var(--accent-color); color: #fff; border-color: var(--accent-color); }
.feedback-textarea {
  width: 100%;
  min-height: 90px;
  padding: 12px 14px;
  border: 1.5px solid var(--border-color);
  border-radius: 14px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  resize: vertical;
  background: var(--input-bg);
  color: var(--text-color);
  outline: none;
  transition: border 0.2s;
  margin: 10px 0;
}
.feedback-textarea:focus { border-color: var(--accent-color); }
.sheet-submit-btn {
  width: 100%;
  padding: 14px;
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.22s;
  letter-spacing: 0.01em;
}
.sheet-submit-btn:hover { background: var(--accent-dark); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(171,134,91,0.3); }
/* ===== Menu lateral ===== */
.menu-content {
  background: var(--secondary-bg);
  border-radius: 20px;
  padding: 20px 0 10px;
  min-width: 260px;
  max-width: 300px;
  width: 92%;
  text-align: left;
  box-shadow: 0 8px 30px var(--shadow-md);
  animation: scaleIn 0.3s cubic-bezier(0.34,1.2,0.64,1);
}
.menu-header {
  padding: 4px 20px 16px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 20px;
  cursor: pointer;
  transition: all 0.18s ease;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  color: var(--text-color);
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
}
.menu-item:hover { background: rgba(171,134,91,0.07); color: var(--accent-color); }
.menu-item:hover svg { stroke: var(--accent-color); }
.menu-item svg { width: 20px; height: 20px; stroke: var(--typing-color); fill: none; stroke-width: 1.8; flex-shrink: 0; transition: stroke 0.18s; }
.menu-divider { height: 1px; background: var(--border-color); margin: 6px 0; }
.menu-policy {
  text-align: center;
  padding: 10px 20px 8px;
  font-size: 12px;
  font-family: 'Inter', sans-serif;
  color: var(--typing-color);
}
.menu-policy a {
  color: var(--accent-color);
  text-decoration: underline;
  cursor: pointer;
}
/* ===== Tela inicial ===== */
.initial-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  text-align: center;
  padding: 24px 20px;
  gap: 18px;
  animation: msgIn 0.4s ease forwards;
  color: var(--text-color);
}
.initial-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 20px 0 10px;
}
.initial-hero img {
  width: 80px; height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent-light);
  box-shadow: 0 4px 20px rgba(171,134,91,0.2);
}
.initial-hero h2 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
}
.initial-hero p {
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  color: var(--typing-color);
  margin: 0;
  line-height: 1.5;
  max-width: 280px;
}
.privacy-note {
  background: var(--note-bg);
  border: 1px solid var(--border-color);
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 11.5px;
  font-family: 'Inter', sans-serif;
  color: var(--typing-color);
  text-align: center;
  width: 100%;
  line-height: 1.5;
}
.start-btn-main {
  width: 100%;
  padding: 15px;
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
  box-shadow: 0 4px 16px rgba(171,134,91,0.3);
  letter-spacing: 0.01em;
}
.start-btn-main:hover { background: var(--accent-dark); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(171,134,91,0.4); }
.faq-entry {
  width: 100%;
  background: var(--note-bg);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.22s ease;
  text-decoration: none;
  color: var(--text-color);
}
.faq-entry:hover { border-color: var(--accent-color); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(171,134,91,0.12); }
.faq-entry-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(171,134,91,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.faq-entry-icon svg { width: 20px; height: 20px; stroke: var(--accent-color); fill: none; }
.faq-entry-text { flex: 1; text-align: left; }
.faq-entry-text strong { font-size: 13.5px; font-weight: 600; display: block; }
.faq-entry-text span { font-size: 12px; font-family: 'Inter', sans-serif; color: var(--typing-color); }
.faq-entry-arrow { color: var(--accent-color); font-size: 18px; }
/* ===== Typing indicator ===== */
.typing-bubble .bb {
  background: var(--msg-bg);
  padding: 10px 16px;
  min-width: 60px;
}
.dots { display: flex; gap: 5px; align-items: center; height: 16px; }
.dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--accent-light);
  animation: blink 1.3s infinite ease-in-out;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink {
  0%,100% { opacity: 0.3; transform: scale(0.85); }
  50% { opacity: 1; transform: scale(1.1); }
}
/* ===== Scroll down btn ===== */
.scroll-down-btn {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: var(--secondary-bg);
  border: 1.5px solid var(--border-color);
  color: var(--accent-color);
  border-radius: 20px;
  padding: 6px 16px 6px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.34,1.2,0.64,1);
  z-index: 10;
  font-size: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  box-shadow: 0 3px 14px rgba(0,0,0,0.1);
  white-space: nowrap;
}
.scroll-down-btn.show {
  opacity: 1;
  pointer-events: all;
  transform: translateX(-50%) translateY(0);
}
.scroll-down-btn:hover { transform: translateX(-50%) translateY(-2px); box-shadow: 0 5px 18px rgba(0,0,0,0.14); }
.scroll-down-btn svg { width: 14px; height: 14px; stroke: var(--accent-color); fill: none; stroke-width: 2.5; }
/* ===== Loading spinner ===== */
.loading-spinner {
  width: 36px; height: 36px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--accent-color);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  margin: 18px auto;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
/* ===== Chat starter label ===== */
.chat-starter {
  text-align: center;
  font-size: 10.5px;
  font-family: 'Inter', sans-serif;
  color: var(--typing-color);
  opacity: 0.7;
  padding: 0 0 4px;
}
/* ===== Warning/info note ===== */
.warning-note {
  background: var(--note-bg);
  border: 1px solid var(--border-color);
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 12.5px;
  font-family: 'Inter', sans-serif;
  color: var(--typing-color);
  text-align: center;
  margin: 4px 0;
  animation: msgIn 0.35s ease forwards;
  opacity: 0;
}
/* ===== Mini toast notification ===== */
.toast-notify {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: #1a1a1a;
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  z-index: 20000;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.34,1.2,0.64,1);
  white-space: nowrap;
}
.toast-notify.show { opacity: 1; transform: translateX(-50%) translateY(0); }
/* ===== Offline warning ===== */
.offline-warning {
  position: absolute;
  top: 60px; left: 50%;
  transform: translateX(-50%);
  background: rgba(220,38,38,0.1);
  color: #dc2626;
  padding: 6px 14px;
  border-radius: 8px;
  z-index: 10;
  font-size: 12px;
  font-family: 'Inter', sans-serif;
  text-align: center;
  display: none;
  border: 1px solid rgba(220,38,38,0.2);
}
/* ===== Close popup (menu de contexto) ===== */
#closePopup {
  position: absolute;
  background: var(--secondary-bg);
  border-radius: 14px;
  box-shadow: 0 6px 24px var(--shadow-md);
  padding: 8px;
  width: 200px;
  z-index: 10001;
  display: none;
  flex-direction: column;
  gap: 2px;
  border: 1px solid var(--border-color);
}
#closePopup button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: transparent;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  font-size: 13.5px;
  font-family: 'Inter', sans-serif;
  transition: all 0.18s;
  text-align: left;
}
#closePopup button:hover { background: rgba(171,134,91,0.08); color: var(--accent-color); }
#closePopup button svg { width: 16px; height: 16px; flex-shrink: 0; }
/* ===== FAQ imersiva ===== */
.faq-sheet-content {
  padding: 0 0 10px;
}
.faq-search {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--border-color);
  border-radius: 12px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  background: var(--input-bg);
  color: var(--text-color);
  outline: none;
  margin-bottom: 16px;
  transition: border 0.2s;
}
.faq-search:focus { border-color: var(--accent-color); }
.faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.faq-item {
  border: 1px solid var(--border-color);
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.22s ease;
  background: var(--note-bg);
}
.faq-item.open { border-color: var(--accent-color); background: var(--secondary-bg); }
.faq-q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13.5px;
  gap: 12px;
}
.faq-q span { flex: 1; }
.faq-q-icon {
  width: 22px; height: 22px;
  border-radius: 50%;
  background: rgba(171,134,91,0.1);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: var(--accent-color);
  font-size: 14px;
  transition: transform 0.3s;
}
.faq-item.open .faq-q-icon { transform: rotate(45deg); background: var(--accent-color); color: #fff; }
.faq-a {
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  color: var(--typing-color);
  line-height: 1.6;
  padding: 0 16px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.2s;
}
.faq-item.open .faq-a { max-height: 400px; padding: 0 16px 14px; }
.faq-start-btn {
  width: 100%;
  margin-top: 16px;
  padding: 13px;
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.22s;
}
.faq-start-btn:hover { background: var(--accent-dark); }
/* ===== Blocked overlay (fixo, sem fechar) ===== */
.block-overlay-fixed {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.75);
  z-index: 20001;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
}
.block-card {
  background: var(--secondary-bg);
  border-radius: 20px;
  padding: 28px 24px;
  max-width: 320px;
  width: 92%;
  text-align: center;
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
}
.block-icon {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: rgba(220,38,38,0.1);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
}
.block-icon svg { width: 28px; height: 28px; stroke: #dc2626; fill: none; }
.block-title { font-size: 17px; font-weight: 700; margin-bottom: 10px; }
.block-msg { font-size: 13.5px; font-family: 'Inter', sans-serif; color: var(--typing-color); line-height: 1.5; }
.block-timer { font-size: 22px; font-weight: 700; color: var(--accent-color); margin: 14px 0; font-variant-numeric: tabular-nums; }
/* ===== Email input bonito ===== */
.chat-email-input-wrap {
  background: var(--secondary-bg);
  border: 1.5px solid var(--border-color);
  border-radius: 16px;
  padding: 14px 16px;
  margin: 8px 0;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: border 0.2s;
}
.chat-email-input-wrap.focused { border-color: var(--accent-color); }
.chat-email-label {
  font-size: 11px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: var(--typing-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}
.chat-email-input {
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-color);
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  width: 100%;
}
.chat-email-input::placeholder { color: var(--typing-color); opacity: 0.6; }
.chat-inline-form {
  background: var(--secondary-bg);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 16px;
  margin: 4px 0;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  animation: msgIn 0.35s ease forwards;
  opacity: 0;
}
.chat-confirm-btn {
  width: 100%;
  padding: 13px;
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
  transition: all 0.22s;
}
.chat-confirm-btn:hover { background: var(--accent-dark); }
.chat-confirm-btn:disabled { opacity: 0.5; pointer-events: none; }
/* ===== Checkbox maioridade ===== */
.age-checkbox-wrap {
  background: var(--secondary-bg);
  border: 1.5px solid var(--border-color);
  border-radius: 16px;
  padding: 16px;
  margin: 4px 0;
  animation: msgIn 0.35s ease forwards;
  opacity: 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
}
.age-checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 13.5px;
  font-family: 'Inter', sans-serif;
  line-height: 1.4;
}
.age-checkbox-label input[type="checkbox"] {
  width: 20px; height: 20px;
  accent-color: var(--accent-color);
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 1px;
}
/* ===== Profile edit ===== */
.profile-edit-form {
  background: var(--secondary-bg);
  border-radius: 18px;
  padding: 22px 18px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
.profile-edit-form h3 { font-size: 16px; font-weight: 600; margin: 0 0 16px; text-align: center; }
.profile-field { margin-bottom: 14px; }
.profile-field label { font-size: 11px; font-family: 'Inter', sans-serif; font-weight: 600; color: var(--typing-color); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px; }
.profile-field input {
  width: 100%; padding: 12px 14px;
  border: 1.5px solid var(--border-color);
  border-radius: 12px;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  background: var(--input-bg);
  color: var(--text-color);
  outline: none;
  transition: border 0.2s;
}
.profile-field input:focus { border-color: var(--accent-color); }
.profile-field input.masked { color: var(--typing-color); }
.profile-save-btn {
  width: 100%; padding: 14px;
  background: var(--accent-color); color: #fff;
  border: none; border-radius: 12px;
  font-size: 15px; font-family: 'Inter', sans-serif; font-weight: 600;
  cursor: pointer; transition: all 0.22s;
}
.profile-save-btn:hover { background: var(--accent-dark); }
.profile-edit-note {
  font-size: 11.5px; font-family: 'Inter', sans-serif;
  color: var(--typing-color); text-align: center;
  margin-top: 12px; line-height: 1.5;
}
.profile-edit-note a { color: var(--accent-color); text-decoration: underline; }
/* ===== Emoji overlay ===== */
.emoji-overlay-box {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 0; right: 0;
  background: var(--secondary-bg);
  border-radius: 18px;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.12);
  padding: 14px;
  z-index: 10001;
  border: 1px solid var(--border-color);
  animation: slideUp 0.3s ease;
}
.emoji-search-input {
  width: 100%;
  padding: 9px 14px;
  border: 1.5px solid var(--border-color);
  border-radius: 10px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  background: var(--beige-bg);
  color: var(--text-color);
  outline: none;
  margin-bottom: 10px;
}
.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 6px;
  max-height: 180px;
  overflow-y: auto;
}
.emoji-btn-grid {
  font-size: 22px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.15s ease;
  border-radius: 8px;
  padding: 4px;
  aspect-ratio: 1;
  display: flex; align-items: center; justify-content: center;
}
.emoji-btn-grid:hover { transform: scale(1.3); background: rgba(171,134,91,0.1); }
/* ===== Animações extras ===== */
@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(-8px) scale(0.97); }
}
/* ===== Input warning ===== */
.input-warning-note {
  font-size: 12px; font-family: 'Inter', sans-serif;
  color: var(--accent-color); text-align: center;
  padding: 4px 0 0;
  display: none;
}
/* ===== Acessibilidade ===== */
:focus-visible { outline: 2px solid var(--accent-color); outline-offset: 2px; border-radius: 8px; }
/* ===== Mobile ===== */
@media (max-width: 480px) {
  .c { max-width: 100%; }
  .handoff-options { gap: 8px; }
  .handoff-option { padding: 14px 8px; }
  .handoff-option span { font-size: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
/* ===== Semibold util ===== */
.semibold { font-weight: 600; }
`;
document.head.appendChild(style);

// ===== Injetar HTML =====
const chatContainer = document.createElement('div');
chatContainer.innerHTML = `
<div class="c" id="cb" role="dialog" aria-label="Chatbot da Frame Agency" aria-live="polite">
  <!-- Header -->
  <div class="h" id="header">
    <img class="h-avatar" src="https://framerusercontent.com/images/wWIH1Nc4iXNLDhzo8ocpzNjiQY.png" alt="Fabi - Assistente Virtual Frame">
    <div class="h-info">
      <div class="h-name" id="welcomeText">Fabi · Frame Agency</div>
      <div class="h-status"><span class="h-status-dot"></span><span id="statusLabel">Online agora</span></div>
    </div>
    <button class="menu-btn" id="menuTrigger" onclick="openMenu()" aria-label="Abrir menu" aria-expanded="false" aria-controls="menuDialog">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round">
        <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
      </svg>
    </button>
    <button class="close-icon-btn" id="closeIconBtn" onclick="toggleClosePopup()" aria-label="Opções">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
      </svg>
    </button>
  </div>

  <!-- Body -->
  <div class="b" id="bd" role="log" aria-atomic="false">
    <div id="offlineWarning" class="offline-warning">Você está offline</div>
  </div>

  <!-- Scroll down btn -->
  <div class="scroll-down-btn" id="scrollDownBtn" onclick="scrollToBottomSmooth()" role="button" aria-label="Rolar para baixo">
    <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
    Nova mensagem
  </div>

  <!-- Input area -->
  <div class="input-area" id="inputArea" style="display:none;">
    <div class="input-box" id="inputBox">
      <input type="text" id="userInput" placeholder="Enviar mensagem..." aria-label="Digite sua mensagem" autocomplete="off">
      <button class="emoji-btn" id="emojiBtn" aria-label="Emoji">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42c-.78-.79-2.04-.79-2.82 0-.78.79-.78 2.05 0 2.83.78.79 2.04.79 2.82 0 .78-.78.78-2.04 0-2.83zm-6.18 0c-.78-.79-2.04-.79-2.82 0-.78.79-.78 2.05 0 2.83.78.79 2.04.79 2.82 0 .78-.78.78-2.04 0-2.83zm5.59 5.42c-.5 1.25-1.72 2-3 2s-2.5-.75-3-2h-2c.64 2.14 2.73 3.75 5 3.75s4.36-1.61 5-3.75h-2z"/></svg>
      </button>
      <button class="send-btn" id="sendBtn" aria-label="Enviar">
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
    <!-- Emoji overlay (inside input-area for positioning) -->
    <div id="emojiOverlay" class="emoji-overlay-box" style="display:none;">
      <input type="text" id="emojiSearch" class="emoji-search-input" placeholder="Buscar emoji..." oninput="filterEmojis()" aria-label="Buscar emoji">
      <div class="emoji-grid" id="emojiGrid"></div>
    </div>
    <div class="input-warning-note" id="inputWarning">Inicie o atendimento para enviar mensagens</div>
    <div class="f">Utilizamos os dados de conversas para evoluir. Consulte nossa <a href="https://frameag.com/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.</div>
  </div>
</div>

<!-- Loading spinner global -->
<div class="loading-spinner" id="loadingSpinner" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:20000;"></div>

<!-- Menu overlay -->
<div class="o" id="menuDialog" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="menu-content" id="menuOverlay">
    <div class="menu-header">
      <span>Menu</span>
      <span class="close-x" onclick="closeMenu()" style="position:static; font-size:16px;" role="button" aria-label="Fechar menu" tabindex="0">✕</span>
    </div>
    <button class="menu-item" id="darkModeBtn" onclick="toggleDarkMode()">
      <svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      Ativar Modo Escuro
    </button>
    <button class="menu-item" onclick="clearChatHistory()">
      <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      Limpar Histórico
    </button>
    <button class="menu-item" onclick="editProfile()">
      <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      Editar meu Perfil
    </button>
    <button class="menu-item" onclick="showRedirectLoading('https://frameag.com/models', false)">
      <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
      Catálogo de Modelos
    </button>
    <button class="menu-item" onclick="openHandoffSheet()">
      <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      Atendimento Humano
    </button>
    <div class="menu-divider"></div>
    <button class="menu-item" onclick="openFeedbackSheet()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2l.19.94a4 4 0 0 0 2.57 2.974L8 6l-.24.086A4 4 0 0 0 5.19 9.06L5 10l-.19-.94a4 4 0 0 0-2.57-2.974L2 6l.24-.086A4 4 0 0 0 4.81 2.94L5 2z"/><path d="M8 16l.23 1.276a2 2 0 0 0 1.219 1.501L10 19l-.551.223a2 2 0 0 0-1.22 1.5L8 22l-.23-1.276a2 2 0 0 0-1.219-1.501L6 19l.551-.223a2 2 0 0 0 1.22-1.5L8 16z"/><path d="M16 3l.556 2.654a8 8 0 0 0 5.213 5.92L23 12l-1.231.426a8 8 0 0 0-5.213 5.92L16 21l-.556-2.654a8 8 0 0 0-5.213-5.92L9 12l1.231-.426a8 8 0 0 0 5.213-5.92L16 3z"/></svg>
      Avaliar Experiência
    </button>
    <div class="menu-policy">
      <a onclick="openPolicySheet()" tabindex="0">Política de uso do chat</a>
    </div>
  </div>
</div>

<!-- Close popup (contexto) -->
<div id="closePopup">
  <button onclick="resetFlow()">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
    Reiniciar Chat
  </button>
  <button onclick="exportHistory()">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    Exportar Conversa
  </button>
  <button onclick="finalizeChat()">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    Finalizar Chat
  </button>
</div>

<!-- Confirm dialog -->
<div class="o" id="confirmOverlay" role="dialog" aria-modal="true">
  <div class="oc">
    <div class="close-x" onclick="closeConfirm()" role="button" tabindex="0">✕</div>
    <p id="confirmMessage" style="font-family:'Inter',sans-serif; font-size:14px; line-height:1.5;"></p>
    <button id="confirmYes" class="btn p">Sim, continuar</button>
    <button onclick="closeConfirm()" class="btn" style="background:transparent; color:var(--text-color);">Cancelar</button>
  </div>
</div>

<!-- Lang popup -->
<div class="o" id="langOverlay" role="dialog" aria-modal="true">
  <div class="oc">
    <div class="close-x" onclick="closeLangPopup()" role="button" tabindex="0">✕</div>
    <p id="langMessage" style="font-family:'Inter',sans-serif; font-size:14px; line-height:1.5;"></p>
    <button id="langButton" class="btn p"></button>
  </div>
</div>

<!-- Warning overlay -->
<div class="o" id="warningOverlay" role="dialog" aria-modal="true">
  <div class="oc">
    <div class="close-x" onclick="closeWarningPopup()" role="button" tabindex="0">✕</div>
    <p id="warningMessage" style="font-family:'Inter',sans-serif; font-size:14px; line-height:1.5;"></p>
    <button onclick="closeWarningPopup()" class="btn p">Entendi</button>
  </div>
</div>

<!-- Age confirm overlay -->
<div class="o" id="ageConfirmOverlay" role="dialog" aria-modal="true">
  <div class="oc" style="align-items:center; text-align:center;">
    <div class="close-x" onclick="closeAgeConfirm()" role="button" tabindex="0">✕</div>
    <p style="font-family:'Inter',sans-serif; font-weight:500; font-size:14px;">Confirme sua data de nascimento</p>
    <input type="date" id="birthDate" aria-label="Data de nascimento" style="border:1.5px solid var(--accent-light); border-radius:12px; padding:10px 14px; font-size:15px; color:var(--accent-color); font-weight:600; background:var(--input-bg); outline:none; width:100%;">
    <button onclick="validateAge()" class="btn p" style="width:100%; margin-top:8px;">Confirmar Idade</button>
  </div>
</div>

<!-- Redirect overlay -->
<div class="o" id="redirectOverlay" style="background:rgba(0,0,0,0.5);">
  <div class="oc" style="align-items:center;">
    <div class="loading-spinner" style="margin:0 auto;"></div>
    <p style="font-family:'Inter',sans-serif; font-size:14px; color:var(--typing-color);">Redirecionando...</p>
  </div>
</div>

<!-- ===== BOTTOM SHEETS ===== -->

<!-- Handoff Sheet -->
<div class="sheet-overlay" id="handoffSheet" role="dialog" aria-modal="true" aria-label="Escolher canal de atendimento">
  <div class="sheet-container">
    <div class="sheet-handle"></div>
    <div class="sheet-title">Como prefere ser atendido?</div>
    <div class="sheet-subtitle">Escolha o canal mais conveniente para você</div>
    <div class="handoff-options">
      <a class="handoff-option" href="https://t.me/suporteframebot?start=chatbot-site" target="_blank" rel="noopener noreferrer" onclick="closeHandoffSheet()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 19c3.771 0 5.657 0 6.828-1.172C22 16.657 22 14.771 22 11c0-3.771 0-5.657-1.172-6.828C19.657 3 17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172 2 5.343 2 7.229 2 11c0 3.771 0 5.657 1.172 6.828.653.654 1.528.943 2.828 1.07"/><path d="M12 11v.01"/><path d="M8 11v.01"/><path d="M16 11v.01"/><path d="M14 19c-1.236 0-2.598.5-3.841 1.145-1.998 1.037-2.997 1.556-3.489 1.225-.492-.33-.399-1.355-.212-3.404L6.5 17.5"/></svg>
        <span>Chat 24h<br>Telegram</span>
      </a>
      <a class="handoff-option" href="mailto:contato@frameag.com?subject=Solicita%C3%A7%C3%A3o%20de%20suporte%20-%20Frame&body=Ol%C3%A1%2C%20time%20Frame!%20Gostaria%20de%20solicitar%20ajuda%20para%3A%0A" onclick="closeHandoffSheet()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z"/><path d="M2 8l7.501 6.001a4 4 0 0 0 4.998 0L22 8"/></svg>
        <span>E-mail<br>Suporte</span>
      </a>
      <div class="handoff-option" onclick="closeHandoffSheet()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2l.19.94a4 4 0 0 0 2.57 2.974L8 6l-.24.086A4 4 0 0 0 5.19 9.06L5 10l-.19-.94a4 4 0 0 0-2.57-2.974L2 6l.24-.086A4 4 0 0 0 4.81 2.94L5 2z"/><path d="M8 16l.23 1.276a2 2 0 0 0 1.219 1.501L10 19l-.551.223a2 2 0 0 0-1.22 1.5L8 22l-.23-1.276a2 2 0 0 0-1.219-1.501L6 19l.551-.223a2 2 0 0 0 1.22-1.5L8 16z"/><path d="M16 3l.556 2.654a8 8 0 0 0 5.213 5.92L23 12l-1.231.426a8 8 0 0 0-5.213 5.92L16 21l-.556-2.654a8 8 0 0 0-5.213-5.92L9 12l1.231-.426a8 8 0 0 0 5.213-5.92L16 3z"/></svg>
        <span>Continuar<br>aqui</span>
      </div>
    </div>
  </div>
</div>

<!-- Feedback Sheet -->
<div class="sheet-overlay" id="feedbackSheet" role="dialog" aria-modal="true" aria-label="Avaliação de experiência">
  <div class="sheet-container">
    <div class="sheet-handle"></div>
    <div class="sheet-title">Como foi sua experiência?</div>
    <div class="sheet-subtitle">Sua opinião nos ajuda a melhorar</div>
    <div class="rating-track" id="ratingTrack">
      <button class="rating-star" onclick="selectRating(1)">1</button>
      <button class="rating-star" onclick="selectRating(2)">2</button>
      <button class="rating-star" onclick="selectRating(3)">3</button>
      <button class="rating-star" onclick="selectRating(4)">4</button>
      <button class="rating-star" onclick="selectRating(5)">5</button>
    </div>
    <div id="feedbackChipsWrap" style="display:none;">
      <p id="feedbackChipsTitle" style="font-size:13px;font-family:'Inter',sans-serif;color:var(--typing-color);margin:0 0 8px;"></p>
      <div class="feedback-chips" id="feedbackChips"></div>
    </div>
    <textarea class="feedback-textarea" id="feedbackText" placeholder="Deixe um comentário (opcional)..."></textarea>
    <button class="sheet-submit-btn" id="submitFeedback" onclick="submitFeedback()">Enviar avaliação</button>
    <button onclick="closeFeedbackSheet()" style="width:100%;background:transparent;border:none;padding:10px;color:var(--typing-color);font-size:13px;font-family:'Inter',sans-serif;cursor:pointer;margin-top:4px;">Fechar sem avaliar</button>
  </div>
</div>

<!-- FAQ Sheet -->
<div class="sheet-overlay" id="faqSheet" role="dialog" aria-modal="true" aria-label="Perguntas Frequentes">
  <div class="sheet-container" style="max-height:88vh; overflow-y:auto;">
    <div class="sheet-handle"></div>
    <div class="sheet-title">Perguntas Frequentes</div>
    <div class="sheet-subtitle">Encontre respostas rápidas sobre a Frame</div>
    <div class="faq-sheet-content">
      <input type="text" class="faq-search" id="faqSearchInput" placeholder="Pesquisar dúvida..." oninput="filterFaq()" aria-label="Buscar FAQ">
      <div class="faq-accordion" id="faqAccordion"></div>
      <button class="faq-start-btn" onclick="closeFaqSheet(); if(!userInfo){ startChatFlow(); } else { inicio(); }">Não encontrou? Falar com Fabi</button>
    </div>
  </div>
</div>

<!-- Policy Sheet -->
<div class="sheet-overlay" id="policySheet" role="dialog" aria-modal="true" aria-label="Política de uso do chat">
  <div class="sheet-container" style="max-height:80vh; overflow-y:auto;">
    <div class="sheet-handle"></div>
    <div class="sheet-title" style="font-weight:600;">Política de uso do chat</div>
    <p style="font-size:13px;font-family:'Inter',sans-serif;color:var(--typing-color);line-height:1.7;margin:16px 0;">
      A Frame Agency utiliza automações e sistemas de inteligência artificial para otimizar e agilizar o atendimento aos usuários. Nossa assistente virtual é alimentada por IA e, embora busque fornecer informações precisas, pode eventualmente cometer erros.<br><br>
      Nenhuma mensagem, resposta ou encaminhamento realizado neste chat deve ser interpretado como decisão definitiva, política oficial ou informação absoluta, nem prevalece sobre os Termos e Condições da plataforma.<br><br>
      Ao utilizar este chat, o usuário declara estar ciente e concordar com os Termos e Condições disponíveis em: <a href="https://frameag.com/termos" target="_blank" rel="noopener noreferrer" style="color:var(--accent-color);text-decoration:underline;">frameag.com/termos</a>, bem como com a possibilidade de que as conversas sejam utilizadas de forma anonimizada para aprimoramento e treinamento de nossos sistemas.
    </p>
    <button class="sheet-submit-btn" onclick="closePolicySheet()">Entendido</button>
  </div>
</div>

<!-- Finalize confirmation popup -->
<div class="o" id="finalizePopup" role="dialog" aria-modal="true">
  <div class="oc" style="gap:12px;">
    <p style="font-size:15px;font-weight:600;margin:0;">Avalie antes de ir?</p>
    <p style="font-size:13px;font-family:'Inter',sans-serif;color:var(--typing-color);margin:0;line-height:1.5;">Sua opinião nos ajuda a evoluir o atendimento.</p>
    <button onclick="closeFinalizePopup(); openFeedbackSheet();" class="btn p" style="width:100%; padding:13px; border-radius:12px; font-size:14px;">Avaliar experiência</button>
    <button onclick="closeFinalizePopup(); doFinalReset();" class="btn" style="width:100%; padding:12px; border-radius:12px; font-size:14px; background:transparent; color:var(--text-color);">Finalizar sem avaliar</button>
  </div>
</div>

<!-- Toast notification -->
<div class="toast-notify" id="toastNotify"></div>
`;
document.body.appendChild(chatContainer);

// ===== Variáveis globais =====
let typingShownThisFlow = false;
let messageHistory = [];
let userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
let lastMessage = localStorage.getItem('lastMessage') || null;
let floodCount = 0;
let lastSendTime = 0;
let isChatInitiated = false;
let messageQueue = [];
let pendingEmailResolve = null;
let waitingForName = false;
let waitingForEmail = false;
let ageConfirmedInFlow = false;
let waitingForAgeCheck = false;
let activeButtonContext = null; // Para desabilitar reconhecimento de opções após escolha
const MAX_HISTORY = 60;
const MAX_STORAGE_SIZE = 1024 * 1024 * 5;
const HISTORY_AGE_LIMIT = 15 * 24 * 60 * 60 * 1000;
let inactivityTimer;
const INACTIVITY_TIMEOUT = 3 * 60 * 1000;
const MAX_CHAR_LIMIT = 600;

// Foto da assistente (nova)
const ASSISTANT_PHOTO = "https://framerusercontent.com/images/wWIH1Nc4iXNLDhzo8ocpzNjiQY.png";

const b = document.getElementById('bd');
const welcomeText = document.getElementById('welcomeText');
const inputArea = document.getElementById('inputArea');
const inputBox = document.getElementById('inputBox');
const userInput = document.getElementById('userInput');
const scrollDownBtn = document.getElementById('scrollDownBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const inputWarning = document.getElementById('inputWarning');

let isChatBlocked = localStorage.getItem('isChatBlocked') === 'true';
let blockType = localStorage.getItem('blockType') || null;
let blockEndTime = parseInt(localStorage.getItem('blockEndTime')) || 0;
let currentFlowType = null;
let currentTopic = localStorage.getItem('currentTopic') || null;
let badWordCount = 0;
let chatStartTime = localStorage.getItem('chatStartTime') || null;
let sending = false;
let selectedRating = 0;
let selectedChips = [];
let isScrolledUp = false;

// ===== Emojis =====
const emojis = [
  {emoji:'😀',name:'sorrindo'},{emoji:'😂',name:'rindo muito'},{emoji:'😊',name:'sorridente'},
  {emoji:'😍',name:'apaixonado'},{emoji:'🤔',name:'pensando'},{emoji:'😎',name:'descolado'},
  {emoji:'😅',name:'suado'},{emoji:'😉',name:'piscando'},{emoji:'❤️',name:'coração'},
  {emoji:'🔥',name:'fogo'},{emoji:'👍',name:'joinha'},{emoji:'👋',name:'oi tchau'},
  {emoji:'🎉',name:'festa'},{emoji:'🌟',name:'estrela'},{emoji:'🙌',name:'palmas'},
  {emoji:'😔',name:'triste'},{emoji:'😡',name:'bravo'},{emoji:'💯',name:'cem'},
  {emoji:'✨',name:'brilho'},{emoji:'🤝',name:'aperto de mão'},{emoji:'💬',name:'balão fala'},
  {emoji:'📱',name:'celular'},{emoji:'💰',name:'dinheiro'},{emoji:'🔒',name:'cadeado'}
];

// ===== Palavras proibidas (lista ampliada) =====
const prohibitedWords = [
  'cu','pau','ppk','goza','chupa','puta','kids','kid','baby','bebe','cp','porno',
  'estupro','estuprador','buceta','caralho','foder','fode','transar','sexo com criança',
  'bucetinha','roubar','cuzinho','chupetinha','viado','baitola','prostituta',
  'pedofilo','pedofilia','bct','nuds','leitada','fetiche','se fuder','pepeka',
  'piroca','gozada','violencia','ameaca','drogas','ilegal','menor de idade',
  'crianças','criancas','menores','tráfico','trafico','sequestro','morte',
  'matar','assassinar','terrorismo','bomba','arma','fuzil','machete',
  'rape','child','loli','shota','abuse','exploração','exploração sexual'
];

// ===== Tabela de sinônimos expandida =====
const synonymTable = {
  greeting: ['oi','ola','olá','ei','hey','salve','e aí','eai','eaí','e ai','bom dia','boa tarde','boa noite','oii','oiii','ola!','oi!','alô','alo'],
  denunciar: ['denunciar','reportar','denuncia','fake','golpe','fraude','suspeito','suspeita','irregular'],
  humano: ['humano','analista','suporte','agente','atendente','pessoa real','falar com alguém','falar com gente','pessoa humana','operador','assistente humano'],
  seguranca: ['seguranca','segurança','seguro','proteção','protecao','verificação','verificacao','autenticação','autenticacao'],
  termos: ['termos','condições','condicoes','terms','juridico','política de privacidade','politica de privacidade','lgpd','privacidade'],
  criadora: ['criadora','acompanhante','anunciante','modelo','agenciada','creator','influencer'],
  contratante: ['contratante','assinante','comprador','premium','cliente','contratar'],
  dados: ['dados pessoais','lgpd','exclusão de dados','exclusao de dados','privacidade','meus dados','deletar dados'],
  definicoes: ['o que é a frame','o que e a frame','frame agency','quem é','quem e','o que é a plataforma','o que é a plataforma','sobre a frame','about frame','frame agencia'],
  pagamento: ['pagamento','pagar','cobrança','cobranca','fatura','pix','boleto','cartão','cartao'],
  cancelamento: ['cancelamento','cancelar','cancelar assinatura','reembolso','devolver'],
  suporte: ['suporte','preciso de ajuda','ajuda urgente','não consigo','nao consigo','problema','erro'],
  cadastro: ['cadastro','criar conta','código','codigo','criar perfil','registrar','me cadastrar','não consigo logar','nao consigo logar','login','senha','acesso'],
  premium: ['premium','frame premium','assinar','planos','assinatura','quero ser premium'],
  ajuda: ['ajuda','preciso de ajuda','pode me ajudar','help','comandos','duvida','dúvida','como funciona'],
  finalizar: ['finalizar','encerrar','encerrar chat','fechar','quero sair','tchau','bye','até logo','ate logo'],
  logout: ['logout','sair da conta','deslogar','trocar conta'],
  faq: ['faq','perguntas frequentes','duvidas frequentes','dúvidas frequentes','ajuda rápida','ajuda rapida'],
  idioma: ['idioma','english','español','espanhol','inglês','ingles','language'],
  avaliacao: ['avaliar','avaliação','feedback','nota','quero avaliar']
};

// ===== Variações textuais =====
const greetingVariations = [
  (h) => `${h}! Tudo bem? Em que posso ajudar hoje?`,
  (h) => `${h}! Como posso ajudar você?`,
  (h) => `${h}! O que você precisa hoje?`
];
const notUnderstoodVariations = [
  'Não consegui compreender sua solicitação. Pode descrever com mais detalhes?',
  'Hmm, não captei bem. Tente novamente ou escolha uma opção abaixo.',
  'Poxa, não consegui entender dessa vez. Me diga mais sobre o que precisa.',
  'Pode reformular? Quero entender melhor para te ajudar.'
];
const inactivityVariations = [
  'Ainda está por aqui{nome}? Posso ajudar com mais alguma coisa?',
  'Ei{nome}, continua por aí? Estou disponível quando precisar.',
  'Só confirmando que estou por aqui{nome}. Tem mais alguma dúvida? Fico a disposição para ajudar você.'
];

// ===== Utilitários =====
function sanitize(text) {
  // Converte URLs em links clicáveis
  text = text.replace(/(https?:\/\/[^\s<]+)/g, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="link">${url}</a>`;
  });
  // Converte e-mails em mailto links
  text = text.replace(/(?<!href=["']mailto:)([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})(?![^<]*>)/g, (email) => {
    return `<a href="mailto:${email}" class="link">${email}</a>`;
  });
  return text;
}

function maskEmail(email) {
  if (!email) return '';
  const [user, domain] = email.split('@');
  if (!domain) return email;
  const visible = user.slice(0, 4);
  return `${visible}${'*'.repeat(Math.max(user.length - 4, 3))}@${domain}`;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'Bom dia';
  if (h >= 12 && h < 18) return 'Boa tarde';
  return 'Boa noite';
}

function showToast(msg, duration = 2800) {
  const t = document.getElementById('toastNotify');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ===== Storage seguro =====
function saveToStorageSafely(key, value) {
  try {
    if (key === 'chatHistory') {
      const filtered = value.filter(m => Date.now() - new Date(m.timestamp).getTime() < HISTORY_AGE_LIMIT);
      localStorage.setItem(key, LZString.compress(JSON.stringify(filtered)));
    } else {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
  } catch(e) {
    if (e.name === 'QuotaExceededError') {
      messageHistory = messageHistory.slice(-30);
      try { localStorage.setItem(key, LZString.compress(JSON.stringify(messageHistory))); } catch(_) {}
    }
  }
}

function cleanStorageIfNeeded() {
  try {
    let sz = 0;
    for (let k in localStorage) {
      if (localStorage.hasOwnProperty(k)) sz += (localStorage[k].length + k.length) * 2;
    }
    if (sz > MAX_STORAGE_SIZE * 0.8) {
      messageHistory = messageHistory.slice(-30);
      saveToStorageSafely('chatHistory', messageHistory);
    }
  } catch(e) { console.error('Erro storage:', e); }
}

// ===== Scroll =====
function scrollToBottomSmooth() {
  b.scrollTo({ top: b.scrollHeight, behavior: 'smooth' });
}

function handleScroll() {
  const distFromBottom = b.scrollHeight - b.scrollTop - b.clientHeight;
  isScrolledUp = distFromBottom > 120;
  if (isScrolledUp) {
    scrollDownBtn.classList.add('show');
  } else {
    scrollDownBtn.classList.remove('show');
  }
}

// ===== Indicador de digitação =====
function showTypingIndicator() {
  const typing = document.createElement('div');
  typing.className = 'msg typing-bubble';
  typing.innerHTML = `
    <img class="avatar" src="${ASSISTANT_PHOTO}" alt="Fabi">
    <div class="bb"><div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>
  `;
  b.appendChild(typing);
  scrollToBottomSmooth();
  return typing;
}

// ===== Adicionar mensagem =====
function am(text, btn = null, delay = 0, user = false, timestamp = new Date().toISOString()) {
  const typingDelay = user ? 0 : Math.min(1800, text.replace(/<[^>]+>/g,'').length * 40 + 500);
  let typingEl = null;

  if (!user && !typingShownThisFlow) {
    typingEl = showTypingIndicator();
    typingShownThisFlow = true;
  }

  setTimeout(() => {
    if (typingEl) {
      typingEl.style.animation = 'fadeOut 0.25s ease forwards';
      setTimeout(() => { if (typingEl.parentNode) typingEl.remove(); }, 250);
    }

    const m = document.createElement('div');
    m.className = 'msg' + (user ? ' user-msg' : '');
    m.setAttribute('role', 'log');

    const bb = document.createElement('div');
    bb.className = 'bb';
    bb.innerHTML = sanitize(text);

    const bt = document.createElement('span');
    bt.className = 'bt';
    bt.textContent = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    bb.appendChild(bt);

    if (btn && btn.length > 0) {
      const w = document.createElement('div');
      w.className = 'btns';
      const contextId = Date.now();
      btn.forEach(o => {
        const b2 = document.createElement('button');
        b2.className = 'btn' + (o.p ? ' p' : '');
        b2.textContent = o.l;
        b2.onclick = function() {
          if (b2.classList.contains('clicked')) return;
          b2.classList.add('clicked');
          // Mostrar escolha como bolha do usuário
          am(o.l, null, 0, true);
          typingShownThisFlow = false;
          setTimeout(() => o.a(), 100);
        };
        b2.setAttribute('role', 'button');
        w.appendChild(b2);
      });
      bb.appendChild(w);
    }

    if (user) {
      m.appendChild(bb);
    } else {
      const img = document.createElement('img');
      img.className = 'avatar';
      img.src = ASSISTANT_PHOTO;
      img.alt = 'Fabi';
      m.appendChild(img);
      m.appendChild(bb);
    }

    b.appendChild(m);

    if (!isScrolledUp) scrollToBottomSmooth();
    else scrollDownBtn.classList.add('show');

    // Persistir no histórico
    const entry = { text, btn: btn ? btn.map(o => ({l: o.l, p: o.p})) : null, user, timestamp };
    messageHistory.push(entry);
    if (messageHistory.length > MAX_HISTORY) messageHistory.shift();
    saveToStorageSafely('chatHistory', messageHistory);
    if (!user) saveToStorageSafely('lastMessage', text);

    resetInactivityTimer();
  }, delay + typingDelay);
}

// ===== Adicionar widget inline no chat =====
function amWidget(html, delay = 0) {
  setTimeout(() => {
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    wrap.style.animation = 'msgIn 0.35s ease forwards';
    wrap.style.opacity = '0';
    b.appendChild(wrap);
    scrollToBottomSmooth();
  }, delay);
}

// ===== Inactivity timer =====
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  if (!isChatInitiated) return;
  inactivityTimer = setTimeout(() => {
    const nome = userInfo ? ' ' + userInfo.name.split(' ')[0] : '';
    const msg = inactivityVariations[Math.floor(Math.random() * inactivityVariations.length)].replace('{nome}', nome);
    typingShownThisFlow = false;
    am(msg);
  }, INACTIVITY_TIMEOUT);
}

// ===== Verificar anti-flood =====
function checkFlood() {
  const now = Date.now();
  if (now - lastSendTime < 1000) {
    floodCount++;
    if (floodCount >= 5) {
      showWarningPopup('Você está enviando mensagens muito rápido. Aguarde um momento e tente novamente.');
      return true;
    }
  } else {
    floodCount = 0;
  }
  lastSendTime = now;
  return false;
}

// ===== Inicialização =====
function initChat() {
  try {
    const raw = localStorage.getItem('chatHistory');
    messageHistory = raw ? (JSON.parse(LZString.decompress(raw)) || []) : [];
  } catch(e) { messageHistory = []; }

  checkBlockStatus();

  if (userInfo) {
    const nome = userInfo.name.split(' ')[0];
    welcomeText.textContent = `Fabi · Frame Agency`;
  } else {
    welcomeText.textContent = `Fabi · Frame Agency`;
  }

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    document.getElementById('darkModeBtn').innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:20px;height:20px;flex-shrink:0;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      Retornar ao Modo Claro`;
  }

  b.addEventListener('scroll', handleScroll);
  inputBox.addEventListener('focusin', () => inputBox.classList.add('focused'));
  inputBox.addEventListener('focusout', () => inputBox.classList.remove('focused'));

  document.getElementById('menuDialog').addEventListener('click', (e) => {
    if (e.target === document.getElementById('menuDialog')) closeMenu();
  });
  document.getElementById('handoffSheet').addEventListener('click', (e) => {
    if (e.target === document.getElementById('handoffSheet')) closeHandoffSheet();
  });
  document.getElementById('feedbackSheet').addEventListener('click', (e) => {
    if (e.target === document.getElementById('feedbackSheet')) closeFeedbackSheet();
  });
  document.getElementById('faqSheet').addEventListener('click', (e) => {
    if (e.target === document.getElementById('faqSheet')) closeFaqSheet();
  });
  document.getElementById('policySheet').addEventListener('click', (e) => {
    if (e.target === document.getElementById('policySheet')) closePolicySheet();
  });

  document.addEventListener('click', (e) => {
    const cp = document.getElementById('closePopup');
    const btn = document.getElementById('closeIconBtn');
    if (cp.style.display === 'flex' && !cp.contains(e.target) && !btn.contains(e.target)) {
      cp.style.display = 'none';
    }
    // Fechar emoji ao clicar fora
    const eo = document.getElementById('emojiOverlay');
    if (eo.style.display === 'block' && !eo.contains(e.target) && !document.getElementById('emojiBtn').contains(e.target)) {
      eo.style.display = 'none';
    }
  });

  setupEmojiGrid();
  setupFaqSheet();
  setupOfflineHandling();
  cleanStorageIfNeeded();
  document.addEventListener('keydown', handleKeyboardShortcuts);

  userInput.addEventListener('input', (e) => {
    resetInactivityTimer();
    localStorage.setItem('draft', e.target.value);
    const val = e.target.value;
    e.target.value = val.replace(/:\)/g, '😊').replace(/<3/g, '❤️').replace(/:D/g, '😄').replace(/:\(/g, '😔');
  });

  const draft = localStorage.getItem('draft');
  if (draft) userInput.value = draft;

  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      processUserMessage(e.target.value.trim());
      e.target.value = '';
      localStorage.removeItem('draft');
    }
  });

  document.getElementById('sendBtn').addEventListener('click', () => {
    if (userInput.value.trim()) {
      processUserMessage(userInput.value.trim());
      userInput.value = '';
      localStorage.removeItem('draft');
    }
  });

  document.getElementById('emojiBtn').addEventListener('click', toggleEmojiOverlay);

  showInitialScreen();
}

// ===== Tela inicial premium =====
function showInitialScreen() {
  b.innerHTML = '';
  inputArea.style.display = 'none';
  isChatInitiated = false;

  const screen = document.createElement('div');
  screen.className = 'initial-screen';

  const greeting = getGreeting();
  const userName = userInfo ? userInfo.name.split(' ')[0] : null;
  const headline = userName ? `${greeting}, ${userName}!` : `${greeting}!`;
  const subtitle = userName
    ? `Que bom ver você de volta. Como posso ajudar hoje?`
    : `Boas-vindas ao atendimento virtual da Frame Agency.`;

  screen.innerHTML = `
    <div class="initial-hero">
      <img src="${ASSISTANT_PHOTO}" alt="Fabi - Assistente Virtual">
      <h2>${headline}</h2>
      <p>${subtitle}</p>
    </div>
    <div class="privacy-note">
      Utilizamos os dados de conversas para evoluir. Consulte nossa <a href="https://frameag.com/privacy" target="_blank" rel="noopener noreferrer" class="link">Política de Privacidade</a>.
    </div>
    <button class="start-btn-main" onclick="startChatFlow()">Iniciar Atendimento</button>
    <div class="faq-entry" onclick="openFaqSheet()" role="button" tabindex="0" aria-label="Abrir perguntas frequentes" style="cursor:pointer;">
      <div class="faq-entry-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </div>
      <div class="faq-entry-text">
        <strong>Perguntas Frequentes</strong>
        <span>Tire suas dúvidas sobre a Frame Agency</span>
      </div>
      <span class="faq-entry-arrow">›</span>
    </div>
  `;

  b.appendChild(screen);
}

// ===== Iniciar chat (conversacional, sem form) =====
function startChatFlow() {
  inputArea.style.display = 'block';
  b.innerHTML = '';
  addChatStarter();

  if (userInfo) {
    // Usuário já conhecido - pular coleta
    const nome = userInfo.name.split(' ')[0];
    const g = getGreeting();
    typingShownThisFlow = false;
    am(`${g}, ${nome}! Que bom ver você aqui novamente. Como posso ajudar?`, null, 0);
    setTimeout(() => {
      isChatInitiated = true;
      menuPT();
    }, 600);
  } else {
    // Coletar nome de forma conversacional
    const g = getGreeting();
    typingShownThisFlow = false;
    am(`${g}! Fico feliz que esteja aqui.`, null, 0);
    setTimeout(() => {
      typingShownThisFlow = false;
      am('Como posso te chamar?', null, 0);
      waitingForName = true;
      isChatInitiated = true;
    }, 900);
  }
}

// ===== Adicionar chat starter =====
function addChatStarter() {
  const starter = document.createElement('div');
  starter.className = 'chat-starter';
  const now = new Date();
  starter.textContent = 'Hoje, ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  b.appendChild(starter);
}

// ===== Email input widget bonito =====
function showEmailWidget(onConfirm) {
  const wrap = document.createElement('div');
  wrap.className = 'chat-inline-form';
  wrap.id = 'emailWidget';
  wrap.innerHTML = `
    <p style="font-size:13px;font-family:'Inter',sans-serif;color:var(--typing-color);margin:0 0 12px;">Informe seu e-mail para continuar</p>
    <div class="chat-email-input-wrap" id="emailWrap">
      <div class="chat-email-label">Email</div>
      <input type="email" class="chat-email-input" id="chatEmailInput" placeholder="seunome@exemplo.com" autocomplete="email" aria-label="Seu e-mail" inputmode="email">
    </div>
    <div id="emailError" style="font-size:12px;color:#dc2626;font-family:'Inter',sans-serif;display:none;margin-top:6px;"></div>
    <button class="chat-confirm-btn" id="emailConfirmBtn" onclick="confirmEmailWidget()">Confirmar</button>
  `;
  b.appendChild(wrap);
  scrollToBottomSmooth();

  const inp = wrap.querySelector('#chatEmailInput');
  const wrapEl = wrap.querySelector('#emailWrap');
  inp.addEventListener('focus', () => wrapEl.classList.add('focused'));
  inp.addEventListener('blur', () => wrapEl.classList.remove('focused'));
  inp.addEventListener('keypress', (e) => { if (e.key === 'Enter') confirmEmailWidget(); });

  setTimeout(() => inp.focus(), 300);

  window._emailConfirmCallback = onConfirm;
}

function confirmEmailWidget() {
  const inp = document.getElementById('chatEmailInput');
  const errEl = document.getElementById('emailError');
  if (!inp) return;
  const email = inp.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.endsWith('@example.com')) {
    errEl.textContent = 'Insira um e-mail válido para continuar.';
    errEl.style.display = 'block';
    document.getElementById('emailWrap').style.borderColor = '#dc2626';
    inp.focus();
    return;
  }
  const widget = document.getElementById('emailWidget');
  if (widget) widget.style.opacity = '0.5';
  if (window._emailConfirmCallback) {
    window._emailConfirmCallback(email);
    window._emailConfirmCallback = null;
  }
}

// ===== Widget de confirmação de maioridade =====
function showAgeCheckWidget(onConfirm) {
  const wrap = document.createElement('div');
  wrap.className = 'age-checkbox-wrap';
  wrap.id = 'ageCheckWidget';
  wrap.innerHTML = `
    <label class="age-checkbox-label" for="ageCheckbox">
      <input type="checkbox" id="ageCheckbox" onchange="onAgeCheckChange()">
      <span>Afirmo ser maior de 18 anos em meu país</span>
    </label>
  `;
  b.appendChild(wrap);
  scrollToBottomSmooth();
  window._ageConfirmCallback = onConfirm;
}

function onAgeCheckChange() {
  const cb = document.getElementById('ageCheckbox');
  if (cb && cb.checked) {
    const widget = document.getElementById('ageCheckWidget');
    if (widget) {
      widget.style.opacity = '0.6';
      widget.style.pointerEvents = 'none';
    }
    ageConfirmedInFlow = true;
    if (window._ageConfirmCallback) {
      const cb2 = window._ageConfirmCallback;
      window._ageConfirmCallback = null;
      setTimeout(() => cb2(), 300);
    }
  }
}

// ===== Processar mensagem do usuário =====
function processUserMessage(text) {
  if (sending) return;
  if (isChatBlocked) return;
  if (checkFlood()) return;

  const rawText = text;
  const t = text.toLowerCase().trim();

  // Verificar palavras proibidas
  const words = t.split(/\s+/);
  let isProhibited = false;
  for (const w of words) {
    if (prohibitedWords.some(p => w === p || t.includes(p))) {
      isProhibited = true;
      break;
    }
  }

  if (isProhibited) {
    badWordCount++;
    if (badWordCount === 1) {
      typingShownThisFlow = false;
      am('Sua mensagem foi ocultada por conter conteúdo inadequado. Estou aqui para assuntos relacionados à Frame Agency.');
    } else if (badWordCount === 2) {
      typingShownThisFlow = false;
      am('Por favor, mantenha a conversa dentro das diretrizes da plataforma.');
    } else {
      typingShownThisFlow = false;
      am('Sua conversa foi encerrada por violar os Termos de Uso. O time de segurança foi notificado.');
      blockChatForBehavior();
    }
    sending = false;
    return;
  }

  // Mascarar dados sensíveis
  const phoneRegex = /(\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g;
  const cpfRegex = /\d{3}\.\d{3}\.\d{3}-\d{2}/g;
  if (phoneRegex.test(text) || cpfRegex.test(text)) {
    typingShownThisFlow = false;
    am('Para garantir sua privacidade, ocultei a última mensagem! Não compartilhe dados pessoais como CPF ou telefone aqui. Posso ajudar com outras questões! 😊');
    sending = false;
    return;
  }

  if (text.length > MAX_CHAR_LIMIT) {
    showWarningPopup(`Poxa, sua mensagem é muito longa. Limite de ${MAX_CHAR_LIMIT} caracteres.`);
    sending = false;
    return;
  }

  // Mostrar mensagem do usuário
  am(text, null, 0, true);
  typingShownThisFlow = false;
  sending = true;

  // Fluxo de coleta de nome
  if (waitingForName) {
    waitingForName = false;
    const name = text.trim();
    if (name.length < 2 || /[0-9]/.test(name)) {
      typingShownThisFlow = false;
      am('Preciso de um nome válido para continuarmos o atendimento de forma mais ágil. Como posso te chamar?');
      waitingForName = true;
      sending = false;
      return;
    }
    const firstName = name.split(' ')[0];
    // Salvar nome temporariamente
    window._pendingName = name;
    typingShownThisFlow = false;
    am(`Prazer, ${firstName}! Para guardar nosso histórico e continuar te ajudando por aqui, qual é o seu e-mail?`);
    waitingForEmail = true;
    sending = false;
    setTimeout(() => showEmailWidget((email) => {
      const finalName = window._pendingName || firstName;
      userInfo = { name: finalName, email };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      chatStartTime = new Date().toISOString();
      localStorage.setItem('chatStartTime', chatStartTime);
      typingShownThisFlow = false;
      am(`Perfeito! Tudo certo, ${finalName.split(' ')[0]}. Vamos começar?`);
      waitingForEmail = false;
      setTimeout(() => {
        typingShownThisFlow = false;
        menuPT();
      }, 600);
    }), 800);
    return;
  }

  if (waitingForEmail) {
    // Usuário tentou digitar e-mail na caixa normal - redirecionar para widget
    typingShownThisFlow = false;
    am('Use o campo acima para inserir seu e-mail!');
    sending = false;
    return;
  }

  // Reconhecimento de intenções por keywords
  const keywords = {};
  for (const [key, patterns] of Object.entries(synonymTable)) {
    keywords[key] = patterns.some(p => t.includes(p));
  }

  const isPositive = /bom|ótimo|otimo|top|gostei|amei|incrível|incrivel|show|perfeito|excelente|maravilhoso|legal/.test(t);

  // Saudações com reconhecimento de horário
  if (keywords.greeting && !isChatInitiated) {
    const g = getGreeting();
    const fn = grt => `${grt}! Em que posso ajudar hoje?`;
    typingShownThisFlow = false;
    am(fn(g));
    setTimeout(() => menuPT(), 600);
    sending = false;
    return;
  }

  if (keywords.greeting && isChatInitiated) {
    const g = getGreeting();
    typingShownThisFlow = false;
    am(`${g}! O que mais posso fazer por você?`);
    sending = false;
    return;
  }

  if (keywords.faq) { openFaqSheet(); sending = false; return; }
  if (keywords.avaliacao) { closeMenu(); openFeedbackSheet(); sending = false; return; }
  if (keywords.finalizar) {
    typingShownThisFlow = false;
    am('Tudo esclarecido? Podemos finalizar o chamado quando você quiser.', [
      { l: 'Finalizar', p: 1, a: () => {
        document.getElementById('finalizePopup').style.display = 'flex';
        document.getElementById('finalizePopup').classList.add('show');
      }},
      { l: 'Continuar', a: () => {
        typingShownThisFlow = false;
        am('Tudo certo! Vamos continuar. Me informe suas dúvidas e vou te ajudar.');
      }}
    ]);
    sending = false;
    return;
  }
  if (keywords.logout) {
    userInfo = null;
    localStorage.removeItem('userInfo');
    typingShownThisFlow = false;
    am('Dados removidos. Inicie o atendimento novamente quando quiser.');
    setTimeout(() => showInitialScreen(), 800);
    sending = false;
    return;
  }
  if (keywords.humano) {
    fh();
    sending = false;
    return;
  }
  if (keywords.seguranca) {
    typingShownThisFlow = false;
    am(`A Frame Agency utiliza autenticação em múltiplas etapas e um time de segurança disponível 24h. Mais detalhes em <a href="https://frameag.com/verificacao" target="_blank" rel="noopener noreferrer" class="link">frameag.com/verificacao</a>.`);
    perguntarSatisfacao();
    sending = false;
    return;
  }
  if (keywords.termos) {
    typingShownThisFlow = false;
    am(`Nossos Termos e Condições estão disponíveis em <a href="https://frameag.com/termos" target="_blank" rel="noopener noreferrer" class="link">frameag.com/termos</a>. Para dúvidas de privacidade, atuamos em conformidade com a LGPD.`);
    perguntarSatisfacao();
    sending = false;
    return;
  }
  if (keywords.criadora) {
    currentFlowType = 'criadora'; currentTopic = 'criadora';
    localStorage.setItem('currentTopic', currentTopic);
    crPT(); sending = false; return;
  }
  if (keywords.contratante) {
    currentFlowType = 'contratante'; currentTopic = 'contratante';
    localStorage.setItem('currentTopic', currentTopic);
    typingShownThisFlow = false;
    am(`Como contratante, você tem acesso a perfis verificados e comunicação segura. O Premium desbloqueia o catálogo completo sem anúncios, agendamentos, lounges VIP e muito mais. Veja em <a href="https://frameag.com/premium" target="_blank" rel="noopener noreferrer" class="link">frameag.com/premium</a>.`);
    perguntarSatisfacao(); sending = false; return;
  }
  if (keywords.dados) {
    typingShownThisFlow = false;
    am(`Tratamos seus dados com segurança e transparência. Para acessar, corrigir ou solicitar exclusão, envie email para <a href="mailto:privacidade@frameag.com" class="link">privacidade@frameag.com</a>.`);
    perguntarSatisfacao(); sending = false; return;
  }
  if (keywords.definicoes) {
    typingShownThisFlow = false;
    am(`A Frame Agency é a maior plataforma de experiências personalizadas da América Latina, conectando criadoras a contratantes com tecnologia de ponta, segurança e privacidade.`);
    perguntarSatisfacao(); sending = false; return;
  }
  if (keywords.pagamento) {
    typingShownThisFlow = false;
    am(`Para dúvidas sobre pagamentos, acesse sua área de login ou entre em contato: <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a>.`);
    perguntarSatisfacao(); sending = false; return;
  }
  if (keywords.cancelamento) {
    typingShownThisFlow = false;
    am(`Para cancelamentos ou reembolsos, envie um email para <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a> com sua solicitação e o time poderá te ajudar.`);
    perguntarSatisfacao(); sending = false; return;
  }
  if (keywords.suporte) { fh(); sending = false; return; }
  if (keywords.cadastro) { cadastroPT(); sending = false; return; }
  if (keywords.premium) { premiumPT(); sending = false; return; }
  if (keywords.ajuda) {
    typingShownThisFlow = false;
    am('Posso ajudar você com dúvidas sobre segurança, cadastro, Frame Premium, atendimento humano, denúncias, Termos e dados pessoais. O que precisa?', [
      { l: 'Sou Criadora', a: crPT },
      { l: 'Sou Contratante', a: cmPT },
      { l: 'Outro assunto', a: () => { typingShownThisFlow = false; am('Me conte mais sobre o que precisa e farei o possível para ajudar!'); }}
    ]);
    sending = false;
    return;
  }
  if (keywords.idioma) {
    if (/english/i.test(t)) showLangPopup('For English support, please visit our dedicated page.', 'Go to English Page', 'https://frameag.com/en');
    else if (/español|espanhol/i.test(t)) showLangPopup('Para atención en español, visite nuestra página.', 'Ir a la Página en Español', 'https://frameag.com/es');
    else showLangPopup('Selecione o idioma desejado no menu para melhor atendimento.', 'Voltar ao Menu', '#');
    sending = false;
    return;
  }
  if (keywords.denunciar) {
    typingShownThisFlow = false;
    am(`Para reportar algo suspeito, acesse <a href="https://frameag.com/report" target="_blank" rel="noopener noreferrer" class="link">frameag.com/report</a>. Denúncias são tratadas com total confidencialidade.`);
    sending = false;
    return;
  }

  // Fallback
  typingShownThisFlow = false;
  const fallback = notUnderstoodVariations[Math.floor(Math.random() * notUnderstoodVariations.length)];
  am(fallback, [
    { l: 'Ver menu principal', p: 1, a: inicio },
    { l: 'Falar com atendente', a: fh }
  ]);
  sending = false;
}

// ===== Fluxo de menu principal =====
function menuPT() {
  typingShownThisFlow = false;
  am('Qual é a sua relação com a Frame Agency hoje? Isso me ajuda a direcionar melhor.', [
    { l: 'Contratante / Assinante', p: 1, a: cmPT },
    { l: 'Criadora / Anunciante', a: crPT }
  ], 400);
}

function cmPT() {
  typingShownThisFlow = false;
  am('Como você é contratante, posso ajudar com os seguintes assuntos:', [
    { l: 'Quero contratar uma modelo', p: 1, a: ctPT },
    { l: 'Segurança', a: () => {
      typingShownThisFlow = false;
      am('A Frame garante autenticação em múltiplas etapas e monitoramento 24h. Saiba mais em <a href="https://frameag.com/verificacao" target="_blank" rel="noopener noreferrer" class="link">frameag.com/verificacao</a>.');
      setTimeout(perguntarSatisfacao, 600);
    }},
    { l: 'Reportar modelo', a: () => {
      typingShownThisFlow = false;
      am('Levamos a segurança da comunidade muito a sério. Se viu algo suspeito, acesse <a href="https://frameag.com/report" para denunciar anonimamente. Nosso time analisa todas as denúncias com prioridade.');
    }},
    { l: 'Problema com cadastro', a: cadastroPT },
    { l: 'Falar com humano', a: fh },
    { l: 'Quero ser Premium', a: premiumPT }
  ], 400);
}

function cadastroPT() {
  typingShownThisFlow = false;
  am('Qual situação se aplica ao seu caso?', [
    { l: 'Código de ativação não chega', a: problemaCodigo },
    { l: 'Perdi acesso ao e-mail', a: problemaEmail },
    { l: 'Não sei como fazer login', a: problemaLogin },
    { l: 'Código de verificação inválido', a: erroCodigo },
    { l: 'Falha no Frame Authentic', a: falhaAuthentic },
    { l: 'Voltar', a: cmPT }
  ], 400);
}

function erroCodigo() {
  typingShownThisFlow = false;
  am('Para código inválido: 1) Verifique se copiou corretamente 2) Tente reenviar na página de cadastro. 3) Use outro dispositivo se necessário.');
  am('Problema persiste? <a href="https://frameag.com/ajuda/cadastro" target="_blank" rel="noopener noreferrer" class="link">Assista ao tutorial</a>', [{ l: 'Voltar', a: cadastroPT }], 600);
}

function falhaAuthentic() {
  typingShownThisFlow = false;
  am('Para o Frame Authentic é importante uma boa iluminação, rosto nítido, sem óculos ou acessórios. Verifique sua conexão e tente após o prazo indicado na tela.');
  am('Ainda com problemas nessa etapa? <a href="https://t.me/suporteframebot" target="_blank" rel="noopener noreferrer" class="link">Suporte Telegram 24h</a>', [{ l: 'Voltar', a: cadastroPT }], 600);
}

function problemaCodigo() {
  typingShownThisFlow = false;
  am('Se o código não chegou: verifique a caixa de spam ou atualizações, confirme o e-mail cadastrado e aguarde alguns minutos. Tente reenviar diretamente na página de cadastro.', null, 0);
  am('Se persistir, nosso time pode te ajudar:', [
    { l: 'Ir para atendimento', p: 1, a: fh },
    { l: 'Voltar', a: cadastroPT }
  ], 700);
}

function problemaEmail() {
  typingShownThisFlow = false;
  am('Se perdeu acesso ao e-mail: primeiro tente recuperar no provedor (Gmail, Icloud, Outlook). Se não for possível, podemos ajudar a atualizar o e-mail na sua conta. Na maioria dos casos, será necessário realizar uma verificação de segurança.', null, 0);
  am('Para prosseguir:', [
    { l: 'Ir para atendimento', p: 1, a: fh },
    { l: 'Voltar', a: cadastroPT }
  ], 700);
}

function problemaLogin() {
  typingShownThisFlow = false;
  am('Para recuperar seu acesso, acesse a página <a href="https://frameag.com/cadastro" target="_blank" rel="noopener noreferrer" class="link">frameag.com/cadastro</a> e siga os passos. Confira também nosso <a href="https://frameag.com/ajuda/cadastro" target="_blank" rel="noopener noreferrer" class="link">tutorial completo</a>.', null, 0);
  am('Mais dúvidas?', [{ l: 'Voltar', a: cadastroPT }], 600);
}

function premiumPT() {
  typingShownThisFlow = false;
  am('Com o Frame Premium você tem acesso ao catálogo completo livre de anúncios, informações completas de modelos, acesso a lounges VIP e hotéis parceiros, FramePay e suporte prioritário 24h.', null, 0);
  am('Conheça os planos:', [
    { l: 'Ver planos Premium', p: 1, a: () => showRedirectLoading('https://frameag.com/premium', true) },
    { l: 'Voltar', a: crPT }
  ], 600);
}

function ctPT() {
  typingShownThisFlow = false;
  // Verificação de maioridade via checkbox conversacional
  am('Para sua segurança e conformidade com as diretrizes, preciso confirmar uma informação antes de prosseguir.');
  setTimeout(() => {
    showAgeCheckWidget(() => {
      typingShownThisFlow = false;
      am('Confirmado! Como prefere prosseguir?', [
        { l: 'Como agendar?', a: agendarExperiencia },
        { l: 'Visitar catálogo', a: visitarCatalogo },
        { l: 'Tornar-me Premium', a: premiumPT },
        { l: 'Como funciona a verificação?', a: verificacaoContratante }
      ]);
    });
  }, 700);
}

function agendarExperiencia() {
  typingShownThisFlow = false;
  am('Para agendar: selecione sua criadora no catálogo, inicie um chat, negocie os detalhes e assine o contrato enviado por e-mail. A Frame fornece a tecnologia — a negociação é 100% direta e segura.', null, 0);
  am('Pronto para começar?', [
    { l: 'Ir ao catálogo', p: 1, a: () => showRedirectLoading('https://frameag.com/models', true) },
    { l: 'Voltar', a: ctPT }
  ], 600);
}

function visitarCatalogo() {
  typingShownThisFlow = false;
  am('Explore perfis verificados em <a href="https://frameag.com/models" target="_blank" rel="noopener noreferrer" class="link">frameag.com/models</a>. Opções detalhadas e seguras.', null, 0);
  am('Decidiu? Nosso time pode ajudar:', [{ l: 'Ir para atendimento', p: 1, a: () => showRedirectLoading('https://t.me/suporteframebot?start=catalogo-site', true) }], 500);
}

function verificacaoContratante() {
  typingShownThisFlow = false;
  am('O Frame Authentic verifica identidade com documentos + selfie + biometria facial ao vivo. Resultado: perfis 100% reais, sem fraudes.', null, 0);
  am('Contratantes também podem ser verificados em caso de contestações.', [{ l: 'Entendido', a: ctPT }], 600);
}

function crPT() {
  typingShownThisFlow = false;
  am('Como você é uma criadora, posso ajudar com os assuntos abaixo:', [
    { l: 'Como me cadastrar', a: () => {
      typingShownThisFlow = false;
      am('Acesse <a href="https://frameag.com/cadastro" target="_blank" rel="noopener noreferrer" class="link">frameag.com/cadastro</a> e siga as instruções. O processo é simples e seguro.');
      setTimeout(perguntarSatisfacao, 600);
    }},
    { l: 'Como funciona a verificação', a: () => {
      typingShownThisFlow = false;
      am('Você precisa ter mais de 18 anos, passar pelo Frame Authentic (verificação de identidade) e aceitar os Termos. Isso garante segurança para todos.');
      setTimeout(perguntarSatisfacao, 600);
    }},
    { l: 'Termos e Condições', a: () => {
      typingShownThisFlow = false;
      am('Nossos Termos estão em <a href="https://frameag.com/termos" target="_blank" rel="noopener noreferrer" class="link">frameag.com/termos</a>. Leitura recomendada para quem vai trabalhar na plataforma.');
    }},
    { l: 'O que é a Frame', a: () => {
      typingShownThisFlow = false;
      am('A Frame Agency é o maior ecossistema de experiências personalizadas da América Latina. Conectamos criadoras a contratantes com tecnologia, gestão e segurança de ponta.');
      setTimeout(perguntarSatisfacao, 600);
    }},
    { l: 'Gerenciar Brand Page', a: gerenciarPerfil },
    { l: 'Frame Payments', a: framePayments },
    { l: 'Contestar decisão', a: () => {
      typingShownThisFlow = false;
      am('Para contestar decisões da moderação, acesse o formulário oficial:', [
        { l: 'Ir para contestação', p: 1, a: () => showRedirectLoading('https://frameag.com/contestar', true) },
        { l: 'Voltar', a: crPT }
      ]);
    }},
    { l: 'Voltar', a: inicio }
  ], 400);
}

function gerenciarPerfil() {
  typingShownThisFlow = false;
  am('Na sua BrandPage você pode editar fotos, bio, medidas e redes sociais. Para destaque no catálogo, veja os planos pagos.');
  am('Acesse: <a href="https://frameag.com/login" target="_blank" rel="noopener noreferrer" class="link">frameag.com/login</a>', [{ l: 'Voltar', a: crPT }], 600);
}

function framePayments() {
  typingShownThisFlow = false;
  am('Com o Frame Payments você recebe diretamente no seu bot do Telegram, sem taxas da Frame. Seguro, com anti-fraude em cada transação.');
  am('Ative em: <a href="https://frameag.com/login" target="_blank" rel="noopener noreferrer" class="link">frameag.com/login</a>', [{ l: 'Voltar', a: crPT }], 600);
}

// ===== Handoff humano (com bottom sheet) =====
function fh() {
  typingShownThisFlow = false;
  am('Vou direcionar você a um agente do time da Frame Agency! Clique abaixo para escolher o melhor canal.', [
    { l: 'Ir para atendimento', p: 1, a: openHandoffSheet }
  ], 0);
}

// ===== Inicio do chat =====
function inicio() {
  typingShownThisFlow = false;
  if (userInfo) {
    const nome = userInfo.name.split(' ')[0];
    am(`${getGreeting()}, ${nome}! Como posso ajudar?`);
    setTimeout(() => menuPT(), 600);
  } else {
    startChatFlow();
  }
}

// ===== Perguntar satisfação =====
function perguntarSatisfacao() {
  const nome = userInfo ? userInfo.name.split(' ')[0] : '';
  const suf = nome ? `, ${nome}` : '';
  typingShownThisFlow = false;
  am(`Consegui esclarecer sua dúvida${suf}?`, [
    { l: 'Sim, tudo certo!', p: 1, a: () => {
      typingShownThisFlow = false;
      am('Fico feliz em ajudar! Estou por aqui sempre que precisar.');
    }},
    { l: 'Preciso de mais ajuda', a: () => {
      fh();
    }}
  ], 500);
}

// ===== Menu =====
function openMenu() {
  const ov = document.getElementById('menuDialog');
  ov.style.display = 'flex';
  ov.classList.add('show');
  document.getElementById('menuTrigger').setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  const ov = document.getElementById('menuDialog');
  ov.style.display = 'none';
  ov.classList.remove('show');
  document.getElementById('menuTrigger').setAttribute('aria-expanded', 'false');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  const btn = document.getElementById('darkModeBtn');
  const isDark = document.body.classList.contains('dark');
  btn.innerHTML = isDark
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:20px;height:20px;flex-shrink:0;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>Retornar ao Modo Claro`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:20px;height:20px;flex-shrink:0;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>Ativar Modo Escuro`;
}

function clearChatHistory() {
  closeMenu();
  showConfirm('Tem certeza? O histórico não poderá ser recuperado.', () => {
    messageHistory = [];
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('lastMessage');
    isChatInitiated = false;
    showInitialScreen();
  });
}

function editProfile() {
  closeMenu();
  if (!userInfo) {
    showWarningPopup('Nenhum perfil encontrado. Inicie um atendimento para criar seu perfil.');
    return;
  }
  // Verificar limite de edição diária
  const lastEdit = localStorage.getItem('lastProfileEdit');
  if (lastEdit) {
    const diff = Date.now() - parseInt(lastEdit);
    if (diff < 24 * 60 * 60 * 1000) {
      const remaining = Math.ceil((24 * 60 * 60 * 1000 - diff) / (60 * 60 * 1000));
      showWarningPopup(`Seu perfil já foi editado hoje. Disponível novamente em ${remaining}h.`);
      return;
    }
  }
  b.innerHTML = '';
  addChatStarter();
  inputArea.style.display = 'none';

  const form = document.createElement('div');
  form.className = 'profile-edit-form';
  form.style.margin = '20px 0';
  form.innerHTML = `
    <h3>Editar Perfil</h3>
    <div class="profile-field">
      <label>Nome</label>
      <input type="text" id="profileName" value="${userInfo.name}" placeholder="Seu nome" aria-label="Nome">
    </div>
    <div class="profile-field">
      <label>E-mail</label>
      <input type="email" id="profileEmail" value="${maskEmail(userInfo.email)}" class="masked" readonly aria-label="E-mail (mascarado)">
    </div>
    <button class="profile-save-btn" onclick="saveProfile()">Salvar alterações</button>
    <p class="profile-edit-note">Seu perfil poderá ser editado uma vez ao dia. Lembre-se de seguir as diretrizes na escolha do seu nome.<br><br>Precisa de ajuda? <a href="https://frameag.com/contato" target="_blank" rel="noopener noreferrer">Fale conosco na Central de atendimento</a></p>
  `;
  b.appendChild(form);
}

function saveProfile() {
  const nameEl = document.getElementById('profileName');
  const name = nameEl ? nameEl.value.trim() : '';
  if (!name || name.length < 2) {
    showWarningPopup('Nome inválido. Use ao menos 2 caracteres.');
    return;
  }
  const prohibited = /(cu|pau|ppk|puta|buceta|caralho|foder|pedofilo|transar)/i;
  if (prohibited.test(name)) {
    showWarningPopup('Nome inadequado. Escolha um nome compatível com as diretrizes.');
    return;
  }
  userInfo.name = name;
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  localStorage.setItem('lastProfileEdit', Date.now().toString());
  showToast('Perfil atualizado!');
  setTimeout(() => {
    inputArea.style.display = 'block';
    showInitialScreen();
  }, 1000);
}

// ===== Bottom Sheets =====
function openHandoffSheet() {
  closeMenu();
  const s = document.getElementById('handoffSheet');
  s.style.display = 'flex';
  s.classList.add('show');
}

function closeHandoffSheet() {
  const s = document.getElementById('handoffSheet');
  s.style.display = 'none';
  s.classList.remove('show');
}

function openFeedbackSheet() {
  closeMenu();
  selectedRating = 0;
  selectedChips = [];
  // Reset rating buttons
  document.querySelectorAll('.rating-star').forEach(b2 => b2.classList.remove('selected'));
  document.getElementById('feedbackChipsWrap').style.display = 'none';
  document.getElementById('feedbackChips').innerHTML = '';
  document.getElementById('feedbackText').value = '';
  const s = document.getElementById('feedbackSheet');
  s.style.display = 'flex';
  s.classList.add('show');
}

function closeFeedbackSheet() {
  const s = document.getElementById('feedbackSheet');
  s.style.display = 'none';
  s.classList.remove('show');
}

function openFaqSheet() {
  closeMenu();
  const s = document.getElementById('faqSheet');
  s.style.display = 'flex';
  s.classList.add('show');
}

function closeFaqSheet() {
  const s = document.getElementById('faqSheet');
  s.style.display = 'none';
  s.classList.remove('show');
}

function openPolicySheet() {
  closeMenu();
  const s = document.getElementById('policySheet');
  s.style.display = 'flex';
  s.classList.add('show');
}

function closePolicySheet() {
  const s = document.getElementById('policySheet');
  s.style.display = 'none';
  s.classList.remove('show');
}

// ===== FAQ Sheet setup (accordion) =====
function setupFaqSheet() {
  const faqs = [
    { q: 'O que é a Frame Agency?', a: 'A Frame é uma plataforma especializada em conectar criadoras de conteúdo a contratantes, oferecendo ferramentas de gestão de perfis, anúncios e interações seguras. Atuamos como provedora de tecnologia.' },
    { q: 'Como me cadastro como criadora?', a: 'Você precisa ter mais de 18 anos, fornecer documentos, uma selfie e passar pela verificação facial Frame Authentic. Acesse frameag.com/cadastro para iniciar.' },
    { q: 'O que é a Verificação Facial?', a: 'É um processo para confirmar que você é real e maior de idade. Usamos o Frame Authentic para checar documentos e movimentos faciais em tempo real.' },
    { q: 'Como funciona o Frame Premium?', a: 'Com o Premium você acessa o catálogo completo sem anúncios, agenda com prioridade, tem suporte prioritário e benefícios como lounges VIP e hotéis parceiros.' },
    { q: 'Como agendar uma experiência?', a: 'Explore o catálogo, inicie um chat com a criadora, negocie os detalhes e confirme o agendamento. A negociação é 100% direta e segura entre vocês.' },
    { q: 'Como gerencio minha BrandPage?', a: 'Acesse sua BrandPage após o login para editar fotos, bio, redes sociais e métricas do seu anúncio. Para destaques no catálogo, considere planos pagos.' },
    { q: 'O que é o Frame Payments?', a: 'É uma ferramenta no Telegram para receber pagamentos diretamente e de forma automatizada, livre de taxas da Frame. Conta com verificação e anti fraude em cada transação.' },
    { q: 'Como denuncio algo suspeito?', a: 'Use o formulário em frameag.com/report para reportar anonimamente. Nosso time de segurança analisa rapidamente e toma as medidas necessárias.' },
    { q: 'Meus dados estão seguros?', a: 'Sim. Usamos criptografia avançada e cumprimos a LGPD. Dados são usados apenas para o necessário e você pode solicitar acesso ou exclusão quando desejar.' },
    { q: 'Como contesto uma decisão da moderação?', a: 'Acesse frameag.com/contestar com detalhes e provas. O time de segurança revisa em até 7 dias úteis.' }
  ];

  const accordion = document.getElementById('faqAccordion');
  if (!accordion) return;
  accordion.innerHTML = '';

  faqs.forEach((faq, i) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.dataset.q = faq.q.toLowerCase();
    item.dataset.a = faq.a.toLowerCase();
    item.innerHTML = `
      <div class="faq-q" onclick="toggleFaqItem(this.parentElement)">
        <span>${faq.q}</span>
        <div class="faq-q-icon">+</div>
      </div>
      <div class="faq-a">${faq.a}</div>
    `;
    accordion.appendChild(item);
  });
}

function toggleFaqItem(item) {
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

function filterFaq() {
  const q = document.getElementById('faqSearchInput').value.toLowerCase();
  document.querySelectorAll('.faq-item').forEach(item => {
    const match = !q || item.dataset.q.includes(q) || item.dataset.a.includes(q);
    item.style.display = match ? '' : 'none';
  });
}

// ===== Feedback (bottom sheet) =====
function selectRating(rating) {
  selectedRating = rating;
  document.querySelectorAll('.rating-star').forEach((btn, i) => {
    btn.classList.toggle('selected', i < rating);
  });

  const chipsWrap = document.getElementById('feedbackChipsWrap');
  const chipsTitle = document.getElementById('feedbackChipsTitle');
  const chipsContainer = document.getElementById('feedbackChips');
  chipsContainer.innerHTML = '';
  selectedChips = [];

  let options = [];
  if (rating <= 3) {
    chipsTitle.textContent = 'O que motivou essa nota?';
    options = ['Respostas lentas', 'Informação incorreta', 'Interface confusa', 'Falta de opções', 'Outros'];
  } else if (rating === 4) {
    chipsTitle.textContent = 'Como podemos melhorar ainda mais?';
    options = ['Mais opções de ajuda', 'Respostas melhores', 'Interface mais rápida', 'Outros'];
  } else {
    chipsTitle.textContent = 'O que você mais gostou?';
    options = ['Agilidade nas respostas', 'Clareza das informações', 'Facilidade de uso', 'Atendimento completo'];
  }

  options.forEach(opt => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = opt;
    chip.onclick = () => {
      chip.classList.toggle('selected');
      if (chip.classList.contains('selected')) selectedChips.push(opt);
      else selectedChips = selectedChips.filter(c => c !== opt);
    };
    chipsContainer.appendChild(chip);
  });

  chipsWrap.style.display = 'block';
}

function submitFeedback() {
  if (!selectedRating) {
    showWarningPopup('Selecione uma nota antes de enviar.');
    return;
  }
  const text = document.getElementById('feedbackText').value.trim();
  const submitBtn = document.getElementById('submitFeedback');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  setTimeout(() => {
    closeFeedbackSheet();
    typingShownThisFlow = false;
    am('Agradecemos pelo feedback! Ele foi recebido e será analisado pelo nosso time para melhorar ainda mais a sua experiência. 😊👋');
    if (typeof confetti !== 'undefined') confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    if ('vibrate' in navigator) navigator.vibrate(50);
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar avaliação';
  }, 1200);
}

// ===== Finalizar chat =====
function finalizeChat() {
  document.getElementById('closePopup').style.display = 'none';
  typingShownThisFlow = false;
  am('Tudo esclarecido? Podemos finalizar o chamado quando você quiser.', [
    { l: 'Finalizar', p: 1, a: () => {
      const fp = document.getElementById('finalizePopup');
      fp.style.display = 'flex';
      fp.classList.add('show');
    }},
    { l: 'Continuar', a: () => {
      typingShownThisFlow = false;
      am('Certo! Vamos continuar por aqui, basta dizer o que precisa e consigo ajudar você.');
    }}
  ]);
}

function closeFinalizePopup() {
  const fp = document.getElementById('finalizePopup');
  fp.style.display = 'none';
  fp.classList.remove('show');
}

function doFinalReset() {
  resetFlow();
  showToast('Seu chat foi finalizado', 2500);
}

// ===== Close popup context =====
function toggleClosePopup() {
  const cp = document.getElementById('closePopup');
  const btn = document.getElementById('closeIconBtn');
  if (cp.style.display === 'flex') {
    cp.style.display = 'none';
  } else {
    const rect = btn.getBoundingClientRect();
    cp.style.top = (rect.bottom + 6) + 'px';
    cp.style.right = (window.innerWidth - rect.right) + 'px';
    cp.style.left = 'auto';
    cp.style.display = 'flex';
  }
}

// ===== Dialogs utilitários =====
function showWarningPopup(message) {
  document.getElementById('warningMessage').innerHTML = `<span class="semibold">${message}</span>`;
  const ov = document.getElementById('warningOverlay');
  ov.style.display = 'flex';
  ov.classList.add('show');
}

function closeWarningPopup() {
  const ov = document.getElementById('warningOverlay');
  ov.style.display = 'none';
  ov.classList.remove('show');
}

function showConfirm(message, yesCallback) {
  document.getElementById('confirmMessage').innerHTML = message;
  const ov = document.getElementById('confirmOverlay');
  const yes = document.getElementById('confirmYes');
  yes.onclick = () => { yesCallback(); closeConfirm(); };
  ov.style.display = 'flex';
  ov.classList.add('show');
  yes.focus();
}

function closeConfirm() {
  const ov = document.getElementById('confirmOverlay');
  ov.style.display = 'none';
  ov.classList.remove('show');
}

function showLangPopup(message, btnText, url) {
  document.getElementById('langMessage').innerHTML = message;
  const btn = document.getElementById('langButton');
  btn.textContent = btnText;
  btn.onclick = () => {
    if (url !== '#') window.open(url, '_blank', 'noopener,noreferrer');
    else inicio();
    closeLangPopup();
  };
  const ov = document.getElementById('langOverlay');
  ov.style.display = 'flex';
  ov.classList.add('show');
  btn.focus();
}

function closeLangPopup() {
  const ov = document.getElementById('langOverlay');
  ov.style.display = 'none';
  ov.classList.remove('show');
}

function showAgeConfirm() {
  const ov = document.getElementById('ageConfirmOverlay');
  ov.style.display = 'flex';
  ov.classList.add('show');
}

function closeAgeConfirm() {
  const ov = document.getElementById('ageConfirmOverlay');
  ov.style.display = 'none';
  ov.classList.remove('show');
}

function validateAge() {
  const val = document.getElementById('birthDate').value;
  if (!val) { showWarningPopup('Insira uma data válida.'); return; }
  const age = (Date.now() - new Date(val).getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  if (age >= 18) {
    localStorage.setItem('ageConfirmed', 'true');
    removeBlock();
    closeAgeConfirm();
    am('Idade confirmada! Você pode continuar utilizando o atendimento da Frame Agency.');
  } else {
    closeAgeConfirm();
    showWarningPopup('Você deve ter ao menos 18 anos para acessar o ecossistema da Frame Agency.');
  }
}

function showRedirectLoading(url, blank = false) {
  const ov = document.getElementById('redirectOverlay');
  ov.style.display = 'flex';
  setTimeout(() => {
    ov.style.display = 'none';
    if (blank) window.open(url, '_blank', 'noopener,noreferrer');
    else window.location.href = url;
  }, 2000);
}

// ===== Emoji overlay =====
function toggleEmojiOverlay() {
  const eo = document.getElementById('emojiOverlay');
  eo.style.display = eo.style.display === 'block' ? 'none' : 'block';
  if (eo.style.display === 'block') document.getElementById('emojiSearch').focus();
}

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
      document.getElementById('emojiOverlay').style.display = 'none';
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

// ===== Anti-abuso (bloqueio real) =====
function blockChatForBehavior() {
  isChatBlocked = true;
  blockType = 'behavior';
  // 1ª vez = 1h, subsequente = 24h
  const prevBlocks = parseInt(localStorage.getItem('blockCount') || '0');
  const duration = prevBlocks === 0 ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  blockEndTime = Date.now() + duration;
  localStorage.setItem('isChatBlocked', 'true');
  localStorage.setItem('blockType', 'behavior');
  localStorage.setItem('blockEndTime', blockEndTime.toString());
  localStorage.setItem('blockCount', (prevBlocks + 1).toString());
  userInput.disabled = true;
  inputArea.style.pointerEvents = 'none';
  inputArea.style.opacity = '0.5';
  messageHistory = [];
  localStorage.removeItem('chatHistory');
  localStorage.removeItem('lastMessage');
  showBlockFixed(`Seu acesso foi bloqueado por ${prevBlocks === 0 ? '1 hora' : '24 horas'} por violar os Termos e Condições de Uso do chat de atendimento da Frame Agency.`);
  startBlockTimer();
}

function blockChatForUnderage() {
  isChatBlocked = true;
  blockType = 'underage';
  localStorage.setItem('isChatBlocked', 'true');
  localStorage.setItem('blockType', 'underage');
  userInput.disabled = true;
  inputArea.style.pointerEvents = 'none';
  inputArea.style.opacity = '0.5';
  showBlockFixed('Chat bloqueado por declaração de menoridade. Confirme sua idade para continuar o atendimento.', true);
}

function checkBlockStatus() {
  if (!isChatBlocked) return;
  userInput.disabled = true;
  if (inputArea) { inputArea.style.pointerEvents = 'none'; inputArea.style.opacity = '0.5'; }
  if (blockType === 'behavior') {
    if (Date.now() >= blockEndTime) {
      removeBlock();
    } else {
      showBlockFixed('Você ainda está bloqueado por comportamento inadequado dentro do chat de atendimento.');
      startBlockTimer();
    }
  } else if (blockType === 'underage') {
    showBlockFixed('Chat bloqueado. Confirme sua idade para continuar.', true);
  }
}

function showBlockFixed(message, showAgeBtn = false) {
  // Remove existing
  const ex = document.getElementById('blockFixedOverlay');
  if (ex) ex.remove();

  const div = document.createElement('div');
  div.className = 'block-overlay-fixed';
  div.id = 'blockFixedOverlay';
  div.innerHTML = `
    <div class="block-card">
      <div class="block-icon">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
      </div>
      <div class="block-title">Acesso restrito</div>
      <div class="block-msg">${message}</div>
      <div class="block-timer" id="blockTimerDisplay" style="${blockType !== 'behavior' ? 'display:none' : ''}"></div>
      <p style="font-size:12px;font-family:'Inter',sans-serif;color:var(--typing-color);margin-top:12px;">Suporte: <a href="mailto:contato@frameag.com" style="color:var(--accent-color);">contato@frameag.com</a></p>
      ${showAgeBtn ? `<button onclick="showAgeConfirm()" style="margin-top:12px;padding:10px 20px;background:var(--accent-color);color:#fff;border:none;border-radius:12px;font-size:14px;cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;">Confirmar Idade</button>` : ''}
    </div>
  `;
  document.body.appendChild(div);
}

function removeBlock() {
  isChatBlocked = false;
  blockType = null;
  blockEndTime = 0;
  localStorage.removeItem('isChatBlocked');
  localStorage.removeItem('blockType');
  localStorage.removeItem('blockEndTime');
  if (userInput) userInput.disabled = false;
  if (inputArea) { inputArea.style.pointerEvents = ''; inputArea.style.opacity = ''; }
  const overlay = document.getElementById('blockFixedOverlay');
  if (overlay) overlay.remove();
}

function startBlockTimer() {
  function update() {
    const el = document.getElementById('blockTimerDisplay');
    if (!el) return;
    const rem = blockEndTime - Date.now();
    if (rem <= 0) { removeBlock(); return; }
    const h = Math.floor(rem / (60 * 60 * 1000));
    const m = Math.floor((rem % (60 * 60 * 1000)) / (60 * 1000));
    const s = Math.floor((rem % (60 * 1000)) / 1000);
    el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    setTimeout(update, 1000);
  }
  update();
}

// ===== Reset =====
function resetFlow() {
  messageHistory = [];
  localStorage.removeItem('chatHistory');
  localStorage.removeItem('lastMessage');
  isChatInitiated = false;
  currentFlowType = null;
  currentTopic = null;
  waitingForName = false;
  waitingForEmail = false;
  window._pendingName = null;
  localStorage.removeItem('currentTopic');
  showInitialScreen();
}

// ===== Exportar histórico =====
function exportHistory() {
  document.getElementById('closePopup').style.display = 'none';
  if (!messageHistory.length) {
    showWarningPopup('Nenhuma mensagem para exportar.');
    return;
  }
  const header = [
    '================================================',
    '  TRANSCRIÇÃO DE ATENDIMENTO — FRAME AGENCY',
    '================================================',
    `Data: ${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    `Horário: ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
    userInfo ? `Usuário: ${userInfo.name} (${maskEmail(userInfo.email)})` : 'Usuário: Anônimo',
    '================================================',
    ''
  ].join('\n');

  const body = messageHistory.map(msg => {
    const sender = msg.user ? `[Você]` : `[Fabi - Frame Agency]`;
    const time = new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const textClean = msg.text.replace(/<[^>]+>/g, '').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
    return `${time} ${sender}\n${textClean}`;
  }).join('\n\n');

  const footer = [
    '',
    '================================================',
    '  Frame Agency — www.frameag.com',
    '  Atendimento humano: contato@frameag.com',
    '================================================'
  ].join('\n');

  const blob = new Blob([header + body + footer], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `frame_atendimento_${new Date().toISOString().slice(0,10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// ===== Carregamento do chat =====
function loadChat() {
  b.innerHTML = '';
  addChatStarter();
  messageHistory.slice(-MAX_HISTORY).forEach(msg => {
    am(msg.text, null, 0, msg.user, msg.timestamp);
  });
}

// ===== Inatividade =====
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  if (!isChatInitiated) return;
  inactivityTimer = setTimeout(() => {
    const nome = userInfo ? ' ' + userInfo.name.split(' ')[0] : '';
    typingShownThisFlow = false;
    am(inactivityVariations[Math.floor(Math.random() * inactivityVariations.length)].replace('{nome}', nome));
  }, INACTIVITY_TIMEOUT);
}

// ===== Offline handling =====
function setupOfflineHandling() {
  const w = document.getElementById('offlineWarning');
  window.addEventListener('offline', () => {
    w.textContent = 'Parece que você está offline';
    w.style.display = 'block';
  });
  window.addEventListener('online', () => {
    w.textContent = 'Conexão restaurada';
    w.style.background = 'rgba(22,163,74,0.1)';
    w.style.color = '#16a34a';
    w.style.borderColor = 'rgba(22,163,74,0.2)';
    w.style.display = 'block';
    setTimeout(() => { w.style.display = 'none'; }, 3000);
  });
  if (!navigator.onLine) w.style.display = 'block';
}

// ===== Keyboard shortcuts =====
function handleKeyboardShortcuts(e) {
  if (e.key === 'Escape') {
    // Fechar overlays abertos
    ['menuDialog','confirmOverlay','langOverlay','warningOverlay','ageConfirmOverlay',
     'faqSheet','feedbackSheet','handoffSheet','policySheet','finalizePopup'].forEach(id => {
      const el = document.getElementById(id);
      if (el && (el.style.display === 'flex' || el.classList.contains('show'))) {
        el.style.display = 'none';
        el.classList.remove('show');
      }
    });
    document.getElementById('emojiOverlay').style.display = 'none';
    document.getElementById('closePopup').style.display = 'none';
  }
}

// ===== Focus trap =====
function trapFocus(element) {
  const focusable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first) return;
  element.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

// ===== Global error handler =====
window.addEventListener('error', (e) => {
  console.error('Chatbot error:', e.message);
});

// ===== Init =====
function initChat() {
  try {
    const raw = localStorage.getItem('chatHistory');
    messageHistory = raw ? (JSON.parse(LZString.decompress(raw)) || []) : [];
  } catch(e) { messageHistory = []; }

  // Verificar bloqueio
  isChatBlocked = localStorage.getItem('isChatBlocked') === 'true';
  blockType = localStorage.getItem('blockType') || null;
  blockEndTime = parseInt(localStorage.getItem('blockEndTime')) || 0;

  checkBlockStatus();

  userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    const btn = document.getElementById('darkModeBtn');
    if (btn) btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:20px;height:20px;flex-shrink:0;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>Retornar ao Modo Claro`;
  }

  b.addEventListener('scroll', handleScroll);
  inputBox.addEventListener('focusin', () => inputBox.classList.add('focused'));
  inputBox.addEventListener('focusout', () => inputBox.classList.remove('focused'));

  document.getElementById('menuDialog').addEventListener('click', (e) => {
    if (e.target === document.getElementById('menuDialog')) closeMenu();
  });
  ['handoffSheet','feedbackSheet','faqSheet','policySheet'].forEach(id => {
    document.getElementById(id).addEventListener('click', (e) => {
      if (e.target === document.getElementById(id)) {
        document.getElementById(id).style.display = 'none';
        document.getElementById(id).classList.remove('show');
      }
    });
  });

  document.addEventListener('click', (e) => {
    const cp = document.getElementById('closePopup');
    const btn = document.getElementById('closeIconBtn');
    if (cp && cp.style.display === 'flex' && !cp.contains(e.target) && btn && !btn.contains(e.target)) {
      cp.style.display = 'none';
    }
    const eo = document.getElementById('emojiOverlay');
    const ebtn = document.getElementById('emojiBtn');
    if (eo && eo.style.display === 'block' && !eo.contains(e.target) && ebtn && !ebtn.contains(e.target)) {
      eo.style.display = 'none';
    }
  });

  setupEmojiGrid();
  setupFaqSheet();
  setupOfflineHandling();
  cleanStorageIfNeeded();
  document.addEventListener('keydown', handleKeyboardShortcuts);

  userInput.addEventListener('input', (e) => {
    resetInactivityTimer();
    localStorage.setItem('draft', e.target.value);
    e.target.value = e.target.value.replace(/:\)/g,'😊').replace(/<3/g,'❤️').replace(/:D/g,'😄').replace(/:\(/g,'😔');
  });

  const draft = localStorage.getItem('draft');
  if (draft) userInput.value = draft;

  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      processUserMessage(e.target.value.trim());
      e.target.value = '';
      userInput.focus();
      localStorage.removeItem('draft');
    }
  });

  document.getElementById('sendBtn').addEventListener('click', () => {
    if (userInput.value.trim()) {
      processUserMessage(userInput.value.trim());
      userInput.value = '';
      userInput.focus();
      localStorage.removeItem('draft');
    }
  });

  document.getElementById('emojiBtn').addEventListener('click', toggleEmojiOverlay);

  showInitialScreen();
}

// ===== Disparar init após LZ-String =====
window.onload = () => {
  if (typeof LZString !== 'undefined') {
    initChat();
  }
  // LZ-String pode já estar carregado via onload do script
};