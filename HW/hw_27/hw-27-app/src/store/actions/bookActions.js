import { BOOKS_ADD } from "."


export const addBooksAction = (payload) => {
    return{
        type: BOOKS_ADD,
        payload
    }
}

