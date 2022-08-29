import { type } from "os";

export type User = {
    loginName: string;
    password: string;
};

export type UserFullInfo = {
    loginName: string;
    password: string;
    creationTime: string;
    lastLoginTime: string;
};

export type UserName = {
    loginName: string
}

export type Msg = {
    msg: string
}

class APIService{
    host = 'http://localhost:8585'

    getUserList():Promise<UserFullInfo[]>{
        return fetch(`${this.host}/user/all`)
        .then(resp => resp.json())
    }

    createUser(payload:User): Promise<boolean>{
        return fetch(`${this.host}/auth/create`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

    login(payload:User):Promise<boolean>{
        return fetch(`${this.host}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

    updateLodin(payload:UserName):Promise<boolean>{
        return fetch(`${this.host}/auth/login`, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

    saveMsg(payload:Msg):Promise<boolean>{
        return fetch(`${this.host}/save/msg`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }
}

export default new APIService();