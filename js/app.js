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
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
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
    slider2.style.left = -items2[active2].offsetLeft + 'px';
    let lastActiveDot2 = document.querySelector('#slider2 .dots li.active');
    lastActiveDot2.classList.remove('active');
    dots2[active2].classList.add('active');

    clearInterval(refreshInterval2);
    refreshInterval2 = setInterval(() => { next2.click() }, 3000);
}
dots2.forEach((li, key) => {
    li.addEventListener('click', () => {
        active2 = key;
        reloadSlider2();
    });
});
window.onresize = function(event) {
    reloadSlider1();
    reloadSlider2();
};

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
    slider3.style.left = -items3[active3].offsetLeft + 'px';
    let lastActiveDot3 = document.querySelector('#slider3 .dots3 li.active');
    if (lastActiveDot3) {
        lastActiveDot3.classList.remove('active');
    }
    dots3[active3].classList.add('active');

    clearInterval(refreshInterval3);
    refreshInterval3 = setInterval(() => { next3.click() }, 3000);
}
dots3.forEach((li, key) => {
    li.addEventListener('click', () => {
        active3 = key;
        reloadSlider3();
    });
});

// Mantener los sliders independientes en resize
window.onresize = function(event) {
    reloadSlider1();
    reloadSlider2();
    reloadSlider3();
};


// animacion h4

document.addEventListener("DOMContentLoaded", function () {
    const targets = document.querySelectorAll("h4"); // Selecciona todos los <h4>
  
    function checkVisibility() {
      targets.forEach(target => {
        const rect = target.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          target.classList.add("visible"); // Aplica la clase "visible" para activar la animación
        }
      });
    }
  
    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Ejecuta la verificación al cargar la página
  });

  // animacion h5

document.addEventListener("DOMContentLoaded", function () {
    const targets = document.querySelectorAll("h5"); // Selecciona todos los <h4>
  
    function checkVisibility() {
      targets.forEach(target => {
        const rect = target.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          target.classList.add("visible"); // Aplica la clase "visible" para activar la animación
        }
      });
    }
  
    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Ejecuta la verificación al cargar la página
  });