import { PROGRESS_CHECKED_BOOK_ADD } from "."

export const addProgressCheckedBookAction = (payload) => {
    return{
        type: PROGRESS_CHECKED_BOOK_ADD,
        payload
    }
}

