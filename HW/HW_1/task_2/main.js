let varA = +prompt('Введите переменную a: ');
let varB = +prompt('Введите переменную b: ');
let varC = +prompt('Введите переменную c: ');

let sumVar = varA+varB+varC;
document.write(`Сумма переменных - ${sumVar}<br>`);

if(varA%2 == 0){
    document.write('Переменная а - четная.<br>')
}

if(varB%2 == 0){
    document.write('Переменная b - четная.<br>')
}

if(varC%2 == 0){
    document.write('Переменная c - четная.')
}