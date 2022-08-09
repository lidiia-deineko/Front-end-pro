import { useCallback, useContext, useEffect, useState } from 'react'
import { MainContext } from '../../App'
import './style.css'

import * as React from 'react';
import {Modal, Box} from '@mui/material';

const CustomModal = (props) => {

    const [showState, setShowState] = useState(false)

    //новое значение введенное в инпут
    const [valueHeight, updateValueHeight] = useState('');
    const [valueWidth, updateValueWidth] = useState('');
    const [valueColor, updateValueColor] = useState('');

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

    const handleChangeHeight = useCallback((event) => {
        console.log(event.target.value)
        updateValueHeight(event.target.value)
    })

    const handleChangeWidth = useCallback((event) => {
        console.log(event.target.value)
        updateValueWidth(event.target.value)
    })

    const handleChangeColor = useCallback((event) => {
        console.log(event.target.value)
        updateValueColor(event.target.value)
    })



    const changeValues = useCallback(() => {
        console.log(modalContext.divElem, '1')

        modalContext.divElem.innerHeight = `${valueHeight}px`

        const idElem = modalContext.divElem.id

        const index = modalContext.list.findIndex((element) => {
            if(element.id === idElem){
                return true
            }
        })

        const newList = [...modalContext.list]

        if(valueHeight.length === 0 ||valueWidth.length === 0 || valueColor === 0){
            return
        } else {
            newList[index].innerHeight = `${valueHeight}px`;
            newList[index].innerWidth = `${valueWidth}px`;
            newList[index].color = `${valueColor}`;
        }
        
        modalContext.setListState(newList)

        modalContext.setDivElemState(modalContext.divElem)
      
        updateValueHeight('')
        updateValueWidth('')
        updateValueColor('')

        modalContext.setModalVisibleState(false)
    
    }, [valueHeight, valueWidth, valueColor])


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
                        <input className="input" type = 'text' placeholder="New value..." value={valueHeight}  onChange={handleChangeHeight}></input>
                        
                    </div>
                    <div>
                        <div>Width: <span>{props.width}</span></div>
                        <input className="input" type = 'text' placeholder="New value..." value={valueWidth}  onChange={handleChangeWidth}></input>
                        
                    </div>
                    <div>
                        <div>Color: <span>{props.color}</span></div>
                        <input className="input" type = 'text' placeholder="New value..." value={valueColor}  onChange={handleChangeColor}></input>
                        
                    </div>
                   
                    
                    <button className="btn" onClick={changeValues}>Add value</button>
                </div>
            </Box>
        </Modal>
    )
    
}

export default CustomModal;