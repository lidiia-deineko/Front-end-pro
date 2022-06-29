var http = require('http');
const fs = require('fs');
var static = require('node-static');
var file = new static.Server('.');   
let port = 7575;   

const PERSON_DATA_PATH = './data/personData.json';

class Services{
    static loadPersonData(){
        return new Promise((resolve, reject) => {
            fs.readFile(PERSON_DATA_PATH, 'utf8', (err, person) => {
                if (err) {
                  console.error(err);
                  reject(err);
                  return;
                }
                resolve(person);
              });
        })
    }
}

http.createServer(function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*')
    onPersonRequest().then(person => {
        person = JSON.parse(person);
        const personData = person.data;

        if(req.url === '/person'){
            res.write(JSON.stringify(person));
            res.end(); 
        }
    
        if(req.url === '/person/name'){
            const nameData = {};
            for(key in personData){
                if(key == 'name'){
                    nameData[key] = personData[key]
                }
            }
            res.write(JSON.stringify(nameData));
            res.end();
        }

        if(req.url.includes('/person?')){
            const additionalData = {};
            const  getParams = req.url.split('?')[1].split('&');
            const keyPersonData = Object.keys(personData);
            getParams.forEach((param) => {
                keyPersonData.forEach(key => {
                    if(param === key){
                        additionalData[key] = personData[key]
                    }
                }) 
            })
            
            res.write(JSON.stringify(additionalData));
            res.end(); 
        }

        if(req.url === '/person/address'){
            const addressData = {};
            for(key in personData){
                if(key === 'city' || key === 'street' || key === 'postCode'){
                    addressData[key] = personData[key]
                }
            }
            res.write(JSON.stringify(addressData));
            res.end();
        }

        if(req.url === '/person/post/recipient'){
            const recipientData = {};
            for(key in personData){
                if(key === 'name' || key === 'surname' || key === 'city' || key === 'street' || key === 'postCode'){
                    recipientData[key] = personData[key]
                }
            }
            res.write(JSON.stringify(recipientData));
            res.end();
        }

    })
    .catch(() => {
        res.statusCode = 400;
        res.write('err');
        res.end();
    })   
    return;
}).listen(port);

console.log(`Server running on port ${port}`);

function onPersonRequest(){
    return Services.loadPersonData();
}