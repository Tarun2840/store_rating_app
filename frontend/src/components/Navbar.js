import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Store Rating App</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/stores">Stores</Link>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            {user.role === 'store_owner' && <Link to="/store-owner">My Store</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;