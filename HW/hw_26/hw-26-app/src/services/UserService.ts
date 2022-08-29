import { User } from "./APIServices";



class UserService {
    putToStorage(payload: User) {
        localStorage.setItem('user', JSON.stringify({
            id: Date.now(),
            loginName: payload.loginName
        }));
    }

    deleteFromStorage() {
        localStorage.removeItem('user');
    }
}

export default new UserService();