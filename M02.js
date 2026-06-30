let puntos = localStorage.getItem('cyberPoints') ? parseInt(localStorage.getItem('cyberPoints')) : 0;
document.getElementById('scoreValue').innerText = puntos;

let missionCompleted = false;
let alreadyPenalized = false; // Controla que solo se penalice una vez por error

// Pantallas
const missionIntro = document.getElementById('missionIntroScreen');
const gamePopup = document.getElementById('gamePopupScreen');
const formScreen = document.getElementById('formScreen');

const overlay = document.getElementById('overlay');
const warningModal = document.getElementById('warningModal');
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');

// Elemento para mostrar mensaje de penalización
const penaltyMessage = document.getElementById('penaltyMessage');

// Botones de navegación
const seeOfferBtn = document.getElementById('seeOfferBtn');
const showFormBtn = document.getElementById('showFormBtn');

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
    penaltyMessage.style.display = 'none';
}

// Paso 1: Ver oferta
seeOfferBtn.addEventListener('click', () => {
    missionIntro.classList.remove('active');
    gamePopup.classList.add('active');
    resetPenalizacion(); // Resetear al entrar a la misión
    actualizarPuntosEnPantalla(); // Actualizar puntos al entrar

    // Inicializamos la mascota
    if (typeof iniciarMascota === 'function') {
        iniciarMascota();
    }

});

// Paso 2: Mostrar formulario
showFormBtn.addEventListener('click', () => {
    gamePopup.classList.remove('active');
    formScreen.classList.add('active');
});

// === LÓGICA DEL FORMULARIO ===
let userSelections = [null, null, null, null, null, null];

// Obtener todos los botones
const allButtons = document.querySelectorAll('.choice-btn');

// Función para marcar selección
function markSelection(btn, idx, value) {
    const parent = btn.parentElement;
    const buttons = parent.querySelectorAll('.choice-btn');
    
    buttons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    userSelections[idx] = value;
}

// Asignar evento a cada botón
allButtons.forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-idx'));
    const isYes = btn.classList.contains('btn-yes');
    
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = isYes ? 'yes' : 'no';
        markSelection(btn, idx, value);
    });
});

// Función para cerrar modales
function closeAllModals() {
    overlay.style.display = 'none';
    warningModal.style.display = 'none';
    errorModal.style.display = 'none';
    successModal.style.display = 'none';
}

// Verificar respuestas
document.getElementById('checkMission2Btn').addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (userSelections.includes(null)) {
        overlay.style.display = 'block';
        warningModal.style.display = 'block';
        return;
    }
    
    const isNameCorrect = userSelections[0] === 'yes';
    const isAgeCorrect = userSelections[1] === 'no';
    const isSchoolCorrect = userSelections[2] === 'no';
    const isAddressCorrect = userSelections[3] === 'no';
    const isPhoneCorrect = userSelections[4] === 'no';
    const isUserCorrect = userSelections[5] === 'yes';
    
    const allCorrect = isNameCorrect && isAgeCorrect && isSchoolCorrect && 
                       isAddressCorrect && isPhoneCorrect && isUserCorrect;
    
    if (allCorrect) {
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
    } else {
        // ===== ¡ERROR! APLICAR PENALIZACIÓN =====
        aplicarPenalizacion();
        overlay.style.display = 'block';
        errorModal.style.display = 'block';

        // LLAMADA A LA MASCOTA:
        if (typeof animarError === 'function') {
            animarError(); // Pixel se caerá, se pondrá triste y mostrará "😅 ¡Casi!"
        }

    }
});

// Cerrar modales
document.getElementById('closeWarningBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllModals();
});

document.getElementById('closeErrorBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllModals();
});

// Continuar a la misión 3
document.getElementById('continueBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    window.location.href = 'M03.html';
});

// Cerrar modal si se hace clic en el overlay
overlay.addEventListener('click', () => {
    closeAllModals();
});
