// ================================================================
// fin.js - Pantalla final del juego CiberAgentes
// ================================================================

// --- Leer puntos del juego ---
const puntos = localStorage.getItem('cyberPoints') ? parseInt(localStorage.getItem('cyberPoints')) : 0;
const finalPointsElement = document.getElementById('finalPoints');
if (finalPointsElement) {
    finalPointsElement.innerText = puntos;
}

// ============================================================
// FUNCIÓN PRINCIPAL DE SINCRONIZACIÓN (solo guarda en localStorage)
// ============================================================

function sincronizarConPortal() {
    console.log('🔄 INICIANDO SINCRONIZACIÓN CON EL PORTAL');
    
    const puntosJuego = parseInt(localStorage.getItem('cyberPoints') || '0');
    console.log(`📊 Puntos obtenidos: ${puntosJuego}`);
    
    let rango = 'Agente Novato';
    if (puntosJuego >= 100) rango = 'CiberPatrulla';
    if (puntosJuego >= 250) rango = 'Guardian Digital';
    if (puntosJuego >= 450) rango = 'CiberLegendario';
    
    let misiones = 0;
    if (puntosJuego >= 50) misiones = 1;
    if (puntosJuego >= 150) misiones = 2;
    if (puntosJuego >= 250) misiones = 3;
    if (puntosJuego >= 350) misiones = 4;
    if (puntosJuego >= 450) misiones = 5;
    
    console.log(`🎖️ Rango: ${rango}, 📋 Misiones: ${misiones}`);
    
    // Guardar en localStorage
    try {
        localStorage.setItem('cibermind_puntos', puntosJuego.toString());
        localStorage.setItem('cibermind_rango', rango);
        localStorage.setItem('cibermind_misiones', misiones.toString());
        localStorage.setItem('cibermind_actualizar', 'true');
        localStorage.setItem('cibermind_timestamp', Date.now().toString());
        console.log('✅ Guardado en localStorage:', { puntos: puntosJuego, rango, misiones });
    } catch(e) {
        console.log('❌ Error en localStorage:', e);
    }
    
    console.log('🔄 SINCRONIZACIÓN COMPLETADA');
}

sincronizarConPortal();

// ============================================================
// NAVEGACIÓN ENTRE PANTALLAS
// ============================================================

const missionCompleteScreen = document.getElementById('missionCompleteScreen');
const tipsScreen = document.getElementById('tipsScreen');
const showTipsBtn = document.getElementById('showTipsBtn');
const backToResultsBtn = document.getElementById('backToResultsBtn');

if (showTipsBtn) {
    showTipsBtn.addEventListener('click', function() {
        console.log('📖 Mostrando Reglas de Oro...');
        if (missionCompleteScreen) missionCompleteScreen.classList.remove('active');
        if (tipsScreen) tipsScreen.classList.add('active');
    });
}

if (backToResultsBtn) {
    backToResultsBtn.addEventListener('click', function() {
        console.log('🔙 Volviendo a resultados...');
        if (tipsScreen) tipsScreen.classList.remove('active');
        if (missionCompleteScreen) missionCompleteScreen.classList.add('active');
    });
}

// ============================================================
// BOTÓN VOLVER AL PORTAL (con parámetros URL)
// ============================================================

const volverPortalBtn = document.createElement('button');
volverPortalBtn.textContent = '🏠 Volver al Portal Safe Space';
volverPortalBtn.style.cssText = `
    display: block;
    margin: 30px auto 20px;
    padding: 18px 40px;
    background: linear-gradient(135deg, #00d4ff, #0088cc);
    color: #0a0a0a;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 1.3rem;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);
    transition: all 0.3s ease;
    z-index: 100;
`;

volverPortalBtn.onmouseover = function() {
    this.style.transform = 'scale(1.05)';
    this.style.boxShadow = '0 0 50px rgba(0, 212, 255, 0.6)';
};

volverPortalBtn.onmouseout = function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.4)';
};

volverPortalBtn.onclick = function() {
    const puntosJuego = parseInt(localStorage.getItem('cyberPoints') || '0');
    
    let rango = 'Agente Novato';
    if (puntosJuego >= 100) rango = 'CiberPatrulla';
    if (puntosJuego >= 250) rango = 'Guardian Digital';
    if (puntosJuego >= 450) rango = 'CiberLegendario';
    
    let misiones = 0;
    if (puntosJuego >= 50) misiones = 1;
    if (puntosJuego >= 150) misiones = 2;
    if (puntosJuego >= 250) misiones = 3;
    if (puntosJuego >= 350) misiones = 4;
    if (puntosJuego >= 450) misiones = 5;
    
    // Guardar en localStorage (por si acaso)
    localStorage.setItem('cibermind_puntos', puntosJuego.toString());
    localStorage.setItem('cibermind_rango', rango);
    localStorage.setItem('cibermind_misiones', misiones.toString());
    localStorage.setItem('cibermind_actualizar', 'true');
    localStorage.setItem('cibermind_timestamp', Date.now().toString());
    
    // Construir URL con parámetros (método más confiable)
    const url = `index.html?puntos=${puntosJuego}&rango=${encodeURIComponent(rango)}&misiones=${misiones}`;
    console.log('🔗 Redirigiendo a:', url);
    window.location.href = url;
};

// Agregar el botón
const container = document.querySelector('.container') || document.body;
container.appendChild(volverPortalBtn);

// ============================================================
// REINICIAR JUEGO
// ============================================================

const restartBtn = document.getElementById('restartBtn');
if (restartBtn) {
    restartBtn.addEventListener('click', function() {
        console.log('🔄 Reiniciando juego...');
        localStorage.removeItem('cyberPoints');
        localStorage.removeItem('cyberPoints_puntos');
        localStorage.removeItem('cyberPoints_rango');
        localStorage.removeItem('cyberPoints_misiones');
        localStorage.removeItem('cibermind_puntos');
        localStorage.removeItem('cibermind_rango');
        localStorage.removeItem('cibermind_misiones');
        localStorage.removeItem('cibermind_actualizar');
        localStorage.removeItem('cibermind_timestamp');
        sessionStorage.removeItem('cibermind_datos');
        window.name = '';
        console.log('✅ Datos eliminados');
        window.location.href = 'index.html';
    });
}

console.log('📄 fin.js cargado correctamente');
console.log('💡 Usa el botón "Volver al Portal" para regresar con los puntos');
