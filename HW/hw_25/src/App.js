import './App.css';
import CustomContainer from './Components/CustomContainer';
import CustomModal from './Components/CustomModal';
import {useCallback, useEffect, useState, createContext} from 'react';

import * as React from 'react';
import Button from '@mui/material/Button';


export const MainContext = createContext();

function App() {

  const listFromStorage = JSON.parse(localStorage.getItem('listFromStorage'))

    const [list, setList] = useState(listFromStorage || [])

    useEffect(() => {
        localStorage.setItem('listFromStorage', JSON.stringify(list))
    }, [list])

  
    //divElem - clicked block
    const [divElem, setDivElem] = useState({})

    // const onGetDivElem = useCallback((clickedDivElem) => {
  
    //   setDivElem(clickedDivElem)
    //   console.log(divElem, 'divElem')
    // }, [divElem])


  const [isModalVisible, setModalVisible] = useState(false)

  // const onShowModal = useCallback(() => {
  //   setModalVisible(!isModalVisible)
  // }, [isModalVisible])


  return (
    <div className="App">
      <h1>Home Work 25</h1>
      <MainContext.Provider value={{
        isModalVisible, 
        setModalVisibleState: setModalVisible, 
        list, 
        setListState: setList, 
        divElem, 
        setDivElemState: setDivElem}}>
      <CustomContainer />
        {/* <Button onClick={onShowModal}>{isModalVisible ? 'Hide' : 'Show'}</Button> */}
        <CustomModal  height={divElem.innerHeight} width={divElem.innerWidth} color={divElem.color}/>
      </MainContext.Provider>
      
    </div>
  );
}

export default App;
