class APIService{
    host = 'http://localhost:8585'

    getUserList(){
        return fetch(`${this.host}/user/all`)
        .then(resp => resp.json())
    }

    createUser(payload){
        return fetch(`${this.host}/auth/create`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

    login(payload){
        return fetch(`${this.host}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

    updateLodin(payload){
        return fetch(`${this.host}/auth/login`, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

    getBooksList(){
        return fetch(`${this.host}/api/books/available`)
        .then(resp => resp.json())
    }

    addFavoriveBook(id, payload){
        return fetch(`${this.host}/api/${id}/add-favorite`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

    getUserBooksList(id){
        return fetch(`${this.host}/api/${id}`)
        .then(resp => resp.json())
    }

    deleteBookFromUserList(id, payload){
        return fetch(`${this.host}/api/${id}/delete-favorite`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

    updateProgress(id, payload){
        return fetch(`${this.host}/api/${id}/book/progress`, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

}

export default new APIService();