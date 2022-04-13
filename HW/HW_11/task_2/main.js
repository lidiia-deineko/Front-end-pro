/*Написать скрипт, который можно выполнить на любой странице в консоли. Скрипт делает следующие действие - убирает значения color, 
background-color, width, height у всех тэгов на странице, исключая html, head, body. Прочтение ссылок в домашней работе обязательны.*/

window.onload = function(){
    let allElems = document.querySelectorAll('*');

    function removeValues(arr){
        arr.forEach(elem => {
            if(elem.localName != 'html' && elem.localName != 'head' && elem.localName != 'body'){
                elem.style.cssText = `background-color: inherit;
                                      color: inherit;
                                      width: inherit;
                                      height: inherit;`
            }
        })
    }

    removeValues(allElems);

}

