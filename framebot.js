// ===== Injetar CSS =====
const style = document.createElement('style');
style.textContent = `
body{font-family:Montserrat,sans-serif;margin:0}
.c{position:fixed;bottom:10px;right:10px;width:360px;max-width:95%;height:80%;background:#fff;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,.3);display:flex;flex-direction:column;overflow:hidden;z-index:9999}
.h{background:#AC865C;color:#fff;padding:12px;display:flex;align-items:center;gap:8px;font-weight:600;font-size:16px;position:relative}
.h img{width:46px;height:46px;border-radius:50%;border:2px solid #fff}
.m{position:absolute;right:10px;top:50%;transform:translateY(-50%);cursor:pointer;display:flex;align-items:center;gap:4px;font-size:14px}
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
.f a,.link{color:#AC865C;font-weight:600;text-decoration:underline;text-decoration-thickness:1px}
.o{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;z-index:10000}
.oc{background:#fff;padding:20px;border-radius:8px;text-align:center}
.oc button{padding:8px 14px;background:#AC865C;color:#fff;border:none;border-radius:6px;cursor:pointer}
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
    <div class="m" onclick="ec()">&larr; Voltar</div>
  </div>
  <div class="b" id="bd"></div>
  <div class="f">Ao continuar neste chat, você concorda com os <a href="https://frameag.com/termos" target="_blank" class="link">Termos e Condições da Frame</a>.</div>
</div>
<div class="o" id="ov">
  <div class="oc">
    <p>Finalizar atendimento?</p>
    <button onclick="ec()">Finalizar</button>
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

// ===== Fluxos por idioma =====
function menuPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Que maravilha ter você em nossa plataforma.", null, 0);
  am("Me conta, qual é a sua relação com a Frame hoje?", [
    { l: "Contratante / Assinante", p: 1, a: cmPT },
    { l: "Criadora / Anunciante", a: crPT }
  ], 800);
}
function cmPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Entendi, vamos lá...", null, 0);
  am("Selecione uma opção:", [
    { l: "Quero contratar uma modelo", p: 1, a: ctPT },
    { l: "Sobre segurança", a: () => am('Sim. A Frame garante autenticação em três etapas, <a href=https://frameag.com/blog/verificacao target=_blank class=link>Saiba mais</a>') },
    { l: "Reportar modelo anonimamente", a: () => am('Caso encontre irregularidades, acesse <a href=https://frameag.com/report target=_blank class=link>frameag.com/report</a> e denuncie.') },
    { l: "Falar com humano", a: fh },
    { l: "Voltar", a: menuPT }
  ], 800);
}
function crPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Perfeito, vou te passar as principais informações para criadoras.", null, 0);
  am('Para se cadastrar, acesse <a href=https://frameag.com/signup target=_blank class=link>frameag.com/signup</a> e siga as instruções.', null, 800);
  am('Lembre-se: É necessário ter mais de 18 anos, aceitar nossos <a href=https://frameag.com/termos target=_blank class=link>Termos e Condições</a> e seguir as diretrizes de conteúdo.', null, 1400);
  am('Se precisar de ajuda com pagamentos ou configurações, acesse sua <a href=https://frameag.com/login target=_blank class=link>Área de Login</a> e clique em "Suporte - Frame Girl".', [
    { l: "Voltar", a: menuPT }
  ], 2000);
}
function ctPT() {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Você possui 18 anos ou mais?", [
    { l: "Sim", p: 1, a: () => am("Para contratar, fale com nosso time:", [{ l: "Ir para atendimento 24h", p: 1, a: () => open('https://t.me/suporteframebot?start=catalogo-site', '_blank') }]) },
    { l: "Não", a: () => am("O ecossistema da Frame deve ser usado exclusivamente por maiores de 18 anos.") }
  ]);
}

function fh() { am("Claro! Vou te direcionar agora para um atendente da Frame.", [{ l: "Ir para atendimento", p: 1, a: () => open('https://t.me/suporteframebot?start=chatbot-site', '_blank') }]); }

// ===== Idiomas =====
window.onload = () => {
  b.innerHTML = '<div class="l">Chat ao vivo</div>';
  am("Olá, boas-vindas ao atendimento virtual da Frame :).", null, 0);
  am("Estou aqui para te ajudar 24 horas por dia.", null, 800);
  am("Selecione seu idioma:", [
    { l: "Português", p: 1, a: menuPT },
    { l: "English", a: () => alert("English flow here") },
    { l: "Español", a: () => alert("Spanish flow here") }
  ], 1600);
};

function ec() { location.href = "https://frameag.com/models"; }
