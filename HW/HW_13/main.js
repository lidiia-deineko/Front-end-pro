/*Написать скрипт который в title страницы (document.title) будет выводить текущее время и количество секунд которое прошло 
после открытия страниџы.
Сгенерировать при помощи JS элемент div с двумя span, где выводится тоже самое время, что и в title в разные span соответственно*/

window.onload = function(){
   let currentSec = 0;

   const div = document.createElement('div')
   
   let amountOfSecs = function(){
      let currentDate = new Date();
      let currentHours = currentDate.getHours();
      let currentMins = currentDate.getMinutes();
      let currentSecs = currentDate.getSeconds();
   
      function modifyTime(number){
         if(number<10){
            number = '0' + number;
         }
         return number;
      }
   
      let currentTime = `${currentHours}:${modifyTime(currentMins)}:${modifyTime(currentSecs)}`;

      currentSec++;

      document.title = `${currentTime}, ${currentSec}`;

      div.innerHTML = `<span>${currentTime}</span>, <span>${currentSec}</span>`; 
      
   }

   document.body.append(div);
   
   amountOfSecs();
   setInterval(amountOfSecs, 1000);
}

   

