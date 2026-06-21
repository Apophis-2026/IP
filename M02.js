let puntos = localStorage.getItem('cyberPoints') ? parseInt(localStorage.getItem('cyberPoints')) : 0;
document.getElementById('scoreValue').innerText = puntos;

let missionCompleted = false;

// Pantallas
const missionIntro = document.getElementById('missionIntroScreen');
const gamePopup = document.getElementById('gamePopupScreen');
const formScreen = document.getElementById('formScreen');

const overlay = document.getElementById('overlay');
const warningModal = document.getElementById('warningModal');
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');

// Botones de navegación
const seeOfferBtn = document.getElementById('seeOfferBtn');
const showFormBtn = document.getElementById('showFormBtn');

// Paso 1: Ver oferta
seeOfferBtn.addEventListener('click', () => {
  missionIntro.classList.remove('active');
  gamePopup.classList.add('active');
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
      puntos += 100;
      localStorage.setItem('cyberPoints', puntos);
      document.getElementById('scoreValue').innerText = puntos;
      missionCompleted = true;
    }
  } else {
    overlay.style.display = 'block';
    errorModal.style.display = 'block';
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
