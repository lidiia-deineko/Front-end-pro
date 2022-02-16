/* Написать функцию `compress(list)`, которая сжимает серии массива, состоящего из единиц и нулей по следующему принципу:
например, массив [0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,0,1] преобразуется в [4,7,2,4,1,1]*/

var arr = [0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,0,1];

function compress(list){

    var count = 1;
    for(i=0; i<list.length; i++){
        if(list[i] == list[i+1]){
            count=count+1
        }else{
            list.splice(i+1-count, count, count);
             i = i+1-count
             count = 1
        }
    }

    return list
}

var result = compress(arr)

console.log(result)

