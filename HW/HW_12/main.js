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
            id: 'a1'
         },
         {
            title: 'title 2',
            id: 'a2',
            items: [
               {title: 'inner 1',
               items: [
                  {title: 'inner 1'},
                  {title: 'inner 2'}
               ]},
               {title: 'inner 2'}
            ]
         },
         {
            title: 'title 3',
            id: 'a3'
         }
      ]
   }

   const menuHandlers = {
      a1: () => {console.log('ActionAdd')},
      a2: () => {console.log('ActionSaveAs')},
      a3: () => {console.log('ActionExit')}
   }

   class MenuRenderer{
      constructor(parentTarget, list, type, handlers){
            this.handlers = handlers;
            this.renderDeepList(parentTarget, list, type);
            this.initEvents();
      }


      createLiElem(target, item){
         const li = document.createElement('li');
         const a = document.createElement('a');
         li.classList.add('menu-item');
         li.dataset.id = item.id;
         a.classList.add('menu-link');
         a.href = "#";
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


      initEvents(){
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

            item.addEventListener('click', (event) => {
               event.stopPropagation();
               const id = item.dataset.id;

               if(!this.handlers[id]){
                  console.warn('No hundlers!');
               } else{
                  this.handlers[id]();

               }
            });
         });

      }

   }

      const nav = document.querySelector('.nav');
      
      const myMenu = new MenuRenderer(nav, data.items, data.type, menuHandlers);
   
})

