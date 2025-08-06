import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const UserLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/', { replace: true });
  };

  return (
    <div className="user-layout">
      <header className="user-layout__header">
        <h1>Your App Name</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <nav className="user-layout__nav">
        <NavLink
          to="/user"
          end
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/user/recommend"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Recommendations
        </NavLink>
      </nav>

      <main className="user-layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;