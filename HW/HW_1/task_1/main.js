let radius = +prompt('Введите радиус цилиндра: ');
let height = +prompt('Введите высоту цилиндра: ');

let line = '--------------------';
let areaCylinder = Math.PI * radius**2;
let volumeCylinder = areaCylinder * height;

document.write('**************<br>');

document.write(`Обьем цилиндра с площадью основы *${areaCylinder}*, радиусом *${radius}* и высотой *${height}* равен:<br>`);

document.write(`${line}<br>`);

document.write(`V = ${result}.<br>`);

document.write(`${line}<br>`);

document.write('end.');







