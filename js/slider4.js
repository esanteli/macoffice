// Slider 4 (duplicado)
let slider4 = document.querySelector('#slider4 .list');
let items4 = document.querySelectorAll('#slider4 .list .item');
let next4 = document.getElementById('next4');
let prev4 = document.getElementById('prev4');
let dots4 = document.querySelectorAll('#slider4 .dots4 li');

let lengthItems4 = items4.length - 1;
let active4 = 0;

// Función de navegación hacia adelante
next4.onclick = function() {
    active4 = (active4 + 1) > lengthItems4 ? 0 : active4 + 1;
    reloadSlider4();
};

// Función de navegación hacia atrás
prev4.onclick = function() {
    active4 = (active4 - 1) < 0 ? lengthItems4 : active4 - 1;
    reloadSlider4();
};

// Intervalo automático
let refreshInterval4 = setInterval(() => { next4.click() }, 15000);

// Función de recarga del slider
function reloadSlider4() {
    // Desplazar el slider usando translateX
    slider4.style.transform = 'translateX(' + (-items4[active4].offsetLeft) + 'px)';
    
    // Actualizar los puntos activos
    let lastActiveDot4 = document.querySelector('#slider4 .dots4 li.active');
    if (lastActiveDot4) {
        lastActiveDot4.classList.remove('active');
    }
    dots4[active4].classList.add('active');

    // Resetear el intervalo de auto-reproducción
    clearInterval(refreshInterval4);
    refreshInterval4 = setInterval(() => { next4.click() }, 15000);
}

// Función de navegación por puntos
dots4.forEach((li, key) => {
    li.addEventListener('click', () => {
        active4 = key;
        reloadSlider4();
    });
});