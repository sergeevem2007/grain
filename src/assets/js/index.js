import 'jquery';
import 'pagepiling.js';
import Parallax from 'parallax-js';
import noUiSlider from 'nouislider';
import 'wNumb';
import IMask from 'imask';




// постраничный скролл
if (window.innerWidth > 1190) {
  $('#fullpage').fullpage({
    autoScrolling:true,
    css3: false
  });
}


// параллакс эффект для гречки
var scene = document.getElementById('scene');
if (window.innerWidth > 1190) {
  var parallaxInstance = new Parallax(scene, {
    relativeInput: true
  });
}



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

//инпуты с ползунками
var rangePercent = document.getElementById('range__percent');


noUiSlider.create(rangePercent, {
    start: 76,
    step: 1,
    connect: 'lower',
    range: {
        'min': 0,
        'max': 100
    },
    format: wNumb({
      decimial: 0
    })
});

const percentValue = document.querySelector('.percent__value');

rangePercent.noUiSlider.on('update.one', function (values) {
  percentValue.innerHTML = `на все ${values}%`;
  if (values < 8) {
    return;
  } else if (values > 85) {
    return;
  } else {
    percentValue.style.left = `${values}%`; 
  }
});



var rangeCook = document.getElementById('range__cook');

noUiSlider.create(rangeCook, {
    start: [2, 30],
    step: 1,
    connect: true,
    range: {
        'min': 2,
        'max': 60
    },
    format: wNumb({
      decimial: 0
    })
});

const cookValue = document.querySelector('.cook__value');

rangeCook.noUiSlider.on('update.one', function (values) {
  let posLeft = -values[0] * 10 / 6;
  let posRight = values[1] * 10 / 6;
  let posCenter = (posRight - posLeft)/2;

  if (values[0] == values[1]) {
    cookValue.innerHTML = `${Math.round(values[0])} мин.`;
  } else {
    cookValue.innerHTML = `${Math.round(values[0])} — ${Math.round(values[1])} мин.`;
  }

  if (values[0] > 40 ) {
    return;
  } else if (values[1] < 15) {
    return;
  } else {
    cookValue.style.left = `${posCenter}%`;
  }

  
});


//валидация формы

var codes = ['904', '900', '901', '902', '903', '905', '906', '908', '909', '910', '911', '912', '913', '914', '915', '916', '917', '918', '919', '920', '921', '922', '923', '924', '925', '926', '927', '928', '929', '930', '931', '932', '933', '934', '936', '937', '938', '939', '950', '951', '952', '953', '958', '960', '961', '962', '963', '964', '965', '966', '967', '968', '969', '978', '980', '981', '982', '983', '984', '985', '986', '987', '988', '989', '991', '992', '994', '995', '996', '997', '999'];
function checkField(input) {
    var customValidity = '';
    if (input.value === '') {
        customValidity = 'Заполните поле';
    } else if (isInvalidRegion(input)) {
        customValidity = 'Введите корректный код региона';
    } else if (isInvalidPhoneNumber(input)) {
        customValidity = 'Введите корректный номер';
    }
    input.setCustomValidity(customValidity);
    return customValidity === '';
}
function isInvalidPhoneNumber(input) {
    var numbers = input.value.match(/\d+/g).join('');
    var length = numbers.length;
    if (length > 11)
        input.value = input.value.substring(0, input.value.length - 1);
    return numbers.length < 11;
}
function isInvalidRegion(input) {
    var code = input.value.match(/9\d{2}/);
    return code ? codes.indexOf(code[0]) == -1 : true;
}
function initValidation(selector='input[type=tel]') {
    var inputs = document.querySelectorAll(selector);
    inputs.forEach(function(input) {
        input.required = true;
        input.addEventListener('input', function() {
            checkField(input);
        });
        input.checkValidity = function() {
            return checkField(input);
        }
        checkField(input);
    });
}

initValidation();


//маска для телефона

var phone = document.getElementById('phone');
var maskOptions = {
  mask: '+ {7} (000) 000-00-00'
};
var mask = IMask(phone, maskOptions);


const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.innerHTML = `
    <h2 class="title__h2">Спасибо! <br> Мы вам перезвоним!</h2>
  `;
})