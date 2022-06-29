class Configurations{
    static webServer = "http://localhost:7575";
}

class APILayer{
    static getPerson(){
        return fetch(Configurations.webServer + '/person').then(resp => resp.json());
    }

    static getName(){
        return fetch(Configurations.webServer + '/person/name').then(resp => resp.json());
    }

    static getAddInfo(){
        return fetch(Configurations.webServer + '/person?name&age&surname').then(resp => resp.json());
    }

    static getAddress(){
        return fetch(Configurations.webServer + '/person/address').then(resp => resp.json());
    }

    static getPostRecipient(){
        return fetch(Configurations.webServer + '/person/post/recipient').then(resp => resp.json());
    }
}

APILayer.getPerson().then(person => {
    for(key in person.data){
        document.querySelector('.info-request_1').innerHTML += 
        `<div><span class = "title">${key}: </span><span>${person.data[key]}</span></div>`;
    }
})

APILayer.getName().then(nameData => {
    document.querySelector('.info-request_2').innerHTML += 
    `<div><span class = "title">name: </span><span>${nameData.name}</span></div>`;
})

APILayer.getAddInfo().then(addInfo => {
    for(key in addInfo){
        document.querySelector('.info-request_3').innerHTML += 
        `<div><span class = "title">${key}: </span><span>${addInfo[key]}</span></div>`;
    }
})

APILayer.getAddress().then(address => {
    for(key in address){
        document.querySelector('.info-request_4').innerHTML += 
        `<div><span class = "title">${key}: </span><span>${address[key]}</span></div>`;
    }
})

APILayer.getPostRecipient().then(recipient => {
    for(key in recipient){
        document.querySelector('.info-request_5').innerHTML += 
        `<div><span class = "title">${key}: </span><span>${recipient[key]}</span></div>`;
    }
})
