import './style.css'
import { MainContext } from '../../App'
import { useCallback, useContext, useEffect, useState } from 'react'


const CustomDivElem = (props) => {

    const modalContext = useContext(MainContext)

    const onClick = useCallback((event) => {
        event.stopPropagation()
        modalContext.setModalVisibleState(true)  

        const id = event.target.dataset.id
        const getDivElemById = modalContext.list.find(({id: curId}) => curId === +id);
        
        modalContext.setDivElemState(getDivElemById)
        console.log( modalContext.divElem)
    },[modalContext.divElem])
  
     return(
        <div className='block' onClick={onClick} data-id={props.id}
            style={{ backgroundColor: props.color, top: props.top, left: props.left, height: props.height, width: props.width}}>
        </div>
     ) 
}

export default CustomDivElem;