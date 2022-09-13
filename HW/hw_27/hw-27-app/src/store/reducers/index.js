import { combineReducers } from "redux";
import { bookReduser } from "./bookReducer";
import { checkedIDBookReducer } from "./checkedIDBookReducer";
import { modalReducer } from "./modalReducer";
import { progressCheckedBookReducer } from "./progressCheckedBookReducer";
import { userBooksListReduser } from "./userBooksListReducer";

export default combineReducers({
    booksList: bookReduser,
    userBooksList: userBooksListReduser,
    isModalVisible: modalReducer,
    idCheckedBook: checkedIDBookReducer,
    progressCheckedBook: progressCheckedBookReducer
})