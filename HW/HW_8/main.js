/*Написать функцию getMaxs(args), где args - любое количество массивов.
Функция должна вернуть максимальные чисельные значения всех переданных массивов 
в виде строки, через разделитель `,`*/


let arr1 = [1, 2, 'string', 356]
let arr2 = [5, 67, '111', 7]
let arr3 = [111, 21, 31, 41]


function getMAxs(){
    let max;
    let arrMaxValue = [];
    
    for(i=0; i<arguments.length; i++){
        for(j=0; j< arguments[i].length; j++){
            if (!isNaN(arguments[i][j]) && typeof(arguments[i][j]) != 'string'){
                max = arguments[i][j]
            }
        }

        for(j=0; j< arguments[i].length; j++){
            if(!isNaN(arguments[i][j]) && typeof(arguments[i][j]) != 'string' && arguments[i][j]>max){
                max = arguments[i][j]
            }
        }
        
        arrMaxValue[i] = max
    }

    let strMaxValue = arrMaxValue.join(', ')
    return strMaxValue
}

console.log(getMAxs(arr3, arr2, arr1))