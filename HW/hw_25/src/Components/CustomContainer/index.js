
import {useCallback, useEffect, useState, useContext} from 'react';
import { getColorService } from '../../Services/getColorService';
import CustomDivElem from '../CustomDivElem';
import './style.css'

import { MainContext } from '../../App'

const CustomContainer = (props) => {

    const modalContext = useContext(MainContext)
    console.log(modalContext.list)

    // const listFromStorage = JSON.parse(localStorage.getItem('listFromStorage'))

    // const [list, setList] = useState(listFromStorage || [])

    const color = `rgb(${getColorService()}, ${getColorService()}, ${getColorService()})`

    // useEffect(() => {
    //     localStorage.setItem('listFromStorage', JSON.stringify(list))
    // }, [list])

 

    const onClick = useCallback((event) => {
        const newList = modalContext.list.concat({ id: Date.now(), left: event.clientX, top: event.clientY, color: color, innerHeight: '100px', innerWidth: '100px'})
        modalContext.setListState(newList)
        console.log(event)
    }, [modalContext.list])

    const listRender = modalContext.list.map((item, index) => 
        <CustomDivElem
            id={item.id}
            key={index} 
            top={item.top} 
            left={item.left} 
            color={item.color} 
            height={item.innerHeight} 
            width={item.innerWidth}
        />)

    return(
       <div className='container' onClick={onClick}>
            {listRender} 
       </div>
    )
}

export default CustomContainer;