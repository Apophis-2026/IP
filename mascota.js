/**
 * PROYECTO SAFE SPACE - MASCOTA "PIXEL"
 * Controlador de la mascota robótica para las misiones.
 * Basado en el diseño 100% CSS.
 */

// Variable para controlar el temporizador de la burbuja
let temporizadorBurbuja = null;


// ============================================
// NUEVO: CONFIGURACIÓN DE AUDIOS
// ============================================
// Crear los objetos de audio (deben estar en la misma carpeta)
const audioExito = new Audio('Exito.mp3');
const audioError = new Audio('Error.mp3');

// Configurar volúmenes (opcional)
audioExito.volume = 0.9;
audioError.volume = 0.9;
// ============================================


// Objeto con las frases motivadoras para cada estado
const FRASES = {
    saludo: ["¡Hola, CiberAgente!", "Conectado...", "¡Listo para la misión!"],
    exito: ["✅ ¡Excelente!", "¡Cifrado perfecto!", "¡Genial, Agente!", "¡Misión cumplida!"],
    error: ["😅 ¡Casi!", "Error de protocolo...", "Intenta de nuevo", "¡No te rindas!"]
};

/**
 * Función para mostrar el mensaje en la burbuja
 * @param {string} texto - El mensaje a mostrar
 * @param {number} duracion - Tiempo en ms que permanece visible (por defecto 2000ms)
 */
function mostrarMensaje(texto, duracion = 2500) {
    const burbuja = document.getElementById('dialogo-burbuja');
    
    // Limpiamos el temporizador anterior para evitar colisiones
    if (temporizadorBurbuja) {
        clearTimeout(temporizadorBurbuja);
        burbuja.classList.remove('activa');
    }

    // Forzamos un reflow para reiniciar la animación si es necesario
    void burbuja.offsetWidth; 

    burbuja.textContent = texto;
    burbuja.classList.add('activa');

    // Ocultar después de la duración especificada
    temporizadorBurbuja = setTimeout(() => {
        burbuja.classList.remove('activa');
        temporizadorBurbuja = null;
    }, duracion);
}


// ============================================
// NUEVO: FUNCIONES PARA REPRODUCIR AUDIOS
// ============================================
/**
 * Reproduce el audio de éxito
 */
function reproducirAudioExito() {
    // Reiniciar el audio por si ya se estaba reproduciendo
    audioExito.currentTime = 0;
    audioExito.play()
        .then(() => console.log('🎵 Audio de éxito reproducido'))
        .catch(error => console.log('⚠️ Error al reproducir audio de éxito:', error));
}

/**
 * Reproduce el audio de error
 */
function reproducirAudioError() {
    // Reiniciar el audio por si ya se estaba reproduciendo
    audioError.currentTime = 0;
    audioError.play()
        .then(() => console.log('🎵 Audio de error reproducido'))
        .catch(error => console.log('⚠️ Error al reproducir audio de error:', error));
}
// ============================================


/**
 * Inicializa la mascota (Saludo inicial)
 * Se debe llamar al cargar la página o al empezar una misión
 */
function iniciarMascota() {
    const robot = document.querySelector('.pixel-robot');
    // Resetear a estado base (ojos azules, boca feliz)
    robot.classList.remove('estado-exito', 'estado-error');
    
    // Mensaje aleatorio de saludo
    const fraseSaludo = FRASES.saludo[Math.floor(Math.random() * FRASES.saludo.length)];
    mostrarMensaje(fraseSaludo, 3000);
}

/**
 * Animación de ÉXITO
 * Se llama cuando el jugador acierta una misión
 */
function animarExito() {
    const robot = document.querySelector('.pixel-robot');
    
    // Resetear estilos previos
    robot.classList.remove('estado-error');
    
    // Aplicar clase de éxito (ejecuta el giro, el salto y el pulgar)
    robot.classList.add('estado-exito');
    
    // Mensaje aleatorio de felicitación
    const fraseExito = FRASES.exito[Math.floor(Math.random() * FRASES.exito.length)];
    mostrarMensaje(fraseExito, 3000);


   // ===== REPRODUCIR AUDIO DE ÉXITO =====
    reproducirAudioExito();


    // Quitar la clase de éxito después de que termine la animación (para que pueda reutilizarse)
    setTimeout(() => {
        robot.classList.remove('estado-exito');
    }, 1000);
}

/**
 * Animación de ERROR
 * Se llama cuando el jugador falla una misión
 */
function animarError() {
    const robot = document.querySelector('.pixel-robot');
    
    // Resetear estilos previos
    robot.classList.remove('estado-exito');
    
    // Aplicar clase de error (cae al suelo y se entristece)
    robot.classList.add('estado-error');
    
    // Mensaje aleatorio de ánimo
    const fraseError = FRASES.error[Math.floor(Math.random() * FRASES.error.length)];
    mostrarMensaje(fraseError, 3000);


    // ===== REPRODUCIR AUDIO DE ERROR =====
    reproducirAudioError();


    // Quitar la clase de error después de la animación
    setTimeout(() => {
        robot.classList.remove('estado-error');
    }, 1000);
}
