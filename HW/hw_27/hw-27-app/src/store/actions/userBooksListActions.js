import { USER_BOOKS_ADD } from "."

export const addUserBooksListAction = (payload) => {
    return{
        type: USER_BOOKS_ADD,
        payload
    }
}

