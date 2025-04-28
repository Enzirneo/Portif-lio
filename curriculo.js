document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll("nav ul li a");
  const toggleButton = document.getElementById("toggleDarkMode");
  const languageToggle = document.getElementById("toggleLanguage");
  const body = document.body;
  let isDarkMode = false;
  let currentLanguage = "pt";  

  // Inicializa ícones Lucide
  lucide.createIcons();  

  // Scroll suave centralizado
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

  // Botão de troca de tema
  toggleButton.addEventListener("click", () => {
      isDarkMode = !isDarkMode;
      body.classList.toggle("dark-mode");  
      const iconName = isDarkMode ? "sun" : "moon";
      toggleButton.innerHTML = `<i data-lucide="${iconName}"></i>`;
      lucide.createIcons();
  });

  // Dicionário de traduções
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
      "proj3-descricao": "Descrição rápida do que o projeto faz.",
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
      "proj3-descricao": "Quick description of what the project does.",
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

  // Função de tradução
  function updateLanguage(lang) {
      const elements = document.querySelectorAll("[data-key]");
      elements.forEach((el) => {
          const key = el.getAttribute("data-key");
          const translation = translations[lang][key];
          if (translation) {
              if (el.placeholder !== undefined && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) {
                  el.placeholder = translation;
              } else {
                  el.innerHTML = translation;
              }
          }
      });
  }

  languageToggle.addEventListener("click", () => {
      currentLanguage = currentLanguage === "pt" ? "en" : "pt";
      updateLanguage(currentLanguage);
      languageToggle.textContent = currentLanguage === "pt" ? "EN" : "PT";
  });

  // Inicializa com idioma padrão
  updateLanguage(currentLanguage);

  // Inicializa o EmailJS
  emailjs.init("hsxanouzN5zTVBI9r");

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Atualizar o campo hidden com a hora atual
    document.getElementById("time").value = new Date().toLocaleString();

    // Enviando o formulário
    emailjs.sendForm('service_wpkw7ri', 'template_smugayg', this)
      .then(function(response) {
        alert('Mensagem enviada com sucesso!');
        console.log('SUCESSO:', response);
        form.reset();
      }, function(error) {
        alert('Erro ao enviar a mensagem. Tente novamente.');
        console.error('ERRO:', error);
      });
  });
});
