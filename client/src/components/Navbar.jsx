import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const initial = user.name?.trim().charAt(0).toUpperCase() || "U";
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();
    if (!search.trim()) {
      setSearchOpen((open) => !open);
      return;
    }
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo" aria-label="Movieflix home">
        <span className="logo-mark">M</span>
        <span>MOVIEFLIX</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end className="nav-link">Home</NavLink>
        <NavLink to="/shows" className="nav-link">TV Shows</NavLink>
        <NavLink to="/movies" className="nav-link">Movies</NavLink>
        <NavLink to="/new" className="nav-link">New &amp; Popular</NavLink>
        <NavLink to="/mylist" className="nav-link">My List</NavLink>
      </div>

      <div className="nav-right">
        <form className={searchOpen ? "nav-search open" : "nav-search"} onSubmit={handleSearch} role="search">
          {searchOpen && <input autoFocus type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Titles, people, genres" aria-label="Search MovieFlix" />}
          <button type="submit" className="nav-search-button" aria-label={searchOpen ? "Submit search" : "Open search"}>⌕</button>
        </form>
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
