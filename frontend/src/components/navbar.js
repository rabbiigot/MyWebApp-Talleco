import { GiHamburgerMenu, GiGiftOfKnowledge } from "react-icons/gi";
import { IoReturnDownBack } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import logo from '../img/R.png'
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({navbarShow, navbarSet}) => {
    const callNavbar = () => {
        navbarSet(!navbarShow);
    };
    const navigate = useNavigate();
    const handleClick = (e, path) => {
        e.preventDefault(); 
        navigate(path); 
      };

    return(
        <div className={navbarShow? 'navbar':'navbar active'}> 
            <div className="nav-icons">
                <a href="/">
                    <img src={logo} alt="logo" className={navbarShow? 'logo-hide':'logo'} />
                </a>
                <GiHamburgerMenu className={navbarShow? 'burger-btn-true':'burger-btn'} onClick={()=>{navbarSet(false)}}/>
                <IoReturnDownBack className={navbarShow? 'back-btn-false':'back-btn'} onClick={callNavbar}/>
                <hr/>
            </div>
            
            <div className={navbarShow? 'nav-list-ahide':'nav-list'} >
                <ul>
                    <li>
                        <a href="/" onClick={(e) => handleClick(e, '/')}><CgProfile /></a>
                        <a className='text' href="/" onClick={(e) => handleClick(e, '/')}>Products</a>
                    </li>
                    <li>
                        <a href="/software-knowledge" onClick={(e) => handleClick(e, '/orders')}><GiGiftOfKnowledge /></a>
                        <a className='text' href="/orders" onClick={(e) => handleClick(e, '/orders')}>
                            Orders
                        </a>
                    </li>
                </ul>
                <div className="footer">
                    Created using React.js
                </div>
            </div>
        </div>
    )
}

export default Navbar;


