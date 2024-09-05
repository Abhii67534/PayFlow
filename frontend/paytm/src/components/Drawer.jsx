import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Drawer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogged, setIsLogged] = useState (false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.clear();
    setIsLogged(false)
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLogged(!!token);
  }, [location])

  return (
    <div className=''>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full bg-black bg-opacity-90">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div className="font-moderustic mx-2 flex-1 px-2"><a href="/">PAYFLOW</a></div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                {isLogged ? (<>
                  <li><a href="/dashboard">Dashboard</a></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>

                ) : (
                  <li><a href="/signin">SignIn</a></li>
                )}

              </ul>
            </div>
          </div>
          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-black bg-opacity-90 min-h-full w-80 p-4 text-white">
            {/* Sidebar content here */}
            {isLogged ? (<>
                  <li><a href="/dashboard">Dashboard</a></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>

                ) : (
                  <li><a href="/signin">SignIn</a></li>
                )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
