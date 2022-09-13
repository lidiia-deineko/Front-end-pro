import { CHECKED_ID_BOOK_ADD } from "../actions";

export const checkedIDBookReducer = (state = 0, action) => {
    switch(action.type) {
        case CHECKED_ID_BOOK_ADD:
            return action.payload
        default:
            return state;
    }
}