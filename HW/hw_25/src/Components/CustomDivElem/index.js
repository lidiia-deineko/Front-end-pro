import './style.css'
import { MainContext } from '../../App'
import { useCallback, useContext } from 'react'


const CustomDivElem = (props) => {

    const mainContext = useContext(MainContext)

    const onClick = useCallback((event) => {
        event.stopPropagation()
        mainContext.setModalVisibleState(true)  

        const id = event.target.dataset.id
        const getDivElemById = mainContext.list.find(({id: curId}) => curId === +id);
        
        mainContext.setDivElemState(getDivElemById)
    },[mainContext.divElem])
  
     return(
        <div className='block' onClick={onClick} data-id={props.id}
            style={{ backgroundColor: props.color, top: props.top, left: props.left, height: props.height, width: props.width}}>
        </div>
     ) 
}

export default CustomDivElem;