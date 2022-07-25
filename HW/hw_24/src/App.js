import './App.css';
import ListNames from './Components/ListNames';

const list = ['Name1', 'Name2', 'Name3'];

function App() {
  return (
    <>
    <h1 className='title'>List of names</h1>
    <ListNames></ListNames>
    </>
  );
}

export default App;
