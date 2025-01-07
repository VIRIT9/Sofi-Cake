
  document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carruseles
    var carousels = {
      tortas: new bootstrap.Carousel(document.getElementById('carouselTortas'), {
        interval: 3000,
        pause: false
      }),
      masitas: new bootstrap.Carousel(document.getElementById('carouselMasitas'), {
        interval: 3000,
        pause: false
      }),
      postres: new bootstrap.Carousel(document.getElementById('carouselPostres'), {
        interval: 3000,
        pause: false
      })
    };
  
    // Mantener un intervalo común para todos los carruseles
    var commonInterval = 3000; // El mismo intervalo usado en la inicialización
  
    // Función para detener todos los carruseles
    function pauseAllCarousels() {
      for (let key in carousels) {
        carousels[key].pause();
      }
    }
  
    // Función para reanudar todos los carruseles al mismo tiempo
    function resumeAllCarousels() {
      for (let key in carousels) {
        carousels[key].cycle();
      }
    }
  
    // Añadir eventos a cada carrusel
    for (let key in carousels) {
      let carouselElement = document.getElementById('carousel' + key.charAt(0).toUpperCase() + key.slice(1));
      
      carouselElement.addEventListener('mouseenter', function() {
        pauseAllCarousels();
      });
  
      carouselElement.addEventListener('mouseleave', function() {
        // Aseguramos que todos los carruseles se reinicien al mismo tiempo
        setTimeout(resumeAllCarousels, 0); // Usamos setTimeout para asegurar que todos se reinicien en el siguiente tick del evento loop
      });
    }
  });
  


  /*document.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelectorAll(".icon");
  
    icons.forEach((icon) => {
      icon.addEventListener("mouseover", () => {
        icon.style.transition = "transform 0.3s ease";
        icon.style.transform = "rotate(10deg) scale(1.2)";
      });
  
      icon.addEventListener("mouseout", () => {
        icon.style.transform = "rotate(0deg) scale(1)";
      });
    });
  }); */ 