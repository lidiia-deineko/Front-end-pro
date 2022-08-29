import {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import APIServices, { UserFullInfo } from "../../../services/APIServices";
import '../../../App.css'

const Home:React.FC = () => {
    
    const[userList, setUserList] = useState<UserFullInfo[]>([])

    useEffect(() => {
        APIServices.getUserList()
        .then(list => setUserList(list))
    }, [])

    const listRender = userList.map((item, index) => 
        <tr key={index}>
            <td>{item.loginName}</td>
            <td>{item.creationTime}</td>
            <td>{item.lastLoginTime}</td>
        </tr>
    )

    return <div>
        <div className="header-page">
            <Link className="link" to='/home'>Home</Link>
            <Link className="link" to='/contact-us'>Contact Us</Link>
        </div>

        <h3 className="title-page">Home</h3>

        <table className="table">
            <tbody>
                <tr>
                    <th>Login</th>
                    <th>Creation time</th>
                    <th>Last login time</th>
                </tr>
                {listRender}
            </tbody>
        </table>
    </div>
}

export default Home;