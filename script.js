// ================================================================
// CONFIGURACIÓN INICIAL
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================================
    // 0. FUNCIÓN PARA CARGAR ESTADÍSTICAS (siempre desde localStorage)
    // ============================================================
    
    function cargarEstadisticas() {
        const puntos = localStorage.getItem('cibermind_puntos') || '0';
        const rango = localStorage.getItem('cibermind_rango') || 'Agente Novato';
        const misiones = localStorage.getItem('cibermind_misiones') || '0';
        
        const puntosElement = document.getElementById('puntosTotales');
        const rangoElement = document.getElementById('rangoActual');
        const misionesElement = document.getElementById('misionesCompletadas');
        
        if (puntosElement) puntosElement.textContent = puntos;
        if (rangoElement) rangoElement.textContent = rango;
        if (misionesElement) misionesElement.textContent = misiones;
        
        console.log(`📊 Estadísticas cargadas: ${puntos} pts, ${rango}, ${misiones} misiones`);
        return { puntos, rango, misiones };
    }

    // ============================================================
    // 0.1 FUNCIÓN PARA LEER PARÁMETROS DE URL (y guardar en localStorage)
    // ============================================================
    
    function leerParametrosURL() {
        const params = new URLSearchParams(window.location.search);
        const puntos = params.get('puntos');
        const rango = params.get('rango');
        const misiones = params.get('misiones');
        
        if (puntos !== null && puntos !== '') {
            console.log('📦 Datos recibidos por URL:', { puntos, rango, misiones });
            // Guardar en localStorage
            localStorage.setItem('cibermind_puntos', puntos);
            localStorage.setItem('cibermind_rango', rango || 'Agente Novato');
            localStorage.setItem('cibermind_misiones', misiones || '0');
            localStorage.setItem('cibermind_actualizar', 'true');
            localStorage.setItem('cibermind_timestamp', Date.now().toString());
            // Limpiar URL (para que no se vean los parámetros)
            history.replaceState({}, document.title, window.location.pathname);
            return true;
        }
        return false;
    }

    // ============================================================
    // 1. NAVEGACIÓN ENTRE SECCIONES
    // ============================================================
    
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    function cambiarSeccion(idSeccion) {
        sections.forEach(sec => sec.classList.remove('active-section'));
        
        const seccionActiva = document.getElementById(idSeccion);
        if (seccionActiva) {
            seccionActiva.classList.add('active-section');
        }
        
        navLinks.forEach(link => link.classList.remove('active'));
        const linkActivo = document.querySelector(`.nav-link[data-section="${idSeccion}"]`);
        if (linkActivo) {
            linkActivo.classList.add('active');
        }
        
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const seccionId = this.getAttribute('data-section');
            cambiarSeccion(seccionId);
            history.pushState(null, '', `#${seccionId}`);
        });
    });
    
    // ============================================================
    // 2. MENÚ HAMBURGUESA
    // ============================================================
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // ============================================================
    // 3. EFECTO DE ESCRITURA (Typing)
    // ============================================================
    
    const typingElement = document.getElementById('typingText');
    if (typingElement) {
        const frases = [
            'Protegiendo a la nueva generación digital',
            'Tu escudo contra los ciberataques',
            'Agentes digitales en acción',
            'Seguridad digital para jóvenes'
        ];
        
        let fraseIndex = 0;
        let caracterIndex = 0;
        let isDeleting = false;
        
        function escribirEfecto() {
            const fraseActual = frases[fraseIndex];
            
            if (isDeleting) {
                caracterIndex--;
                typingElement.textContent = fraseActual.substring(0, caracterIndex);
            } else {
                caracterIndex++;
                typingElement.textContent = fraseActual.substring(0, caracterIndex);
            }
            
            let velocidad = isDeleting ? 50 : 100;
            
            if (!isDeleting && caracterIndex === fraseActual.length) {
                velocidad = 2000;
                isDeleting = true;
            }
            
            if (isDeleting && caracterIndex === 0) {
                isDeleting = false;
                fraseIndex = (fraseIndex + 1) % frases.length;
                velocidad = 500;
            }
            
            setTimeout(escribirEfecto, velocidad);
        }
        
        setTimeout(escribirEfecto, 1000);
    }
    
    // ============================================================
    // 4. CHECKLIST INTERACTIVO
    // ============================================================
    
    function actualizarProgresoChecklist() {
        const checkboxes = document.querySelectorAll('.checklist-checkbox');
        const total = checkboxes.length;
        let completados = 0;
        
        checkboxes.forEach(cb => {
            if (cb.checked) completados++;
        });
        
        const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0;
        
        const porcentajeElement = document.getElementById('progresoProteccion');
        const fillElement = document.getElementById('progressFill');
        
        if (porcentajeElement) {
            porcentajeElement.textContent = `${porcentaje}%`;
        }
        
        if (fillElement) {
            fillElement.style.width = `${porcentaje}%`;
        }
    }
    
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', actualizarProgresoChecklist);
    });
    
    // ============================================================
    // 5. BOTÓN PARA IR AL JUEGO
    // ============================================================
    
    const btnIrJuego = document.getElementById('btnIrAJuego');
    if (btnIrJuego) {
        btnIrJuego.addEventListener('click', function(e) {
            e.preventDefault();
            cambiarSeccion('juego');
        });
    }
    
    // ============================================================
    // 6. MANEJAR EL HISTORIAL DE NAVEGACIÓN
    // ============================================================
    
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const seccionValida = document.getElementById(hash);
            if (seccionValida) {
                cambiarSeccion(hash);
            }
        } else {
            cambiarSeccion('mision');
        }
    });
    
    // ============================================================
    // 7. CARGAR LA SECCIÓN SEGÚN LA URL
    // ============================================================
    
    const hashInicial = window.location.hash.replace('#', '');
    if (hashInicial && document.getElementById(hashInicial)) {
        cambiarSeccion(hashInicial);
    } else {
        cambiarSeccion('mision');
    }
    
    // ============================================================
    // 8. EJECUTAR CARGA DE ESTADÍSTICAS Y ACTUALIZACIÓN
    // ============================================================
    
    // PASO 1: Leer parámetros de URL (si llegaron desde fin.html)
    if (leerParametrosURL()) {
        console.log('✅ Datos cargados desde URL');
    }
    
    // PASO 2: Cargar estadísticas desde localStorage (siempre)
    cargarEstadisticas();
    
    // PASO 3: Forzar una recarga de estadísticas después de un breve retraso
    // (por si los parámetros de URL se escribieron en localStorage después de la carga)
    setTimeout(function() {
        cargarEstadisticas();
        // Además, si no hay datos, intentar buscar en sessionStorage (por si acaso)
        try {
            const datosSession = sessionStorage.getItem('cibermind_datos');
            if (datosSession) {
                const datos = JSON.parse(datosSession);
                if (datos.puntos && datos.puntos > 0) {
                    localStorage.setItem('cibermind_puntos', datos.puntos.toString());
                    localStorage.setItem('cibermind_rango', datos.rango || 'Agente Novato');
                    localStorage.setItem('cibermind_misiones', (datos.misiones || 0).toString());
                    sessionStorage.removeItem('cibermind_datos');
                    cargarEstadisticas();
                    console.log('✅ Datos recuperados de sessionStorage');
                }
            }
        } catch(e) {}
    }, 300);
    
    // Cuando la página obtiene foco, recargar estadísticas
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            console.log('👁️ Página visible nuevamente, recargando estadísticas...');
            cargarEstadisticas();
        }
    });
    
    // ============================================================
    // 9. FUNCIÓN GLOBAL PARA ACTUALIZAR PUNTOS DESDE EL JUEGO
    // ============================================================
    
    window.actualizarPuntosCiberMind = function(puntosGanados) {
        const puntosActuales = parseInt(localStorage.getItem('cibermind_puntos') || '0');
        const nuevosPuntos = puntosActuales + puntosGanados;
        localStorage.setItem('cibermind_puntos', nuevosPuntos.toString());
        
        let nuevoRango = 'Agente Novato';
        if (nuevosPuntos >= 100) nuevoRango = 'CiberPatrulla';
        if (nuevosPuntos >= 250) nuevoRango = 'Guardian Digital';
        if (nuevosPuntos >= 500) nuevoRango = 'CiberLegendario';
        localStorage.setItem('cibermind_rango', nuevoRango);
        
        const misionesActuales = parseInt(localStorage.getItem('cibermind_misiones') || '0');
        localStorage.setItem('cibermind_misiones', (misionesActuales + 1).toString());
        
        cargarEstadisticas();
        console.log(`✅ Puntos actualizados: ${nuevosPuntos} pts, ${nuevoRango}`);
    };
    
    console.log('🛡️ Safe Space cargado correctamente!');
    console.log('📌 Para actualizar puntos desde tu juego, usa:');
    console.log('   window.actualizarPuntosCiberMind(cantidad)');

}); // FIN DEL DOMContentLoaded
