let radius = +prompt('Введите радиус цилиндра: ');
let height = +prompt('Введите высоту цилиндра: ');

let result = Math.PI * radius**2 * height;

document.write('**************<br>');

document.write(`Обьем цилиндра с площадью основы *${Math.PI * radius*radius}*, радиусом *${radius}* и высотой *${height}* равен:<br>`);

document.write('--------------------<br>');

document.write(`V = ${result}.<br>`);

document.write('--------------------<br>');

document.write('end.');







