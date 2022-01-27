let radius = +prompt('Введите радиус цилиндра: ');
let height = +prompt('Введите высоту цилиндра: ');

let line = '--------------------';
let areaCylinder = Math.PI * radius**2;
let volumeCylinder = areaCylinder * height;

document.write(`**************<br>
    Обьем цилиндра с площадью основы *${areaCylinder}*, радиусом *${radius}* и высотой *${height}* равен:<br>
    ${line}<br>
    V = ${volumeCylinder}.<br>
    ${line}<br>
    end.`);
    

                                                                                         