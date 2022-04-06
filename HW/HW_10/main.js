 /* 1. Создать класс new SuperArray(n, m, { min: 10, max: 55 }), который создаст массив размерностью n на m и 
    заполнит случайными числами в диапазоне options.min - options.max. Массив сохраняется в екземпляр класса SuperArray.
    2. Создать метод render(separator), в прототипе. Который выведет двумерный массив в документ, с разделителем separator.
    3. Создать метод clear(direction, k), где direction может быть "row" или "column", а k - номер строки или столбца, 
    который нужно очистить. (поставить 0)
    4. Создать Метод setMarker({ x: 6, y: 9 }), который устанавливает маркер "&" в в переданную точку.
    5. Создать метод goTo({ x: 2, y: 4 }), маркер передвигается в указанную точку.
    6. Создать метод shift(direction), где direction может иметь значение "left", "right", "top", "bottom", 
    и маркер сдвинется в указанную сторону на 1 шаг.*/

class SuperArray{
    constructor(n,m, options){
        this.n = n;
        this.m = m;
        this.min = options.min;
        this.max = options.max;
        this.myArr = this.createArray()  
    }
    valueMarker;
    markerX;
    markerY;

    createArray(){
        this.myArr = new Array(this.n);
        for(let i = 0; i <this.myArr.length; i++){
            this.myArr[i] = new Array(this.m);

            for(let j = 0; j < this.myArr[i].length; j++){
                this.myArr[i][j] = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
            }
        }
     return this.myArr
    }

    render(separator){
            for(let i = 0; i < this.myArr.length; i++){
                for(let j = 0; j < this.myArr[i].length; j++){
                    document.write(this.myArr[i][j] + '&nbsp;&nbsp;')
                }
                document.write('<br />')
            }
            document.write(separator + '<br />')
    }

    clear(direction, k){
        if(direction == 'row'){
            for(let i = 0; i < this.myArr.length; i++){
                for(let j = 0; j < this.myArr[i].length; j++){
                   this.myArr[k][j] = 0
                }
            }
        }else if(direction == 'column'){
            for(let i = 0; i < this.myArr.length; i++){
                for(let j = 0; j < this.myArr[i].length; j++){
                    this.myArr[i][k] = 0
                }
            }
        }
      return this.myArr
    }

    setMarker(coordinates){
        this.x = coordinates.x
        this.y = coordinates.y
        if(this.x >= this.n || this.y >= this.m){
            document.write('This coordinate does not exist! <br />')
        }else{
            this.valueMarker = this.myArr[this.x][this.y]
            this.myArr[this.x][this.y] = '&'
            this.markerX = this.x
            this.markerY = this.y
        }
    }

    goTo(coordinates){
        this.x = coordinates.x
        this.y = coordinates.y
        if(this.x >= this.n || this.y >= this.m){
            document.write('This coordinate does not exist! <br />')
        }else{
            this.myArr[this.markerX][this.markerY] = this.valueMarker 
            this.valueMarker = this.myArr[this.x][this.y] 
            this.myArr[this.x][this.y] = '&'
            this.markerX = this.x 
            this.markerY = this.y
        }
    }

    shift(direction){
        let step = 1
        if(direction == 'right'){
            if(this.markerY != (this.m - 1)){
                this.myArr[this.markerX][this.markerY] = this.valueMarker 
                this.valueMarker = this.myArr[this.markerX][this.markerY + step]  
                this.myArr[this.markerX][this.markerY + step] = '&' 
                this.markerX = this.markerX 
                this.markerY = this.markerY + step   
            }else{
                document.write('Shift to the right is not possible! <br />')
            }
        } else if(direction == 'left'){
            if(this.markerY != 0){
                this.myArr[this.markerX][this.markerY] = this.valueMarker 
                this.valueMarker =  this.myArr[this.markerX][this.markerY - step] 
                this.myArr[this.markerX][this.markerY - step] = '&' 
                this.markerX = this.markerX 
                this.markerY = this.markerY - step  
            } else{
                document.write('Shift to the left is not possible! <br />')
            }
        } else if(direction == 'top'){
            if(this.markerX != 0){
                this.myArr[this.markerX][this.markerY] = this.valueMarker 
                this.valueMarker =  this.myArr[this.markerX-step][this.markerY] 
                this.myArr[this.markerX - step][this.markerY] = '&' 
                this.markerX = this.markerX - step
                this.markerY = this.markerY  
            }else{
                document.write('Shift to the top is not possible! <br />')
            }
        } else if(direction == 'bottom'){
            if(this.markerX != (this.n - 1)){
                this.myArr[this.markerX][this.markerY] = this.valueMarker 
                this.valueMarker =  this.myArr[this.markerX + step][this.markerY] 
                this.myArr[this.markerX + step][this.markerY] = '&' 
                this.markerX = this.markerX + step
                this.markerY = this.markerY  
            }else{
                document.write('Shift to the bottom is not possible! <br />')
            }
        } 
    }
}

const  exampleArr = new SuperArray(10, 10, {min:10, max:55})

console.log(exampleArr)

exampleArr.render('_________')
exampleArr.clear('row',1)
exampleArr.render('_________')
exampleArr.setMarker({x:2, y:8})
exampleArr.render('_________')
exampleArr.goTo({x:5, y:6})
exampleArr.render('_________')
exampleArr.shift('right')
exampleArr.render('_________')
exampleArr.shift('left')
exampleArr.render('_________')
exampleArr.shift('top')
exampleArr.render('_________')
exampleArr.shift('bottom')
exampleArr.render('_________')
exampleArr.shift('bottom')
exampleArr.render('_________')
exampleArr.shift('left')
exampleArr.render('_________')
exampleArr.shift('left')
exampleArr.render('_________')
exampleArr.goTo({x:9, y:3})
exampleArr.render('_________')
exampleArr.shift('bottom')   //Shift to the bottom is not possible!

