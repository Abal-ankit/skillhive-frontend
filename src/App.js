import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
// import AuthLayout from './pages/AuthLayout';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='signup' element={<Signup/>}></Route>
          <Route path='profile' element={<Profile/>}></Route>
        {/* <Route element={<AuthLayout/>}>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
