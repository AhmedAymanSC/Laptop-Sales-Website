import './App.css';

import { Routes,Route} from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Home from'./Components/Home';
import Product from'./Components/ProductComp/Product';
import Admin from'./Components/AdminComp/Admin';
import AdminControl from './Components/AdminComp/AdminControl';
import Desc from './Components/ProductComp/DescriptionLink/DecsLink'
import PaymentPage from'./Components/ProductComp/Payment/PaymentPage'
import Login from './Components/LoginComp/Login';
import Register from './Components/RegisterComp/Register';
import Profile from './Components/ProfileComp/Profile';


function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home />}/>

      <Route path='/product' element={<Product />}/>

      <Route path='/admin' element={<Admin />}/> 
      <Route path="/AdminControl" element={<AdminControl />} />
      <Route path='/Description' element={<Desc/>}></Route>
      <Route path="/payment" element={<PaymentPage />} /> 

      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/profile' element={<Profile />}/>

    </Routes>

    </>
  );
}

export default App;
