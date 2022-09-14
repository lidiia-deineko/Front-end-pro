const fs = require('fs');

class ListActions{
    readFile(path){
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

    writeFile(path, content){
        fs.writeFile(path, JSON.stringify(content, null, '\t'), err => {
            if (err) {
              console.error(err);
            }
          });
    }

    readDir(path){
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

    checkPassword(user, password){
      const base64Pass = Buffer.from(password).toString('base64');
      return user.password === base64Pass;
  }
}

module.exports.listActions = new ListActions()