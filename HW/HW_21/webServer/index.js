const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(cors());

app.use(bodyParser.json());

const port = 3000;

class TodoListActions{
    static readTodoList(){
        return new Promise((resolve, reject) => {
            fs.readFile('data/data.json', 'utf8', (err, todoList) => {
                if (err) {
                  console.error(err);
                  reject(err)
                  return;
                }

                console.log(todoList);
                resolve(todoList);

              });
        })
    }

    static writeTodoList(content){
        fs.writeFile('data/data.json', JSON.stringify(content, null, '\t'), err => {
            if (err) {
              console.error(err);
            }
          });
    }
}

async function loadTodoListRequest(){
    return await TodoListActions.readTodoList();
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/todo-list/', (req, res) => {
   
    async function initLoadTodoListRequest(){
        const todoList = await loadTodoListRequest()

        if(todoList === ''){
            const emptyArr = []
            TodoListActions.writeTodoList(emptyArr);
            res.send(emptyArr);
            return;
        }

        res.send(todoList)
    }

    initLoadTodoListRequest()

});

app.post('/todo-list', (req, res) => {

    const {title} = req.body

    const todo = {
        id: String(Date.now()),
        title,
        checked: false,
        timestamp: new Date().toLocaleString()
    }
    
    async function initLoadTodoListRequest(){
        const todoList = await loadTodoListRequest()

        const parsedTodoList =  JSON.parse(todoList)

        parsedTodoList.push(todo)

        TodoListActions.writeTodoList(parsedTodoList)

        res.send(true)
    }

    initLoadTodoListRequest()
        
});

app.put('/todo-list/:id', (req, res) => {
    const {checked} = req.body;
    const {id} = req.params;

    if (!id) {
        res.status(401).send('Id is required');

        return;
    }

    async function initLoadTodoListRequest(){
        const todoList = await loadTodoListRequest()

        const parsedTodoList =  JSON.parse(todoList);

        const foundToDo = parsedTodoList.find(({id: currentId}) => {
            return currentId === id;
        });

        if (!foundToDo) {
            res.status(401).send('Todo not found');
    
            return;
        }

        foundToDo.checked = !!checked;             

        TodoListActions.writeTodoList(parsedTodoList);

        res.send(true);
    }
    
    initLoadTodoListRequest()
  
});


app.put('/todo-list/edit-title/:id', (req, res) => {
    const {title} = req.body;
    const {id} = req.params;

    if (!id) {
        res.status(401).send('Id is required');

        return;
    }

    async function initLoadTodoListRequest(){
        const todoList = await loadTodoListRequest()

        const parsedTodoList =  JSON.parse(todoList);

        const foundToDo = parsedTodoList.find(({id: currentId}) => {
            return currentId === id;
        });

        if (!foundToDo) {
            res.status(401).send('Todo not found');
    
            return;
        }

        foundToDo.title = title;

        foundToDo.timestamp = new Date().toLocaleString()

        TodoListActions.writeTodoList(parsedTodoList)

        res.send(true);

    }

    initLoadTodoListRequest()

});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

