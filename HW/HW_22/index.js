const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

function onReadDirRequest(directory){
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if(err){
                console.error(err);
                reject(err)
                return; 
            }
    
            resolve(files);
        })
    })
}

function onReadFileRequest(path){
    return new Promise ((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if(err){
                console.error(err);
                reject(err)
                return; 
            }
    
            resolve(data)
        })
    })
}

app
    .get('/user/:userID', async (req, res) => {
        const path = `./mock/users/${req.params.userID}/${req.method.toLocaleLowerCase()}.json`;
        try{
            const data =  await onReadFileRequest(path)
            res.send(JSON.parse(data), null, '\t')
        }catch (err){
            res.statusCode = 400;
            res.send(`statusCode: ${res.statusCode}`);     
        }
    })

    .get('/users', async (req, res) => {

        const pathToDir = './mock/users';

        const files = await onReadDirRequest(pathToDir);

        const promisesReadFile = files.map(file => {
            const pathToFile = `./mock/users/${file}/${req.method.toLocaleLowerCase()}.json`;
            return onReadFileRequest(pathToFile)
        })

        async function parallelReadFile(){
            try{
                const allData = await Promise.allSettled(promisesReadFile)
                res.send(allData)
            }catch (err){
                res.statusCode = 400;
                res.send(`statusCode: ${res.statusCode}`);  
            }
        }
        parallelReadFile()     
    })

    .get('/users/:action', async (req, res) => {

        const pathToDir = './mock/users';

        const files = await onReadDirRequest(pathToDir);
    
        if(req.params.action === 'last'){
            const pathToFile = `./mock/users/${files[files.length - 1]}/${req.method.toLocaleLowerCase()}.json`;
            try{
                const data =  await onReadFileRequest(pathToFile)
                res.send(JSON.parse(data), null, '\t')
            }catch (err){
                res.statusCode = 400;
                res.send(`statusCode: ${res.statusCode}`);     
            }
        }

        if(req.params.action === 'first'){
            const pathToFile = `./mock/users/${files[0]}/${req.method.toLocaleLowerCase()}.json`;
            try{
                const data =  await onReadFileRequest(pathToFile)
                res.send(JSON.parse(data), null, '\t')
            }catch (err){
                res.statusCode = 400;
                res.send(`statusCode: ${res.statusCode}`);     
            }
        }

        if(req.params.action === 'all'){
            const promisesReadFile = files.map(file => {
                const path = `./mock/users/${file}/${req.method.toLocaleLowerCase()}.json`;
                return onReadFileRequest(path)
            })
    
            async function parallelReadFile(){
                try{
                    const allData = await Promise.all(promisesReadFile);

                    const allDataParsed = allData.map(data => {
                        return JSON.parse(data);
                    })

                    const allDataParsedConcat = allDataParsed.flat();
                    res.send(allDataParsedConcat);
                }catch (err){
                    res.statusCode = 400;
                    res.send(`statusCode: ${res.statusCode}`);  
                }
            }
            parallelReadFile() 
        }
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})