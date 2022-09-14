import { useCallback, useState } from "react"
import '../../../App.css'
import { Link, useNavigate } from "react-router-dom"
import APIServices from "../../../services/APIServices"
import UserServices from "../../../services/UserServices"

const SignIn = () => {

    const[loginName, setLoginName] = useState('')
    const[password, setPassword] = useState('')
    const [isCorrectPassword, setErrorPassword] = useState(false);
    const [isUser, setErrorUser] = useState(false)
    const[isEmptyFields, setErrorEmptyFields] = useState(false)
    const [isError, setErrorStatus] = useState(false);
    const navigate = useNavigate();
  
    const cleanErrors = () => {
        setErrorPassword(false);
        setErrorUser(false);
        setErrorStatus(false);
    }

    const onSignIn = useCallback(() => {
        if(loginName.length !== 0 || password.length !== 0){
            setErrorEmptyFields(false)
        }
        if(loginName.length == 0 || password.length == 0){
            setErrorEmptyFields(true)
        } else {
            APIServices
            .login({loginName, password})
            .then(resp => {
                console.log(resp)
                if(resp.response){
                    const userId = resp.id
                    UserServices.putToStorage({userId})
                    APIServices.updateLodin({loginName})
                        .then(resp => {
                            if(resp){
                                navigate('/home');
                            }
                        })
                    return;
                }
                if(!resp.response){
                    setErrorStatus(true);
                    UserServices.deleteFromStorage();
                }
            })
        }   
    }, [loginName, password])

    const changeLogin = useCallback((event) => {
        setLoginName(event.target.value);
        cleanErrors();
    }, [])

    const changePassword = useCallback((event) => {
        setPassword(event.target.value);
        cleanErrors();
    }, [])

    return <div>
        <div className="header">
            <Link className="link" to='/sign-in'>Sign In</Link>
            <Link className="link" to='/sign-up'>Sign Up</Link>
        </div>
        
        <h3 className="title">Sign In</h3>

        <div className="form">
            <div className="form-item">
                <label className="label" htmlFor="login">Login: </label> <br />
                <input className="input" type="text" autoComplete="off" id="login" value={loginName} onChange={changeLogin} />
            </div>

            <div className="form-item">
                <label className="label" htmlFor="password">Password: </label> <br />
                <input className="input" type="password" id="password" value={password} onChange={changePassword} />
            </div>

            <button onClick={onSignIn} className="btn">Sign in</button>

            {isUser && <div className="error">This login is already taken. Please, try another.</div>}
            {isEmptyFields && <div className="error">There are empty fields!</div>}
            {isError && <div className="error">User or password is incorrect!</div>}
        </div>
    </div>
}

export default SignIn