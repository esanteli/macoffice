let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 5000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 5000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};


// Slider 2
let slider2 = document.querySelector('#slider2 .list');
let items2 = document.querySelectorAll('#slider2 .list .item2');
let next2 = document.getElementById('next2');
let prev2 = document.getElementById('prev2');
let dots2 = document.querySelectorAll('#slider2 .dots li');

let lengthItems2 = items2.length - 1;
let active2 = 0;
next2.onclick = function() {
    active2 = active2 + 1 <= lengthItems2 ? active2 + 1 : 0;
    reloadSlider2();
}
prev2.onclick = function() {
    active2 = active2 - 1 >= 0 ? active2 - 1 : lengthItems2;
    reloadSlider2();
}
let refreshInterval2 = setInterval(() => { next2.click() }, 3000);
function reloadSlider2() {
    const itemWidth = window.innerWidth <= 768 ? window.innerWidth : 600;
    slider2.style.transform = `translateX(-${active2 * itemWidth}px)`;
    slider2.style.left = '0';
    
    let lastActiveDot2 = document.querySelector('#slider2 .dots li.active');
    lastActiveDot2?.classList.remove('active');
    dots2[active2]?.classList.add('active');

    clearInterval(refreshInterval2);
    refreshInterval2 = setInterval(() => { next2.click() }, 3000);
}
dots2.forEach((li, key) => {
    li.addEventListener('click', () => {
        active2 = key;
        reloadSlider2();
    });
});
window.addEventListener('resize', () => {
    reloadSlider2();
});

// Slider 3 (duplicado)
let slider3 = document.querySelector('#slider3 .list');
let items3 = document.querySelectorAll('#slider3 .list .item');
let next3 = document.getElementById('next3');
let prev3 = document.getElementById('prev3');
let dots3 = document.querySelectorAll('#slider3 .dots3 li');

let lengthItems3 = items3.length - 1;
let active3 = 0;
next3.onclick = function() {
    active3 = active3 + 1 <= lengthItems3 ? active3 + 1 : 0;
    reloadSlider3();
}
prev3.onclick = function() {
    active3 = active3 - 1 >= 0 ? active3 - 1 : lengthItems3;
    reloadSlider3();
}
let refreshInterval3 = setInterval(() => { next3.click() }, 3000);
function reloadSlider3() {
    const itemWidth = window.innerWidth <= 768 ? window.innerWidth : 600;
    slider3.style.transform = `translateX(-${active3 * itemWidth}px)`;
    slider3.style.left = '0';
    
    let lastActiveDot3 = document.querySelector('#slider3 .dots3 li.active');
    lastActiveDot3?.classList.remove('active');
    dots3[active3]?.classList.add('active');

    clearInterval(refreshInterval3);
    refreshInterval3 = setInterval(() => { next3.click() }, 3000);
}
dots3.forEach((li, key) => {
    li.addEventListener('click', () => {
        active3 = key;
        reloadSlider3();
    });
});
window.addEventListener('resize', () => {
    reloadSlider3();
});

// Mantener los sliders independientes en resize
window.onresize = function(event) {
    reloadSlider1();
    reloadSlider2();
    reloadSlider3();

};


// animacion h4

document.addEventListener("DOMContentLoaded", function () {
    const targets = document.querySelectorAll("h4, h5"); // Incluye ambos selectores
  
    if (targets.length === 0) return; // Si no hay objetivos, no hagas nada
  
    function checkVisibility() {
      targets.forEach(target => {
        const rect = target.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          target.classList.add("visible");
        }
      });
    }
  
    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Ejecuta al cargar la página
  });
  
// Slider Text-Overlay

(function() {
    let slider = document.querySelector('.slider .list');
    let items = document.querySelectorAll('.slider .list .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let dots = document.querySelectorAll('.slider .dots li');

    // Textos que aparecerán en cada slide
    let slideTexts = [
        "Producción de eventos",
        "Innovación en Tecnologías de la Educación",
        "Diseño e Implementación de Stands",
        "Cartelería Digital"
    ];

    // Textos que aparecerán en los párrafos de cada slide
    let slideParagraphs = [
        "Te proponemos sentarnos a conversar de tu visión y nosotros desarrollaremos el resto.",
        "Implementamos salas de trabajo con tecnología de vanguardia y soluciones diseñadas especialmente para tus necesidades.",
        "Trabajamos en la implantación de los espacios combinando diseño y tecnología.",
        "Realizamos la imagen de tu empresa entregando una visión dinámica y permanente."
    ];

    let h2Text = document.querySelector('.text-overlay h2');
    let pText = document.querySelector('.text-overlay p');

    let lengthItems = items.length - 1;
    let active = 0;

    next.onclick = function() {
        active = active + 1 <= lengthItems ? active + 1 : 0;
        reloadSlider();
    }

    prev.onclick = function() {
        active = active - 1 >= 0 ? active - 1 : lengthItems;
        reloadSlider();
    }

    // Ajuste del intervalo a 5 segundos
    let refreshInterval = setInterval(() => { next.click() }, 5000);

    function reloadSlider() {
        slider.style.left = -items[active].offsetLeft + 'px';
        
        // Actualiza el texto en el h2 con el texto correspondiente al slide actual
        h2Text.textContent = slideTexts[active];
        
        // Actualiza el texto en el p con el texto correspondiente al slide actual
        pText.textContent = slideParagraphs[active];
        
        let last_active_dot = document.querySelector('.slider .dots li.active');
        last_active_dot.classList.remove('active');
        dots[active].classList.add('active');

        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => { next.click() }, 5000);
    }

    dots.forEach((li, key) => {
        li.addEventListener('click', () => {
            active = key;
            reloadSlider();
        });
    });

    window.onresize = function(event) {
        reloadSlider();
    };
})();
