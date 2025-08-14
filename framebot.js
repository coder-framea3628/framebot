// ===== Injetar CSS =====
const style = document.createElement('style');
style.textContent = `
body{font-family:Montserrat,sans-serif;margin:0}
.c{position:fixed;bottom:10px;right:10px;width:360px;max-width:95%;height:80%;background:#fff;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,.3);display:flex;flex-direction:column;overflow:hidden;z-index:9999}
.h{background:#AC865C;color:#fff;padding:12px;display:flex;align-items:center;gap:8px;font-weight:600;font-size:16px;position:relative}
.h img{width:54px;height:54px;border-radius:50%;border:2px solid #fff}
.m{position:absolute;right:10px;top:50%;transform:translateY(-50%);cursor:pointer;font-size:22px;line-height:1}
.b{flex:1;padding:12px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;font-size:14px}
.l{font-family:Inter,sans-serif;font-size:11px;color:#888;text-align:center}
.msg{display:flex;gap:6px;animation:f .3s}
.msg img{width:26px;height:26px;border-radius:50%}
.bb{background:#f0f0f0;padding:8px 12px;border-radius:14px;max-width:80%}
.bt{display:block;font-size:10px;color:#999;margin-top:4px}
.btns{display:flex;flex-wrap:wrap;gap:6px;margin-top:5px}
.btn{padding:8px 12px;border-radius:18px;cursor:pointer;font-size:13px;border:2px solid #AC865C;background:#fff;color:#AC865C}
.btn:hover{background:#AC865C;color:#fff}
.p{background:#AC865C;color:#fff}
.f{font-size:11px;padding:6px;border-top:1px solid #ddd;text-align:center;line-height:14px;margin-bottom:8px}
.f a{color:#AC865C;font-weight:600;text-decoration:underline;text-decoration-thickness:1px}
.o{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;z-index:10000}
.oc{background:#fff;padding:24px;border-radius:10px;text-align:center;display:flex;flex-direction:column;gap:14px;min-width:240px}
.oc button{padding:10px 16px;background:#AC865C;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px}
@keyframes f{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:480px){.c{height:90%;width:95%;right:2.5%;bottom:5%}}
`;
document.head.appendChild(style);

// ===== Injetar HTML =====
const chatContainer = document.createElement('div');
chatContainer.innerHTML = `
<div class="c" id="cb">
  <div class="h">
    <img src="https://framerusercontent.com/images/uvgx4LpdArstEFjK7yhfEcgIEo.png">Atendimento | Frame
    <div class="m" onclick="openMenu()">⋯</div>
  </div>
  <div class="b" id="bd"></div>
  <div class="f">
    Ao continuar neste chat, você concorda<br>
    com os <a href="https://frameag.com/termos" target="_blank">Termos e Condições</a> da Frame.
  </div>
</div>
<div class="o" id="ov">
  <div class="oc" id="menuOverlay">
    <button onclick="location.href='https://frameag.com.br'">Voltar para o catálogo</button>
    <button onclick="open('https://t.me/suporteframebot?start=chatbot-site','_blank')">Ir para atendimento humano</button>
    <button onclick="closeMenu()">Fechar</button>
  </div>
</div>
`;
document.body.appendChild(chatContainer);

// ===== Funções do Chat =====
const b = document.getElementById('bd'),
      p = "https://framerusercontent.com/images/uvgx4LpdArstEFjK7yhfEcgIEo.png";

function am(text, btn, delay = 0) {
  setTimeout(() => {
    let m = document.createElement('div');
    m.className = 'msg';
    let i = document.createElement('img');
    i.src = p;
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
    m.append(i, bb);
    b.appendChild(m);
    b.scrollTop = b.scrollHeight;
  }, delay);
}

// ===== Função de satisfação =====
function perguntarSatisfacao() {
  am("Sua dúvida ou problema foi solucionado?", [
    { l: "Sim, tudo esclarecido", p: 1, a: () => {
        am("Agradecemos pelo contato! Estamos sempre à disposição.");
        am('<div class="l">Este chat foi encerrado.</div>', null, 800);
      }},
    { l: "Não, preciso de ajuda", a: fh }
  ], 800);
}

// ===== Fluxos por idioma =====
function menuPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("É ótimo ter você em nossa plataforma.", null, 0);
  am("Me conta, qual é a sua relação com a Frame hoje?", [
    { l: "Contratante / Assinante", p: 1, a: cmPT },
    { l: "Criadora / Anunciante", a: crPT }
  ], 800);
}
function cmPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Certo! Veja como posso ajudar...", null, 0);
  am("Selecione uma opção:", [
    { l: "Quero contratar uma modelo", p: 1, a: ctPT },
    { l: "Sobre segurança", a: () => { 
        am('Você pode ter se perguntado se a Frame é segura, e sim, é. A Frame garante autenticação em três etapas e conta com um time de segurança em alerta 24h, <a href=https://frameag.com/blog/verificacao target=_blank class=link>Saiba mais</a>');
        perguntarSatisfacao();
      }},
    { l: "Reportar modelo anonimamente", a: () => { 
        am('Na Frame, levamos segurança muito a sério. Caso encontre irregularidades em anúncios do nosso site, acesse <a href=https://frameag.com/report target=_blank class=link>frameag.com/report</a> e denuncie anonimamente.');
        perguntarSatisfacao();
      }},
    { l: "Falar com humano", a: fh },
    { l: "Voltar", a: inicio }
  ], 800);
}
function crPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Perfeito, vou te passar as principais informações para criadoras.", null, 0);
  am('Para se cadastrar, acesse <a href=https://frameag.com/login target=_blank class=link>frameag.com/login</a> e siga as instruções.', null, 800);
  am('Lembre-se: É necessário ter mais de 18 anos, aceitar nossos <a href=https://frameag.com/termos target=_blank class=link>Termos e Condições</a> e seguir as diretrizes de conteúdo.', null, 1400);
  am('Se precisar de qualquer ajuda adicional, acesse sua <a href=https://frameag.com/login target=_blank class=link>Área de Login</a> e clique em "Central de Atendimento".', [
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
        am("O ecossistema da Frame deve ser usado exclusivamente por maiores de 18 anos.");
        perguntarSatisfacao();
      }}
  ]);
}

function fh() { 
  am("Claro! Vou te direcionar agora para um atendente da Frame.", [{ l: "Ir para atendimento", p: 1, a: () => open('https://t.me/suporteframebot?start=chatbot-site', '_blank') }]); 
}

// ===== Idiomas =====
function inicio() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Olá, boas-vindas ao atendimento virtual da Frame :)", null, 0);
  am("Estamos aqui para te ajudar 24 horas por dia!", null, 800);
  am("Selecione seu idioma:", [
    { l: "Português", p: 1, a: menuPT },
    { l: "English", a: () => alert("English flow here") },
    { l: "Español", a: () => alert("Spanish flow here") }
  ], 1600);
}
window.onload = inicio;

// ===== Menu overlay =====
function openMenu(){ document.getElementById('ov').style.display = 'flex'; }
function closeMenu(){ document.getElementById('ov').style.display = 'none'; }
