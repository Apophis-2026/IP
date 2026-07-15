// Leer puntos actuales
let puntos = localStorage.getItem('cyberPoints') ? parseInt(localStorage.getItem('cyberPoints')) : 0;
document.getElementById('scoreValue').innerText = puntos;

let missionCompleted = false;


// ========== CONFIGURACIÓN DEL AUDIO ==========
// Crear el objeto de audio (ubicado en la misma carpeta)
const audioInicio = new Audio('inicio.mp3');

// Configurar el audio
audioInicio.volume = 0.9; // Volumen al 90%
audioInicio.loop = false; // No repetir

// Función para intentar reproducir el audio
function reproducirAudioInicio() {
    audioInicio.play()
        .then(() => {
            console.log('🎵 Audio de inicio reproduciéndose');
        })
        .catch(error => {
            console.log('⚠️ Reproducción automática bloqueada:', error);
            // Intentar reproducir con la primera interacción del usuario
            document.addEventListener('click', function playOnClick() {
                audioInicio.play()
                    .then(() => console.log('🎵 Audio iniciado por interacción'))
                    .catch(err => console.log('Error al reproducir:', err));
                document.removeEventListener('click', playOnClick);
            }, { once: true });
        });
}

// ========== FIN CONFIGURACIÓN AUDIO ==========

const missionScreen = document.getElementById('missionScreen');
const gameScreen = document.getElementById('gameScreen');
const fakePart = document.getElementById('fakePart');
const urlBar = document.getElementById('urlBar');
const overlay = document.getElementById('overlay');
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');


// ===== SOLO SE AGREGA ESTA LÍNEA PARA REPRODUCIR EL AUDIO =====
  reproducirAudioInicio();
// ==============================================================  


// Botón para iniciar investigación
const investigateBtn = document.getElementById('investigateBtn');

investigateBtn.addEventListener('click', () => {
  missionScreen.classList.remove('active');
  gameScreen.classList.add('active');


  // Inicializamos la mascota
  if (typeof iniciarMascota === 'function') {
      iniciarMascota();
  }

});

// Detectar clic en la parte falsa
fakePart.addEventListener('click', (e) => {
  e.stopPropagation();
  if (missionCompleted) return;
  
  overlay.style.display = 'block';
  successModal.style.display = 'block';
  fakePart.style.background = '#22c55e';
  fakePart.style.color = 'white';
  
  if (!missionCompleted) {
    puntos += 50;
    localStorage.setItem('cyberPoints', puntos);
    document.getElementById('scoreValue').innerText = puntos;
    missionCompleted = true;
  }

  // LLAMADA A LA MASCOTA:
  if (typeof animarExito === 'function') {
      animarExito(); // Pixel saltará, girará y mostrará "✅ ¡Excelente!"
  }

});

// Clic fuera de la parte falsa (en la barra de URL pero no en fakePart)
urlBar.addEventListener('click', (e) => {
  e.stopPropagation();
  // Si el clic no fue en fakePart y la misión no está completada
  if (e.target.id !== 'fakePart' && !missionCompleted) {
    overlay.style.display = 'block';
    errorModal.style.display = 'block';
  }

  // LLAMADA A LA MASCOTA:
  if (typeof animarError === 'function') {
      animarError(); // Pixel se caerá, se pondrá triste y mostrará "😅 ¡Casi!"
  }

});

// Cerrar error
document.getElementById('closeErrorBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  overlay.style.display = 'none';
  errorModal.style.display = 'none';
});

// Continuar a misión 2
document.getElementById('continueBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  window.location.href = 'M02.html';
});
