window.addEventListener('load', () => {

   //Class Character
   class Character{
      
      constructor(element, width, height, color, startX, startY, step, h){
         this.element = element;
         this.width = width;
         this.height = height;
         this.createCharacter(color, startX, startY)

         this.initMoveLeftBinded = this.initMoveLeft.bind(this, step)
         document.addEventListener('keydown', this.initMoveLeftBinded);

         this.initMoveRightBinded = this.initMoveRight.bind(this, step)
         document.addEventListener('keydown', this.initMoveRightBinded);

         this.initMoveUpBinded = this.initMoveUp.bind(this, step)
         document.addEventListener('keydown', this.initMoveUpBinded);

         this.initMoveDownBinded = this.initMoveDown.bind(this, step)
         document.addEventListener('keydown', this.initMoveDownBinded);

         this.initJumpBinded = this.initJump.bind(this, h)
         document.addEventListener('keydown', this.initJumpBinded);

         this.initSitDownBinded = this.initSitDown.bind(this, h)
         document.addEventListener('keydown', this.initSitDownBinded);

         this.initSitUpBinded = this.initSitUp.bind(this, h)
         document.addEventListener('keyup', this.initSitUpBinded);

         this.jumpBinded = this.jump.bind(this, h);
      }

      isJumping = false;
      CSSAnimationDuration = 100;
      jumpDuration = 120;

      createCharacter(color, startX, startY){
         this.element.style.width = `${this.width}px`;
         this.element.style.height = `${this.height}px`;
         this.element.style.backgroundColor = color;
         this.element.style.position = 'absolute';
         this.element.style.top = `${startY}px`;
         this.element.style.left = `${startX}px`;
      }

      moveLeft(step){
         if(this.element.offsetLeft >= step){
            this.element.style.left = `${this.element.offsetLeft - step}px`;
         }
      }

      initMoveLeft(step){
         if(event.keyCode === 37){
            this.moveLeft(step)
         }
      }

      moveUp(step){
         if(this.element.offsetTop >= step){
            this.element.style.top = `${this.element.offsetTop - step}px`;
         }
      }

      initMoveUp(step){
         if(event.keyCode === 38){
            this.moveUp(step)
         }
      }

      moveRight(step){
         if(document.documentElement.clientWidth - this.element.offsetLeft - this.width >=  step){
            this.element.style.left = `${this.element.offsetLeft + step}px`;
         }
      }

      initMoveRight(step){
         if(event.keyCode === 39){
            this.moveRight(step)
         }
      }

      moveDown(step){
         if(document.documentElement.clientHeight - this.element.offsetTop - this.height >=  step){
            this.element.style.top = `${this.element.offsetTop + step}px`;
         }
      }

      initMoveDown(step){
         if(event.keyCode === 40){
            this.moveDown(step)
         }
      }

      jump(h){
            let currentOffsetTop = this.element.offsetTop
            if(this.isJumping){
               return;
            }
            this.isJumping = true;
            this.element.style.top = `${currentOffsetTop - h}px`;

            setTimeout(() => {
               this.element.style.top = `${currentOffsetTop}px`;
                
               setTimeout(() => {
                  this.isJumping = false;
               }, this.CSSAnimationDuration);
            }, this.jumpDuration);

            this.element.style.transition = '.05s'
      }

      initJump(h){
         if(event.keyCode === 32){
            this.jump(h)
         }
      }

      sitDown(){
         if(!event.repeat){
            let sittingHeight = this.height - (this.height * 0.4);
            let sittingWidth = this.width + (this.width * 0.15);
            this.element.style.height = `${sittingHeight}px`;
            this.element.style.width = `${sittingWidth}px`;
            this.element.style.top = `${ this.element.offsetTop + (this.width * 0.4)}px`;
            document.removeEventListener('keydown', this.initMoveUpBinded);
            document.removeEventListener('keydown', this.initMoveDownBinded);
            document.removeEventListener('keydown', this.initJumpBinded);
         }
   }

      initSitDown(){
         if(event.keyCode === 17){
            this.sitDown()
         }
      }

      sitUp(){
         this.element.style.height = `${this.height}px`;
         this.element.style.width = `${this.width}px`;
         this.element.style.top = `${this.element.offsetTop - (this.height * 0.4)}px`;
         document.addEventListener('keydown', this.initMoveUpBinded);
         document.addEventListener('keydown', this.initMoveDownBinded);
         document.addEventListener('keydown', this.initJumpBinded);
   }

      initSitUp(){
         if(event.keyCode === 17){
           this.sitUp();
         }
      }

      remove(){
         this.element.remove()
         document.removeEventListener('keydown', this.initMoveLeftBinded);
         document.removeEventListener('keydown', this.initMoveRightBinded);
         document.removeEventListener('keydown', this.initMoveUpBinded);
         document.removeEventListener('keydown', this.initMoveDownBinded);
         document.removeEventListener('keydown', this.initJumpBinded);
         document.removeEventListener('keydown', this.initSitDownBinded);
         document.removeEventListener('keyup', this.initSitUpBinded);
         document.removeEventListener('keydown', this.initAddOptionsBinded);
      }

      changeColor(){
         function getColor(){
            return Math.floor(Math.random() * 256);
         }
         this.element.style.backgroundColor = `rgb(${getColor()}, ${getColor()}, ${getColor()})`;
      }
   }

   // Class ContextMenu

   class ContextMenu{
      constructor(menuContainer, list, handlers, targetContainer = document){
         this.menuContainer = menuContainer;
         this.targetContainer = targetContainer;
         this.handlers = handlers;
         this.prepareItems(list);
         this.initHandlers();
      }

      prepareItems(sourse){
         this.menuContainer.innerHTML = `${sourse.map((item) => `<div class = 'item' data-id = ${item.id}>${item.title}</div>`).join('')}`;
      }

      showMenu(){
         this.menuContainer.classList.add('active');
      }

      hideMenu(){
         this.menuContainer.classList.remove('active');
      }

      positioningMenu(x, y){
         let freeSpaceX = document.documentElement.clientWidth - this.menuContainer.clientWidth - x;
         let freeSpaceY = document.documentElement.clientHeight - this.menuContainer.clientHeight - y;

         if(freeSpaceX < this.menuContainer.clientWidth && freeSpaceY < this.menuContainer.clientHeight){
            this.menuContainer.style.left = `${x - this.menuContainer.clientWidth - 10}px`;
            this.menuContainer.style.top = `${y - this.menuContainer.clientHeight - 10}px`;
         }else if(freeSpaceX < this.menuContainer.clientWidth){
            this.menuContainer.style.left = `${x - this.menuContainer.clientWidth - 10}px`;
            this.menuContainer.style.top = `${y}px`;
         }else if(freeSpaceY < this.menuContainer.clientHeight){
            this.menuContainer.style.left = `${x}px`;
            this.menuContainer.style.top = `${y - this.menuContainer.clientHeight - 10}px`;
         }else {
            this.menuContainer.style.left = `${x}px`;
            this.menuContainer.style.top = `${y}px`;
         }
      }

      initHandlers(){
         this.targetContainer.addEventListener('contextmenu', (event) => {
               event.preventDefault();
               event.stopPropagation();
               this.showMenu();
               this.positioningMenu(event.clientX + 10, event.clientY + 10);
         });

         this.menuContainer.addEventListener('click', (event) => {
            const id = event.target.dataset.id

            this.handlers[id]()
         })

         document.addEventListener('click', () => {
            this.hideMenu()
         });
      }

   }

   let character = document.querySelector('.character');
   let myCharacter = new Character(character, 100, 100 , 'blue', 150, 200, 50, 100);

   const actions = [
      {title: 'Jump', id: 'a1'},
      {title: 'Remove', id: 'a2'},
      {title: 'CgangeColor', id: 'a3'},
   ]

      const menuHandlers = { 
      a1: () => myCharacter.jumpBinded(),
      a2: () => myCharacter.remove(),
      a3: () => myCharacter.changeColor(),
   }
 
   const menu = document.querySelector('.custom-menu');
   const menuActions = new ContextMenu(menu, actions, menuHandlers)
})   

    