// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Menú 
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Cerrar menú al hacer clic en enlaces
document.querySelectorAll(".nav-menu a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Sistema de Carrito
let cartCount = 0;
let cartItems = [];
const cartCountElement = document.querySelector('.cart-count');

// Función para mostrar notificaciones
function showNotification(message) {
    // Remover notificaciones previas
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        color: #1f2937;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1000;
        border-left: 4px solid #dc2626;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        white-space: pre-line;
        font-family: inherit;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Función para agregar al carrito
function addToCart(name, price, image, button) {
    cartCount++;
    cartItems.push({ name, price, image });
    
    // Actualizar contador del carrito
    cartCountElement.textContent = cartCount;
    cartCountElement.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartCountElement.style.transform = 'scale(1)';
    }, 300);
    
    // Mostrar notificación UNA VEZ
    showNotification(`✅ ${name} agregado al carrito\nPrecio: ${price}`);
    
    // Efecto visual en el botón
    if (button) {
        const originalHTML = button.innerHTML;
        const originalBackground = button.style.background;
        
        button.innerHTML = '<i class="fas fa-check"></i>Agregado';
        button.style.background = '#16a34a';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = originalBackground;
            button.disabled = false;
        }, 2000);
    }
}

// Función para manejar el carrito
function initializeCart() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        // Remover event listeners previos para evitar duplicados
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.producto-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.precio').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // Agregar al carrito
            addToCart(productName, productPrice, productImage, this);
        });
    });
}

function initializeQuickView() {
    document.querySelectorAll('.btn-quickview').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.producto-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.precio').textContent;
            const productDescription = productCard.querySelector('p').textContent;
            
            showNotification(`👀 ${productName}\n${productPrice}\n${productDescription}\n\nHaz clic en "Agregar al Carrito" para comprar.`);
        });
    });
}

// Form contacto
document.getElementById('form-contacto').addEventListener('submit', function(e) {
    e.preventDefault();
    showNotification('📧 ¡Gracias por tu mensaje!\nTe contactaremos dentro de 24 horas.');
    this.reset();
});

document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email && email.includes('@')) {
        showNotification(`📬 ¡Gracias por suscribirte!\nRecibirás nuestras novedades en: ${email}`);
        this.reset();
    } else {
        showNotification('❌ Por favor ingresa un email válido');
    }
});

// Intersection para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.producto-card, .promo-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Efecto de escritura en el hero
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrito
    initializeCart();
    
    // Inicializar vista rápida
    initializeQuickView();
    
    // Efecto de escritura después de loading
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 1600);
});

// Click fuera del menú para cerrarlo
document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Prevenir envío de formularios con Enter
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        const form = e.target.closest('form');
        if (form && !form.querySelector('button[type="submit"]')) {
            e.preventDefault();
        }
    }
});

// Efecto hover mejorado para tarjetas de producto
document.querySelectorAll('.producto-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Actualizar año en el footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
});