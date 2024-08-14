function verPortada() {
  var secciones = document.querySelectorAll('main > div:not(.portada)');
  for (var i = 0; i < secciones.length; i++) {
    var seccion = secciones[i];
    seccion.classList.remove('active');
    seccion.classList.remove('activeFlex');
  }
  var secciones = document.querySelectorAll('.portada');
  secciones.forEach(function(seccion) {
    seccion.style.display = 'flex';
  });
  var h1 = document.querySelectorAll('.h1');
  h1.forEach(function(seccion) {
    seccion.style.display = 'none';
  });
}

function cambiarTitulo(titulo) {
  document.querySelector('.h1').textContent = titulo;

  // Ocultar portada //
  var secciones = document.querySelectorAll('.portada');
  secciones.forEach(function(seccion) {
    seccion.style.display = 'none';
  });

  // Mostrar h1 //
  var secciones = document.querySelectorAll('.h1');
  secciones.forEach(function(seccion) {
    seccion.style.display = 'block';
  });

  // Ocultar todas las secciones //
  var secciones = document.querySelectorAll('main > div');
  for (var i = 0; i < secciones.length; i++) {
    var seccion = secciones[i];
    seccion.classList.remove('active');
    seccion.classList.remove('activeFlex');
  }

// Mostrar solo la seccion activa
var seccionMostrar = document.querySelector(`.${titulo.replace(/\s/g, '').toLowerCase()}`);

if (seccionMostrar) {
  seccionMostrar.classList.add('activeFlex');
}
  
}
// Animated text on scroll //
const animateElements = document.querySelectorAll('.animate-text');
const windowHeight = window.innerHeight;

function checkPosition() {
  animateElements.forEach(element => {
    const positionFromTop = element.getBoundingClientRect().top;
    if (positionFromTop - windowHeight <= 0) {
      element.classList.add('fadeInUp');
    }
  });
}

window.addEventListener('scroll', checkPosition);
window.addEventListener('resize', checkPosition);
checkPosition();

function toggleInfo(language) {
  const infoElement = document.getElementById(`${language}-info`);
  const isVisible = infoElement.style.display === 'block';

  // Oculta todas las informaciones de idiomas //
  const allInfos = document.querySelectorAll('.language-info');
  allInfos.forEach((info) => (info.style.display = 'none'));

  // Muestra la informacion del idioma si estaba oculta //
  if (!isVisible) {
    infoElement.style.display = 'block';
  }
}

// Cambio imagenes portada //
document.addEventListener("DOMContentLoaded", function () {
  const divs = document.querySelectorAll(".imgporta");
  const totalImages = 49; // Número total de imagenes disponibles //
  const usedImages = [];

  function getRandomImage() {
      let randomIndex = Math.floor(Math.random() * totalImages) + 1;

      while (usedImages.includes(randomIndex)) {
          randomIndex = Math.floor(Math.random() * totalImages) + 1;
      }

      usedImages.push(randomIndex);
      if (usedImages.length === totalImages) {
          usedImages.length = 0;
      }

      return `imagenes/portada/portada${randomIndex}.jpg`;
  }

  function setInitialBackgrounds() {
      divs.forEach((div) => {
          const nextImage = getRandomImage();
          div.style.backgroundImage = `url(${nextImage})`;
      });
  }

  function changeBackground() {
      const randomIndex = Math.floor(Math.random() * divs.length);
      const currentImage = divs[randomIndex].style.backgroundImage;
      let nextImage = getRandomImage();

      // Asegurarse de que la nueva imagen no sea igual a la imagen actual //
      while (currentImage === `url(${nextImage})`) {
          nextImage = getRandomImage();
      }

      divs[randomIndex].style.backgroundImage = `url(${nextImage})`;
  }

  // Establecer todas las imagenes de fondo iniciales //
  setInitialBackgrounds();

  // Establecer el intervalo para cambiar la imagen de un div aleatorio //
  setInterval(changeBackground, 2000);
});

// TabIndex con flechas del teclado
document.addEventListener('DOMContentLoaded', function () {
    var menuList = document.getElementById('menuList');
    var menuItems = menuList.querySelectorAll('li');

    menuList.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault(); // Evitar el comportamiento predeterminado del desplazamiento

            var currentIndex = Array.from(menuItems).indexOf(document.activeElement);

            if (e.key === 'ArrowLeft') {
                // Flecha hacia arriba
                var newIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
            } else {
                // Flecha hacia abajo
                var newIndex = (currentIndex + 1) % menuItems.length;
            }

            menuItems[newIndex].focus();
        } else if (e.key === 'Enter') {
            // Manejar la tecla Enter
            e.preventDefault(); // Evitar el comportamiento predeterminado del Enter
            document.activeElement.click(); // Simular un clic en el elemento activo
        }
    });
});

