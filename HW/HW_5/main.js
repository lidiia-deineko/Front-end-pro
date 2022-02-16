/*Написать функцию, которая примет как аргументы(параметры) два массива и сравнит суммы всех ЧИСЛОВЫХ элементов.

Тот массив, сумма которого большая - должен вернутся функцией. */


var arrFirst = [1, 10, 'string', 40, '5'];
var arrSecond = [6, 8, 4, 'second'];

function compareSumArr(arr1, arr2){
    var sumArr1 = 0;
    var sumArr2 = 0;
    
    for(i=0; i<arr1.length; i++){
        if(!isNaN(arr1[i]) && typeof(arr1[i]) != 'string'){
            sumArr1 = sumArr1 + arr1[i]
        }
    }

    for(i=0; i<arr2.length; i++){
        if(!isNaN(arr2[i]) && typeof(arr2[i]) != 'string'){
            sumArr2 = sumArr2 + arr2[i]
        }
    }

    if(sumArr1 > sumArr2){
        return arr1
    } else{
        return arr2
    }
}

var largerArr = compareSumArr(arrFirst, arrSecond);

console.log(largerArr);

