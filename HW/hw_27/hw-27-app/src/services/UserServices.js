
class UserService {
    putToStorage(payload) {
        localStorage.setItem('userId', JSON.stringify(
            payload.userId,
        ));
    }

    deleteFromStorage() {
        localStorage.removeItem('userId');
    }
}

export default new UserService();