// Leer puntos
const puntos = localStorage.getItem('cyberPoints') ? parseInt(localStorage.getItem('cyberPoints')) : 0;
document.getElementById('finalPoints').innerText = puntos;

// Pantallas
const missionCompleteScreen = document.getElementById('missionCompleteScreen');
const tipsScreen = document.getElementById('tipsScreen');

// Botones
const showTipsBtn = document.getElementById('showTipsBtn');
const backToResultsBtn = document.getElementById('backToResultsBtn');
const restartBtn = document.getElementById('restartBtn');

// Mostrar pantalla de reglas de oro
showTipsBtn.addEventListener('click', () => {
  missionCompleteScreen.classList.remove('active');
  tipsScreen.classList.add('active');
});

// Volver a la pantalla de resultados
backToResultsBtn.addEventListener('click', () => {
  tipsScreen.classList.remove('active');
  missionCompleteScreen.classList.add('active');
});

// Reiniciar juego
restartBtn.addEventListener('click', () => {
  localStorage.removeItem('cyberPoints');
  window.location.href = 'index.html';
});
