import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import '../../../App.css'
import APIServices from "../../../services/APIServices";

const ContactUs:React.FC = () => {

    const [msg, setMsg] = useState<string>('');
    const [isEmptyFields, setStatusError] = useState<boolean>(false)

    const sendMsg = useCallback(() => {
        if(msg.length === 0){
            setStatusError(true)
        }else{
            APIServices.saveMsg({msg})
            .then(resp => {
                if(resp){
                    setMsg('')
                    setStatusError(false)
                } else {
                    console.error('Message was not sent!')
                }
            })
        }
        
    }, [msg])

    const changeMsg = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsg(event.target.value)
    }, [msg])

 
    return <div>
        <div className="header-page">
            <Link className="link" to='/home'>Home</Link>
            <Link className="link" to='/contact-us'>Contact Us</Link>
        </div>
        
        <h3 className="title-page">Contact Us</h3>

        <div className="container">
            <textarea className="tarea" autoFocus placeholder="Enter your message..." name="" value={msg} onChange={changeMsg} />
            <button className="btn-textarea" onClick={sendMsg}>Send message</button>
        </div>
        

        {isEmptyFields && <div className="error">You have not entered a message!</div>}
    </div>
}

export default ContactUs;