import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import APIServices from "../../../../../services/APIServices";
import { closeModalAction } from "../../../../../store/actions/modalActions";
import { addProgressCheckedBookAction } from "../../../../../store/actions/progressCheckedBookActions";
import closeBtn from '../../../../../close.svg';


import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const ModalWindow = (props) => {
    const userId = localStorage.getItem('userId')
    const idCheckedBook = useSelector(state => state.idCheckedBook);
    const progressBook = useSelector(state => state.progressCheckedBook);
    const userBooksList = useSelector(state => state.userBooksList);
    const dispatch = useDispatch()

    const hideModalWindow = useCallback(() => {
        dispatch(closeModalAction)
    }, [])

    const foundBook = userBooksList.find((book) => {
        return book.id === idCheckedBook
    })

    useEffect(() => {
        if(foundBook){
            dispatch(addProgressCheckedBookAction(foundBook.progress))
        }
    }, [idCheckedBook])

    const chValue = useCallback((event) => {
        let newProgress = event.target.value
        dispatch(addProgressCheckedBookAction(newProgress))
        console.log(progressBook, 'progressBook')
        console.log(userBooksList, 'userBooksList')
    }, [progressBook])

    const saveNewProgressValue = useCallback(() => {
        APIServices.updateProgress(userId, {idCheckedBook, progressBook})
        dispatch(closeModalAction)
    }, [progressBook, idCheckedBook])

    if(!props.showModal){
        return undefined
    }

    return(
        <div className="modal" onClick={hideModalWindow}>
           <div className="modal-container" onClick={(event) => {event.stopPropagation()}}>
            <img onClick={hideModalWindow} className="close-btn" src={closeBtn}></img>
            <h2 className="progess-title">Change progress </h2>
                <input className="progress-input" type='range' min='0' max='100' step='25'  value={progressBook} onChange={chValue}></input>
                 <Stack className="progress-btn" spacing={2} direction="row">
                    <Button  onClick={saveNewProgressValue} variant="contained">Save</Button>
                </Stack>
           </div>

        </div>
    )
}

export default ModalWindow;