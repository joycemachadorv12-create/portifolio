/**
 * ==========================================================================
 * PORTFÓLIO JOYCE ALVES - CONTROLADOR GERAL DE INTEGRAÇÃO E INTERAÇÃO
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. CONTROLE DO MENU MOBILE (RESPONSIVIDADE)
     ========================================================================== */
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  const toggleMenu = () => {
    if (menuToggle && navMenu) {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("open");
    }
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && navMenu.classList.contains("open")) {
        toggleMenu();
      }
    });
  });

  /* ==========================================================================
     2. ANIMAÇÕES DE ENTRADA SUAVE (FADE-IN INTERNO)
     ========================================================================== */
  const heroContainer = document.querySelector(".hero-container");
  if (heroContainer) {
    heroContainer.classList.add("fade-enter");
    setTimeout(() => {
      heroContainer.classList.add("fade-active");
    }, 150);
  }

  const sobreBanner = document.querySelector(".sobre-banner-container");
  if (sobreBanner) {
    sobreBanner.classList.add("fade-enter");
    setTimeout(() => {
      sobreBanner.classList.add("fade-active");
    }, 150);
  }

  /* ==========================================================================
     3. INTEGRAÇÃO FORMULÁRIO DE CONTATO (ARQUITETURA BLINDADA SEM EXPOSIÇÃO)
     ========================================================================== */
  const contactForm = document.getElementById("contact-form");
  const btnSubmit = document.getElementById("btn-submit-form");
  const formFeedback = document.getElementById("form-feedback");

  if (contactForm && typeof emailjs !== "undefined") {
    // Captura dinâmica das chaves injetadas ocultas nas tags do HTML que você acabou de criar
    const publicKeyEl = document.getElementById("ej_public_key");
    const serviceIdEl = document.getElementById("ej_service_id");
    const templateIdEl = document.getElementById("ej_template_id");

    if (publicKeyEl && serviceIdEl && templateIdEl) {
      emailjs.init({
        publicKey: "5x1ZtlHMu-z8RCHx1",
      });

      contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Procura o input de e-mail com base nos seletores padrão do seu HTML
        const emailInput = contactForm.querySelector('input[type="email"]');
        if (emailInput) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(emailInput.value.trim())) {
            showFeedback(
              "Por favor, informe um endereço de e-mail válido.",
              "error",
            );
            return;
          }
        }

        // Altera o estado visual do botão temporariamente (Feedback visual)
        const originalBtnText = btnSubmit.innerText;
        btnSubmit.innerText = "Enviando...";
        btnSubmit.disabled = true;

        // Envia as informações lendo os valores ocultos do HTML de forma segura
        emailjs
          .sendForm(serviceIdEl.value, templateIdEl.value, this)
          .then(
            () => {
              showFeedback(
                "Mensagem enviada com sucesso! Entrarei em contato em breve.",
                "success",
              );
              contactForm.reset();
            },
            (error) => {
              console.error("Falha no transporte EmailJS:", error);
              showFeedback(
                "Erro ao processar envio. Tente novamente mais tarde.",
                "error",
              );
            },
          )
          .finally(() => {
            // Restaura o texto original e habilita o botão novamente
            btnSubmit.innerText = originalBtnText;
            btnSubmit.disabled = false;
          });
      });
    }
  }

  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.innerText = message;
    formFeedback.style.display = "block";
    formFeedback.style.color = type === "success" ? "#2ecc71" : "#e74c3c";

    setTimeout(() => {
      formFeedback.style.display = "none";
    }, 5000);
  }
});
