import React from 'react';
import {FaCoins} from 'react-icons/fa';
import "./Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Link to='/'>
        <div className='navbar'>
            <FaCoins className='icon' />
            <h1>Coins.<span className='purple'>com</span></h1>
        </div>
    </Link>
  )
}

export default Navbar