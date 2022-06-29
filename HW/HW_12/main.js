/*Создать вертикальное или горизонтальное (в зависимости от свойства type) меню, в котором будут элементы из свойства items.
Inner items - выпадающее меню при наведении мышки.
[OPTIONAL] handler - хранит название функции, которая выполнится при нажатии на пункт меню. */

window.addEventListener('load', () => {

   const data = { 
      name: 'menu', 
      type: 'column', 
      items: [
         {
            title: 'title 1',
            handler: 'ActionAdd'
         },
         {
            title: 'title 2',
            handler: 'ActionSaveAs',
            items: [
               { title: 'inner 1' },
               { title: 'inner 2' }
            ]
         },
         {
            title: 'title 3',
            handler: 'ActionExit'
         }
      ]
   }

   class Actions{
      static ActionAdd(){
         console.log('ActionAdd')
      }

      static ActionSaveAs(){
         console.log('ActionSaveAs')
      }

      static ActionExit(){
         console.log('ActionExit')
      }
   }

   class MenuRenderer{
      constructor(parentTarget, list, type){
            this.renderDeepList(parentTarget, list, type);
            this.initEvents(parentTarget, list);
      }

      createLiElem(target, item){
         const li = document.createElement('li');
         const a = document.createElement('a');
         li.classList.add('menu-item');
         a.classList.add('menu-link');
         a.href = "#";
         a.dataset.handler = item.handler;
         a.innerHTML = item.title;
         li.append(a);
         target.append(li);
      }

      renderDeepList(target, sourse, typeMenu){
         const ul = document.createElement('ul');

         sourse.forEach((elem) => {
            this.createLiElem(ul, elem);
         });

         const arrLi = ul.querySelectorAll('.menu-item');

         sourse.forEach((elem, index) => {
            if('items' in elem){
               this.renderDeepList(arrLi[index], elem.items);

               const ulSubmenu = ul.querySelectorAll('ul')
               ulSubmenu.forEach(elem => {
                  elem.classList.add('submenu');
                  if(typeMenu === 'column'){
                     elem.classList.add('submenu-column');
                     ul.classList.add('menu-column');
                  }
               })
            }
         })

         target.append(ul);
      }

      initEvents(target){
         const arrItem = nav.querySelectorAll('.menu-item');
         const arrLink = nav.querySelectorAll('.menu-link');
      
         arrItem.forEach((item, index) => {
            item.addEventListener('mouseover', () => {
               arrLink[index].style.backgroundColor = 'pink';
               if(item.children.length === 2){
                  item.children[1].classList.add('show');
              }
            });

            item.addEventListener('mouseout', () => {
               arrLink[index].style.backgroundColor = '#ccc';
               if(item.children.length === 2){
                  item.children[1].classList.remove('show');
                 }
            });

         });

         target.addEventListener('click', (event) => {
            const handler = event.target.dataset.handler

            if(!Actions[handler]){
               return console.log('No handler for this item!')
            }

            Actions[handler]()
         })

      }

   }

      const nav = document.querySelector('.nav');
      const myMenu = new MenuRenderer(nav, data.items, data.type);
})


