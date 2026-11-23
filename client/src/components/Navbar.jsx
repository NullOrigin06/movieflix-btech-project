import { Link, NavLink } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const initial = user.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <nav className="navbar">
      <Link to="/" className="logo" aria-label="Movieflix home">
        <span className="logo-mark">M</span>
        <span>MOVIEFLIX</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end className="nav-link">Home</NavLink>
        <NavLink to="/mylist" className="nav-link">My List</NavLink>
      </div>

      <div className="nav-right">
        <div className="user-summary" title={user.name}>
          <span className="user-avatar" aria-hidden="true">{initial}</span>
          <span className="user-name">{user.name}</span>
        </div>
        <button onClick={onLogout} className="btn-small" aria-label={`Log out ${user.name}`}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
