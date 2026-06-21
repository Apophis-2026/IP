// Leer puntos actuales
let puntos = localStorage.getItem('cyberPoints') ? parseInt(localStorage.getItem('cyberPoints')) : 0;
document.getElementById('scoreValue').innerText = puntos;

let missionCompleted = false;

const missionScreen = document.getElementById('missionScreen');
const gameScreen = document.getElementById('gameScreen');
const fakePart = document.getElementById('fakePart');
const urlBar = document.getElementById('urlBar');
const overlay = document.getElementById('overlay');
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');

// Botón para iniciar investigación
const investigateBtn = document.getElementById('investigateBtn');

investigateBtn.addEventListener('click', () => {
  missionScreen.classList.remove('active');
  gameScreen.classList.add('active');
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
});

// Clic fuera de la parte falsa (en la barra de URL pero no en fakePart)
urlBar.addEventListener('click', (e) => {
  e.stopPropagation();
  // Si el clic no fue en fakePart y la misión no está completada
  if (e.target.id !== 'fakePart' && !missionCompleted) {
    overlay.style.display = 'block';
    errorModal.style.display = 'block';
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
