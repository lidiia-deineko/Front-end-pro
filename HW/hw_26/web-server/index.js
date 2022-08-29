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

                console.log(userList);
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
    loginName,
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
      res.send(true)
    })
    .catch(() => {
      res.send(false)
    })
})


app.post('/auth/login', (req, res) => {

  let response = true;

  const {loginName, password} = req.body; 

  ListActions.readFile('data/users-in-system.json')
    .then(userList => {
      const parsedUserList = JSON.parse(userList);
      return Promise.resolve(parsedUserList);
    })
    .then(parsedUserList => {
      const user = parsedUserList.find(elem => elem.loginName === loginName);

      if(!user){
        response = false
      }

      if(user && !ListActions.checkPassword(user, password)){
        response = false
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
      const user = parsedUserList.find(elem => elem.loginName === loginName);

      if(!user){
        response = false
      } else{
        user.lastLoginTime = new Date().toLocaleString()
        ListActions.writeFile('data/users-in-system.json', parsedUserList)
        res.send(response)
      }
    })
})

app.post('/save/msg', (req, res) => {
  const{msg} = req.body
  // console.log(JSON.stringify(msg))
  // res.send(true)


  ListActions.readFile('data/contact-questions.json')
    .then(msgList => {
      const parsedMsgList = JSON.parse(msgList);
      return Promise.resolve(parsedMsgList);
    })
    .then(parsedMsgList => {
      parsedMsgList.push(msg)
      return Promise.resolve(parsedMsgList);
    })
    .then(parsedMsgList => {
      ListActions.writeFile('data/contact-questions.json', parsedMsgList)
      res.send(true)
    })
    .catch(() => {
      res.send(false)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});