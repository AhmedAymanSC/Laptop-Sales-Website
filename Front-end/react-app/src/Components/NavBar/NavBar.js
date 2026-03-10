import React from 'react';
import './NavCss.css';
import {Link} from 'react-router-dom';
import logo from '../images/logo.jpg';

function NavBar(){
return(
    
    <nav className=" nav nav-items">
        <div><Link className='anchor' to='/'><img src={logo} alt="logo" className='logo-img' /></Link></div>
        <div>
        <ul className="ul-items">
            <li><Link className='anchor' to='/'>Home</Link></li>
            <li><Link className='anchor' to='/product'>Product</Link></li>
            <li><Link className='anchor' to='/admin'>Admin</Link></li>

            {/* <li><Link className='anchor' to='/register'>Register</Link></li>
            <li><Link className='anchor' to='/login'>Login</Link></li> */}
            
        </ul>
        </div>
    </nav>
    
);
}
export default NavBar;