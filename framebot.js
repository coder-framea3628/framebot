// ===== Injetar CSS =====
const style = document.createElement('style');
style.textContent = `
html, body { touch-action: manipulation; font-family: Montserrat,sans-serif; margin:0; }
.c{position:fixed;bottom:10px;right:10px;width:360px;max-width:95%;height:80%;background:#fff;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,.3);display:flex;flex-direction:column;overflow:hidden;z-index:9999}
.h{background:#AC865C;color:#fff;padding:12px;display:flex;align-items:center;gap:8px;font-weight:600;font-size:16px;position:relative}
.h img{width:54px;height:54px;border-radius:50%;border:2px solid #fff}
.m{position:absolute;right:10px;top:50%;transform:translateY(-50%);cursor:pointer;font-size:22px;line-height:1}
.menu-icon{display:flex;flex-direction:column;gap:3px;cursor:pointer}
.menu-icon span{width:18px;height:2px;background:#fff;display:block;border-radius:2px}
.b{flex:1;padding:12px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;font-size:14px}
.l{font-family:Inter,sans-serif;font-size:11px;color:#888;text-align:center}
.msg{display:flex;gap:6px;animation:f .3s}
.msg img{width:26px;height:26px;border-radius:50%}
.bb{background:#f0f0f0;padding:8px 12px;border-radius:14px;max-width:80%}
.bt{display:block;font-size:10px;color:#999;margin-top:4px}
.user-msg{justify-content:flex-end;}
.user-msg .bb{background:#AC865C;color:#fff}
.btns{display:flex;flex-wrap:wrap;gap:6px;margin-top:5px}
.btn{padding:8px 12px;border-radius:18px;cursor:pointer;font-size:13px;border:2px solid #AC865C;background:#fff;color:#AC865C}
.btn:hover{background:#AC865C;color:#fff}
.p{background:#AC865C;color:#fff}
.f{font-size:11px;padding:6px;border-top:1px solid #ddd;text-align:center;line-height:14px;margin-bottom:8px}
.f a,.link{color:#AC865C;font-weight:600;text-decoration:underline;text-decoration-thickness:1px}
.o{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;z-index:10000;animation:fadein .3s}
.oc{background:#fff;padding:24px;border-radius:10px;text-align:center;display:flex;flex-direction:column;gap:18px;min-width:240px;position:relative}
.oc button{padding:10px 16px;background:#AC865C;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px}
.close-x{position:absolute;top:10px;right:10px;font-size:18px;cursor:pointer;color:#888}
.input-box{display:flex;align-items:center;gap:8px;margin:2px 8px 4px;padding:5px 10px;background:#AC865C;border-radius:20px}
.input-box input{border:none;outline:none;flex:1;background:none;color:#fff;font-size:14px}
.input-box input::placeholder{color:#fff;opacity:0.7}
.send-btn{cursor:pointer;font-size:16px;color:#fff;display:none}
.center-end{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:13px;color:#888;animation:fadein .5s;text-align:center}
.center-end button{margin-top:10px;padding:8px 14px;border:none;background:#AC865C;color:#fff;border-radius:6px;cursor:pointer;font-size:13px}
@keyframes f{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadein{from{opacity:0}to{opacity:1}}
@media(max-width:480px){.c{height:90%;width:95%;right:2.5%;bottom:5%}}
`;
document.head.appendChild(style);

// ===== HTML =====
const chatContainer = document.createElement('div');
chatContainer.innerHTML = `
<div class="c" id="cb">
  <div class="h">
    <img src="https://framerusercontent.com/images/uvgx4LpdArstEFjK7yhfEcgIEo.png">Atendimento | Frame
    <div class="m" onclick="openMenu()">
      <div class="menu-icon"><span></span><span></span><span></span></div>
    </div>
  </div>
  <div class="b" id="bd"></div>
  <div class="input-box">
    <input type="text" id="userInput" placeholder="Digite sua mensagem…">
    <div class="send-btn" id="sendBtn">✈️</div>
  </div>
  <div class="f">
    Ao continuar neste chat, você concorda<br>
    com os <a href="https://frameag.com/termos" target="_blank" class="link">Termos e Condições</a> da Frame.
  </div>
</div>
<div class="o" id="ov">
  <div class="oc" id="menuOverlay">
    <div class="close-x" onclick="closeMenu()">✕</div>
    <button onclick="location.href='https://frameag.com.br'">Voltar para o catálogo</button>
    <button onclick="open('https://t.me/suporteframebot?start=chatbot-site','_blank')">Ir para atendimento humano</button>
  </div>
</div>
<div id="chatEnd" class="center-end" style="display:none;">
  <div id="endText"></div>
  <button onclick="inicio()">Reiniciar</button>
</div>
`;
document.body.appendChild(chatContainer);

// ===== JS =====
const b = document.getElementById('bd'),
      p = "https://framerusercontent.com/images/uvgx4LpdArstEFjK7yhfEcgIEo.png",
      chatEndMsg = document.getElementById('chatEnd'),
      endText = document.getElementById('endText'),
      userInput = document.getElementById('userInput'),
      sendBtn = document.getElementById('sendBtn');

function am(text, btn, delay = 0, user = false) {
  setTimeout(() => {
    let m = document.createElement('div');
    m.className = 'msg' + (user ? ' user-msg' : '');
    let bb = document.createElement('div');
    bb.className = 'bb';
    bb.innerHTML = text + '<span class="bt">agora</span>';
    if (!user) {
      let i = document.createElement('img'); i.src = p;
      m.append(i, bb);
    } else {
      m.append(bb);
    }
    if (btn) {
      let w = document.createElement('div');
      w.className = 'btns';
      btn.forEach(o => {
        let b2 = document.createElement('div');
        b2.className = 'btn' + (o.p ? ' p' : '');
        b2.innerText = o.l;
        b2.onclick = o.a;
        w.appendChild(b2);
      });
      bb.appendChild(w);
    }
    b.appendChild(m);
    b.scrollTop = b.scrollHeight;
  }, delay);
}

function perguntarSatisfacao() {
  am("Minha explicação acima te ajudou?", [
    { l: "Sim, tudo esclarecido", p: 1, a: () => {
        am("Perfeito! Agradecemos pelo contato, estamos sempre à disposição.");
        setTimeout(() => {
          b.innerHTML = '';
          endText.textContent = "Perfeito! Agradecemos pelo contato, estamos sempre à disposição.\n\nEste chat foi encerrado.";
          chatEndMsg.style.display = 'block';
        }, 3000);
      }},
    { l: "Não, preciso de ajuda", a: fh }
  ], 800);
}

function enviarMensagem() {
  let text = userInput.value.trim();
  if (text !== "") {
    userInput.value = "";
    sendBtn.style.display = "none";
    am(text, null, 0, true);
    am("Não consegui entender sua solicitação. Vamos tentar novamente?", [
      { l: "Voltar", p: 1, a: inicio }
    ], 500);
  }
}
userInput.addEventListener('input', () => {
  sendBtn.style.display = userInput.value.trim() ? "block" : "none";
});
userInput.addEventListener('keypress', e => { if (e.key === 'Enter') enviarMensagem(); });
sendBtn.addEventListener('click', enviarMensagem);

// Fluxos
function menuPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("É ótimo ter você em nossa plataforma.");
  am("Me conta, qual é a sua relação com a Frame hoje?", [
    { l: "Contratante / Assinante", p: 1, a: cmPT },
    { l: "Criadora / Anunciante", a: crPT }
  ], 800);
}
function cmPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Certo! Veja como posso ajudar...");
  am("Selecione uma opção:", [
    { l: "Quero contratar uma modelo", p: 1, a: ctPT },
    { l: "Sobre segurança", a: () => { 
        am('Você pode ter se perguntado se a Frame é segura... <a href=https://frameag.com/blog/verificacao target=_blank class=link>Saiba mais</a>');
        perguntarSatisfacao();
      }},
    { l: "Reportar modelo anonimamente", a: () => { 
        am('Caso encontre irregularidades, acesse <a href=https://frameag.com/report target=_blank class=link>frameag.com/report</a>');
        perguntarSatisfacao();
      }},
    { l: "Falar com humano", a: fh },
    { l: "Voltar", a: inicio }
  ], 800);
}
function crPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Perfeito, vou te passar as principais informações para criadoras.");
  am('Para se cadastrar, acesse <a href=https://frameag.com/login target=_blank class=link>frameag.com/login</a>', null, 800);
  am('É necessário ter mais de 18 anos...', null, 1400);
  am('Para ajuda adicional, acesse sua Área de Login.', [
    { l: "Voltar", a: inicio }
  ], 2000);
  setTimeout(perguntarSatisfacao, 2600);
}
function ctPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Você possui 18 anos ou mais?", [
    { l: "Sim", p: 1, a: () => { 
        am("Para contratar, fale com nosso time:", [{ l: "Ir para atendimento 24h", p: 1, a: () => open('https://t.me/suporteframebot?start=catalogo-site', '_blank') }]);
        perguntarSatisfacao();
      }},
    { l: "Não", a: () => { 
        am("O ecossistema da Frame é exclusivo para maiores de 18 anos.");
        perguntarSatisfacao();
      }}
  ]);
}
function fh() { am("Claro! Vou te direcionar agora para um atendente.", [{ l: "Ir para atendimento", p: 1, a: () => open('https://t.me/suporteframebot?start=chatbot-site', '_blank') }]); }
function inicio() {
  chatEndMsg.style.display = 'none';
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Olá, boas-vindas ao atendimento virtual da Frame :)");
  am("Estamos aqui para te ajudar 24 horas por dia!", null, 800);
  am("Selecione seu idioma:", [
    { l: "Português", p: 1, a: menuPT },
    { l: "English", a: () => alert("Visit frameag.com/en for English support.") },
    { l: "Español", a: () => alert("Visite frameag.com/es para atención en español.") }
  ], 1600);
}
window.onload = inicio;

// Menu overlay
function openMenu(){ document.getElementById('ov').style.display = 'flex'; }
function closeMenu(){ document.getElementById('ov').style.display = 'none'; }