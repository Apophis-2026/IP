let puntos = localStorage.getItem('cyberPoints') ? parseInt(localStorage.getItem('cyberPoints')) : 0;
document.getElementById('scoreValue').innerText = puntos;

let missionCompleted = false;
let userChoice = null;
let alreadyPenalized = false; // Controla que solo se penalice una vez por error

// Pantallas
const missionIntro = document.getElementById('missionIntroScreen');
const downloadPageScreen = document.getElementById('downloadPageScreen');
const overlay = document.getElementById('overlay');
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');

// Elemento para mostrar mensaje de penalización
const penaltyMessage = document.getElementById('penaltyMessage');

// Botones
const seePageBtn = document.getElementById('seePageBtn');
const badChoiceBtn = document.getElementById('badChoiceBtn');
const goodChoiceBtn = document.getElementById('goodChoiceBtn');
const continueBtn = document.getElementById('continueBtn');
const closeErrorBtn = document.getElementById('closeErrorBtn');

// ===== FUNCIÓN PARA ACTUALIZAR PUNTOS EN PANTALLA =====
function actualizarPuntosEnPantalla() {
    const puntosActuales = parseInt(localStorage.getItem('cyberPoints')) || 0;
    document.getElementById('scoreValue').innerText = puntosActuales;
}

// ===== FUNCIÓN DE PENALIZACIÓN =====
function aplicarPenalizacion() {
    if (alreadyPenalized) return; // Solo penaliza una vez por error
    
    let puntosActuales = parseInt(localStorage.getItem('cyberPoints')) || 0;
    puntosActuales = Math.max(0, puntosActuales - 5); // Resta 5, mínimo 0
    localStorage.setItem('cyberPoints', puntosActuales);
    actualizarPuntosEnPantalla();
    alreadyPenalized = true;
    
    // Mostrar mensaje de penalización
    mostrarMensajePenalizacion();
}

function mostrarMensajePenalizacion() {
    penaltyMessage.style.display = 'block';
    // Ocultar después de 4 segundos
    setTimeout(() => {
        penaltyMessage.style.display = 'none';
    }, 4000);
}

// ===== RESETEAR PENALIZACIÓN AL REINICIAR LA MISIÓN =====
function resetPenalizacion() {
    alreadyPenalized = false;
    if (penaltyMessage) penaltyMessage.style.display = 'none';
}

// Función para resetear la selección de botones
function resetSelection() {
    badChoiceBtn.classList.remove('selected');
    goodChoiceBtn.classList.remove('selected');
    userChoice = null;
}

// Función para marcar selección
function markSelection(selectedBtn, value) {
    badChoiceBtn.classList.remove('selected');
    goodChoiceBtn.classList.remove('selected');
    selectedBtn.classList.add('selected');
    userChoice = value;
}

// Avanzar a la página falsa
seePageBtn.addEventListener('click', () => {
    missionIntro.classList.remove('active');
    downloadPageScreen.classList.add('active');
    resetSelection();
    resetPenalizacion(); // Resetear penalización al entrar
    actualizarPuntosEnPantalla(); // Actualizar puntos al entrar

    // LLAMADA A LA MASCOTA:
    if (typeof animarExito === 'function') {
        animarExito(); // Pixel saltará, girará y mostrará "✅ ¡Excelente!"
    }

});

// Opción INCORRECTA (descargar el .exe)
badChoiceBtn.addEventListener('click', () => {
    if (missionCompleted) return;
    markSelection(badChoiceBtn, 'bad');
    
    // ===== APLICAR PENALIZACIÓN =====
    aplicarPenalizacion();
    
    overlay.style.display = 'block';
    errorModal.style.display = 'block';

    // LLAMADA A LA MASCOTA:
    if (typeof animarError === 'function') {
        animarError(); // Pixel se caerá, se pondrá triste y mostrará "😅 ¡Casi!"
    }

});

// Opción CORRECTA (usar CurseForge)
goodChoiceBtn.addEventListener('click', () => {
    if (missionCompleted) return;
    markSelection(goodChoiceBtn, 'good');
    
    overlay.style.display = 'block';
    successModal.style.display = 'block';
    
    if (!missionCompleted) {
        // ===== LEER PUNTOS ACTUALES DESDE localStorage =====
        let puntosActuales = parseInt(localStorage.getItem('cyberPoints')) || 0;
        puntosActuales += 100;
        localStorage.setItem('cyberPoints', puntosActuales);
        actualizarPuntosEnPantalla();
        missionCompleted = true;

        // LLAMADA A LA MASCOTA:
        if (typeof animarExito === 'function') {
            animarExito(); // Pixel saltará, girará y mostrará "✅ ¡Excelente!"
        }

    }
});

// Cerrar error
closeErrorBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    errorModal.style.display = 'none';
});

// Continuar a la pantalla final
continueBtn.addEventListener('click', () => {
    window.location.href = 'fin.html';
});

// Cerrar modales si se hace clic en el overlay
overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    errorModal.style.display = 'none';
    successModal.style.display = 'none';
});
