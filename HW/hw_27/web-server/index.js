const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json())
const port = 8585;

class ListActions{
    static readFile(path){
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, userList) => {
                if (err) {
                  console.error(err);
                  reject(err)
                  return;
                }
                resolve(userList);
              });
        })
    }

    static writeFile(path, content){
        fs.writeFile(path, JSON.stringify(content, null, '\t'), err => {
            if (err) {
              console.error(err);
            }
          });
    }

    static readDir(path){
      return new Promise((resolve, reject) => {
          fs.readdir(path, (err, files) => {
              if (err) {
                console.error(err);
                reject(err)
                return;
              }
              resolve(files);
            });
      })
  }

    static checkPassword(user, password){
      const base64Pass = Buffer.from(password).toString('base64');
  
      return user.password === base64Pass;
  }
}

app.get('/user/all', (req, res) => {
    ListActions.readFile('data/users-in-system.json')
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

  ListActions.readFile('data/users-in-system.json')
    .then(userList => {
      const parsedUserList = JSON.parse(userList)
      return Promise.resolve(parsedUserList)
    })
    .then(parsedUserList => {
      parsedUserList.push(user)
      return Promise.resolve(parsedUserList)
    })
    .then(parsedUserList => {
      ListActions.writeFile('data/users-in-system.json', parsedUserList)
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

  ListActions.readFile('data/users-in-system.json')
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
      if(user && !ListActions.checkPassword(user, password)){
        response.response = false
      }
      res.send(response)
    })
})

app.put('/auth/login', (req, res) => {
  let response = true;
  
  const {loginName} = req.body; 

  ListActions.readFile('data/users-in-system.json')
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
        ListActions.writeFile('data/users-in-system.json', parsedUserList)
        res.send(response)
      }
    })
})

app.get('/api/books/available', (req, res) => {

  ListActions.readFile('data/list-books.json')
    .then(booksList => {
      const parsedBooksList = JSON.parse(booksList);
      return Promise.resolve(parsedBooksList);
    })
    .then(booksList => res.send(booksList.books))
});


app.post('/api/:id/add-favorite', (req, res) => {
  const payload = req.body;
  const {id} = req.params;
  ListActions.readDir('data')
    .then(files => {
      const isUserFile = files.includes(`user-${id}.json`)
      if(isUserFile){
        ListActions.readFile(`data/user-${id}.json`)
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
            ListActions.writeFile(`data/user-${id}.json`, parsedUserListBook)
            res.send(true)
          })
          .catch(() => {
            res.send(false)
          })
      }else{
        const favoriteBooksList = []
        favoriteBooksList.push(payload)
        ListActions.writeFile(`data/user-${id}.json`, favoriteBooksList)
        res.send(true)
      }
    })
});

app.get('/api/:id', (req, res) => {

  const {id} = req.params;

  ListActions.readDir('data')
    .then(files => {
      const isUserFile = files.includes(`user-${id}.json`)
      if(isUserFile){
        ListActions.readFile(`data/user-${id}.json`)
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

  ListActions.readFile(`data/user-${id}.json`)
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
      ListActions.writeFile(`data/user-${id}.json`, filterUserBooksList)
      res.send(true)
    })
    .catch(() => {
      res.send(false)
    })
})

app.put('/api/:id/book/progress', (req, res) => { 
  const {idCheckedBook, progressBook} = req.body;
  const {id} = req.params;

  console.log(idCheckedBook, 'idCheckedBook')
  console.log(progressBook, 'progressBook')
  console.log(id, 'id')

  ListActions.readFile(`data/user-${id}.json`)
    .then(userBooksList => {
      const parsedUserBooksList = JSON.parse(userBooksList);
      return Promise.resolve(parsedUserBooksList);
    })
    .then(parsedUserBooksList => {
      const indexBookById = parsedUserBooksList.findIndex((book) => {
        return book.id === idCheckedBook
      })
      parsedUserBooksList[indexBookById].progress = progressBook
      ListActions.writeFile(`data/user-${id}.json`, parsedUserBooksList)
      res.send(true)
    })
    .catch(() => {
      res.send(false)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});