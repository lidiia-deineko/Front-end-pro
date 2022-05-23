window.addEventListener('load', () => {

   class Character{

      constructor(element, width, height, color, startX, startY, step, h){
         this.element = element;
         this.width = width;
         this.height = height;
         this.createCharacter(color, startX, startY);

         this.initMoveLeftBinded = this.initMoveLeft.bind(this, step);
         document.addEventListener('keydown', this.initMoveLeftBinded);

         this.initMoveRightBinded = this.initMoveRight.bind(this, step);
         document.addEventListener('keydown', this.initMoveRightBinded);

         this.initMoveUpBinded = this.initMoveUp.bind(this, step);
         document.addEventListener('keydown', this.initMoveUpBinded);

         this.initMoveDownBinded = this.initMoveDown.bind(this, step);
         document.addEventListener('keydown', this.initMoveDownBinded);

         this.initJumpBinded = this.initJump.bind(this, h);
         document.addEventListener('keydown', this.initJumpBinded);

         this.initSitDownBinded = this.initSitDown.bind(this, h);
         document.addEventListener('keydown', this.initSitDownBinded);

         this.initSitUpBinded = this.initSitUp.bind(this, h);
         document.addEventListener('keyup', this.initSitUpBinded);
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
      };

      moveLeft(step){
         if(this.element.offsetLeft >= step){
            this.element.style.left = `${this.element.offsetLeft - step}px`;
         }
      };

      initMoveLeft(step){
         if(event.keyCode === 37){
            this.moveLeft(step);
         }
      };

      moveUp(step){
         if(this.element.offsetTop >= step){
            this.element.style.top = `${this.element.offsetTop - step}px`;
         }
      };

      initMoveUp(step){
         if(event.keyCode === 38){
            this.moveUp(step)
         }
      };

      moveRight(step){
         if(document.documentElement.clientWidth - this.element.offsetLeft - this.width >=  step){
            this.element.style.left = `${this.element.offsetLeft + step}px`;
         }
      };

      initMoveRight(step){
         if(event.keyCode === 39){
            this.moveRight(step);
         }
      };

      moveDown(step){
         if(document.documentElement.clientHeight - this.element.offsetTop - this.height >=  step){
            this.element.style.top = `${this.element.offsetTop + step}px`;
         }
      };

      initMoveDown(step){
         if(event.keyCode === 40){
            this.moveDown(step);
         }
      };

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
      };

      initJump(h){
         if(event.keyCode === 32){
            this.jump(h);
         }
      };

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
      };

      initSitDown(){
         if(event.keyCode === 17){
            this.sitDown();
         }
      };

      sitUp(){
            this.element.style.height = `${this.height}px`;
            this.element.style.width = `${this.width}px`;
            this.element.style.top = `${this.element.offsetTop - (this.height * 0.4)}px`;
            document.addEventListener('keydown', this.initMoveUpBinded);
            document.addEventListener('keydown', this.initMoveDownBinded);
            document.addEventListener('keydown', this.initJumpBinded);
      };

      initSitUp(){
         if(event.keyCode === 17){
           this.sitUp();
         }
      };
   }

   let character = document.querySelector('.character');
   let myCharacter = new Character(character, 100, 100 , 'blue', 150, 200, 50, 100);
})   

    