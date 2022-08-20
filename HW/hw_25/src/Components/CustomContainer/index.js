import {useCallback, useContext} from 'react';
import { getColorService } from '../../Services/getService';
import CustomDivElem from '../CustomDivElem';
import './style.css'
import { MainContext } from '../../App'

const CustomContainer = () => {
    const mainContext = useContext(MainContext)

    const color = `rgb(${getColorService()}, ${getColorService()}, ${getColorService()})`

    const onClick = useCallback((event) => {
        const newList = mainContext.list.concat({ id: Date.now(), left: event.clientX, top: event.clientY, color: color, innerHeight: '100px', innerWidth: '100px'})
        mainContext.setListState(newList)
    }, [mainContext.list])

    const listRender = mainContext.list.map((item, index) => 
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