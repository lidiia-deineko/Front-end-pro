import { USER_BOOKS_ADD } from "../actions";


export const userBooksListReduser = (state = [], action) => {
    switch(action.type) {
        case USER_BOOKS_ADD:
            return [...action.payload]
        default:
            return state;
    }
}