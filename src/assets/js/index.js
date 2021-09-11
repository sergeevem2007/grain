import 'jquery';
import 'pagepiling.js';
import Parallax from 'parallax-js';


// постраничный скролл
$('#fullpage').fullpage({
  autoScrolling:true,
  css3: false
});

// параллакс эффект для гречки

var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene, {
  relativeInput: true
});

//модальное окно
const burger = document.querySelector('.burger');
const modal = document.querySelector('.modal');

burger.addEventListener('click', (event) => {
  event.preventDefault();
  if (modal.classList.contains('visible')) {
    modal.classList.remove('visible');
    burger.querySelector('input').checked = '';
  } else {
    modal.classList.add('visible');
    burger.querySelector('input').checked = 'check';
  }
});

//якорные ссылки
const anchors = document.querySelectorAll('a');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href')
    
    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

