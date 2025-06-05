import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    setLoginCheck(auth.loggedIn());
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Task Manager App</Link>
      </div>
      <ul>
        {!loginCheck ? (
          <>
            <li className='nav-item'>
              <Link to='/login'>
                <button type='button' className="nav-btn">Login</button>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/signup'>
                <button type='button' className="nav-btn">Sign Up</button>
              </Link>
            </li>
          </>
        ) : (
          <li className='nav-item'>
            <button type='button' onClick={() => auth.logout()} className="nav-btn">Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;