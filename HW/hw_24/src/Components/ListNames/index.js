import ListItem from "../ListItem";
import {useCallback, useState} from 'react';
import './style.css'

const names = ['name1', 'name2', 'name3', 'name4']

const ListNames = () => {
    
    const [name, setName] = useState('');
    const [list, setList] = useState(names)

    const handleChange = useCallback((event) => {
        setName(event.target.value)
    })

    const onClick = useCallback(() => {
        if(!name || list.includes(name)){
            return
        } else {
            const newList = list.concat(name);
            setList(newList);
            setName('');
        }
    }, [name])

    const findIndex = list.findIndex(item => name === item)

    const listItems = list.map((name, index) => <ListItem className={index === findIndex ? ' exist' : ''} key={index} name={name}/>)

    return(
        <>
            <input className="input" type = 'text' placeholder="Name..." value={name} onChange={handleChange}></input>
            <button className="btn" onClick={onClick}>Add name</button>
            <ul className="list-items">{listItems}</ul>  
        </>
    )
}

export default ListNames;