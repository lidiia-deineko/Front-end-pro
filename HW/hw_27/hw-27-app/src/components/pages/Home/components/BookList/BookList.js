import { useSelector, useDispatch } from 'react-redux';
import {useCallback, useEffect, useState } from "react";
import APIServices from '../../../../../services/APIServices';
import { addBooksAction } from '../../../../../store/actions/bookActions';
import star from '../../../../../star.svg'

import { addUserBooksListAction } from '../../../../../store/actions/userBooksListActions';


const BookList = () => {
    const userId = localStorage.getItem('userId')

    const booksList = useSelector(state => state.booksList);
    const userBooksList = useSelector(state => state.userBooksList);

    const dispatch = useDispatch()
  
    useEffect(() => {
        APIServices.getBooksList()
            .then(booksList => dispatch(addBooksAction(booksList)))
    }, [])

    const addFavoriteBook = useCallback((event) => {

        const bookId = event.target.dataset.id 
        const checkedBook = booksList.find((book) => {
            return book.id === bookId
        })

        APIServices.addFavoriveBook(userId, checkedBook)
            .then(resp => {
                if(resp){
                    APIServices.getUserBooksList(userId)
                        .then(userBooksList => dispatch(addUserBooksListAction(userBooksList)))    
                } else {
                    alert(' The book has already been added to the list.')
                }
            })

    }, [booksList, userBooksList])

    const listRender = booksList.map((item, index) => 
        <div className="book-item" key={index}>
            <img data-id={item.id}  onClick={(event) => {addFavoriteBook(event)}} className="book-item_star" src={star}></img>
            <img className="book-item_img" src={item.cover} height='150px'/>
            <div className="book-item_title">{item.title}</div>
            <div className="book-item_author">{item.author}</div>
        </div>
    )

    return(
        <div className='all-book-list'>
            <h2 className='book-list_title'>The list of books</h2>
              <div className="book-list">
                {listRender}
             </div>
        </div>
    )
}

export default BookList