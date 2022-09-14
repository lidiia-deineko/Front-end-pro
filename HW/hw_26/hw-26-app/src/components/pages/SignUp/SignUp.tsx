import { useCallback, useState } from "react";
import '../../../App.css'
import { Link, useNavigate } from "react-router-dom";
import APIService from "../../../services/APIServices";
import UserService from "../../../services/UserService";


const SignUp: React.FC = () => {
    const[loginName, setLoginName] = useState<string>('')
    const[password, setPassword] = useState<string>('')
    const[repeatPassword, setRepeatPassword] = useState<string>('')
    const [isCorrectPassword, setErrorPassword] = useState<boolean>(false);
    const [isUser, setErrorUser] = useState<boolean>(false)
    const[isEmptyFields, setErrorEmptyFields] = useState<boolean>(false)
    const navigate = useNavigate();

    const cleanErrors = () => {
        setErrorPassword(false);
        setErrorUser(false);
    }

    const onSignUp = useCallback(() => {

        if(loginName.length !== 0 || password.length !== 0 || repeatPassword.length !== 0){
            setErrorEmptyFields(false)
        }

        if(loginName.length == 0 || password.length == 0 || repeatPassword.length == 0){
            setErrorEmptyFields(true)
        }else if(password !== repeatPassword ){
            setErrorPassword(true)
        }else{
            APIService
            .getUserList()
            .then(userList => {
                const isUser = userList.find(elem => elem.loginName === loginName)
                if(isUser && loginName.length !== 0){
                    setErrorUser(true)
                } else {
                    setErrorPassword(false);
                    setErrorUser(false)
                    APIService.createUser({loginName, password})
                        .then(resp => { 
                            if(resp){
                                UserService.putToStorage({loginName, password})
                                navigate('/home');
                            }
                            if(!resp){
                                UserService.deleteFromStorage()
                            }

                        })
                }
            })
        }  
        
    }, [loginName, password, repeatPassword])


    const changeLogin = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginName(event.target.value)
        cleanErrors()
    }, [])

    const changePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
        cleanErrors()
    }, [])

    const changeRepeatPassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(event.target.value)
        cleanErrors()
    }, [])
    
    return <div>
        <div className="header">
            <Link className="link" to='/sign-in'>Sign In</Link>
            <Link className="link" to='/sign-up'>Sign Up</Link>
        </div>
        
        <h3 className="title">Sign Up</h3>

        <div className="form">
            <div className="form-item">
                <label className="label" htmlFor="login">Login: </label> <br />
                <input className="input" type="text" required autoComplete="off" id="login" value={loginName} onChange={changeLogin} />
            </div>

            <div className="form-item">
                <label className="label" htmlFor="password">Password: </label> <br />
                <input className="input" type="password" id="password" value={password} onChange={changePassword} />
            </div>

            <div className="form-item">
            <label className="label" htmlFor="repeat-password">Repeat password: </label> <br />
            <input className="input" type="password" id="repeat-password" value={repeatPassword} onChange={changeRepeatPassword} />
            </div>

            <button onClick={onSignUp} className="btn">Sign up</button>

            {isCorrectPassword && <div className="error">Passwords do not match!</div>}
            {isUser && <div className="error">This login is already taken. Please, try another.</div>}
            {isEmptyFields && <div className="error">There are empty fields!</div>}
        </div>
        
    </div>
}

export default SignUp;