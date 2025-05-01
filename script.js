
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

//Formulario
//Elementos del DOM
const form = document.getElementById('contactForm');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');
const mensaje = document.getElementById('mensaje');
const feedback = document.getElementById('formFeedback');

// Expresiones regulares, para validar el email y telefono
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Para emails
const telefonoRegex = /^\d{8,12}$/; // Para teléfonos


form.addEventListener('submit', function(event){
  event.preventDefault(); //evita que la página se recargue, dando control para validar y enviar los datos.

  //Resetear errores
[nombre, email, telefono, mensaje]. forEach(field => {
  console.log('Field:', field.value);
  field.classList.remove('is-invalid')
  
})
/*forEach: es un método de los arreglos que ejecuta una función para cada elemento de un arreglo [constantes] 
field: es un nombre temporal que representa cada elemento del arreglo en cada iteración. 
Primera iteración: field es nombre.
Segunda iteración: field es email.
classList: es una propiedad de los elementos del DOM,  permite manipular las clases CSS de un elemento y acceder a las clases del elemento
*/



feedback.innerHTML = ''; //Limpia los mensajes anteriores

  // Validar
  let isValid = true;

  if (nombre.value.trim().length < 3) {
    nombre.classList.add('is-invalid');
    isValid = false;
  }

  if (!emailRegex.test(email.value.trim())) {
    email.classList.add('is-invalid');
    isValid = false;
  }
  
  if(!telefonoRegex.test(telefono.value.trim())) {
    telefono.classList.add('is-invalid');
    isValid = false;
  }
  
  if (mensaje.value.trim().length < 10){
    mensaje.classList.add('is-invalid');
    isValid = false;
  }

  if (isValid) {
    const formData = {
      name: nombre.value.trim(),
      email: email.value.trim(),
      phone: telefono.value.trim(),
      message: mensaje.value.trim()
    };
    //trim() es un método de los strings que elimina espacios en blanco (espacios, tabuladores, saltos de línea) del inicio y final del texto.

    //test() es un método de las expresiones regulares (RegExp) que verifica si un texto coincide con el patrón de la regex. Devuelve true si coincide, false si no.





    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        feedback.classList.add('success');
        feedback.textContent = 'Message sent successfully!';
        form.reset();
      })
      .catch(error => {
        feedback.classList.add('error');
        feedback.textContent = 'Error sending message. Please try again.';
        console.error('Error:', error);
      });
  } else {
    feedback.textContent = 'Please fix the errors.';
  }
});
});
