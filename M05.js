let puntos = localStorage.getItem('cyberPoints') ? parseInt(localStorage.getItem('cyberPoints')) : 0;
document.getElementById('scoreValue').innerText = puntos;

let missionCompleted = false;
let userChoice = null;

// Pantallas
const missionIntro = document.getElementById('missionIntroScreen');
const downloadPageScreen = document.getElementById('downloadPageScreen');
const overlay = document.getElementById('overlay');
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');

// Botones
const seePageBtn = document.getElementById('seePageBtn');
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

// Avanzar a la página falsa
seePageBtn.addEventListener('click', () => {
  missionIntro.classList.remove('active');
  downloadPageScreen.classList.add('active');
  resetSelection();
});

// Opción INCORRECTA (descargar el .exe)
badChoiceBtn.addEventListener('click', () => {
  if (missionCompleted) return;
  markSelection(badChoiceBtn, 'bad');
  
  overlay.style.display = 'block';
  errorModal.style.display = 'block';
});

// Opción CORRECTA (usar CurseForge)
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
