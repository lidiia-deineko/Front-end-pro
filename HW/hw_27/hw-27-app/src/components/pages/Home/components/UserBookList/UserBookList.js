import { useSelector, useDispatch } from 'react-redux';
import {useCallback, useEffect, useState } from "react";
import APIServices from '../../../../../services/APIServices';
import delBook from '../../../../../delete-book.svg';
import progress from '../../../../../progress.svg';
import { addUserBooksListAction } from '../../../../../store/actions/userBooksListActions';
import ModalWindow from '../ModalWindow/ModalWindow';
import { addIDBookActions } from '../../../../../store/actions/checkedIDBookActions';
import { openModalAction } from '../../../../../store/actions/modalActions';

const UserBookList = () => {

    const userId = localStorage.getItem('userId')

    const userBooksList = useSelector(state => state.userBooksList);
    const idCheckedBook = useSelector(state => state.idCheckedBook);
    const isModalVisible = useSelector(state => state.isModalVisible);
    const progressBook = useSelector(state => state.progressCheckedBook);


    const dispatch = useDispatch()
  
    useEffect(() => {
        APIServices.getUserBooksList(userId)
        .then(resp =>{
            if(!resp) {
                return
            } else {
                return dispatch(addUserBooksListAction(resp))
            }
        })
    }, [progressBook])


    const deleteBookFromUserList = useCallback((event) => {
        const bookId = event.target.dataset.id
        
        APIServices.deleteBookFromUserList(userId, {bookId})
            .then(resp => {
                if(resp){
                    APIServices.getUserBooksList(userId)
                        .then(userBooksList => dispatch(addUserBooksListAction(userBooksList)))    
                    console.log('The book was deleted')
                }else(console.log('Server are not responding'))
            })
         
    }, [userBooksList])

    const showModalWindow = useCallback((event) => {
        const idBook = event.target.dataset.id
        dispatch(addIDBookActions(idBook))
        dispatch(openModalAction)
    }, [idCheckedBook])

    const userListBookRender = userBooksList.map((item, index) => 
        <div className="book-item" key={index}>
            <img onClick={deleteBookFromUserList} data-id={item.id} className="book-item_star" src={delBook}></img>
            <img onClick={showModalWindow} data-id={item.id} className="book-item_progress" src={progress}></img>
            <img className="book-item_img" src={item.cover} height='150px'/>
            <div className="book-item_title">{item.title}</div>
            <div className="book-item_author">{item.author}</div>
        </div>
    )

    return(
        <div className='all-book-list all-book-list__left'>
            <h2 className='book-list_title'>The favorite list</h2>
              <div className="book-list">
                {userListBookRender}
                <ModalWindow showModal = {isModalVisible} />
             </div>
        </div>
    )
}

export default UserBookList