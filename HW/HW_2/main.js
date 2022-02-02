/*1. Ввести с клавиатуры 2 числа `a` и `b` (где `a <<< b`. Символ "<<<" - означает "сильно меньше" ). 
Запустить цикл перебора от `a` до `b`. Вывести в консоль квадраты чётных чисел.*/

let a = +prompt('Введите число а:');
let b;
let isSmaller = false;

do{
    b = +prompt('Введите число b:')
    if(a<b){
        isSmaller = true
    } else {
        isSmaller = false
    }
}while(!isSmaller);

for(i=a; i<=b; i++){
    if(i%2 == 0){
        console.log(Math.pow(i,2));
    }
}

//_________________________________________________________________________________________________


// 2. Заставить пользователя ввести с клавиатуры число (не строку и не NaN).

let userNumber;
do{
    userNumber = +prompt('Введите с клавиатуры число:')
} while (isNaN(userNumber));

//_________________________________________________________________________________________________

//3. Проверить число на простоту. Число вводить с клавиатуры.

let primeNumber = +prompt('Введите простое число:');
let isPrimeNumber = true;

for (let i = 2; i < primeNumber; i++) {
	if (primeNumber%i == 0) {
		isPrimeNumber = false;
		break; 
	}
}

if(isPrimeNumber){
    document.write('Число простое');
}else{
    document.write('Число не простое');
}


//_________________________________________________________________________________________________

//4. Посчитать сумму простых чисел от 0 до 250.
let res = 0;
let isPrimeNum;

for ( i = 2; i <= 250; i++){
    isPrimeNum = true;
    for(j=2; j < i; j++){
        if(i%j === 0){
            isPrimeNum = false;
        }
    }
    if(isPrimeNum){
        res = res + i;
    }
}

console.log(res);