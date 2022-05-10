/*Реализовать калькулятор, в котором есть слайдер (`input type=”range”`) и поле ввода (`input type=”number”`).
Изменяя состояние `range` меняется состояние поля ввода `number`. И наоборот.
Реализовать блок-диаграмму, который в пикселях будет отображать значение range.
Например - range выбрали число 83, высота блока-диаграммы будет 83 пикселя.
Красный блок - количество комиссии. Комиссия вычисляется по формуле:
    (range < 20) -> 2%
    (20 - 50)  -> 4%
    (50 - 75)  -> 6%
    (75 - 100)  -> 8%
Красный блок отображает количество комиссии. Например Значение выбора 100, комиссия будет 8%. Результирующая сумма: 108. 
Высота красного блока - 8px  */

window.addEventListener('load', () => {

      let inputRange = document.querySelector('.input-range');
      let inputNum = document.querySelector('.input-num');
      let blockRed = document.querySelector('.block-red');
      let blockGreen = document.querySelector('.block-green');

   function changeValue(currentInput, relatedInput, typeEvent){
      currentInput.addEventListener(typeEvent, () => {
         currentValue = currentInput.value;
         relatedInput.value = currentValue;
         
         let commissionValue = 0;
         if(currentValue < 20){
            commissionValue = currentValue * 0.02;
         } else if(currentValue >= 20 && currentValue < 50){
            commissionValue = currentValue * 0.04;
         }else if(currentValue >= 50 && currentValue < 75){
            commissionValue = currentValue * 0.06;
         }else if(currentValue >= 75 && currentValue <= 100){
            commissionValue = currentValue * 0.08;
         }
   
         blockGreen.style.height = `${currentValue}px`;
         blockRed.style.height = `${commissionValue}px`;
      })
   }

   changeValue(inputRange, inputNum, 'input');
   changeValue(inputNum, inputRange, 'change');
})

