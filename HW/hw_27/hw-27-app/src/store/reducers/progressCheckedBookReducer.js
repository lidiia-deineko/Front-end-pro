import { PROGRESS_CHECKED_BOOK_ADD } from "../actions";


export const progressCheckedBookReducer = (state = 0, action) => {
    switch(action.type) {
        case PROGRESS_CHECKED_BOOK_ADD:
            return action.payload
        default:
            return state;
    }
}