document.addEventListener('DOMContentLoaded', () => {
    // ===== CONTROLE DO MENU MOBILE (BUG CORRIGIDO) =====
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-links');
    const overlay = document.getElementById('overlay');
    const navItems = document.querySelectorAll('.nav-links a');

    // Função para abrir/fechar menu
    const toggleMenu = () => {
        toggle.classList.toggle('active'); // Anima o hambúrguer (X)
        nav.classList.toggle('active');    // Mostra/esconde a aba lateral
        overlay.classList.toggle('active'); // Mostra/esconde fundo escuro
        
        // Bloqueia rolagem da tela ao abrir menu
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    };

    // Eventos de clique
    if (toggle) toggle.addEventListener('click', toggleMenu);
    
    // Fecha clicando no overlay
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // Fecha ao clicar em qualquer link (smooth scroll assume depois)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ===== ANIMAÇÃO SCROLL PROFISSIONAL (INTERSECTION OBSERVER) =====
    // Substitui o evento de scroll custoso por um observer de alta performance
    const observerOptions = {
        threshold: 0.15, // Aciona quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Para de observar após animar 1 vez
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos com as classes de fade
    document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
        scrollObserver.observe(el);
    });

    // ===== CONTROLE DA NAVBAR NO SCROLL =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 20px';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '15px 20px';
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
        }
    });
});

// ===== LOADER PROFISSIONAL =====
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    
    // Garante que o loader fique pelo menos 800ms para a animação suave rodar,
    // ou some logo após a página carregar (o que for maior).
    setTimeout(() => {
        loader.classList.add("hide");
        // Remove do DOM após a transição para liberar memória
        setTimeout(() => {
            loader.style.display = 'none';
        }, 600);
    }, 800);
});
