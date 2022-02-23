/* В объекте data существует метод addRecord, который аргументами получает любой набор объектов. 
Метод addRecord добавляет все свойства переданных объектов в data.*/

function addRecordFunc(){
    for(i=0; i<arguments.length; i++){
        for(var key in arguments[i]){
            this[key] = arguments[i][key]
        }    
    }
}

data = {
    addRecord: addRecordFunc,
    p: 600,
    str: 'hello',
    y: -50
}

data.addRecord({x: 10}, {y: 20}, {z: 30, x: 50});

console.log(data.x) 
console.log(data.y) 
console.log(data.z) 
console.log(data.p) 
console.log(data.str) 
