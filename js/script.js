document.querySelector("#ano").textContent = new Date().getFullYear();

// O menu permanece acessível sem JavaScript.
const navegacao = document.querySelector(".navegacao");
const botaoMenu = document.querySelector("#botao-menu");
const menu = document.querySelector("#menu");
const telaPequena = matchMedia("(max-width: 760px)");

function definirMenu(aberto) {
  botaoMenu.setAttribute("aria-expanded", String(aberto));
  menu.toggleAttribute("data-aberto", aberto);
}

navegacao.setAttribute("data-interativo", "");
botaoMenu.hidden = false;

botaoMenu.addEventListener("click", () => definirMenu(!menu.hasAttribute("data-aberto")));

menu.addEventListener("click", (evento) => {
  const link = evento.target.closest("a");
  if (!link || !telaPequena.matches) return;

  definirMenu(false);
  document.querySelector(link.hash)?.focus({ preventScroll: true });
});

document.addEventListener("click", (evento) => {
  if (menu.hasAttribute("data-aberto") && !navegacao.contains(evento.target)) {
    definirMenu(false);
  }
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && menu.hasAttribute("data-aberto")) {
    definirMenu(false);
    botaoMenu.focus();
  }
});

telaPequena.addEventListener("change", () => definirMenu(false));

document.querySelectorAll("[data-dialogo]").forEach((botao) => {
  const dialogo = document.getElementById(botao.dataset.dialogo);
  if (!dialogo || typeof dialogo.showModal !== "function") return;

  botao.hidden = false;
  botao.addEventListener("click", () => dialogo.showModal());
  dialogo.addEventListener("close", () => botao.focus({ preventScroll: true }));
  dialogo.addEventListener("click", (evento) => {
    if (evento.target === dialogo) dialogo.close();
  });
});
