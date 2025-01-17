import { useContext } from 'react';
import { Store } from '../Store';

function Navbar() {
  const { state, dispatch } = useContext(Store);
  const { isLoggedIn, userInfo } = state;

  const handleSignout = () => {
    dispatch({ type: 'USER_SIGNOUT' });
  };

  return (
    <header>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container">
          <a href="/" className="navbar-brand">
            Amazon Clone
          </a>

          {/* Navbar Links */}
          <div className="d-flex">
            {/* Home link */}
            <a href="/" className="btn btn-outline-light mx-2">
              Home
            </a>

            {/* Categories link */}
            <a href="/categories" className="btn btn-outline-light mx-2">
              Categories
            </a>

            {/* Cart link */}
            <a href="/cart" className="btn btn-outline-light mx-2">
              Cart
            </a>

            {/* Conditionally render content based on the user's login status */}
            {isLoggedIn ? (
              <div className="navbar-text">
                <span className="text-light me-2">Welcome, {userInfo?.name}</span>
                <button className="btn btn-outline-light" onClick={handleSignout}>
                  Sign Out
                </button>
              </div>
            ) : (
              <a href="/signin" className="btn btn-outline-light">
                Sign In
              </a>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
