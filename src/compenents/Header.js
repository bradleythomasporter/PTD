const Header = ({ onShowSignup }) => (
    <header className="header">
      <div className="header-content">
        <a href="/" className="logo">Planted 🌱</a>
        <nav className="nav">
          <a href="/shop" className="nav-link">Shop</a>
          <a href="/about" className="nav-link">About</a>
          {isLoggedIn ? (
            <>
              <a href="/profile" className="nav-link">Profile</a>
              <button onClick={() => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
              }} className="button">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => onShowSignup('login')} className="nav-link">Login</button>
              <button onClick={() => onShowSignup('register')} className="signup-button">
                Join as Grower
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );