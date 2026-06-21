let puntos = localStorage.getItem('cyberPoints') ? parseInt(localStorage.getItem('cyberPoints')) : 0;
document.getElementById('scoreValue').innerText = puntos;

let missionCompleted = false;
let userChoice = null;

// Pantallas
const missionIntro = document.getElementById('missionIntroScreen');
const chatScreen = document.getElementById('chatScreen');
const overlay = document.getElementById('overlay');
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');

// Botones
const seeChatBtn = document.getElementById('seeChatBtn');
const badChoiceBtn = document.getElementById('badChoiceBtn');
const goodChoiceBtn = document.getElementById('goodChoiceBtn');
const continueBtn = document.getElementById('continueBtn');
const closeErrorBtn = document.getElementById('closeErrorBtn');

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

// Evento para ver el chat
seeChatBtn.addEventListener('click', () => {
  missionIntro.classList.remove('active');
  chatScreen.classList.add('active');
  resetSelection();
});

// Evento para opción INCORRECTA (Dar mis datos)
badChoiceBtn.addEventListener('click', () => {
  if (missionCompleted) return;
  markSelection(badChoiceBtn, 'bad');
  
  overlay.style.display = 'block';
  errorModal.style.display = 'block';
});

// Evento para opción CORRECTA (Bloquear y reportar)
goodChoiceBtn.addEventListener('click', () => {
  if (missionCompleted) return;
  markSelection(goodChoiceBtn, 'good');
  
  overlay.style.display = 'block';
  successModal.style.display = 'block';
  
  if (!missionCompleted) {
    puntos += 100;
    localStorage.setItem('cyberPoints', puntos);
    document.getElementById('scoreValue').innerText = puntos;
    missionCompleted = true;
  }
});

// Cerrar modal de error
closeErrorBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
  errorModal.style.display = 'none';
});

// Continuar a la misión 4
continueBtn.addEventListener('click', () => {
  window.location.href = 'M04.html';
});

// Cerrar modales si se hace clic en el overlay
overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
  errorModal.style.display = 'none';
  successModal.style.display = 'none';
});
