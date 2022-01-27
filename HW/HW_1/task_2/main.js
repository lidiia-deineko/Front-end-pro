let nameRequest = 'Введите переменную';
let statusVar = 'переменная четная';
let varA = +prompt(`${nameRequest} a: `);
let varB = +prompt(`${nameRequest} b: `);
let varC = +prompt(`${nameRequest} c: `);

let sumVar = varA+varB+varC;
document.write(`Сумма переменных - ${sumVar}<br>`);

if(varA%2 == 0){
    document.write(`a - ${statusVar}<br>`);
}
if(varB%2 == 0){
    document.write(`b - ${statusVar}<br>`);
}
if(varC%2 == 0){
    document.write(`c - ${statusVar}<br>`);
}

