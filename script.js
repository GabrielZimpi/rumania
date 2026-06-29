// ===== DATOS =====

const SECTIONS = {
    'Situación Geográfica': {
        rumanian: 'Geografie',
        tagline: 'Cárpatos, llanuras, Delta del Danubio y costa al Mar Negro.'
    },
    'Población y Capital': {
        rumanian: 'Populație',
        tagline: 'Siete regiones, una capital y una densa red de ciudades históricas.'
    },
    'Historia': {
        rumanian: 'Istorie',
        tagline: 'De los principados de Valaquia a la Unión Europea.'
    },
    'Política': {
        rumanian: 'Politică',
        tagline: 'República parlamentaria con un sistema bicameral.'
    },
    'Sanidad': {
        rumanian: 'Sănătate',
        tagline: 'Sistema Nacional de Seguros de Salud y sus desafíos actuales.'
    },
    'Educación': {
        rumanian: 'Educație',
        tagline: 'De la grădiniță al Bacalaureat, pasando por el Liceu.'
    },
    'Economía': {
        rumanian: 'Economie',
        tagline: 'El leu (RON), la industria y una economía en crecimiento.'
    },
    'Idioma': {
        rumanian: 'Limbă',
        tagline: 'Latín al borde del Mar Negro, con sabor eslavo.'
    },
    'Religión': {
        rumanian: 'Religie',
        tagline: 'Ortodoxia rumana y la diversidad religiosa del país.'
    },
    'Influencia Rumana': {
        rumanian: 'Influență',
        tagline: 'Drácula, Nadia Comăneci, O-Zone y mucho más.'
    }
};

const PHRASES   = ['Bună!', 'Salut!', 'Bun venit!', 'Cu drag', 'Mulțumesc!'];
const RO_MONTHS = ['ian','feb','mar','apr','mai','iun','iul','aug','sep','oct','noi','dec'];

// ===== UTILITY STRIP =====

function initUtilityStrip() {
    const today = new Date();
    const label = document.getElementById('todayLabel');
    if (label) {
        label.textContent = `${today.getDate()} ${RO_MONTHS[today.getMonth()]} ${today.getFullYear()}`;
    }

    let phraseIndex = 0;
    const phraseEl = document.getElementById('rotatingPhrase');
    if (phraseEl) {
        phraseEl.textContent = PHRASES[0];
        setInterval(() => {
            phraseIndex = (phraseIndex + 1) % PHRASES.length;
            phraseEl.textContent = PHRASES[phraseIndex];
        }, 4500);
    }
}

// ===== MOSAICO =====

const TOTAL_IMAGES = 49;
const TOTAL_CELLS  = 30;

function initMosaic() {
    const cells = document.querySelectorAll('.imgporta');
    const pool = Array.from({ length: TOTAL_IMAGES }, (_, i) => i + 1);
    const picked = [];
    while (picked.length < TOTAL_CELLS) {
        const i = Math.floor(Math.random() * pool.length);
        picked.push(pool.splice(i, 1)[0]);
    }
    cells.forEach((cell, i) => {
        cell.style.backgroundImage = `url(imagenes/portada/portada${picked[i]}.jpg)`;
        cell.style.animationDelay  = `${i * 0.03}s`;
    });
}

function changeBackground() {
    const cells = document.querySelectorAll('.imgporta');
    const idx = Math.floor(Math.random() * TOTAL_CELLS);
    let n;
    do { n = Math.floor(Math.random() * TOTAL_IMAGES) + 1; }
    while (cells[idx].style.backgroundImage.includes(`portada${n}.jpg`));
    cells[idx].style.backgroundImage = `url(imagenes/portada/portada${n}.jpg)`;
}

// ===== NAV ACTIVO =====

function updateActiveNav(titulo) {
    document.querySelectorAll('#menuList li[data-titulo]').forEach(li => {
        li.classList.toggle('nav-active', li.dataset.titulo === titulo);
    });
}

// ===== SECTION HERO =====

function showSectionHero(titulo) {
    const data    = SECTIONS[titulo] || {};
    const hero    = document.getElementById('sectionHero');
    const cenefa  = document.getElementById('cenefaThin');

    document.getElementById('sectionMono').textContent    = data.rumanian || '';
    document.getElementById('sectionH2').textContent      = titulo;
    document.getElementById('sectionTagline').textContent = data.tagline  || '';

    hero.style.animation = 'none';
    hero.offsetHeight;           // reflow para reiniciar animación
    hero.style.animation = '';
    hero.style.display   = 'block';

    if (cenefa) cenefa.style.display = 'block';
}

function hideSectionHero() {
    const hero   = document.getElementById('sectionHero');
    const cenefa = document.getElementById('cenefaThin');
    if (hero)   hero.style.display   = 'none';
    if (cenefa) cenefa.style.display = 'none';
}

// ===== SECCIONES =====

function ocultarSecciones() {
    document.querySelectorAll(
        '.situacióngeográfica,.poblaciónycapital,.historia,.política,' +
        '.sanidad,.educación,.economía,.idioma,.religión,.influenciarumana'
    ).forEach(el => el.classList.remove('active', 'activeFlex'));
}

function verPortada() {
    ocultarSecciones();
    hideSectionHero();

    const wrapper = document.getElementById('portadaWrapper');
    if (wrapper) wrapper.style.display = 'block';

    updateActiveNav(null);
    cerrarMenuMovil();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cambiarTitulo(titulo) {
    ocultarSecciones();

    const wrapper = document.getElementById('portadaWrapper');
    if (wrapper) wrapper.style.display = 'none';

    showSectionHero(titulo);

    const seccion = document.querySelector('.' + titulo.replace(/\s/g, '').toLowerCase());
    if (seccion) {
        seccion.classList.add('activeFlex');
        checkPosition();
    }

    updateActiveNav(titulo);
    cerrarMenuMovil();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== SCROLL ANIMATION (Educación) =====

function checkPosition() {
    document.querySelectorAll('.animate-text:not(.fadeInUp)').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) {
            el.classList.add('fadeInUp');
        }
    });
}

// ===== HAMBURGUESA =====

function cerrarMenuMovil() {
    const menu = document.getElementById('menuList');
    if (menu) menu.classList.remove('open');
}

function initNavToggle() {
    const toggle = document.getElementById('navToggle');
    const menu   = document.getElementById('menuList');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
}

// ===== TECLADO =====

function initKeyboardNav() {
    const menu = document.getElementById('menuList');
    if (!menu) return;
    menu.addEventListener('keydown', function(e) {
        const items = [...menu.querySelectorAll('li')];
        const idx   = items.indexOf(document.activeElement);
        if (e.key === 'ArrowRight' && idx < items.length - 1) { e.preventDefault(); items[idx + 1].focus(); }
        else if (e.key === 'ArrowLeft' && idx > 0)            { e.preventDefault(); items[idx - 1].focus(); }
        else if (e.key === 'Enter' && idx !== -1)             { e.preventDefault(); items[idx].click(); }
    });
}

// ===== IDIOMAS =====

function toggleInfo(language) {
    const target   = document.getElementById(language + '-info');
    const nada     = document.getElementById('nada-info');
    const visible  = target && target.style.display === 'block';

    document.querySelectorAll('.language-info').forEach(el => { el.style.display = 'none'; });

    if (!visible && target) {
        target.style.display = 'block';
    } else {
        if (nada) nada.style.display = 'flex';
    }
}

// ===== INIT =====

document.addEventListener('DOMContentLoaded', function() {
    initUtilityStrip();
    initMosaic();
    setInterval(changeBackground, 2000);
    initKeyboardNav();
    initNavToggle();
    window.addEventListener('scroll', checkPosition);
    verPortada();
});
