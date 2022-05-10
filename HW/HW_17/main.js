/* Создаем 2 блока, у каждого блока есть кнопка Click и счетчик counter(в виде числа).
При нажатии на Click - counter увеличивается. При перезагрузке страницы counter должен сохраняться.
Создать кнопку ClearCounters()
Создать кнопку setCounter(), который запрашивает id блока и устанавливает значение( в типе number ) в counter.
При увеличении counter-а: каждое значение до 50 должно окрашивать соответствующий блок в случайно сгенерированный 
цвет. 
Цвета генерируются при изменении counter-a и сохраняются в Storage. Когда значение доходит
до 50 - применяется цвет по умолчанию. 'this.style.backgroundColor = "rgb(x, y, z)";' -> x = getRand(256)
y = getRand(256) z = getRand(256)*/

window.addEventListener('load', () =>{

   if(!localStorage.indicator){                          
      localStorage.indicator = JSON.stringify({
         counter_1: 0,
         counter_2: 0
      })
   }

   if(!localStorage.bgColors){
      localStorage.bgColors = JSON.stringify({
         bgColor_1: '#fff',
         bgCcolor_2: '#fff'
      })
   }

   const indicatorParsed = JSON.parse(localStorage.indicator);   
   const keysIndicatorParsed = Object.keys(indicatorParsed);
   const valuesIndicatorParsed = Object.values(indicatorParsed);

   const bgColorsParded = JSON.parse(localStorage.bgColors);
   const keysBGColorsParded = Object.keys(bgColorsParded);
   const valuesBGColorsParded = Object.values(bgColorsParded);
   
   const arrCounters = document.querySelectorAll('.counter');
   const arrClickers = document.querySelectorAll('.clicker');
   const arrBlock = document.querySelectorAll('.block');
   const clearBtn = document.querySelector('.clear-counters');
   const setCounterBtns = document.querySelectorAll('.set-counter');


    
   arrCounters.forEach((item, index) => {
      item.innerHTML = valuesIndicatorParsed[index];
      arrBlock[index].style.backgroundColor =  valuesBGColorsParded[index];
   })

   //функция, которая генерирует числa для rgb
   function getColor(){
      return Math.floor(Math.random()*256);
   }

   //функция, которая сохроняет изменное значение counters в localStorage
   function changeClicker(objParsed, key, value, elemDOM){
      objParsed[key] = value;
      elemDOM.innerHTML =  value;
      localStorage.indicator = JSON.stringify(objParsed);
   }

   //функция, которая сохроняет измененный цвет bgColors в localStorage
   function changeColor(objParsed, key, value, elemDOM){
      objParsed[key] = value;
      elemDOM.style.backgroundColor =  value;
      localStorage.bgColors = JSON.stringify(objParsed);
   }

   arrClickers.forEach((elem, index) => {
      elem.addEventListener('click', () => {
         
         valuesIndicatorParsed[index]++;
         changeClicker(indicatorParsed, keysIndicatorParsed[index], valuesIndicatorParsed[index], arrCounters[index]);

         if(valuesIndicatorParsed[index] >= 50){
            valuesBGColorsParded[index] = 'red';
            changeColor(bgColorsParded, keysBGColorsParded[index], valuesBGColorsParded[index], arrBlock[index]);
         } else{
            valuesBGColorsParded[index] = `rgb(${getColor()}, ${getColor()}, ${getColor()})`;
            changeColor(bgColorsParded, keysBGColorsParded[index], valuesBGColorsParded[index], arrBlock[index]);
         }         
      })
   })


   clearBtn.addEventListener('click', () => {

      keysIndicatorParsed.forEach((key, index) => {
         valuesIndicatorParsed[index] = 0;
         changeClicker(indicatorParsed, key, valuesIndicatorParsed[index], arrCounters[index]);

         valuesBGColorsParded[index] = '#fff';
         changeColor(bgColorsParded, keysBGColorsParded[index], valuesBGColorsParded[index], arrBlock[index])
      })

   })


   setCounterBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {

         let id;
         do{
            id = +prompt('Введите id: ')
         } while (isNaN(id));

         valuesIndicatorParsed[index] = id

         if(id >= 50){
            valuesBGColorsParded[index] = 'red';
            changeColor(bgColorsParded, keysBGColorsParded[index], valuesBGColorsParded[index], arrBlock[index]);

         } else{
            valuesBGColorsParded[index] = `rgb(${getColor()}, ${getColor()}, ${getColor()})`;
            changeColor(bgColorsParded, keysBGColorsParded[index], valuesBGColorsParded[index], arrBlock[index]);
         }         
         
         changeClicker(indicatorParsed, keysIndicatorParsed[index], valuesIndicatorParsed[index], arrCounters[index])
         
      })
   })

})


