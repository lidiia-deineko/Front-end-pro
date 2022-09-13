import { MODAL_WINDOW_CLOSE, MODAL_WINDOW_OPEN } from "../actions";


export const modalReducer = (state = false, action) => {
    switch(action.type) {
        case MODAL_WINDOW_OPEN:
            return true
        case MODAL_WINDOW_CLOSE:
            return false
        default:
            return state;
    }
}