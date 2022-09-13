import { BOOKS_ADD } from "../actions";


export const bookReduser = (state = [], action) => {
    switch(action.type) {
        case BOOKS_ADD:
            return [...action.payload]
        default:
            return state;
    }
}
