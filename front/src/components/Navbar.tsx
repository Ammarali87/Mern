import { useContext, useState } from 'react';
import { Store } from '../Store';

function Navbar() {
  const { dispatch } = useContext(Store);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const token = localStorage.getItem('token') ? true : false;

  const handleSignout = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <header>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container d-flex justify-content-between align-items-center">
          <a href="/" className="navbar-brand">
            Amazon Clone
          </a>

          {/* Menu Toggle Button (Visible only on mobile screens) */}
          <button
            className="btn btn-outline-light d-md-none"
            onClick={toggleMenu}
          >
            Menu
          </button>

          {/* Navbar Links */}
          <div
            id="navbar"
            className={`${
              isMenuVisible ? 'd-block' : 'd-none'
            }  d-md-flex flex-column flex-md-row gap-2 mt-2 mt-md-0`}
          >
            <a href="/" className="btn btn-outline-light mx-2">
              Home
            </a>
            <a href="/categories" className="btn btn-outline-light mx-2">
              Categories
            </a>
            <a href="/cart" className="btn btn-outline-light mx-2">
              Cart
            </a>
            <span className="text-light mx-3 bg-warning p-1 btn">Welcome!</span>
            {token ? (
              <button
                className="btn mt-2 btn-outline-light mx-2"
                onClick={handleSignout}
              >
                Sign Out
              </button>
            ) : (
              <>
                <a href="/signUp" className="btn mx-2 btn-outline-light">
                  Sign In
                </a>
                <a href="/signIn" className="btn btn-outline-light mx-2">
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
