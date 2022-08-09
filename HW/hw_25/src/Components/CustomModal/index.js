import { useCallback, useContext, useEffect, useState } from 'react'
import { MainContext } from '../../App'
import './style.css'

import * as React from 'react';
import {Modal, Box} from '@mui/material';

const CustomModal = (props) => {

    const [showState, setShowState] = useState(false)

    //новое значение введенное в инпут
    const [value, updateValue] = useState('')

    const modalContext = useContext(MainContext)

    useEffect(() => {
        setShowState(modalContext.isModalVisible)
    }, [modalContext.isModalVisible])
    

    const onHide = useCallback(() => {
        modalContext.setModalVisibleState(false)
    }, [])


    // const onClickInsideModal = useCallback((event) => {
    //     event.stopPropagation()
    // })

    const handleChange = useCallback((event) => {
        console.log(event.target.value)
        updateValue(event.target.value)
        
    })

    const changeValue = useCallback(() => {
        console.log(modalContext.divElem, '1')

        modalContext.divElem.innerHeight = `${value}px`


        const idElem = modalContext.divElem.id
        console.log(idElem)


        const index = modalContext.list.findIndex((element) => {
            if(element.id === idElem){
                return true
            }
        })

        console.log('index', index)

        const newList = [...modalContext.list]

        newList[index].innerHeight = `${value}px`
        
        modalContext.setListState(newList)

        console.log(newList, 'newList')

        console.log(modalContext.list, 'List')




        modalContext.setDivElemState(modalContext.divElem)
      
        updateValue('')
        modalContext.setModalVisibleState(false)
    
    }, [value])


    if(!showState){
        return;
    }

    // return (
    //     <div onClick={onHide} className="Modal-Wrapper">
    //         <div className='Modal-Inner' onClick={onClickInsideModal}>
    //             <h1>Info about element:</h1>
    //             <div>Heihgt: <span>{props.height}</span></div>
    //             <div>Width: <span>{props.width}</span></div>
    //             <div>Color: <span>{props.color}</span></div>
    //         </div>
    //     </div>
    // )

    return (
        <Modal
            open={showState}
            onClose={onHide}
        >
           <Box className='Modal-Inner'>
            <div className='Modal-Inner'>
                    <h1>Info about element:</h1>
                    <div>
                        <div>Heihgt: <span>{props.height}</span></div>
                        <input className="input" type = 'text' placeholder="New value..." value={value}  onChange={handleChange}></input>
                        <button className="btn" onClick={changeValue}>Add value</button>
                    </div>
                   
                    <div>Width: <span>{props.width}</span></div>
                    <div>Color: <span>{props.color}</span></div>
                </div>
            </Box>
        </Modal>
    )
    
}

export default CustomModal;