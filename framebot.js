// ===== Injetar CSS =====
const style = document.createElement('style');
style.textContent = `
body{font-family:Montserrat,sans-serif;margin:0}
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
.msg.user-msg{justify-content:flex-end}
.bb{background:#f0f0f0;padding:8px 12px;border-radius:14px;max-width:80%}
.bt{font-size:10px;color:#999;margin-top:4px;display:block}
.user-msg .bb{background:#AC865C;color:#fff}
.btns{display:flex;flex-wrap:wrap;gap:6px;margin-top:5px}
.btn{padding:8px 12px;border-radius:18px;cursor:pointer;font-size:13px;border:2px solid #AC865C;background:#fff;color:#AC865C;transition:background-color 0.3s ease,color 0.3s ease}
.btn:hover{background:#AC865C;color:#fff}
.p{background:#AC865C;color:#fff;font-weight:600}
.f{font-size:11px;padding:6px;border-top:1px solid #ddd;text-align:center;line-height:14px;margin-bottom:8px}
.f a,.link{color:#AC865C;font-weight:600;text-decoration:underline;text-decoration-thickness:1px}
.o{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;z-index:10000;animation:fadein .3s}
.oc{background:#fff;padding:24px;border-radius:10px;text-align:center;display:flex;flex-direction:column;gap:14px;min-width:240px;position:relative;top:50px}
.oc button{padding:10px 16px;background:#AC865C;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;font-weight:600}
.close-x{position:absolute;top:8px;right:8px;font-size:20px;cursor:pointer;color:#555}
.input-box{display:flex;align-items:center;gap:8px;margin:4px 8px 6px;padding:8px 12px;background:#AC865C;border-radius:20px}
.input-box input{border:none;outline:none;flex:1;background:none;color:#fff;font-size:17px}
.input-box input::placeholder{color:#fff;opacity:0.7}
.send-btn{border:2px solid #fff;background:transparent;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;outline:none;padding:0;transition:background-color 0.3s ease}
.send-btn:hover{background-color:rgba(255,255,255,0.1)}
.send-btn svg{width:18px;height:18px;stroke:#fff;fill:none;stroke-width:1.8}
.send-btn path{stroke-linecap:round;stroke-linejoin:round}
.send-btn:focus-visible{box-shadow:0 0 0 2px rgba(255,255,255,.6)}
.center-end{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:11px;color:#888;animation:fadein .5s}
.semibold{font-weight:600}
@keyframes f{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadein{from{opacity:0}to{opacity:1}}
@media(max-width:480px){.c{height:90%;width:95%;right:2.5%;bottom:5%}}

/* ===== Simulador de digitação ===== */
.typing-label{font-family:Inter,sans-serif;font-size:11px;color:#888;text-align:left;margin-left:32px}
.typing-bubble .bb{background:#f0f0f0}
.dots{display:flex;gap:6px;align-items:center}
.dot{width:8px;height:8px;border-radius:50%;background:#fff;opacity:.35;animation:blink 1.2s infinite}
.dot:nth-child(2){animation-delay:.2s}
.dot:nth-child(3){animation-delay:.4s}
@keyframes blink{0%{opacity:.2;transform:translateY(0)}50%{opacity:1;transform:translateY(-2px)}100%{opacity:.2;transform:translateY(0)}}
@media (prefers-reduced-motion: reduce){
  .msg{animation:none}
  .dot{animation:none}
}
`;
document.head.appendChild(style);

// ===== Injetar HTML =====
const chatContainer = document.createElement('div');
chatContainer.innerHTML = `
<div class="c" id="cb">
  <div class="h">
    <img src="https://framerusercontent.com/images/uvgx4LpdArstEFjK7yhfEcgIEo.png">Atendimento | Frame
    <div class="m" onclick="openMenu()">
      <div class="menu-icon">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
  <div class="b" id="bd"></div>
  <div class="input-box">
    <input type="text" id="userInput" placeholder="Digite sua mensagem…">
    <button class="send-btn" id="sendBtn">
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
<div class="o" id="ov">
  <div class="oc" id="menuOverlay">
    <div class="close-x" onclick="closeMenu()">✕</div>
    <button onclick="location.href='https://frameag.com/models'">Voltar para o catálogo</button>
    <button onclick="open('https://t.me/suporteframebot?start=chatbot-site-menu','_blank')">Ir para atendimento humano</button>
  </div>
</div>
<div id="chatEnd" class="center-end" style="display:none;">Este chat foi encerrado.</div>
`;
document.body.appendChild(chatContainer);

// ===== Variável de controle para o typing =====
let typingShownThisFlow = false;

// ===== Funções do Chat =====
const b = document.getElementById('bd'),
      p = "https://framerusercontent.com/images/uvgx4LpdArstEFjK7yhfEcgIEo.png",
      chatEndMsg = document.getElementById('chatEnd');

function showTypingIndicator() {
  let typing = document.createElement('div');
  typing.className = 'msg typing-bubble';
  typing.innerHTML = `
    <img src="${p}">
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
    let i = document.createElement('img');
    i.src = user ? '' : p;
    let bb = document.createElement('div');
    bb.className = 'bb';
    bb.innerHTML = text + '<span class="bt">agora</span>';
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
    if(user){ m.append(bb); } else { m.append(i, bb); }
    b.appendChild(m);
    b.scrollTop = b.scrollHeight;
  }, delay + (user ? 0 : 600));
}

// ===== Função de satisfação =====
function perguntarSatisfacao() {
  am("Minha explicação acima te ajudou?", [
    { l: "Sim, tudo esclarecido", p: 1, a: () => {
        am("Perfeito! Agradecemos pelo contato, estamos sempre à disposição.");
        setTimeout(() => { chatEndMsg.style.display = 'block'; }, 800);
      }},
    { l: "Não, preciso de ajuda", a: () => { 
        fh(); 
        setTimeout(() => {
          am('Se preferir, você também pode enviar um email para: <span class="semibold link">contato@frameag.com</span>');
        }, 600);
      }}
  ], 800);
}

// ===== Input listener + palavras-chave =====
function processUserMessage(text) {
  am(text, null, 0, true);
  let t = text.toLowerCase();

  if (t.includes("denunciar")) {
    am('Na Frame, levamos segurança muito a sério. Caso encontre irregularidades em anúncios do nosso site, acesse <a href=https://frameag.com/report target=_blank class=link>frameag.com/report</a> e denuncie anonimamente.');
    return;
  }
  if (t.includes("humano") || t.includes("analista") || t.includes("falar com a gente")) {
    fh();
    setTimeout(() => {
      am('Se preferir, você também pode enviar um email para: <span class="semibold link">contato@frameag.com</span>');
    }, 700);
    return;
  }
  if (t.includes("seguro") || t.includes("segurança")) {
    am('Você pode ter se perguntado se a Frame é segura, e sim, é. Aqui, garantimos autenticação em três etapas e contamos com um time de segurança disponível 24h. <a href=https://frameag.com/blog/verificacao target=_blank class=link>Saiba mais</a>');
    setTimeout(perguntarSatisfacao, 800);
    return;
  }

  am("Não consegui entender sua solicitação. Vamos tentar novamente?", [
    { l: "Voltar", p: 1, a: () => { 
        inicio(); 
        am('Se preferir, você também pode enviar um email para: <span class="semibold link">contato@frameag.com</span>');
      }
    }
  ], 500);
}

document.getElementById('userInput').addEventListener('keypress', e => {
  if (e.key === 'Enter' && e.target.value.trim() !== "") {
    processUserMessage(e.target.value.trim());
    e.target.value = "";
  }
});

document.getElementById('sendBtn').addEventListener('click', () => {
  const userInput = document.getElementById('userInput');
  if (userInput.value.trim() !== "") {
    processUserMessage(userInput.value.trim());
    userInput.value = "";
  }
});

// ===== Fluxos =====
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
        am('Você pode ter se perguntado se a Frame é segura, e sim, é. Aqui, garantimos autenticação em três etapas e contamos com um time de segurança disponível 24h. <a href=https://frameag.com/blog/verificacao target=_blank class=link>Saiba mais</a>');
        setTimeout(perguntarSatisfacao, 800);
      }},
    { l: "Reportar modelo anonimamente", a: () => { 
        am('Na Frame, levamos segurança muito a sério. Caso encontre irregularidades em anúncios do nosso site, acesse <a href=https://frameag.com/report target=_blank class=link>frameag.com/report</a> e denuncie anonimamente.');
      }},
    { l: "Tive problemas com cadastro", a: cadastroPT },
    { l: "Falar com humano", a: () => { 
        fh(); 
        setTimeout(() => {
          am('Se preferir, você também pode enviar um email para: <span class="semibold link">contato@frameag.com</span>');
        }, 700);
      }},
    { l: "Voltar", a: inicio },
    { l: "Quero me tornar Premium", p: 1, a: premiumPT }
  ], 800);
}

// ===== Fluxo Problemas com Cadastro =====
function cadastroPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Poxa, sinto muito que tenha tido problemas com seu cadastro.", null, 500);
  am("Qual dessas situações melhor se aplica ao seu caso?", [
    { l: "Não recebi o código de ativação", a: problemaCodigo },
    { l: "Perdi o acesso ao meu e-mail", a: problemaEmail },
    { l: "Não sei como realizar meu login", a: problemaLogin },
    { l: "Voltar", a: cmPT }
  ], 800);
}

function problemaCodigo() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Se o código de ativação do cadastro não chegou em sua caixa de entrada, siga estas etapas:");
  am("1. Verifique a caixa de spam ou lixo eletrônico.<br>2. Confirme se o e-mail cadastrado está correto.<br>3. Aguarde alguns minutos.<br>4. Reenvie o código de ativação pelo site.", null, 800);
  am("O problema persiste? Entre em contato com nossa equipe:", [
    { l: "Ir para atendimento", p: 1, a: () => fh() },
    { l: "Voltar", a: cadastroPT }
  ], 1400);
}

function problemaEmail() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Se você não consegue mais acessar o e-mail utilizado na compra, recomendamos as seguintes opções:");
  am("1. Recupere sua conta de e-mail no provedor oficial.<br>2. Caso não consiga, atualize seu e-mail conosco.", null, 800);
  am("⚠️ Importante: será necessário confirmar alguns dados e passar pelo Frame Authentic antes de atualizar seu e-mail.", null, 1400);
  am("Para realizar a atualização:", [
    { l: "Ir para atendimento", p: 1, a: () => fh() },
    { l: "Voltar", a: cadastroPT }
  ], 2000);
}

function problemaLogin() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Para iniciar seu cadastro, acesse sua <a href='https://frameag.com/cadastro' target='_blank' class='link'>Área de Cadastro</a> e siga os passos.");
  am("Caso ainda tenha dúvidas, visite nosso vídeo de tutorial clicando no link: <a href='https://' target='_blank' class='link'>https://</a>", null, 800);
  am("Deseja voltar para o menu de problemas com cadastro?", [
    { l: "Sim, voltar", a: cadastroPT }
  ], 1400);
}

// ===== Fluxos originais =====
function premiumPT() {
  am('No <span class="semibold">Premium</span>, você desbloqueia vantagens únicas. Deixa eu te contar:');
  am('Acesso ao catálogo completo livre de anúncios, Galerias Sexy, atendimento prioritário e mais.', null, 700);
  am('Para se tornar <span class="semibold">Premium</span>, e conhecer melhor as vantagens, clique abaixo:', [{ l: "Quero ser Premium", p: 1, a: () => window.open('https://frameag.com/premium','_blank') }], 1400);
}

function ctPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Você possui 18 anos ou mais?", [
    { l: "Sim", p: 1, a: () => { 
        am('Certo. Antes de contratar, você pode conhecer todas as modelos em nosso <a href="https://frameag.com/models" target="_blank" class="link">catálogo completo</a>.');
        am("Mas, se já decidiu quem contratar, fale com nosso time:", [{ l: "Ir para atendimento 24h", p: 1, a: () => open('https://t.me/suporteframebot?start=catalogo-site', '_blank') }], 500);
        setTimeout(perguntarSatisfacao, 1000);
      }},
    { l: "Não", a: () => { 
        am("Não podemos prosseguir. O ecossistema da Frame deve ser usado exclusivamente por maiores de 18 anos.");
      }}
  ]);
}

function crPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Perfeito, vou te passar as principais informações para criadoras.");
  am('Para se cadastrar, acesse <a href=https://frameag.com/login target=_blank class=link>frameag.com/login</a> e siga as instruções.', null, 800);
  am('É necessário ter mais de 18 anos, ser aprovada no Frame Authentic e concordar com nossos <a href=https://frameag.com/termos target=_blank class=link>Termos e Condições</a>.', null, 1400);
  am('Se precisar de qualquer ajuda adicional, acesse sua <a href=https://frameag.com/login target=_blank class=link>Área de Login</a> e clique em "Central de Atendimento".', [
    { l: "Voltar", a: inicio }
  ], 2000);
  setTimeout(perguntarSatisfacao, 2600);
}

function fh() { 
  am("Certo! Vou te direcionar agora para um atendente da Frame.", [{ l: "Ir para atendimento", p: 1, a: () => open('https://t.me/suporteframebot?start=chatbot-site', '_blank') }]); 
}

function inicio() {
  typingShownThisFlow = false; // reset ao iniciar o fluxo
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Olá, boas-vindas ao atendimento virtual da Frame :)");
  am("Estamos aqui para te ajudar 24 horas por dia!", null, 800);
  am("Selecione seu idioma:", [
    { l: "Português", p: 1, a: menuPT },
    { l: "English", a: () => alert("Visit: frameag.com/en for English support.") },
    { l: "Español", a: () => alert("Visite: frameag.com/es para atención en español.") }
  ], 1600);
}
window.onload = inicio;

// ===== Menu overlay =====
function openMenu(){ document.getElementById('ov').style.display = 'flex'; }
function closeMenu(){ document.getElementById('ov').style.display = 'none'; }