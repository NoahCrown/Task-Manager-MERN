import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <nav>
        <Link to="/">
          <h1>ToucanTask</h1>
        </Link>
        <div>
          {user ? (
            <div className="logout">
              <button className="" onClick={handleLogout}>
                Log out
                <span class="material-symbols-outlined">logout</span>
              </button>
            </div>
          ) : (
            <div className="user-sign">
              <Link className="login" to="/login">
                Log In
              </Link>
              <Link className="signup" to="/signup">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
