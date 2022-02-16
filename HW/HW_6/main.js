/* Реализовать функцию copy(list) по копированию массива.Предусмотреть возможность передачи вторым аргументом функции. 
При копировании массива - функция применится к каждому элементу копируемого массива. 
newL = copy(list, function(value){ return value*10; })*/

var arr = [1,3,5,7,9,11];

function changeArr(value){
    return value*10
}

function copy(list, changeFunc){
    var copyList = [];
    if(arguments[1] == undefined){
        for(i=0; i<list.length; i++){
            copyList[i] = list[i];
        }
    }else{
        for(i=0; i<list.length; i++){
            copyList[i] = changeFunc(list[i])
        }
    }
    return copyList
}

var newList = copy(arr, changeArr);
console.log(newList); 


