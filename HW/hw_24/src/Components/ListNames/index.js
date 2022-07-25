import ListItem from "../ListItem";
import {useCallback, useState} from 'react';
import './style.css'

const names = ['name1', 'name2', 'name3', 'name4']

const ListNames = () => {
    
    const [name, setName] = useState('');
    const [list, setList] = useState(names)
    const [findIndex, setFindIndex] = useState()

    const handleChange = useCallback((event) => {
        setName(event.target.value)
        setFindIndex('')
    })

    const onClick = useCallback(() => {
        if(name === ''){
            return
        }

        if(!list.includes(name)){
            const newList = list.concat(name);
            setList(newList);
            setName('');
        }else{
            const indexItem = list.indexOf(name);
            setFindIndex(indexItem)
            setName('');
        }
    })

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