/*В двумерном массив удалить столбцы где сумма элементов столбца < 0. 
Массив должен быть размером 10 на 10, заполненым случайными числам в диапазоне от -20 до +20*/


let n = 10;
let m = 10;

A = new Array(n);

for(i = 0; i < A.length; i++){
    A[i] = new Array(m);
  
    for(j = 0; j < A[i].length; j++){
        A[i][j] = Math.floor(Math.random()*41)-20;
        document.write(A[i][j] + '&nbsp;&nbsp')
    }
    document.write('<br />')
}

document.write('<br />')

let newLength = A.length;
for(i=0; i<newLength; i++){
    let sum = 0;
    for(row=0; row<A.length; row++){
        for(col=0; col<A[row].length; col++){
            if(col == i){
                sum = sum + A[row][col]
            }
        }
    }
    document.write('<b>'+sum + ' </b>')
    if(sum < 0){
        for(row=0; row<A.length; row++){
            for(col=0; col<A[row].length; col++){
                if(col == i){
                    A[row].splice(i,1)
                }
            }
        }
        i = i-1;
        newLength = newLength-1;
    }
}

document.write('<br />')

document.write('<br />')
for(row=0; row<A.length; row++){
    for(col=0; col<newLength; col++){
        document.write(A[row][col] + ' ')
    }
    document.write('<br />')
}


