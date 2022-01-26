let radius = +prompt('Введите радиус цилиндра: ');
let height = +prompt('Введите высоту цилиндра: ');


let result = Math.PI * radius**2 * height;
document.writeln('**************<br>');

document.writeln(`Обьем цилиндра с площадью основы *${Math.PI * radius*radius}*, радиусом *${radius}* и высотой *${height}* равен:<br>`);

document.writeln('--------------------<br>');

document.writeln(`V = ${result}.<br>`);

document.writeln('--------------------<br>');

document.writeln('end.');
