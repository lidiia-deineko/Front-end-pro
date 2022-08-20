import './App.css';
import CustomContainer from './Components/CustomContainer';
import CustomModal from './Components/CustomModal';
import {useCallback, useEffect, useState, createContext} from 'react';

import * as React from 'react';
import Button from '@mui/material/Button';
import Reset from './Components/Reset';
import Shaking from './Components/Shaking';


export const MainContext = createContext();

function App() {

  const listFromStorage = JSON.parse(localStorage.getItem('listFromStorage'))

    const [list, setList] = useState(listFromStorage || [])

    useEffect(() => {
        localStorage.setItem('listFromStorage', JSON.stringify(list))
    }, [list])

  const [divElem, setDivElem] = useState({})

  const [isModalVisible, setModalVisible] = useState(false)

  return (
    <div className="App">
      <MainContext.Provider value={{
        isModalVisible, 
        setModalVisibleState: setModalVisible, 
        list, 
        setListState: setList, 
        divElem, 
        setDivElemState: setDivElem}}>
        <div className='btns'>
          <Reset /> 
          <Shaking />
        </div>
        <CustomContainer />
          <CustomModal  height={divElem.innerHeight} width={divElem.innerWidth} color={divElem.color}/>
        </MainContext.Provider>
    </div>
  );
}

export default App;
