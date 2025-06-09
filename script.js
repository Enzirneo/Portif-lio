document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll("nav ul li a");
  const toggleButton = document.getElementById("toggleDarkMode");
  const languageToggle = document.getElementById("toggleLanguage");
  const body = document.body;
  let isDarkMode = localStorage.getItem("darkMode") === "true";
  let currentLanguage = localStorage.getItem("lang") || "pt";

  lucide.createIcons();

  if (isDarkMode) {
    body.classList.add("dark-mode");
    toggleButton.innerHTML = `<i data-lucide="sun"></i>`;
    lucide.createIcons();
  }

  menuLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const windowHeight = window.innerHeight;
        const sectionHeight = target.offsetHeight;
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
        const scrollTo = offsetTop - (windowHeight / 2) + (sectionHeight / 2);
        window.scrollTo({
          top: scrollTo,
          behavior: "smooth"
        });
      }
    });
  });

  toggleButton.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    body.classList.toggle("dark-mode");
    const iconName = isDarkMode ? "sun" : "moon";
    toggleButton.innerHTML = `<i data-lucide="${iconName}"></i>`;
    lucide.createIcons();
    localStorage.setItem("darkMode", isDarkMode);
  });

  function updateLanguage(lang) {
    const elements = document.querySelectorAll("[data-key]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-key");
      const translation = translations[lang][key] || el.innerHTML;
      if (el.placeholder !== undefined && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) {
        el.placeholder = translation;
      } else {
        el.innerHTML = translation;
      }
    });
  }

  languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "pt" ? "en" : "pt";
    updateLanguage(currentLanguage);
    languageToggle.textContent = currentLanguage === "pt" ? "EN" : "PT";
    localStorage.setItem("lang", currentLanguage);
  });

  updateLanguage(currentLanguage);

  emailjs.init("hsxanouzN5zTVBI9r");

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("time").value = new Date().toLocaleString();
    emailjs.sendForm('service_wpkw7ri', 'template_smugayg', this)
      .then(function (response) {
        const msg = document.getElementById("form-success");
        msg.style.display = "block";
        form.reset();
      }, function (error) {
        const msg = document.getElementById("form-error");
        msg.style.display = "block";
        console.error('ERRO:', error);
      });
  });
});

window.addEventListener("load", () => {
  gsap.from(".hero-text p, .hero-text h1, .hero-text .subtext, .buttons, .social-icons", {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 1.2,
    ease: "power2.out"
  });

  gsap.from(".profile-image", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "back.out(1.7)"
  });

  document.querySelectorAll(".project-card, .skills-grid").forEach(card => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)", duration: 0.3 });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1, boxShadow: "none", duration: 0.3 });
    });
  });

  gsap.from(".contact-form input, .contact-form textarea, .submit-btn", {
    scrollTrigger: ".contact-form",
    opacity: 0,
    y: 20,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
  });
});

const translations = {
  pt: {
    "menu-sobre": "Sobre Mim",
    "menu-habilidades": "Habilidades",
    "menu-projetos": "Projetos",
    "menu-contato": "Contato",
    "hero-ola": "Olá, eu sou",
    "hero-nome": "Enzo Villela Bispo",
    "hero-descricao": "Desenvolvedor Frontend formado em Engenharia da Computação e apaixonado por transformar ideias em interfaces modernas, funcionais e responsivas. Tenho foco em criar experiências digitais que unam design e performance, sempre buscando aprimorar minhas habilidades com as melhores práticas do desenvolvimento web.",
    "btn-contato": "Entre em contato",
    "btn-download": "Baixar Currículo",
    "habilidades-titulo": "Habilidades",
    "habilidades-descricao": "Meu conjunto de habilidades abrange diversas tecnologias e ferramentas<br>que utilizo para criar soluções robustas e escaláveis.",
    "projetos-titulo": "Projetos",
    "projetos-descricao": "Aqui estão alguns dos projetos que desenvolvi, minhas habilidades<br>técnicas e criativas.",
    "proj1-descricao": "O projeto é um site de uma empresa de arquitetura fictícia criada no WordPress, focado em apresentar a empresa e seu funcionamento.",
    "proj1-link": "Ver Projeto",
    "proj2-descricao": "Pequena plataforma para organizar times de Esports. Feito com react.",
    "proj2-link": "Ver Projeto",
    "proj3-descricao": "Um site desenvolvido em Reacte e Vite, utilizando API do Pexels e componentes reutilizáveis.",
    "proj3-link": "Ver Projeto",
    "contato-titulo": "Entre em Contato",
    "contato-descricao": "Tem um projeto em mente ou quer conversar sobre oportunidades de trabalho? <br>Entre em contato comigo!",
    "contato-localizacao": "Localização",
    "contato-cidade": "Rio de Janeiro, Brasil",
    "contato-email": "Email",
    "contato-telefone": "Telefone",
    "form-titulo": "Envie uma mensagem",
    "form-nome": "Seu nome",
    "form-email": "seu.email@exemplo.com",
    "form-assunto": "Assunto da mensagem",
    "form-msg": "Sua mensagem",
    "form-enviar": "Enviar Mensagem",
    "footer-nome": "Enzo Villela Bispo",
    "footer-menu-sobre": "Sobre",
    "footer-menu-projetos": "Projetos",
    "footer-menu-habilidades": "Habilidades",
    "footer-menu-contato": "Contato",
    "footer-direitos": "&copy; 2025 Enzo Villela Bispo. Todos os direitos reservados."
  },
  en: {
    "menu-sobre": "About Me",
    "menu-habilidades": "Skills",
    "menu-projetos": "Projects",
    "menu-contato": "Contact",
    "hero-ola": "Hello, I am",
    "hero-nome": "Enzo Villela Bispo",
    "hero-descricao": "Frontend Developer with a degree in Computer Engineering, passionate about transforming ideas into modern, functional, and responsive interfaces. I focus on creating digital experiences that combine design and performance, always seeking to improve my skills with best web development practices.",
    "btn-contato": "Contact me",
    "btn-download": "Download Resume",
    "habilidades-titulo": "Skills",
    "habilidades-descricao": "My skillset covers various technologies and tools<br>that I use to build robust and scalable solutions.",
    "projetos-titulo": "Projects",
    "projetos-descricao": "Here are some of the projects I've developed, showcasing my technical<br>and creative skills.",
    "proj1-descricao": "This project is a website for a fictional architecture company created in WordPress, focused on presenting the business and how it works.",
    "proj1-link": "View Project",
    "proj2-descricao": "Small platform to organize Esports teams. Made with react.",
    "proj2-link": "View Project",
    "proj3-descricao": "A website developed with React and Vite, using the Pexels API, and reusable components.",
    "proj3-link": "View Project",
    "contato-titulo": "Get in Touch",
    "contato-descricao": "Got a project in mind or want to talk about job opportunities? <br>Reach out to me!",
    "contato-localizacao": "Location",
    "contato-cidade": "Rio de Janeiro, Brazil",
    "contato-email": "Email",
    "contato-telefone": "Phone",
    "form-titulo": "Send a Message",
    "form-nome": "Your name",
    "form-email": "your.email@example.com",
    "form-assunto": "Message subject",
    "form-msg": "Your message",
    "form-enviar": "Send Message",
    "footer-nome": "Enzo Villela Bispo",
    "footer-menu-sobre": "About",
    "footer-menu-projetos": "Projects",
    "footer-menu-habilidades": "Skills",
    "footer-menu-contato": "Contact",
    "footer-direitos": "&copy; 2025 Enzo Villela Bispo. All rights reserved."
  }
};