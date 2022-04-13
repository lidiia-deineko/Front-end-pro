/*Есть 3 input. Выводить в textarea содержимое всех полей ввода через запятую. Использовать setInterval. 
(При вводе данных в input - они отображаются в textarea)*/

window.onload = function(){
    
let arrOfInputElem = document.querySelectorAll('.input-elem');
let textAreaElem = document.querySelector('.textarea-elem');

setInterval(() => {
    textAreaElem.value = '';
    let arrOfInputValues = []

    for(let i = 0; i < arrOfInputElem.length; i++){
        if(arrOfInputElem[i].value == ''){
            continue
        } else{
            arrOfInputValues.push(arrOfInputElem[i].value)
        }   
    }
    textAreaElem.value = arrOfInputValues.join(', ')
    console.log(arrOfInputValues)
}, 10000)

}