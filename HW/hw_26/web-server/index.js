const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const { listActions } = require('./listActions');

const app = express();
app.use(cors());
app.use(bodyParser.json())
const port = 8585;

const usersInSystemFile = 'users-in-system.json';
const contactQuestionsFile = 'contact-questions.json';

app.get('/user/all', (req, res) => {
    listActions.readFile(`data/${usersInSystemFile}`)
      .then(userList => res.send(userList))
});

app.post('/auth/create', (req, res) => {
  let response = true;  
  const {loginName, password} = req.body 
  
  if(password.length == 0){
    response = false; 
  }

  const user = {
    loginName,
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
      const foundUser = parsedUserList.find(elem => elem.loginName === loginName);

      if(foundUser){
        response = false; 
      } else {
        parsedUserList.push(user)
        listActions.writeFile(`data/${usersInSystemFile}`, parsedUserList)
      }
      res.send(response)
    })
})

app.post('/auth/login', (req, res) => {
  let response = true;
  const {loginName, password} = req.body; 

  listActions.readFile(`data/${usersInSystemFile}`)
    .then(userList => {
      const parsedUserList = JSON.parse(userList);
      return Promise.resolve(parsedUserList);
    })
    .then(parsedUserList => {
      const user = parsedUserList.find(elem => elem.loginName === loginName);

      if(!user){
        response = false
      } 

      if(user && !listActions.checkPassword(user, password)){
        response = false
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
      const user = parsedUserList.find(elem => elem.loginName === loginName);

      if(!user){
        response = false
      } else{
        user.lastLoginTime = new Date().toLocaleString()
        listActions.writeFile(`data/${usersInSystemFile}`, parsedUserList)
        res.send(response)
      }
    })
})

app.post('/contact/ask', (req, res) => {
  const{msg} = req.body

  listActions.readFile(`data/${contactQuestionsFile}`)
    .then(msgList => {
      const parsedMsgList = JSON.parse(msgList);
      return Promise.resolve(parsedMsgList);
    })
    .then(parsedMsgList => {
      parsedMsgList.push(msg)
      return Promise.resolve(parsedMsgList);
    })
    .then(parsedMsgList => {
      listActions.writeFile(`data/${contactQuestionsFile}`, parsedMsgList)
      res.send(true)
    })
    .catch(() => {
      res.send(false)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});