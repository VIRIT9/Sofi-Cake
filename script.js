
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
    var commonInterval = 3000; /* El mismo intervalo usado en la inicialización*/
  
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
        setTimeout(resumeAllCarousels, 0); /* Usamos setTimeout para asegurar que todos se reinicien en el siguiente tick del evento loop*/
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
  event.preventDefault(); /*Evita que la página se recargue, dando control para validar y enviar los datos.*/

  //Resetear errores
[nombre, email, telefono, mensaje]. forEach(field => {
  field.classList.remove('is-invalid')
})

 feedback.classList.remove('text-success', 'text-danger', 'text-info');
    feedback.innerHTML = ''; /*Limpia los mensajes anteriores
/forEach: Es un método de los arreglos que ejecuta una función para cada elemento de un arreglo [constantes] 
field: es un nombre temporal que representa cada elemento del arreglo en cada iteración. 
Primera iteración: field es nombre.
Segunda iteración: field es email.
classList: es una propiedad de los elementos del DOM,  permite manipular las clases CSS de un elemento y acceder a las clases del elemento
*/

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
  /*trim() es un método de los strings que elimina espacios en blanco (espacios, tabuladores, saltos de línea) del inicio y final del texto.
  test() es un método de las expresiones regulares (RegExp) que verifica si un texto coincide con el patrón de la regex. Devuelve true si coincide, false si no.*/

   // Si es válido, enviar con fetch
   if (isValid) {
    const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      feedback.classList.add('text-info');
      feedback.textContent = 'Enviando mensaje...';
      
      const formData = new FormData(form);
      fetch('/', {
  method: 'POST',
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    'form-name': 'contactForm',
    ...Object.fromEntries(formData)
  }).toString()
})
      

      // Manejar la respuesta
    .then(response => {
      if (!response.ok) throw new Error('Error en la respuesta del servidor'); /* throw new Error: Si la respuesta no es válida (por ejemplo, error 404 o 500), lanza un error que se captura en el .catch. { //response.ok: Verifica si la solicitud fue exitosa (código HTTP 200-299).*/
      feedback.classList.remove('text-info');
      feedback.classList.add('text-success');
      feedback.textContent = '¡Mensaje enviado con éxito!'; //feedback: Cambia el mensaje a "¡Mensaje enviado con éxito!" y usa la clase text-success (verde) de Bootstrap.
      submitButton.disabled = false;
      form.reset(); // Limpia el formulario
      console.log('Formulario envidado a Netlify');
    })
    
    //Manejar errores
    .catch(error => { /*Captura cualquier error (problema de red, servidor no disponible, etc.).*/
      feedback.classList.remove('text-info');
      feedback.classList.add('text-danger');
      feedback.textContent = 'Error al enviar el mensaje. Intente de nuevo.';
      submitButton.disabled = false;
      console.error('Error:', error);
    });
} else { // Mostrar errores
  feedback.classList.add('text-danger');
  feedback.textContent = 'Por favor, corrija los errores.';
}
});
});