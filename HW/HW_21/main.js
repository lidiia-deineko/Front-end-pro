const root = 'http://localhost:3000';

class ToDoList {
    list = [];
    root = null;

    addInput = document.querySelector('.addInput');
    addBtn = document.querySelector('.addBtn');
    editInput = document.querySelector('.editInput');
    editBtn = document.querySelector('.editBtn');
    currentId;

    template = ({ checked, title, id }) => `
<li ${checked ? 'class="checked"' : ''} data-id="${id}">
    ${title}<span class="btn editLiBtn" data-id="${id}">Edit</span>
</li>
`
    constructor(query) {
        this.root = document.querySelector(query);

        this.root.addEventListener('click', this.onItemClick.bind(this));

        this.root.addEventListener('click', this.onEditItemClick.bind(this));

        this.editBtn.addEventListener('click', this.onAddChangesClick.bind(this));
    }

    async onAddChangesClick(event){
        const title = this.editInput.value;

        if (!title) {
            return;
        }

        await this.editTitle(this.currentId, title);
    }


    onEditItemClick(event){
        if (event.target.tagName !== 'SPAN') {
            return
         }

         this.addBtn.classList.add('hide');
         this.addInput.classList.add('hide');
         this.editBtn.classList.remove('hide');
         this.editInput.classList.remove('hide');

         const id = event.target.dataset['id'];

         this.currentId = id;

         const foundToDo = this.list.find(({id: todoId}) => todoId === id);

         this.editInput.value = foundToDo.title;
    }

    async onItemClick (event) {
        if (event.target.tagName !== 'LI') {
            return;
        }

        const id = event.target.dataset['id'];

        await this.updateTodo(id, !this.getTodoById(id).checked);
        await this.getList();
    }

    async init() {
        try {
            await this.getList();
        } catch (e) {
            console.error('SOMETHING WENT WRONG', e);
        }
    }

    async getList() {
        const response = await fetch(root + '/todo-list');
      
        this.list = await response.json();

        if (!this.root) {
            return;
        }

        const html = this.list.map(this.template).join('');

        this.root.innerHTML = html;
    }

    async addTodo(title) {
        const response = await fetch(root + '/todo-list', {
            method: 'POST',
            body: JSON.stringify({title}),
            headers: {
                'Content-Type': 'application/json'
            },})

        return response.json();
    }

    getTodoById(id) {
        return this.list.find(({id: todoId}) => todoId === id);
    }

    async updateTodo(id, checked) {
        const response = await fetch(root + `/todo-list/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ checked }),
            headers: {
                'Content-Type': 'application/json'
            }})

        return response.json();
    }

    async editTitle(id, title){
        const response = await fetch(root + `/todo-list/edit-title/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title }),
            headers: {
                'Content-Type': 'application/json'
            }})

            return response.json();
    }
}

window.addEventListener('load', () => {
    const todoList = new ToDoList('#myUL');

    todoList.addBtn.addEventListener('click', async () => {

        const title = todoList.addInput.value;

        if (!title) {
            return;
        }

        await todoList.addTodo(title);
        await todoList.getList();

        todoList.addInput.value = '';
    })
   
    todoList.init()    
});

