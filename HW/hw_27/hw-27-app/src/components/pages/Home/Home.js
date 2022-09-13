import {useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../../App.css'
import { useSelector, useDispatch } from 'react-redux';
import BookList from "./components/BookList/BookList";
import UserBookList from "./components/UserBookList/UserBookList";
import UserServices from "../../../services/UserServices";


const Home = () => {
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    const signOut = useCallback(() => {
        UserServices.deleteFromStorage()
        navigate('/sign-in')
    }, [])

    return <div>
        <div className="header-page">
            <Link className="link" to='/home'>Home</Link>
            <Link onClick={signOut} className="link link-border" to='/sign-in'>Log out</Link>
        </div>

        <div className="container-books">
            <BookList />
            <UserBookList />
        </div>
        
    </div>
}

export default Home;