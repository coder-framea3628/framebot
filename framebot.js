// ===== Injetar Meta Viewport para Responsividade em Mobile =====
const metaViewport = document.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(metaViewport);
// ===== Injetar LZ-String para Compressão =====
const lzScript = document.createElement('script');
lzScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js';
lzScript.onload = () => {
  initChat();
};
lzScript.onerror = () => {
  console.error('Falha ao carregar LZ-String. Usando fallback sem compressão.');
  LZString = {
    compress: (data) => data,
    decompress: (data) => data
  };
  initChat();
};
document.head.appendChild(lzScript);
// ===== Injetar Canvas Confetti para Feedback =====
const confettiScript = document.createElement('script');
confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
document.head.appendChild(confettiScript);
// ===== Injetar Link de Fontes =====
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap';
fontLink.rel = 'preload';
fontLink.as = 'style';
fontLink.onload = function() { this.rel = 'stylesheet'; };
document.head.appendChild(fontLink);
// ===== Injetar CSS =====
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
  --note-bg: #F4E8DB;
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
  gap: 0px; /* Lado a lado */
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
  right: 48px;
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
.close-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: all 0.2s ease;
}
.close-icon:hover {
  transform: translateY(-50%) scale(1.1);
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
.bb.error {
  background: #f8d7da;
  color: #721c24;
}
.bb.error .error-alert {
  font-size: 10px;
  color: #721c24;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
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
  max-width: 300px;
  min-height: 200px;
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
  box-shadow: 0 3px 10px var(--accent-color);
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
  animation: fadeIn 0.6s ease forwards; /* 👈 animação suave */
  opacity: 0; /* garante transição */
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
.mini-form input.prefilled {
  color: var(--typing-color);
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
  width: 90%;
}
.warning-note {
  background: var(--note-bg);
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 13px;
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
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  padding: 16px;
  overflow-y: auto;
}
.emoji-btn-grid {
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.emoji-btn-grid:hover {
  transform: scale(1.2);
}
#emojiSearch {
  font-size: 16px;
}
.timer-note {
  font-size: 14px;
  color: var(--typing-color);
  text-align: center;
}
.offline-warning {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255,0,0,0.2);
  color: #ff0000;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 10;
  font-size: 14px;
  text-align: center;
  width: auto;
  display: none;
  backdrop-filter: blur(5px);
  opacity: 0.9;
}
#closePopup {
  position: absolute;
  background: var(--secondary-bg);
  border-radius: 8px;
  box-shadow: 0 4px 15px var(--shadow-color);
  padding: 12px;
  width: 200px;
  z-index: 10001;
  display: none;
  flex-direction: column;
  gap: 8px;
}
#closePopup button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
}
#closePopup button:hover {
  background: var(--accent-color);
  color: #fff;
}
#closePopup button svg {
  width: 16px;
  height: 16px;
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
  .offline-warning {
    top: 10%;
  }
}
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
.faq-msg {
  margin-top: 20px; /* aumenta o espaço acima do FAQ */
  background: var(--accent-light);
  color: #fff;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  width: 90%;
  box-shadow: 0 1px 4px var(--shadow-color);
}
.faq-msg:hover {
  background: #c19a72;
  transform: translateY(-1px);
}
.faq-msg img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.faq-msg span {
  font-size: 12px;
  flex: 1;
}
.faq-msg svg {
  width: 18px;
  height: 18px;
  fill: #fff;
}
.initial-screen button.p {
  padding: 12px 20px;
  font-size: 16px;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.initial-screen button.p:hover {
  background: #c19a72;
  box-shadow: 0 4px 10px rgba(171,134,91,0.3);
}
#faqOverlay .oc {
  border: 2px solid #AB865B;
  padding: 30px;
  border-radius: 20px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 8px 20px var(--shadow-color);
}
#emojiOverlay {
  position: absolute;
  bottom: calc(100% + 10px);
  right: 0;
  width: 300px;
  height: auto;
  background: var(--secondary-bg);
  border-radius: 16px;
  box-shadow: 0 4px 15px var(--shadow-color);
  padding: 12px;
  z-index: 10001;
}
#emojiOverlay .oc {
  min-width: auto;
  max-width: none;
  min-height: auto;
  padding: 0;
}
#emojiOverlay .close-x {
  top: 5px;
  right: 5px;
}
.chat-starter {
  text-align: center;
  font-size: 10px;
  color: var(--typing-color);
  opacity: 0.8;
  margin-bottom: 8px;
}
#feedbackOverlay .oc {
  padding: 20px;
  align-items: flex-start;
  text-align: left;
}
#feedbackTitle {
  font-size: 1.2rem;
  font-weight: 600;
}
#feedbackSubtitle {
  font-size: 0.9rem;
  color: var(--typing-color);
}
#ratingLabel {
  font-size: 1rem;
  text-align: center;
  width: 100%;
}
.rating-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 12px 0;
}
.rating-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  color: #fff;
}
.rating-btn:hover {
  transform: scale(1.1);
}
.rating-btn.rating-1 {
  background: #ff4d4d;
}
.rating-btn.rating-2 {
  background: #ff9966;
}
.rating-btn.rating-3 {
  background: #ffcc00;
}
.rating-btn.rating-4 {
  background: #99cc00;
}
.rating-btn.rating-5 {
  background: #4caf50;
}
#feedbackOptions {
  display: none;
  flex-direction: column;
  gap: 8px;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
}
#feedbackText {
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
}
#submitFeedback {
  width: 100%;
}
#gameOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  color: var(--text-color);
}
#gameCanvas {
  border: 1px solid var(--border-color);
  background: var(--beige-bg);
}
#gameScore {
  font-size: 18px;
  margin: 10px 0;
}
#gameOverScreen {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
#gameOverScreen button {
  padding: 8px 16px;
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
`;
document.head.appendChild(style);
// ===== Injetar HTML =====
const chatContainer = document.createElement('div');
chatContainer.innerHTML = `
<div class="c" id="cb" role="dialog" aria-label="Chatbot da Frame" aria-live="polite">
  <div class="h" id="header">
    <h2 id="welcomeText"></h2>
    <div class="logo-circles">
      <div class="circle"><img src="https://framerusercontent.com/images/uKxosbf9vgV1bHLVDN6DrMHmgE.png" alt="Símbolo Frame 1"></div>
      <div class="circle"><img src="https://framerusercontent.com/images/yCLuCvLmAusOiyCw3BYHiuymEMM.png" alt="Assistente Fabi" title="Fabi - Assistente Virtual"></div>
      <div class="circle"><img src="https://framerusercontent.com/images/uKxosbf9vgV1bHLVDN6DrMHmgE.png" alt="Simbolo Frame 2"></div>
    </div>
    <div class="m" onclick="openMenu()" role="button" aria-label="Abrir menu" tabindex="0" aria-expanded="false" aria-controls="menuOverlay">
      <span></span><span></span><span></span>
    </div>
    <div class="close-icon" onclick="toggleClosePopup()" role="button" aria-label="Abrir opções de chat">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>
  </div>
  <div class="b" id="bd">
    <div id="offlineWarning" class="offline-warning">Você está offline</div>
  </div>
  <div class="input-box" id="inputBox">
    <input type="text" id="userInput" placeholder="Enviar mensagem..." aria-label="Digite sua mensagem">
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
    <button onclick="showRedirectLoading('https://frameag.com/models', false)">Visitar Catálogo de Modelos</button>
    <button onclick="showRedirectLoading('https://t.me/suporteframebot?start=chatbot-site-menu', true)">Atendimento Humano</button>
    <button onclick="showFeedbackPopup()">Avaliar Experiência</button>
  </div>
</div>
<div id="chatEnd" class="center-end">Este chat foi encerrado.</div>
<div class="scroll-top-btn" id="scrollTopBtn" onclick="scrollToTop()" aria-label="Voltar ao topo">↑</div>
<div class="loading-spinner" id="loadingSpinner" style="display:none;"></div>
<div class="o" id="confirmOverlay" role="dialog" aria-modal="true">
  <div class="oc" id="confirmContent">
    <div class="close-x" onclick="closeConfirm()" role="button" aria-label="Fechar confirmação">✕</div>
    <p id="confirmMessage"></p>
    <button id="confirmYes" class="btn p">Sim, continuar</button>
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
<div id="emojiOverlay" style="display:none;">
  <div class="oc">
    <div class="close-x" onclick="closeEmojiOverlay()" role="button" aria-label="Fechar emojis">✕</div>
    <input type="text" id="emojiSearch" placeholder="Pesquisar emoji..." oninput="filterEmojis()" style="font-size: 16px;">
    <div class="emoji-grid" id="emojiGrid"></div>
  </div>
</div>
<div class="o" id="blockOverlay" role="dialog" aria-modal="true">
  <div class="oc">
    <div class="close-x" onclick="closeBlockPopup()" role="button" aria-label="Fechar aviso de bloqueio">✕</div>
    <p id="blockMessage"></p>
    <p class="timer-note" id="blockTimer"></p>
    <p>Para suporte, envie email para <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a></p>
<button id="ageConfirmBtn" style="display:none; margin: 0 auto; background: var(--accent-light); color: #fff; font-weight: 600;" onclick="showAgeConfirm()" class="btn">Confirmar Idade</button>
  </div>
</div>
<div class="o" id="warningOverlay" role="dialog" aria-modal="true">
  <div class="oc">
    <div class="close-x" onclick="closeWarningPopup()" role="button" aria-label="Fechar aviso">✕</div>
    <p id="warningMessage"></p>
    <button onclick="closeWarningPopup()" class="btn p">Entendi, fechar</button>
  </div>
</div>
<div class="o" id="ageConfirmOverlay" role="dialog" aria-modal="true">
  <div class="oc">
    <div class="close-x" onclick="closeAgeConfirm()" role="button" aria-label="Fechar confirmação de idade">✕</div>
    <p>Confirme sua data de nascimento para validar maioridade</p>
    <input type="date" id="dateInput" aria-label="Data de nascimento" style="font-size: 16px;">
    <button onclick="validateAge()" class="btn p">Validar Idade</button>
  </div>
</div>
<div class="o" id="redirectOverlay" style="background: rgba(0,0,0,0.4);">
  <div class="oc">
    <div class="loading-spinner"></div>
    <p>Redirecionando...</p>
  </div>
</div>
<div class="o" id="faqOverlay" role="dialog" aria-modal="true">
  <div class="oc" style="max-width: 80%; max-height: 80%; overflow-y: auto; padding: 20px; text-align: left;">
    <div class="close-x" onclick="closeFaqPopup()" role="button" aria-label="Fechar FAQs">✕</div>
    <h2 style="font-size: 1.2rem; text-align: center; margin-bottom: 20px;">Perguntas Frequentes</h2>
    <div id="faqContent" style="display: flex; flex-direction: column; gap: 15px;">
      <!-- FAQs serão inseridos aqui dinamicamente -->
    </div>
  </div>
</div>
<div id="closePopup" style="display:none;">
  <button onclick="resetFlow()">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></path></svg>
    Reiniciar Chat
  </button>
  <button onclick="exportHistory()">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></path></svg>
    Exportar
  </button>
  <button onclick="finalizeChat()">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M5 12H2M22 12h-3M5.636 5.636l-1.414-1.414M19.778 5.636l-1.414-1.414M5.636 18.364l-1.414 1.414M19.778 18.364l-1.414 1.414M12 22v-4"/></path></svg>
    Finalizar chat
  </button>
</div>
<div class="o" id="feedbackOverlay" role="dialog" aria-modal="true">
  <div class="oc">
    <div class="close-x" onclick="closeFeedbackPopup()" role="button" aria-label="Fechar feedback">✕</div>
    <h2 id="feedbackTitle">Avalie sua experiência</h2>
    <p id="feedbackSubtitle">Valorizamos o feedback de nossos usuários.</p>
    <p id="ratingLabel">Qual sua nota para o chat ao vivo?</p>
    <div class="rating-buttons">
      <button class="rating-btn rating-1" onclick="selectRating(1)">1</button>
      <button class="rating-btn rating-2" onclick="selectRating(2)">2</button>
      <button class="rating-btn rating-3" onclick="selectRating(3)">3</button>
      <button class="rating-btn rating-4" onclick="selectRating(4)">4</button>
      <button class="rating-btn rating-5" onclick="selectRating(5)">5</button>
    </div>
    <div id="feedbackOptions" style="display:none;">
      <!-- Checkboxes serão inseridos dinamicamente -->
    </div>
    <textarea id="feedbackText" placeholder="Escreva um comentário sobre sua experiência no chat, como quiser (opcional)"></textarea>
    <button id="submitFeedback" class="btn p" onclick="submitFeedback()">Enviar</button>
  </div>
</div>
<div id="gameOverlay">
  <h2 style="font-size: 1.2rem; margin-bottom: 10px;">Frame Dino Game</h2>
  <canvas id="gameCanvas" width="600" height="200"></canvas>
  <div id="gameScore">Pontuação: 0</div>
  <div id="gameOverScreen">
    <h3>Game Over!</h3>
    <p>Pontuação final: <span id="finalScore">0</span></p>
    <button onclick="restartGame()">Recomeçar</button>
    <button onclick="exitGame()">Voltar ao Chat</button>
  </div>
</div>
`;
document.body.appendChild(chatContainer);
// ===== Variáveis de controle (adicionadas flags para iniciação, limites) =====
let typingShownThisFlow = false;
let messageHistory = [];
let userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
let lastMessage = localStorage.getItem('lastMessage') || null;
let floodCount = 0;
let lastSendTime = 0;
let floodTimeout = null;
let isChatInitiated = false;
let messageQueue = [];
const MAX_HISTORY = 50;
const MAX_STORAGE_SIZE = 1024 * 1024 * 5; // 5MB limite aproximado para localStorage
const HISTORY_AGE_LIMIT = 15 * 24 * 60 * 60 * 1000; // 15 dias em ms
let inactivityTimer;
const INACTIVITY_TIMEOUT = 3 * 60 * 1000; // 3 minutos
const MAX_CHAR_LIMIT = 500;
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
let currentTopic = localStorage.getItem('currentTopic') || null;
let mediaPreviewEl = null;
let badWordCount = 0;
let badFormAttempts = 0;
let lastBadFormMessage = null;
let chatStartTime = localStorage.getItem('chatStartTime') || null;
let sending = false;
let selectedRating = 0;
const emojis = [
  {emoji: '😀', name: 'rosto rindo'},
  {emoji: '😂', name: 'rosto chorando de rir'},
  {emoji: '😃', name: 'rosto sorridente com olhos grandes'},
  {emoji: '😄', name: 'rosto sorridente com olhos sorridentes'},
  {emoji: '😅', name: 'rosto sorridente com suor'},
  {emoji: '❤️', name: 'coração vermelho'},
  {emoji: '😉', name: 'rosto piscando'},
  {emoji: '😊', name: 'rosto sorridente com olhos sorridentes'},
  {emoji: '🔥', name: 'foguinho'},
  {emoji: '👍', name: 'joinha'},
  {emoji: '😍', name: 'rosto apaixonado'},
  {emoji: '🤔', name: 'pensando'},
  {emoji: '😎', name: 'rosto com óculos'},
  {emoji: '🎉', name: 'confete'},
  {emoji: '🌟', name: 'estrela brilhante'},
  {emoji: '🙌', name: 'mãos levantadas'},
  {emoji: '😔', name: 'rosto triste'},
  {emoji: '😡', name: 'rosto bravo'}
];
const intents = [
  { intent: 'greeting', patterns: ['oi', 'ola', 'ei', 'hey', 'salve', 'bom dia', 'boa tarde', 'boa noite'], action: () => {
    am('Olá! Tudo bem? Como posso ajudar você hoje? 😊');
    menuPT();
  } },
  { intent: 'dark_mode', patterns: ['mude para modo escuro', 'ativar dark mode', 'modo escuro'], action: () => {
    if (!document.body.classList.contains('dark')) {
      toggleDarkMode();
      am('Modo escuro ativado no chat!');
    } else {
      am('Você já está no modo escuro :)');
    }
  } },
  { intent: 'light_mode', patterns: ['mude para modo claro', 'desativar dark mode', 'modo claro'], action: () => {
    if (document.body.classList.contains('dark')) {
      toggleDarkMode();
      am('Modo claro ativado no chat!');
    } else {
      am('Você já está no modo claro :)');
    }
  } },
  { intent: 'clear_history', patterns: ['limpe tudo', 'limpar historico', 'clear chat'], action: clearChatHistory },
  { intent: 'logout', patterns: ['logout', 'sair'], action: () => {
    userInfo = null;
    localStorage.removeItem('userInfo');
    showInitialScreen();
    am('Logout realizado com sucesso. Inicie o atendimento novamente quando quiser!');
  } },
  { intent: 'help', patterns: ['ajuda', 'help', 'comandos'], action: () => {
    am('Aqui vai uma lista de tópicos que posso ajudar: segurança, cadastro, Frame premium, suporte humano, criadora, contratante, denúncias, Termos, dados pessoais. Digite um deles para mais infos!');
  } }
];
const synonymTable = {
  greeting: ['oi', 'ola', 'ei', 'hey', 'salve', 'bom dia', 'boa tarde', 'boa noite'],
  denunciar: ['denunciar', 'reportar', 'denuncia', 'fake', 'golpe'],
  humano: ['humano', 'analista', 'suporte', 'agente', 'falar com a gente'],
  seguranca: ['seguranca', 'seguranca', 'seguro'],
  termos: ['termos', 'condições', 'terms', 'juridico', 'politica de privacidade'],
  criadora: ['criadora', 'acompanhante', 'anunciante', 'modelo', 'agenciada'],
  contratante: ['contratante', 'assinante', 'comprador', 'premium'],
  dados: ['dados pessoais', 'lgpd', 'exclusão de dados', 'privacidade'],
  idioma: ['idioma', 'english', 'español'],
  definicoes: ['definições', 'sobre', 'about', 'oq é a frame', 'o que e a frame', 'frame agency', 'quem é', 'o que é a plataforma'],
  pagamento: ['pagamento'],
  cancelamento: ['cancelamento'],
  suporte: ['suporte'],
  cadastro: ['cadastro', 'criar conta', 'código', 'criar perfil', 'registrar'],
  premium: ['premium', 'frame premium', 'assinar', 'planos'],
  ajuda: ['ajuda', 'preciso de ajuda', 'pode me ajudar', 'help', 'comandos'],
  finalizar: ['finalizar', 'encerrar', 'encerrar chat', 'fechar'],
  logout: ['logout', 'sair']
};
const greetingVariations = [
  'Olá! Tudo bem? Como posso ajudar você hoje?',
  'Oi! O que você precisa hoje?',
  'Ei! Pronto para começar?'
];
const notUnderstoodVariations = [
  'Não consegui entender sua solicitação. Vamos tentar novamente? Me descreva mais detalhes sobre o que precisa.',
  'Desculpe, eu não entendi. Poderia enviar uma nova mensagem?',
  'Poxa, não entendi sua mensagem! Digite como nos exemplos: Meus dados, Termos, Frame Premium'
];
const inactivityVariations = [
  'Ainda está aí {nome}? Gostaria de saber se ainda posso te ajudar?',
  'Ei {nome}, parece que você sumiu! Precisa de mais ajuda?',
  'Estou esperando para te ajudar. Ainda precisa de assistência?'
];
const adminEmail = atob('c2VjdXJpdHlAZnJhbWVhZy5jb20=');
const adminName = atob('THVpemEgUGVyZWlyYQ==');
const adminPassword = atob('RnJhbWVBZ3IyMDI1IyRDYW1lbG9QYXNzU3RyMG5n');
let isAdminMode = false;
let usersTalked = 0;
let emailsInserted = 0;
let chatsInitiated = 0;
let blockedUsers = 0;
let feedbacks = [];
// Função sanitize contra XSS
function sanitize(text) {
  text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="link">$1</a>');
  text = text.replace(/([^\s@]+@[^\s@]+\.[^\s@]+)/g, '<a href="mailto:$1" class="link">$1</a>');
  const allowedTags = ['a', 'span'];
  const allowedAttrs = { a: ['href', 'target', 'class', 'rel'], span: ['class'] };
  const div = document.createElement('div');
  // parse
  div.innerHTML = text;
  const elements = Array.from(div.querySelectorAll('*'));
  elements.forEach(el => {
    const tag = el.tagName.toLowerCase();
    if (!allowedTags.includes(tag)) {
      // substitui o elemento perigoso por texto (escapa)
      el.replaceWith(document.createTextNode(el.outerHTML));
      return;
    }
    // varre atributos com spread operator seguro
    Array.from(el.attributes).forEach(attr => {
      if (!allowedAttrs[tag] || !allowedAttrs[tag].includes(attr.name.toLowerCase())) {
        el.removeAttribute(attr.name);
      } else if (attr.name.toLowerCase() === 'href') {
        // bloqueia javascript: e data URIs potencialmente perigosos
        const val = attr.value.trim();
        if (/^\s*javascript:/i.test(val) || /^\s*data:/i.test(val)) {
          el.removeAttribute('href');
        }
      }
    });
    if (tag === 'a') {
      el.setAttribute('rel', 'noopener noreferrer');
      if (!el.classList.contains('link')) el.classList.add('link');
    }
  });
  return div.innerHTML;
}
// ===== Inicialização com verificação de estado =====
function initChat() {
  loadingSpinner.style.display = 'block';
  if (typeof LZString !== 'undefined') {
    messageHistory = localStorage.getItem('chatHistory') ? JSON.parse(LZString.decompress(localStorage.getItem('chatHistory'))) || [] : [];
    loadingSpinner.style.display = 'none';
  } else {
    return;
  }
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
  document.getElementById('ov').addEventListener('click', (e) => {
    if (e.target === document.getElementById('ov')) {
      closeMenu();
    }
  });
  setupOfflineHandling();
  resetInactivityTimer();
  userInput.addEventListener('input', (e) => {
    resetInactivityTimer();
    localStorage.setItem('draft', e.target.value);
  });
  if (localStorage.getItem('draft')) {
    userInput.value = localStorage.getItem('draft');
  }
  document.getElementById('faqOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('faqOverlay')) {
      closeFaqPopup();
    }
  });
  document.addEventListener('click', (e) => {
    const closePopup = document.getElementById('closePopup');
    if (closePopup.style.display === 'flex' && !closePopup.contains(e.target) && !document.querySelector('.close-icon').contains(e.target)) {
      closePopup.style.display = 'none';
    }
  });
  if (chatStartTime && isChatInitiated) {
    addChatStarter();
  }
}
// ===== Mostrar tela inicial (melhorada para premium) =====
function showInitialScreen() {
  b.innerHTML = `
    <div class="initial-screen">
      <p>Mensagens</p>
      <div class="privacy-note">No atendimento, podemos solicitar dados adicionais conforme necessário. Acesse nossa <a href="https://frameag.com/privacy" target="_blank" class="link" style="text-decoration: underline;">Política de Privacidade</a> no site.</div>
      <div class="recent-msg" id="recentMsg" style="display:none;"></div>
      <button onclick="startChat()" class="btn p">Iniciar Atendimento</button>
      <div class="faq-msg" onclick="openFaqPopup()">
        <img src="https://framerusercontent.com/images/nqe8sytY941OUcgvF17Y9qLajUc.png" alt="FAQ Logo">
        <span style="font-weight: 600;">Perguntas frequentes</span>
        <span style="font-size: 12px; margin-left: auto;">Tire suas dúvidas sobre a Frame Agency</span>
        <svg viewBox="0 0 24 24" style="margin-left: 8px;"><path d="M9 5l7 7-7 7"/></svg>
      </div>
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
          Declaro ser maior de 18 anos e aceito os Termos e Condições da Frame Agency.</a>
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
    showWarningPopup('Você deve declarar ser maior de 18 anos e aceitar os nossos Termos para continuar no chat.');
    return;
  }
  if (validateUserInput(name, email)) {
    userInfo = { name, email };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    welcomeText.textContent = `Olá ${userInfo.name.split(' ')[0]}, tudo bem? Como podemos ajudar?`;
    isChatInitiated = false;
    chatStartTime = new Date().toISOString();
    localStorage.setItem('chatStartTime', chatStartTime);
    loadChat();
    badFormAttempts = 0;
    lastBadFormMessage = null;
  } else if (badFormAttempts < 3) {
    badFormAttempts++;
    if (badFormAttempts === 3) {
      showWarningPopup('Oops! 3 tentativas inválidas do cadastro. Por favor, corrija os campos destacados para continuar no chat.');
    }
  }
}
// ===== Carregar chat com lazy loading e limite =====
function loadChat() {
  loadingSpinner.style.display = 'block';
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
    b.innerHTML = '';
    addChatStarter();
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
// ===== Adicionar mensagem =====
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
    bb.innerHTML = text.replace(/<br>/g, '<br> ');
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
        b2.onclick = function() {
          if (b2.classList.contains('clicked')) return;
          b2.classList.add('clicked');
          o.a();
        };
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
    if (text.includes('<a')) {
      const links = bb.querySelectorAll('a');
      links.forEach(link => {
        if (link.parentNode.tagName.toLowerCase() === 'span' || link.classList.contains('link-duplicated')) return;
        link.classList.add('link-duplicated');
      });
    }
  }, delay + (user ? 0 : typingDelay));
}
// ===== Processar mensagem do usuário =====
function processUserMessage(text) {
  if (sending) return;
  sending = true;
  if (isChatBlocked) {
    sending = false;
    return;
  }
  const prohibitedWords = ['cu', 'pau', 'ppk', 'goza', 'chupa', 'puta', 'kids', 'kid', 'baby', 'bebe', 'cp', 'porno', 'estupro', 'estuprador', 'buceta', 'caralho', 'foder', 'fode', 'transar', 'sexo', 'bucetinha', 'roubar', 'exterminar', 'cuzinho', 'chupetinha', 'viado', 'baitola', 'prostituta', 'pedofilo', 'bct', 'nuds', 'leitada', 'fetiche', 'penis', 'vagina', 'se fuder', 'pepeka', 'piroca', 'gozada', 'pedofilia', 'violencia', 'ameaca', 'drogas', 'ilegal'];
  let isProhibited = false;
  const words = text.toLowerCase().split(/\s+/);
  for (let word of words) {
    if (prohibitedWords.includes(word) && !text.toLowerCase().includes('security@') && !text.toLowerCase().includes('paula')) {
      isProhibited = true;
      break;
    }
  }
  let obscuredText = text;
  if (isProhibited) {
    obscuredText = text.replace(new RegExp(prohibitedWords.join('|'), 'gi'), match => match[0] + '*'.repeat(match.length - 1));
    badWordCount++;
    if (badWordCount === 1) {
      am('Desculpe, ocultamos sua mensagem pois não posso ajudar com esse tipo de conteúdo. Se você tiver outra pergunta ou precisar de assistência em um tópico diferente, estou aqui para ajudar!');
    } else if (badWordCount < 3) {
      am('Por favor, mantenha a conversa respeitosa. Estou aqui para ajudar com tópicos adequados a Frame.');
    } else {
      am('Essa conversa desrespeita os padrões de segurança e conduta da Frame. Por esse motivo, a interação será encerrada e o time de segurança da plataforma foi acionado. Qualquer tentativa de violar os Termos poderá resultar em bloqueio e medidas legais.');
      blockChatForBehavior();
    }
  }
  const phoneRegex = /(\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g;
  const cpfRegex = /\d{3}\.\d{3}\.\d{3}-\d{2}/g;
  const numberRegex = /\d{4,}/g;
  let isSensitive = phoneRegex.test(text) || cpfRegex.test(text) || numberRegex.test(text);
  if (isSensitive && !isAdminMode) {
    text = text.replace(phoneRegex, (match) => '**' + match.slice(-4));
    text = text.replace(cpfRegex, (match) => '**' + match.slice(-4));
    text = text.replace(numberRegex, (match) => '**' + match.slice(-4));
    am('Por motivos de privacidade, ocultei parte da sua mensagem');
    sending = false;
    return;
  }
  loadingSpinner.style.display = 'block';
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
  }, 600);
  const now = Date.now();
  if (now - lastSendTime < 10000) {
    floodCount++;
    if (floodCount > 5) {
      showWarningPopup('Aguarde um momento para enviar mensagens. Tente novamente em breve.');
      userInput.disabled = true;
      clearTimeout(floodTimeout);
      floodTimeout = setTimeout(() => {
        userInput.disabled = false;
        floodCount = 0;
      }, 10000);
      sending = false;
      return;
    }
  } else {
    floodCount = 0;
  }
  lastSendTime = now;
  if (text.length > MAX_CHAR_LIMIT) {
    am(text, null, 0, true);
    const lastMsg = b.lastChild.querySelector('.bb');
    lastMsg.classList.add('error');
    const alertEl = document.createElement('div');
    alertEl.className = 'error-alert';
    alertEl.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="#721c24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V9zm0 8h-2v2h2v-2z"/></svg>Limite de caracteres atingido';
    lastMsg.appendChild(alertEl);
    sending = false;
    return;
  }
  am(isProhibited ? obscuredText : sanitize(text), null, 0, true);
  if (isProhibited) {
    const lastMsg = b.lastChild.querySelector('.bb');
    lastMsg.classList.add('error');
    sending = false;
    return;
  }
  let t = text.toLowerCase();
  if (t === '/jogo') {
    am('O jogo vai começar!');
    startGameDino();
    sending = false;
    return;
  }
  if (t === '/adm') {
    am('Digite o e-mail de administrador:');
    userInput.onkeydown = (e) => {
      if (e.key === 'Enter' && userInput.value === adminEmail) {
        am('Digite o nome do administrador:');
        userInput.onkeydown = (e) => {
          if (e.key === 'Enter' && userInput.value === adminName) {
            am('Digite a senha:');
            userInput.onkeydown = (e) => {
              if (e.key === 'Enter' && userInput.value === adminPassword) {
                isAdminMode = true;
                am('Modo administrador ativado. Use comandos como /dados, /unban, /feedbacks.');
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
    if (t === '/dados') {
      am(`Usuários que falaram: ${usersTalked}\nE-mails inseridos: ${emailsInserted}\nChats iniciados: ${chatsInitiated}\nUsuários bloqueados: ${blockedUsers}`);
      am('', [{ l: 'Salvar em TXT', a: () => {
        const data = `Usuários que falaram: ${usersTalked}\nE-mails inseridos: ${emailsInserted}\nChats iniciados: ${chatsInitiated}\nUsuários bloqueados: ${blockedUsers}`;
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dados_frame.txt';
        a.click();
        URL.revokeObjectURL(url);
      } }]);
      sending = false;
      return;
    }
    if (t.startsWith('/unban')) {
      am('Digite o e-mail do usuário para desbloquear:');
      userInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
          const email = userInput.value.trim();
          // Lógica simulada para unban
          am(`Usuário com e-mail ${email} desbloqueado.`);
          blockedUsers--;
          userInput.value = '';
        }
      };
      sending = false;
      return;
    }
    if (t === '/feedbacks') {
      if (feedbacks.length === 0) {
        am('Nenhum feedback com comentários.');
      } else {
        feedbacks.forEach(fb => am(fb));
      }
      sending = false;
      return;
    }
  }
  let matchedIntent = false;
  for (let intent of intents) {
    for (let pattern of intent.patterns) {
      if (t.includes(pattern)) {
        intent.action();
        matchedIntent = true;
        break;
      }
    }
    if (matchedIntent) break;
  }
  if (matchedIntent) {
    sending = false;
    return;
  }
  const positiveWords = /(bom|otimo|feliz|bom dia|boa tarde|boa noite|obrigado|legal|incrivel|adorei|obrigada)/i;
  const positiveEmojis = /(😊|😂|❤️|👍|🙌|🎉|🔥|😍|😎|✨|🌟|🚀)/g;
  const positiveCount = (t.match(positiveWords) || []).length + (text.match(positiveEmojis) || []).length;
  const isPositive = positiveCount > 0;
  const frustrationRegex = /!/g;
  const frustrationCount = (t.match(frustrationRegex) || []).length;
  const isFrustrated = frustrationCount > 3 || t === t.toUpperCase();
  if (isFrustrated && !isProhibited) {
    am('Entendo sua frustração, vamos resolver isso juntos! Me conte mais sobre o problema.');
    sending = false;
    return;
  }
  if (/resolvido|obrigado|finalizar/i.test(t)) {
    am('Sua dúvida foi esclarecida? Gostaria de avaliar a experiência?', [
      { l: 'Sim', p: 1, a: showFeedbackPopup },
      { l: 'Não', a: () => am('Tudo bem, estou à disposição para mais ajuda!') }
    ]);
  }
  let expandedKeywords = {};
  for (let key in synonymTable) {
    expandedKeywords[key] = synonymTable[key].some(syn => t.includes(syn));
  }
  let previousContext = '';
  const lastMessages = messageHistory.slice(-5).map(msg => msg.text.toLowerCase());
  const contextKeywords = {
    premium: /premium/i,
    cadastro: /cadastro/i,
    seguranca: /seguranca/i
  };
  for (let key in contextKeywords) {
    if (lastMessages.some(msg => contextKeywords[key].test(msg))) {
      previousContext = `Continuando sobre o ${key}... `;
      break;
    }
  }
  const keywords = {
    greeting: expandedKeywords.greeting,
    bomdia: expandedKeywords.bomdia,
    boatarde: expandedKeywords.boatarde,
    boanoite: expandedKeywords.boanoite,
    denunciar: expandedKeywords.denunciar,
    humano: expandedKeywords.humano,
    seguranca: expandedKeywords.seguranca,
    termos: expandedKeywords.termos,
    criadora: expandedKeywords.criadora,
    contratante: expandedKeywords.contratante,
    dados: expandedKeywords.dados,
    idioma: expandedKeywords.idioma,
    definicoes: expandedKeywords.definicoes,
    pagamento: expandedKeywords.pagamento,
    cancelamento: expandedKeywords.cancelamento,
    suporte: expandedKeywords.suporte,
    cadastro: expandedKeywords.cadastro,
    premium: expandedKeywords.premium,
    ajuda: expandedKeywords.ajuda,
    finalizar: expandedKeywords.finalizar,
    logout: expandedKeywords.logout
  };
  if (keywords.greeting) {
    am(`${previousContext}${greetingVariations[Math.floor(Math.random() * greetingVariations.length)]}${isPositive ? ' 😊' : ''}`);
    menuPT();
    sending = false;
    return;
  }
  if (keywords.bomdia) {
    am(`${previousContext}Bom dia! Tudo bem? Como posso ajudar você hoje?${isPositive ? ' 😊' : ''}`);
    menuPT();
    sending = false;
    return;
  }
  if (keywords.boatarde) {
    am(`${previousContext}Boa tarde! Tudo bem? Como posso ajudar você hoje?${isPositive ? ' 😊' : ''}`);
    menuPT();
    sending = false;
    return;
  }
  if (keywords.boanoite) {
    am(`${previousContext}Boa noite! Tudo bem? Como posso ajudar você hoje?${isPositive ? ' 😊' : ''}`);
    menuPT();
    sending = false;
    return;
  }
  if (keywords.denunciar) {
    am(`${previousContext}Na Frame, levamos segurança muito a sério. Caso encontre irregularidades em anúncios do nosso site, acesse <a href="https://frameag.com/report" target="_blank" class="link">frameag.com/report</a> e denuncie anonimamente. Isso ajuda a manter a plataforma segura para todos.${isPositive ? ' Obrigada pela colaboração!' : ''}`);
    perguntarSatisfacao();
    sending = false;
    return;
  }
  if (keywords.humano) {
    fh();
    am(`${previousContext}Se preferir, você também pode enviar um email para: <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a>. Nossa equipe está pronta para ajudar com qualquer dúvida mais complexa.${isPositive ? ' 😊' : ''}`);
    sending = false;
    return;
  }
  if (keywords.seguranca) {
    am(`${previousContext}Você pode ter se perguntado se a Frame é segura, e sim, é. Aqui, garantimos autenticação em três etapas e contamos com um time de segurança disponível 24h. Além disso, usamos tecnologias avançadas para proteger seus dados e interações. Saiba mais em <a href="https://frameag.com/verificacao" target="_blank" class="link">Blog de Verificação</a>.${isPositive ? ' Fico feliz em esclarecer!' : ''}`);
    perguntarSatisfacao();
    sending = false;
    return;
  }
  if (keywords.termos) {
    am(`${previousContext}Nossos Termos e Condições detalham como usamos e protegemos seus dados. Você pode acessá-los em <a href="https://frameag.com/termos" target="_blank" class="link">frameag.com/termos</a>. Para privacidade, focamos em conformidade com leis como LGPD, garantindo transparência e segurança.${isPositive ? ' 😊' : ''}`);
    perguntarSatisfacao();
    sending = false;
    return;
  }
  if (keywords.criadora) {
    if (currentFlowType && currentFlowType !== 'criadora') {
      resetFlow();
    }
    currentFlowType = 'criadora';
    currentTopic = 'criadora';
    localStorage.setItem('currentTopic', currentTopic);
    crPT();
    sending = false;
    return;
  }
  if (keywords.contratante) {
    if (currentFlowType && currentFlowType !== 'contratante') {
      resetFlow();
    }
    currentFlowType = 'contratante';
    currentTopic = 'contratante';
    localStorage.setItem('currentTopic', currentTopic);
    am(`${previousContext}Como contratante, você tem acesso a perfis completos, agendamentos e comunicação segura. O Premium desbloqueia catálogo sem anúncios, galerias exclusivas e suporte prioritário. Visite <a href="https://frameag.com/premium" target="_blank" class="link">frameag.com/premium</a> para mais detalhes e assinatura.${isPositive ? ' Incrível, né?' : ''}`);
    perguntarSatisfacao();
    sending = false;
    return;
  }
  if (keywords.dados) {
    am(`${previousContext}Tratamos dados com total segurança. Você pode acessar, corrigir ou excluir dados via privacidade@frameag.com. Para casos de banimento, retemos dados necessários para prevenção de fraudes, mas sempre com transparência.${isPositive ? ' 😊' : ''}`);
    perguntarSatisfacao();
    sending = false;
    return;
  }
  if (keywords.idioma) {
    if (/english/i.test(t)) {
      showLangPopup('For English support, please visit our dedicated page.', 'Go to English Page', 'https://frameag.com/en');
    } else if (/español/i.test(t)) {
      showLangPopup('Para atención en español, visite nuestra página dedicada.', 'Ir a la Página en Español', 'https://frameag.com/es');
    } else {
      showLangPopup('Por favor, selecione o idioma no menu inicial para melhor atendimento.', 'Voltar ao Menu', '#');
    }
    sending = false;
    return;
  }
  if (keywords.definicoes) {
    am(`${previousContext}A Frame é uma plataforma especializada em conectar criadoras a contratantes, oferecendo ferramentas de gestão, promoção de anúncios e segurança de ponta. Atuamos como provedora de tecnologia, sem intermediar negociações diretas.${isPositive ? ' Legal, né?' : ''}`);
    perguntarSatisfacao();
    sending = false;
    return;
  }
  if (keywords.pagamento) {
    am(`${previousContext}Para dúvidas sobre pagamentos, acesse sua área de login ou entre em contato com o time via <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a> .${isPositive ? ' Vamos resolver rapidinho!' : ''}`);
    perguntarSatisfacao();
    sending = false;
    return;
  }
  if (keywords.cancelamento) {
    am(`${previousContext}Para cancelamentos de renovação automática, revise os termos e solicite enviando um email para: <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a> ${isPositive ? ' 😊' : ''}`);
    perguntarSatisfacao();
    sending = false;
    return;
  }
  if (keywords.suporte) {
    fh();
    sending = false;
    return;
  }
  if (keywords.cadastro) {
    cadastroPT();
    sending = false;
    return;
  }
  if (keywords.premium) {
    premiumPT();
    sending = false;
    return;
  }
  if (keywords.ajuda) {
    am('Aqui vai uma lista de tópicos que posso ajudar: segurança, cadastro, Frame premium, suporte humano, criadora, contratante, denúncias, Termos, dados pessoais. Digite um deles para mais infos!');
    sending = false;
    return;
  }
  if (keywords.finalizar) {
    am('Gostaria de encerrar esse atendimento? Sem problemas! Ficamos a disposição para te auxiliar sempre que precisar.');
    sending = false;
    return;
  }
  if (keywords.logout) {
    userInfo = null;
    localStorage.removeItem('userInfo');
    showInitialScreen();
    am('Logout realizado com sucesso. Inicie o atendimento novamente quando quiser!');
    sending = false;
    return;
  }
  loadingSpinner.style.display = 'block';
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
    am(`${previousContext}${notUnderstoodVariations[Math.floor(Math.random() * notUnderstoodVariations.length)]}${isPositive ? ' 😊' : ''}`, [
      { l: "Voltar ao menu", p: 1, a: () => { resetFlow(); inicio(); } }
    ], 500);
    if (currentTopic) {
      am(`Baseado na sua dúvida anterior sobre [${currentTopic}], sugiro...`, [
        { l: "Mais sobre " + currentTopic, a: () => {
          if (currentTopic === 'criadora') crPT();
          if (currentTopic === 'contratante') ctPT();
        } }
      ]);
    }
    sending = false;
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
    localStorage.removeItem('draft');
  }
});
document.getElementById('sendBtn').addEventListener('click', () => {
  if (userInput.value.trim() !== "") {
    processUserMessage(userInput.value.trim());
    userInput.value = "";
    userInput.focus();
    localStorage.removeItem('draft');
  }
});
document.getElementById('emojiBtn').addEventListener('click', openEmojiOverlay);
// ===== Perguntar satisfação (mais amigável) =====
function perguntarSatisfacao() {
  const nome = userInfo ? userInfo.name.split(' ')[0] : '';
  am(`Minha explicação ajudou a esclarecer sua dúvida, ${nome}? Estou aqui para explicar mais se necessário.`, [
    { l: "Sim, tudo esclarecido!", p: 1, a: () => {
        am(`Perfeito, ${nome}! Agradecemos pelo contato e estamos sempre à disposição se precisar de mais ajuda.`);
        messageHistory = [];
        saveToStorageSafely('chatHistory', messageHistory);
        isChatInitiated = false;
        setTimeout(() => { document.getElementById('chatEnd').style.display = 'block'; showInitialScreen(); }, 600);
        showFeedbackPopup();
      }},
    { l: "Não, preciso de mais detalhes", a: () => {
        fh();
        am('Se preferir, envie um email para: <a href="mailto:contato@frameag.com" class="link">contato@frameag.com</a> com mais informações sobre sua dúvida.');
      }}
  ], 600);
}
// ===== Fluxos restaurados e expandidos =====
function menuPT() {
  am("É ótimo ter você em nossa plataforma. Vamos personalizar o atendimento.", null, 0);
  am("Me conta, qual é a sua relação com a Frame hoje? Isso ajuda a direcionar melhor as opções.", [
    { l: "Contratante / Assinante", p: 1, a: cmPT },
    { l: "Criadora / Anunciante", a: crPT }
  ], 800);
}
function cmPT() {
  am("Certo! Como contratante, veja como posso ajudar você.", null, 0);
  am("Selecione uma opção abaixo para prosseguirmos:", [
    { l: "Quero contratar uma modelo", p: 1, a: ctPT },
    { l: "Sobre segurança", a: () => {
        am('Você pode ter se perguntado se a Frame é segura, e sim, é. Aqui, garantimos autenticação em três etapas e contamos com um time de segurança disponível 24h. Saiba mais detalhes em nosso <a href="frameag.com/verificacao" target="_blank" class="link">Blog de Verificação</a> ');
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
  ], 800);
}
function cadastroPT() {
  resetFlowForError();
  showTypingIndicator(600);
  am("Poxa, sinto muito que tenha tido problemas com seu cadastro. Vamos resolver isso passo a passo.", null, 0);
  am("Qual dessas situações melhor se aplica ao seu caso? Escolha para que eu possa guiar você.", [
    { l: "Não recebi o código de ativação", a: problemaCodigo },
    { l: "Perdi o acesso ao meu e-mail", a: problemaEmail },
    { l: "Não sei como realizar meu login", a: problemaLogin },
    { l: "Erro de código inválido", a: erroCodigo },
    { l: "Falha no Frame Authentic", a: falhaAuthentic },
    { l: "Voltar", a: cmPT }
  ], 800);
}
function erroCodigo() {
  am("Inseriu o Código e ele estava inválido? 1) Verifique se copiou o código recebido por e-mail corretamente. 2) Tente reenviar ou utilize outro email ou dispositivo na Área do código.", null, 0);
  am("Problema persiste? Vídeo tutorial: <a href='https://frameag.com/ajuda/cadastro' class='link'>Assista aqui</a>", [{ l: "Voltar", a: cadastroPT }], 800);
}
function falhaAuthentic() {
  am("Certifique-se de utilizar uma boa iluminação e manter o rosto nítido, sem óculos, chapéu ou acessórios. Verifique sua conexão e tente novamente após o prazo estipulado na tela ou fale conosco.", null, 0);
  am("Falar com suporte: <a href='https://t.me/suporteframebot' class='link'>Telegram 24h</a>", [{ l: "Voltar", a: cadastroPT }], 800);
}
function docsObrigatorios() {
  am("Os documentos obrigatórios são RG ou CNH (frente + verso) • Selfie segurando o documento e passar pela verificação facial.", null, 0);
  am("Envie tudo nítido! Dúvidas? Atendimento humano.", [{ l: "Ir para suporte", p: 1, a: fh }, { l: "Voltar", a: cadastroPT }], 800);
}
function problemaCodigo() {
  showTypingIndicator(600);
  am("Se o código de ativação não chegou, aqui vão algumas dicas rápidas para verificar:", null, 0);
  am("1. <span class='semibold'>Verifique a caixa de spam</span> ou lixo eletrônico no seu e-mail. 2. <span class='semibold'>Confirme se o e-mail cadastrado está correto</span> no site. 3. <span class='semibold'>Aguarde alguns minutos</span>, pois pode haver atraso. 4. <span class='semibold'>Tente reenviar o código</span> diretamente pela página de cadastro.", null, 800);
  am("Se o problema persistir após essas verificações, entre em contato com nossa equipe para assistência personalizada:", [
    { l: "Ir para atendimento", p: 1, a: fh },
    { l: "Voltar", a: cadastroPT }
  ], 1600);
}
function problemaEmail() {
  showTypingIndicator(600);
  am("Se você perdeu acesso ao e-mail usado no cadastro, não se preocupe, há soluções:", null, 0);
  am("1. <span class='semibold'>Tente recuperar a conta de e-mail</span> diretamente no provedor (como Gmail ou Outlook). 2. <span class='semibold'>Se não for possível</span>, podemos ajudar a atualizar o e-mail na sua conta Frame.", null, 800);
  am("Importante: Por segurança, você precisará confirmar dados pessoais e passar pelo Frame Authentic antes da atualização.", null, 1600);
  am("Para prosseguir com a atualização:", [
    { l: "Ir para atendimento", p: 1, a: fh },
    { l: "Voltar", a: cadastroPT }
  ], 2400);
}
function problemaLogin() {
  showTypingIndicator(600);
  am("Para iniciar ou recuperar seu login, acesse a Área de Cadastro em <a href='https://frameag.com/cadastro' target='_blank' class='link'>frameag.com/cadastro</a> e siga os passos intuitivos.", null, 0);
  am("Se ainda tiver dúvidas, assista ao nosso vídeo tutorial completo: <a href='https://frameag.com/ajuda/cadastro' target='_blank' class='link'>https://frameag.com/ajuda/cadastro</a>. Ele cobre tudo desde o início.", null, 800);
  am("Deseja voltar ao menu de problemas com cadastro para outras opções?", [
    { l: "Sim, voltar", a: cadastroPT }
  ], 1600);
}
function premiumPT() {
  am("Torne-se Premium e desbloqueie o máximo da Frame! • Catálogo completo sem anúncios, FramePay com lounges VIP e hotéis parceiros, atendimento prioritário 24h e muito mais.", null, 0);
  am("Clique e conheça os planos:", [{ l: "Quero ser Premium", p: 1, a: () => showRedirectLoading('https://frameag.com/premium', true) }, { l: "Voltar", a: crPT }], 800);
}
function ctPT() {
  am("Antes de prosseguirmos, confirme se você possui 18 anos ou mais, pois nossos serviços são exclusivos para maiores de idade.", [
    { l: "Sou maior de 18 anos", p: 1, a: () => {
        am("Perfeito! Agora escolha como prosseguir:",
           [
             { l: "Como agendar a experiência?", a: agendarExperiencia },
             { l: "Visitar catálogo completo", a: visitarCatalogo },
             { l: "Me tornar Frame Premium", a: premiumPT },
             { l: "Como funciona a Verificação?", a: verificacaoContratante },
             { l: "Voltar ao menu Contratante", a: ctPT }
           ],
           0);
      }},
    { l: "Sou menor", a: () => {
        am("Desculpe, não podemos prosseguir. O ecossistema da Frame é projetado exclusivamente para usuários maiores de 18 anos, priorizando responsabilidade e conformidade legal.");
        blockChatForUnderage();
      }}
  ]);
}
function agendarExperiencia() {
  am("Para agendar uma experiência personalizada na Frame, seja ela virtual ou presencial, você deve selecionar sua criadora favorita, ajustar detalhes e realizar a assinatura do contrato enviado a você por e-mail.", null, 0);
  am("A Frame só fornece a tecnologia, a negociação é 100% direta e segura entre você e a criadora selecionada.",
     [{ l: "Agendar agora", p: 1, a: () => showRedirectLoading('https://frameag.com/models', true) },
      { l: "Voltar", a: ctPT }],
     800);
}
function visitarCatalogo() {
  am("Antes de contratar, explore todas as modelos em nosso catálogo completo: <a href='https://frameag.com/models' target='_blank' class='link'>frameag.com/models</a>. Perfis verificados e opções detalhadas.", null, 0);
  am("Decidiu? Fale com nosso time de atendimento para iniciar a contratação:", [{ l: "Ir para atendimento", p: 1, a: () => showRedirectLoading('https://t.me/suporteframebot?start=catalogo-site', true) }], 800);
}
function verificacaoContratante() {
  am("Com o Frame Authentic garantimos sua proteção. Verificação facial ao vivo, (documentos + selfie). Resultado: Zero fraudes, perfis 100% reais.", null, 0);
  am("Contratantes também podem ser verificados em caso de denuncias ou pendências cadastrais.", [{ l: "Entendido", a: ctPT }], 800);
}
function crPT() {
  am("Certo! Como criadora, veja como posso ajudar você.", null, 0);
  am("Selecione uma opção abaixo para prosseguirmos:", [
    { l: "Como me cadastrar na plataforma", a: () => {
        am("Para se cadastrar, acesse <a href=https://frameag.com/cadastro target=_blank class=link>frameag.com/cadastro</a> e siga as instruções simples. O processo é rápido e seguro.");
        perguntarSatisfacao();
      }},
    { l: "Como funciona a verificação", a: () => {
        am("É necessário ter mais de 18 anos, passar pela aprovação no Frame Authentic (nossa verificação de identidade) e concordar com os Termos e Condições para garantir um ambiente seguro e profissional.");
        perguntarSatisfacao();
      }},
    { l: "Termos e Condições", a: () => {
        am("Nossos Termos e Condições detalham como agir e atuar dentro das regras da Frame para evitar qualquer problema. Você pode acessá-los em <a href=\"https://frameag.com/termos\" target=\"_blank\" class=\"link\">frameag.com/termos</a>.");
      }},
    { l: "O que é a Frame Agency", a: () => {
        am("A Frame é o maior ecossistema de experiências personalizadas da América Latina. Especialistas em conectar criadoras a contratantes, oferecendo ferramentas de gestão, promoção de anúncios e segurança. Atuamos como provedora de tecnologia, sem intermediar negociações diretas.");
        perguntarSatisfacao();
      }},
    { l: "Gerenciar Brand Page", a: gerenciarPerfil },
    { l: "Como usar Frame Payments", a: framePayments },
    { l: "Voltar", a: inicio },
    { l: "Contestar decisões", a: () => { am("Possui alguma decisão da moderação ou segurança que deseja contestar? Acesse nosso formulário oficial para análise prioritária pelo Time de Segurança.",
        [{ l: "Ir para área de contestação", p: 1, a: () => showRedirectLoading('https://frameag.com/contestar', true) },
         { l: "Voltar", a: crPT }],
        0); } }
  ], 800);
}
function gerenciarPerfil() {
  am("Na sua BrandPage, você pode editar suas fotos, bio, medidas e adicionar redes sociais. Adquira destaque no catálogo Premium e acompanhe seus agendamentos.", null, 0);
  am("Acesse sua <a href='https://frameag.com/login' class='link'>Área de Login</a> agora.", [{ l: "Voltar", a: crPT }], 800);
}
function framePayments() {
  am("Com o Frame Payments você recebe valores direto na carteira de forma instantânea com seu bot no Telegram. Livre de % da Frame, o lucro é 100% seu e você conta com verificação e anti fraude no pagamento.", null, 0);
  am("Ative na <a href='https://frameag.com/login' class='link'>Área de Login</a> ", [{ l: "Voltar", a: crPT }], 800);
}
function contestarBan() {
  am("Na Frame lutamos contra arbitrariedades e oferecemos um canal de contestações tomadas pelo time. Siga os passos no form abaixo.", null, 0);
  am("Formulário: <a href='https://frameag.com/contestar' class='link'>frameag.com/contestar</a>", [{ l: "Voltar", a: crPT }], 800);
  perguntarSatisfacao();
}
function fh() {
  am("Certo! Vou te direcionar agora para um atendente humano da Frame, que pode oferecer suporte personalizado e resolver questões mais específicas.", [{ l: "Ir para atendimento", p: 1, a: () => { showRedirectLoading('https://t.me/suporteframebot?start=chatbot-site', true); } }]);
}
function inicio() {
  typingShownThisFlow = false;
  if (isChatInitiated) return; // Evita duplicação se já iniciado
  am("Olá, boas-vindas ao atendimento virtual da Frame :)", null, 0);
  am("Estamos aqui para te ajudar 24 horas por dia, com respostas rápidas e precisas!", null, 800);
  am("Selecione seu idioma para começarmos:", [
    { l: "Português", p: 1, a: menuPT },
    { l: "English", a: () => showLangPopup('For English support, please visit our dedicated page.', 'Go to English Page', 'https://frameag.com/en') },
    { l: "Español", a: () => showLangPopup('Para atención en español, visite nuestra página dedicada.', 'Ir a la Página en Español', 'https://frameag.com/es') }
  ], 1600);
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
  btn.textContent = document.body.classList.contains('dark') ? 'Retornar ao Modo Claro' : 'Ativar Modo Escuro';
}
function clearChatHistory() {
  showConfirm('Tem certeza que deseja limpar o histórico do chat? Isso não poderá ser desfeito depois.', () => {
    messageHistory = [];
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('lastMessage');
    b.innerHTML = '';
    isChatInitiated = false;
    initChat();
  });
  closeMenu();
}
function editProfile() {
  showConfirm('Tem certeza que deseja editar seu perfil? Alterações serão salvas imediatamente na próxima etapa.', () => {
    b.innerHTML = `
      <div class="mini-form">
        <p>Edite seu perfil</p>
        <input type="text" id="nameInput" value="${userInfo ? userInfo.name : ''}" class="prefilled" placeholder="Seu nome" aria-label="Digite seu nome">
        <input type="email" id="emailInput" value="${userInfo ? userInfo.email : ''}" class="prefilled" placeholder="Seu e-mail" aria-label="Digite seu e-mail">
        <button onclick="saveUserInfo()" class="btn p">Salvar alterações</button>
      </div>
    `;
  });
  closeMenu();
}
function scrollToTop() {
  b.scroll({ top: 0, behavior: 'smooth' });
}
function scrollToBottom() {
  b.scroll({ top: b.scrollHeight, behavior: 'smooth' });
}
function handleScroll() {
  scrollTopBtn.classList.toggle('show', b.scrollTop > 300);
  document.getElementById('offlineWarning').style.top = b.scrollTop > 300 ? '10%' : '20%';
  document.getElementById('chatEnd').style.top = b.scrollTop > 300 ? '40%' : '50%';
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
  console.error('Ocorreu um erro no chatbot:', e.message);
});
// ===== Inicializar =====
window.onload = () => {
  if (typeof LZString === 'undefined') {
    loadingSpinner.style.display = 'block';
  } else {
    initChat();
  }
};
// ===== Funções adicionais =====
function cleanStorageIfNeeded() {
  try {
    let storageSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        storageSize += (localStorage[key].length + key.length) * 2;
      }
    }
    if (storageSize > MAX_STORAGE_SIZE * 0.8) {
      messageHistory = messageHistory.slice(-MAX_HISTORY / 2);
      localStorage.setItem('chatHistory', LZString.compress(JSON.stringify(messageHistory)));
    }
  } catch (e) {
    console.error('Erro ao limpar storage:', e);
  }
}
function saveToStorageSafely(key, value) {
  try {
    if (key === 'chatHistory') {
      value = value.filter(msg => Date.now() - new Date(msg.timestamp).getTime() < HISTORY_AGE_LIMIT);
      localStorage.setItem(key, LZString.compress(JSON.stringify(value)));
    } else {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      cleanStorageIfNeeded();
      if (key === 'chatHistory') {
        localStorage.setItem(key, LZString.compress(JSON.stringify(value)));
      } else {
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      }
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
  } else if (e.key === 'Escape' && document.getElementById('ageConfirmOverlay').style.display === 'flex') {
    closeAgeConfirm();
  } else if (e.key === 'Escape' && document.getElementById('faqOverlay').style.display === 'flex') {
    closeFaqPopup();
  } else if (e.key === 'Escape' && document.getElementById('feedbackOverlay').style.display === 'flex') {
    closeFeedbackPopup();
  } else if (e.key === ' ' || e.key === 'ArrowUp') {
    if (document.getElementById('gameOverlay').style.display === 'flex') {
      e.preventDefault();
      dinoJump();
    }
  }
}
function showLangPopup(message, buttonText, url) {
  document.getElementById('langMessage').innerHTML = `<span class="semibold">${message.split('.')[0]}.</span> ${message.split('.').slice(1).join('.')}`;
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
  document.getElementById('confirmMessage').innerHTML = `<span class="semibold">${message.split('.')[0]}.</span> ${message.split('.').slice(1).join('.')}`;
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
  a.download = 'transcricao_frame_agency_chat.txt';
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
  currentTopic = null;
  localStorage.removeItem('currentTopic');
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
  am('Para liberação do chat, envie um e-mail para contato@frameag.com com uma selfie nítida ao lado de um documento oficial (RG ou CNH). Ou confirme sua idade reiniciando essa página.');
  messageHistory = [];
  localStorage.removeItem('chatHistory');
  localStorage.removeItem('lastMessage');
  showBlockPopup('Chat bloqueado por declaração de idade inapropriada para o ecossistema da Frame. Envie um e-mail ou confirme sua idade.');
  document.getElementById('ageConfirmBtn').style.display = 'block';
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
  showBlockPopup('Você foi bloqueado por comportamento inadequado e poderá utilizar esse chat novamente em: ');
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
        showBlockPopup('Você foi bloqueado por comportamento inadequado e poderá utilizar esse chat novamente em: ');
        startBlockTimer();
      }
    } else if (blockType === 'underage') {
      showBlockPopup('Chat bloqueado por declaração de idade inapropriada para o ecossistema da Frame. Envie um e-mail para liberação ou confirme sua idade.');
      document.getElementById('ageConfirmBtn').style.display = 'block';
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
  document.getElementById('blockMessage').innerHTML = `<span class="semibold">${message.split('.')[0]}.</span> ${message.split('.').slice(1).join('.')}`;
  const blockOv = document.getElementById('blockOverlay');
  blockOv.style.display = 'flex';
  blockOv.classList.add('show');
}
function closeBlockPopup() {
  const blockOv = document.getElementById('blockOverlay');
  blockOv.style.display = 'none';
  blockOv.classList.remove('show');
  document.getElementById('ageConfirmBtn').style.display = 'none';
}
function confirmDeleteRecent() {
  showConfirm('Tem certeza que deseja deletar esta mensagem recente?', deleteRecent);
}
function validateUserInput(name, email) {
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const prohibited = /(cu|pau|ppk|goza|chupa|puta|kids|kid|baby|bebe|cp|porno|estupro|estuprador|buceta|caralho|foder|fode|transar|sexo|bucetinha|roubar|exterminar|cuzinho|chupetinha|viado|baitola|prostituta|pedofilo|bct|nuds|leitada|fetiche|penis|vagina|se fuder|pepeka|piroca|gozada|pedofilia|violencia|ameaca|drogas|ilegal)/i;
  let valid = true;
  if (!name) {
    nameInput.classList.add('error');
    valid = false;
  } else {
    nameInput.classList.remove('error');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.endsWith('@example.com')) {
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
    lastBadFormMessage.textContent = 'Por favor, evite utilizar palavras inadequadas em seu nome ou e-mail. Ajuste nos campos acima para continuar nosso atendimento';
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
function showRedirectLoading(url, openInBlank = false) {
  const redirectOv = document.getElementById('redirectOverlay');
  redirectOv.style.display = 'flex';
  setTimeout(() => {
    redirectOv.style.display = 'none';
    if (openInBlank) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  }, 2500);
}
function openEmojiOverlay() {
  const emojiOv = document.getElementById('emojiOverlay');
  const emojiBtnRect = document.getElementById('emojiBtn').getBoundingClientRect();
  emojiOv.style.position = 'absolute';
  emojiOv.style.bottom = 'auto';
  emojiOv.style.top = (emojiBtnRect.bottom + 10) + 'px';
  emojiOv.style.right = (window.innerWidth - emojiBtnRect.right) + 'px';
  emojiOv.style.display = 'block';
}
function closeEmojiOverlay() {
  const emojiOv = document.getElementById('emojiOverlay');
  emojiOv.style.display = 'none';
}
function setupEmojiGrid() {
  const grid = document.getElementById('emojiGrid');
  emojis.forEach(obj => {
    const btn = document.createElement('button');
    btn.className = 'emoji-btn-grid';
    btn.textContent = obj.emoji;
    btn.dataset.name = obj.name;
    btn.onclick = () => {
      userInput.value += obj.emoji;
      userInput.focus();
      closeEmojiOverlay();
    };
    grid.appendChild(btn);
  });
}
function filterEmojis() {
  const search = document.getElementById('emojiSearch').value.toLowerCase();
  document.querySelectorAll('.emoji-btn-grid').forEach(btn => {
    btn.style.display = btn.dataset.name.toLowerCase().includes(search) ? 'inline-flex' : 'none';
  });
}
function showWarningPopup(message) {
  document.getElementById('warningMessage').innerHTML = `<span class="semibold">${message.split('.')[0]}.</span> ${message.split('.').slice(1).join('.')}`;
  const warningOv = document.getElementById('warningOverlay');
  warningOv.style.display = 'flex';
  warningOv.classList.add('show');
}
function closeWarningPopup() {
  const warningOv = document.getElementById('warningOverlay');
  warningOv.style.display = 'none';
  warningOv.classList.remove('show');
}
function showAgeConfirm() {
  closeBlockPopup();
  const ageOv = document.getElementById('ageConfirmOverlay');
  ageOv.style.display = 'flex';
  ageOv.classList.add('show');
}
function closeAgeConfirm() {
  const ageOv = document.getElementById('ageConfirmOverlay');
  ageOv.style.display = 'none';
  ageOv.classList.remove('show');
}
function validateAge() {
  const dateInput = document.getElementById('birthDate').value;
  if (!dateInput) {
    showWarningPopup('Por favor, insira uma data válida.');
    return;
  }
  const birthDate = new Date(dateInput);
  const age = (new Date().getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  if (age >= 18) {
    localStorage.setItem('ageConfirmed', 'true');
    removeBlock();
    closeAgeConfirm();
    am('Idade confirmada com sucesso! Agora você pode continuar a utilizar o ecossistema da Frame Agency.');
  } else {
    closeAgeConfirm(); // fecha o popup de idade antes do aviso
    showWarningPopup('Você deve ter ao menos 18 anos para acessar o ecossistema da Frame Agency.');
  }
}
function setupOfflineHandling() {
  const warningEl = document.getElementById('offlineWarning');
  window.addEventListener('offline', () => {
    warningEl.textContent = 'Você está offline';
    warningEl.style.background = 'rgba(255,0,0,0.2)';
    warningEl.style.color = '#ff0000';
    warningEl.style.display = 'block';
  });
  window.addEventListener('online', () => {
    warningEl.textContent = 'Você está conectado';
    warningEl.style.background = 'rgba(165,42,42,0.2)';
    warningEl.style.color = '#a52a2a';
    warningEl.style.display = 'block';
    while (messageQueue.length > 0) {
      processUserMessage(messageQueue.shift());
    }
    setTimeout(() => { warningEl.style.display = 'none'; }, 3000);
  });
  if (!navigator.onLine) {
    warningEl.style.display = 'block';
  }
}
function openFaqPopup() {
  const faqContent = document.getElementById('faqContent');
  faqContent.innerHTML = '';
  const faqs = [
    { q: "O que é a Frame Agency?", a: "Somos uma plataforma que conecta criadoras de conteúdo a contratantes, oferecendo ferramentas para gestão de perfis, anúncios e interações seguras. Nosso foco é na tecnologia para maximizar resultados em plataformas de monetização." },
    { q: "Como me cadastro como criadora?", a: "Para se cadastrar, você precisa ter mais de 18 anos, fornecer documentos, uma selfie e passar pela verificação facial. O processo é simples e pode ser iniciado no nosso site." },
    { q: "O que é a Verificação Facial?", a: "É um processo para confirmar que você é real e maior de idade. Usamos a tecnologia Frame Authentic para checar seus documentos e movimentos faciais em tempo real, garantindo segurança para todos." },
    { q: "Como funciona o Frame Premium?", a: "Com o Premium, você acessa o catálogo completo sem anúncios, agenda com prioridade, tem suporte prioritário e benefícios como acesso a lounges VIP e hotéis parceiros na Frame." },
    { q: "Como agendar uma experiência?", a: "Explore o catálogo, inicie um chat com a criadora, negocie detalhes e confirme o agendamento. Tudo é direto entre vocês, com nossa tecnologia facilitando a interação e proteção." },
    { q: "Criadora | Como gerencio minha BrandPage?", a: "Acesse sua BrandPage após o login para editar fotos, bio, redes sociais e métricas do seu anúncio. Para destaques no catálogo, considere planos pagos." },
    { q: "O que é o Frame Payments?", a: "É uma ferramenta no Telegram para receber pagamentos diretamente e de forma automatizada, livre de taxas da Frame. É seguro e conta com verificação e anti fraude durante cada transação." },
    { q: "Como denuncio algo suspeito?", a: "Use o formulário em frameag.com/report para reportar anonimamente. Nosso time de segurança analisa rapidamente e toma medidas." },
    { q: "Meus dados estão seguros?", a: "Sim, usamos criptografia avançada e cumprimos leis como LGPD. Dados são usados só para o necessário e você pode solicitar acesso ou exclusão quando desejar." },
    { q: "Como contesto uma decisão?", a: "Acesse frameag.com/contestar com detalhes e provas. O time de segurança revisa em até 7 dias úteis." }
  ];
  faqs.forEach(faq => {
    const item = document.createElement('div');
    item.style.borderBottom = '1px solid var(--border-color)';
    item.style.paddingBottom = '10px';
    item.innerHTML = `<strong style="display: block; margin-bottom: 5px;">${faq.q}</strong><span>${faq.a}</span>`;
    faqContent.appendChild(item);
  });
  const extra = document.createElement('div');
  extra.style.marginTop = '20px';
  extra.innerHTML = 'Não encontrou sua dúvida?';
  const btn = document.createElement('button');
  btn.className = 'btn p';
  btn.textContent = 'Iniciar atendimento';
  btn.onclick = () => {
    closeFaqPopup();
    if (!userInfo) {
      startChat();
    } else {
      inicio();
    }
  };
  extra.appendChild(btn);
  faqContent.appendChild(extra);
  const faqOv = document.getElementById('faqOverlay');
  faqOv.style.display = 'flex';
  faqOv.classList.add('show');
}
function closeFaqPopup() {
  const faqOv = document.getElementById('faqOverlay');
  faqOv.style.display = 'none';
  faqOv.classList.remove('show');
}
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    const nome = userInfo ? userInfo.name.split(' ')[0] : '';
    am(inactivityVariations[Math.floor(Math.random() * inactivityVariations.length)].replace('{nome}', nome));
  }, INACTIVITY_TIMEOUT);
}
function addChatStarter() {
  const starter = document.createElement('div');
  starter.className = 'chat-starter';
  const now = new Date();
  const start = new Date(chatStartTime);
  if (now - start > 86400000) {
    starter.textContent = 'Chat em ' + start.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } else {
    starter.textContent = 'Chat ao vivo iniciado';
  }
  b.appendChild(starter);
}
function toggleClosePopup() {
  const closePopup = document.getElementById('closePopup');
  const iconRect = document.querySelector('.close-icon').getBoundingClientRect();
  closePopup.style.top = (iconRect.bottom + 10) + 'px';
  closePopup.style.right = (window.innerWidth - iconRect.right) + 'px';
  closePopup.style.display = closePopup.style.display === 'flex' ? 'none' : 'flex';
}
function finalizeChat() {
  am('Deseja finalizar esse chat de atendimento? Sem problemas! Fico a disposição para te ajudar sempre que precisar.', [
    { l: 'Sim, finalizar', p: 1, a: () => {
      resetFlow();
      showInitialScreen();
    } },
    { l: 'Não', a: () => am('Ótimo! Continue perguntando e vou te ajudar.') }
  ], 100);
}
function showFeedbackPopup() {
  closeMenu();
  const feedbackOv = document.getElementById('feedbackOverlay');
  feedbackOv.style.display = 'flex';
  feedbackOv.classList.add('show');
  selectedRating = 0;
  document.getElementById('feedbackOptions').style.display = 'none';
  document.getElementById('feedbackOptions').innerHTML = '';
  document.getElementById('feedbackText').value = '';
  loadingSpinner.style.display = 'block';
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
  }, 2000);
}
function closeFeedbackPopup() {
  const feedbackOv = document.getElementById('feedbackOverlay');
  feedbackOv.style.display = 'none';
  feedbackOv.classList.remove('show');
}
function selectRating(rating) {
  selectedRating = rating;
  const optionsDiv = document.getElementById('feedbackOptions');
  optionsDiv.innerHTML = '';
  optionsDiv.style.display = 'block';
  let title = '';
  let options = [];
  if (rating <= 3) {
    title = 'Poxa! O que motivou você a dar essa nota?';
    options = ['Respostas lentas', 'Informação incorreta', 'Interface confusa', 'Outros'];
  } else if (rating === 4) {
    title = 'Como podemos melhorar ainda mais?';
    options = ['Mais opções de ajuda', 'Respostas melhores', 'Interface', 'Outros'];
  } else {
    title = 'O que você mais gostou?';
    options = ['Agilidade', 'Resolução de problema', 'Interatividade', 'Outros'];
  }
  const p = document.createElement('p');
  p.textContent = title;
  p.style.color = rating <= 3 ? '#ff4d4d' : '#4caf50';
  optionsDiv.appendChild(p);
  options.forEach(opt => {
    const label = document.createElement('label');
    label.className = 'checkbox-label';
    label.innerHTML = `
      <input type="checkbox" value="${opt}">
      ${opt}
    `;
    optionsDiv.appendChild(label);
  });
}
function submitFeedback() {
  const text = document.getElementById('feedbackText').value;
  if (text.length < 10 || text.length > 400) {
    closeFeedbackPopup();
    showWarningPopup('Para auxiliar nosso time a evoluir esse chat de atendimento, seu feedback deve ter entre 10 e 400 caracteres.');
    return;
  }
  const checkboxes = document.querySelectorAll('#feedbackOptions input:checked');
  if (selectedRating < 5 && checkboxes.length === 0) {
    showWarningPopup('Selecione pelo menos uma opção.');
    return;
  }
  if (text) {
    feedbacks.push(text);
  }
  loadingSpinner.style.display = 'block';
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
    am('Agradecemos pelo feedback, ele foi recebido com sucesso e será direcionado ao nosso time responsável! 😊');
    closeFeedbackPopup();
    confetti({ particleCount: 100, spread: 70 });
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, 2000);
}
function startGameDino() {
  const gameOv = document.getElementById('gameOverlay');
  gameOv.style.display = 'flex';
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  let dinoY = 150;
  let dinoVelocity = 0;
  let gravity = 0.5;
  let isJumping = false;
  let obstacles = [];
  let score = 0;
  let gameOver = false;

  function dinoJump() {
    if (!isJumping && !gameOver) {
      dinoVelocity = -12;
      isJumping = true;
    }
  }

  function generateObstacle() {
    obstacles.push({ x: 600, y: 150, width: 20, height: 40 });
  }

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chão
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 170, 600, 10);

    // Dino
    ctx.fillStyle = 'green';
    ctx.fillRect(50, dinoY, 40, 40);
    dinoY += dinoVelocity;
    dinoVelocity += gravity;
    if (dinoY >= 150) {
      dinoY = 150;
      dinoVelocity = 0;
      isJumping = false;
    }

    // Obstáculos
    obstacles.forEach((obs, i) => {
      ctx.fillStyle = 'red';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      obs.x -= 5;
      if (obs.x < -obs.width) {
        obstacles.splice(i, 1);
        score++;
      }
      if (obs.x < 90 && obs.x > 10 && dinoY + 40 > obs.y) {
        gameOver = true;
        document.getElementById('gameOverScreen').style.display = 'flex';
        document.getElementById('finalScore').textContent = score;
      }
    });

    document.getElementById('gameScore').textContent = `Pontuação: ${score}`;

    if (!gameOver) {
      requestAnimationFrame(gameLoop);
    }
  }

  setInterval(generateObstacle, 2000);
  gameLoop();

  document.getElementById('userInput').style.display = 'none';
  document.getElementById('sendBtn').style.display = 'none';
  document.getElementById('emojiBtn').style.display = 'none';
}
function restartGame() {
  document.getElementById('gameOverScreen').style.display = 'none';
  obstacles = [];
  score = 0;
  gameOver = false;
  dinoY = 150;
  dinoVelocity = 0;
  gameLoop();
}
function exitGame() {
  document.getElementById('gameOverlay').style.display = 'none';
  document.getElementById('userInput').style.display = 'block';
  document.getElementById('sendBtn').style.display = 'inline-flex';
  document.getElementById('emojiBtn').style.display = 'inline-flex';
}