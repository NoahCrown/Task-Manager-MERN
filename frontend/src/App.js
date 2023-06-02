import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';


function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">


      <BrowserRouter>
        <Navbar/>
          <div className='pages'>
            <Routes>
              <Route path='/' element={ <Home/>}/>
              <Route path='/tasks' element={user ? <Tasks/> : <Navigate to='/login'/>}/>
              <Route path='/login' element={!user ? <Login/> : <Navigate to='/tasks'/>}/>
              <Route path='/signup' element={!user ? <Signup/>: <Navigate to='/tasks'/>}/>
            </Routes>
          </div>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
