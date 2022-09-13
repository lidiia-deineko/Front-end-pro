import './App.css';
import {Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './components/pages/SignUp/SignUp';
import Home from './components/pages/Home/Home';
import ProtectedRoute from './ProtectedRoute';
import SignIn from './components/pages/SignIn/SignIn';

function App() {
  // const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='/sign-in' element={<SignIn />}/>

        <Route path='/home' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }/>
        <Route path='/' element={<Navigate to={'/home'} replace/>} />
      </Routes>
    </div>
  );
}

export default App;
