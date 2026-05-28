// Pegando os elementos que vou usar na página
const menuToggle = document.querySelector(".menu-toggle");
const navActions = document.querySelector(".nav-actions");
const navLinks = document.querySelectorAll(".nav-actions a");

// Pegando os elementos do formulário de contato
const form = document.querySelector("#form-contato");
const feedback = document.querySelector("#feedback-form");

// Código para abrir e fechar o menu no celular
menuToggle.addEventListener("click", () => {
  const isOpen = navActions.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Fecha o menu sozinho quando clica em algum link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navActions.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Validação simples do formulário de contato
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Função para mostrar mensagem de erro embaixo de cada campo
function setError(field, message) {
  const error = document.querySelector(`#erro-${field}`);
  error.textContent = message;
}

// Função para limpar todas as mensagens de erro
function clearErrors() {
  ["nome", "email", "mensagem"].forEach((field) => setError(field, ""));
  feedback.textContent = "";
}

// Quando a gente tenta enviar o formulário
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Não deixa a página recarregar
  clearErrors();

  const data = new FormData(form);
  const nome = String(data.get("nome") || "").trim();
  const email = String(data.get("email") || "").trim();
  const mensagem = String(data.get("mensagem") || "").trim();
  let valid = true;

  // Verifica se preencheu o nome
  if (!nome) {
    setError("nome", "Por favor, digite seu nome.");
    valid = false;
  }

  // Verifica se o e-mail está certo
  if (!email) {
    setError("email", "Por favor, digite seu e-mail.");
    valid = false;
  } else if (!emailRegex.test(email)) {
    setError("email", "Por favor, digite um e-mail válido.");
    valid = false;
  }

  // Verifica se escreveu a mensagem
  if (!mensagem) {
    setError("mensagem", "Por favor, escreva uma mensagem.");
    valid = false;
  }

  // Se tiver algum erro, avisa na tela
  if (!valid) {
    feedback.style.color = "var(--accent)";
    feedback.textContent = "Ajuste os erros marcados antes de enviar.";
    return;
  }

  // Simula o envio com sucesso
  form.reset();
  feedback.style.color = "var(--primary)";
  feedback.textContent = "Sua mensagem foi enviada com sucesso!";
});

// Deixa o link do menu vermelho quando a gente rola a página na seção certa
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" } // Margem para detectar o meio da tela
);

sections.forEach((section) => observer.observe(section));
