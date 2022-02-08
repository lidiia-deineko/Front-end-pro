/*1. Создать массив А размерностью n. Заполнить случайными числами любом диапазоне.
Например A = [23,1,2,52,5,34,23,6,246,436];
a) проверить все числа на простоту, и найденные простые числа сохранить в массив B.
b) найти максимальное число и минимальное число.*/

//Диапазон 50...320

let A = [];
let n = 12;
A.length = n;
let B = [];             

for(i=0; i<n; i++){
    A[i] = Math.floor(Math.random()*271)+50;
    let isPrimeNumber = true;
    let num = A[i];
    
    if(num < 2){
        continue;
    }

    for(j=2; j<num; j++){
        if(num % j == 0){
            isPrimeNumber = false;
            break;
        }
    }

    if(isPrimeNumber){
        B.push(num);
    }
}      

let maxNumberA = A[0];
let minNumberA = A[0];

for(i=1; i<n; i++){                                     
    if (A[i] > maxNumberA){
        maxNumberA = A[i];
    }
    if(A[i] < minNumberA){
        minNumberA = A[i];
    }
}

let maxNumberB = B[0];
let minNumberB = B[0];

for(i=1; i<B.length; i++){
    if (B[i] > maxNumberB){
        maxNumberB = B[i];
    }
    if(B[i] < minNumberB){
        minNumberB = B[i];
    }
}

console.log(A, B);
console.log('Максимальное число массива А: ' + maxNumberA);
console.log('Минимальное число массива А: ' + minNumberA);
console.log('Максимальное число массива B: ' + maxNumberB);
console.log('Минимальное число массива B: ' + minNumberB);

/*2.Перевернуть массив, т.е. если был массив 1, 5, 6, 2, 4 -- то мы должны получить 4, 2, 6, 5, 1. 
Нельзя использовать стандартный метод reverse(). Постарайтесь не использовать дополнительный массив. 
Оригинальный массив А сохранять не нужно (т.е. он должен перевернуться).*/

let arr = [1,5,6,2,4];

let arrLength = arr.length;

for(i=0; i<arrLength/2; i++){            // 3 итерации
    let varArr = arr[i];
    arr[i] = arr[arrLength-1-i];
    arr[arrLength-1-i] = varArr;
}

console.log(arr);


//3. Создать массивы А и В. Заполнить случайными числами. Найди все элементы которые повторяются в массивах А и B.

// 5...20

let A = [];
let B = [];
let n = 10;
A.length = n;
B.length = n;

for(i=0; i<n; i++){
     A[i] = Math.floor(Math.random()*21)+5;
     B[i] = Math.floor(Math.random()*21)+5;

     for(j=0; j<n; j++){
        if(A[i] == B[j]){
          console.log(A[i]);
        }
    }
}

console.log(A,B)

/*4.В одномерном массиве произвести такую замену: 1 элемент поменять с 2, 3 элемент поменять с 4, 
5 элемент поменять с 6 и тд. Если длинна массива непарная - последний элемент не трогать. 
Например: было 1 2 3 4 5 6, должно стать: 2 1 4 3 6 5*/


let arr = [1, 2, 3, 4, 5, 6 ];

for(i=0; i<arr.length-1; i = i+2){
    let varArr = arr[i];
    arr[i] =arr[i+1];
    arr[i+1] = varArr

}
console.log(arr)