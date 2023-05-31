import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
          <div className='pages'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/tasks' element={<Tasks/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
            </Routes>

          </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
