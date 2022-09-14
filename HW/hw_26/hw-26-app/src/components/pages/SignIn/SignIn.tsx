import { useCallback, useState } from "react"
import '../../../App.css'
import { Link, useNavigate } from "react-router-dom"
import APIServices from "../../../services/APIServices"
import UserService from "../../../services/UserService"

const SignIn:React.FC = () => {
    const[loginName, setLoginName] = useState<string>('')
    const[password, setPassword] = useState<string>('')
    const [isCorrectPassword, setErrorPassword] = useState<boolean>(false);
    const [isUser, setErrorUser] = useState<boolean>(false)
    const[isEmptyFields, setErrorEmptyFields] = useState<boolean>(false)
    const [isError, setErrorStatus] = useState<boolean>(false);
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
                if(resp){
                    UserService.putToStorage({loginName, password})
                    APIServices.updateLodin({loginName})
                        .then(resp => {
                            if(resp){
                                navigate('/home');
                            }
                        })
                    return;
                }
                if(!resp){
                    setErrorStatus(true);
                    UserService.deleteFromStorage();
                }
            })
        }   
        
    }, [loginName, password])

    const changeLogin = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginName(event.target.value);
        cleanErrors();
    }, [])

    const changePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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