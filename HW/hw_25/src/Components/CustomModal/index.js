import { useCallback, useContext, useEffect, useState } from 'react'
import { MainContext } from '../../App'
import './style.css'
import closeBtn from './images/close-btn.svg';
import * as React from 'react';
import {Modal, Box} from '@mui/material';

const CustomModal = (props) => {

    const [showState, setShowState] = useState(false)

    const [valueHeight, updateValueHeight] = useState('');
    const [valueWidth, updateValueWidth] = useState('');
    const [valueColor, updateValueColor] = useState('');

    const mainContext = useContext(MainContext)

    useEffect(() => {
        setShowState(mainContext.isModalVisible)
    }, [mainContext.isModalVisible])
    

    const onHide = useCallback(() => {
        mainContext.setModalVisibleState(false)
    }, [])

    const handleChangeHeight = useCallback((event) => {
        updateValueHeight(event.target.value)
    })

    const handleChangeWidth = useCallback((event) => {
        updateValueWidth(event.target.value)
    })

    const handleChangeColor = useCallback((event) => {
        updateValueColor(event.target.value)
    })

    const changeValues = useCallback(() => {

        const idElem = mainContext.divElem.id

        const index = mainContext.list.findIndex((element) => {
            if(element.id === idElem){
                return true
            }
        })

        const newList = [...mainContext.list]

        const warn = document.querySelector('.warn')

        if(valueHeight.length === 0 ||valueWidth.length === 0 || valueColor.length === 0){
            warn.classList.add('show')
            return
        } else {
            newList[index].innerHeight = `${valueHeight}px`;
            newList[index].innerWidth = `${valueWidth}px`;
            newList[index].color = `${valueColor}`;
            warn.classList.remove('show')
        }
        
        mainContext.setListState(newList)

        mainContext.setDivElemState(mainContext.divElem)
      
        updateValueHeight('')
        updateValueWidth('')
        updateValueColor('')

        mainContext.setModalVisibleState(false)

    }, [valueHeight, valueWidth, valueColor])


    if(!showState){
        return;
    }

    return (
        <Modal
            open={showState}
            onClose={onHide}
        >
           <Box className='Modal-Inner'>
            <div className='Modal-Inner'>
                    <img onClick={onHide} className='closeBtn' src={closeBtn} />
                    <h1>Info about element:</h1>
                    <div>
                        <div className='text'>Heihgt: <span>{props.height}</span></div>
                        <input className="input" type = 'number'  placeholder="New value..." value={valueHeight}  onChange={handleChangeHeight}></input>
                        
                    </div>
                    <div>
                        <div className='text'>Width: <span>{props.width}</span></div>
                        <input className="input" type = 'number'  placeholder="New value..." value={valueWidth}  onChange={handleChangeWidth}></input>
                        
                    </div>
                    <div>
                        <div className='text'>Color: <span>{props.color}</span></div>
                        <input className="input" type = 'text'  placeholder="New value..." value={valueColor}  onChange={handleChangeColor}></input>
                    </div>
                    
                    <button className="btn" onClick={changeValues}>Add value</button> <span className='warn'>There are empty fields!</span>
                    <span></span>
                </div>
            </Box>
        </Modal>
    )
}

export default CustomModal;