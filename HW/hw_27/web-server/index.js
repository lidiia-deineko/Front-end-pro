const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const { listActions } = require('./listActions');


const app = express();
app.use(cors());
app.use(bodyParser.json())
const port = 8585;

const usersInSystemFile = 'users-in-system.json';
const listBooks = 'list-books.json'
const userId = (id) => {
  return `user-${id}.json`
}

app.get('/user/all', (req, res) => {
    listActions.readFile(`data/${usersInSystemFile}`)
      .then(userList => res.send(userList))
});

app.post('/auth/create', (req, res) => {

  const {loginName, password} = req.body 

  const user = {
    id: Date.now(),
    loginName: Buffer.from(loginName).toString('base64'),
    password: Buffer.from(password).toString('base64'),
    creationTime: new Date().toLocaleString(),
    lastLoginTime: new Date().toLocaleString()
  }

  listActions.readFile(`data/${usersInSystemFile}`)
    .then(userList => {
      const parsedUserList = JSON.parse(userList)
      return Promise.resolve(parsedUserList)
    })
    .then(parsedUserList => {
      parsedUserList.push(user)
      return Promise.resolve(parsedUserList)
    })
    .then(parsedUserList => {
      listActions.writeFile(`data/${usersInSystemFile}`, parsedUserList)
      res.send({response: true, id: user.id})
    })
    .catch(() => {
      res.send(false)
    })
})

app.post('/auth/login', (req, res) => {

  let response = {
    response: true,
    id: ''
  };

  const {loginName, password} = req.body; 

  listActions.readFile(`data/${usersInSystemFile}`)
    .then(userList => {
      const parsedUserList = JSON.parse(userList);
      return Promise.resolve(parsedUserList);
    })
    .then(parsedUserList => {
      const user = parsedUserList.find(elem => elem.loginName === Buffer.from(loginName).toString('base64'));
      response.id = user.id
      if(!user){
        response.response = false
      }
      if(user && !listActions.checkPassword(user, password)){
        response.response = false
      }
      res.send(response)
    })
})

app.put('/auth/login', (req, res) => {
  let response = true;
  
  const {loginName} = req.body; 

  listActions.readFile(`data/${usersInSystemFile}`)
    .then(userList => {
      const parsedUserList = JSON.parse(userList);
      return Promise.resolve(parsedUserList);
    })
    .then(parsedUserList => {
      const user = parsedUserList.find(elem => elem.loginName === Buffer.from(loginName).toString('base64'));

      if(!user){
        response = false
      } else{
        user.lastLoginTime = new Date().toLocaleString()
        listActions.writeFile(`data/${usersInSystemFile}`, parsedUserList)
        res.send(response)
      }
    })
})

app.get('/api/books/available', (req, res) => {

  listActions.readFile(`data/${listBooks}`)
    .then(booksList => {
      const parsedBooksList = JSON.parse(booksList);
      return Promise.resolve(parsedBooksList);
    })
    .then(booksList => res.send(booksList.books))
});


app.post('/api/:id/add-favorite', (req, res) => {
  const payload = req.body;
  const {id} = req.params;
  listActions.readDir('data')
    .then(files => {
      const isUserFile = files.includes(userId(id))
      if(isUserFile){
        listActions.readFile(`data/${userId(id)}`)
          .then(userListBooks => {
            const parsedUserListBook = JSON.parse(userListBooks)
            return Promise.resolve(parsedUserListBook);
          })
          .then(parsedUserListBook => {
            const isCheckedBook = parsedUserListBook.find(book => {
               return book.id == payload.id
            })
            if(isCheckedBook){
              res.send(false)
            } else {
              parsedUserListBook.push(payload)
              return Promise.resolve(parsedUserListBook)
            }
          })
          .then(parsedUserListBook => {
            listActions.writeFile(`data/${userId(id)}`, parsedUserListBook)
            res.send(true)
          })
          .catch(() => {
            res.send(false)
          })
      }else{
        const favoriteBooksList = []
        favoriteBooksList.push(payload)
        listActions.writeFile(`data/${userId(id)}`, favoriteBooksList)
        res.send(true)
      }
    })
});

app.get('/api/:id', (req, res) => {

  const {id} = req.params;

  listActions.readDir('data')
    .then(files => {
      const isUserFile = files.includes(userId(id))
      if(isUserFile){
        listActions.readFile(`data/${userId(id)}`)
        .then(userBooksList => {
          const parsedUserBooksList = JSON.parse(userBooksList);
          return Promise.resolve(parsedUserBooksList);
        })
          .then(parsedUserBooksList => res.send(parsedUserBooksList))
      } else {
        res.send(false)
      }
    })  
});

app.post('/api/:id/delete-favorite', (req, res) => { 
  const payload = req.body;
  const {id} = req.params;

  listActions.readFile(`data/${userId(id)}`)
    .then(userBooksList => {
      const parsedUserBooksList = JSON.parse(userBooksList);
      return Promise.resolve(parsedUserBooksList);
    })
    .then(parsedUserBooksList => {
      const foundBookById = parsedUserBooksList.find(book => book.id === payload.bookId)
      const filterUserBooksList = parsedUserBooksList.filter(book => {
        return book.id !== foundBookById.id
      })
      return Promise.resolve(filterUserBooksList);
    })
    .then((filterUserBooksList) => {
      listActions.writeFile(`data/${userId(id)}`, filterUserBooksList)
      res.send(true)
    })
    .catch(() => {
      res.send(false)
    })
})

app.put('/api/:id/book/progress', (req, res) => { 
  const {idCheckedBook, progressBook} = req.body;
  const {id} = req.params;

  listActions.readFile(`data/${userId(id)}`)
    .then(userBooksList => {
      const parsedUserBooksList = JSON.parse(userBooksList);
      return Promise.resolve(parsedUserBooksList);
    })
    .then(parsedUserBooksList => {
      const indexBookById = parsedUserBooksList.findIndex((book) => {
        return book.id === idCheckedBook
      })
      parsedUserBooksList[indexBookById].progress = progressBook
      listActions.writeFile(`data/${userId(id)}`, parsedUserBooksList)
      res.send(true)
    })
    .catch(() => {
      res.send(false)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});