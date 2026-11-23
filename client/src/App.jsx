import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import MyList from "./pages/MyList.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import NewAndPopular from "./pages/NewAndPopular.jsx";
import Search from "./pages/Search.jsx";

function App() {
  // When the page loads, check if a user was saved in the browser earlier
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // called by Login and Register after success
  function handleLogin(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <div>
      {user && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register onLogin={handleLogin} />} />

        {/* These pages need a logged-in user, otherwise go to /login */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/movies" element={user ? <CatalogPage type="Movie" /> : <Navigate to="/login" />} />
        <Route path="/shows" element={user ? <CatalogPage type="Show" /> : <Navigate to="/login" />} />
        <Route path="/new" element={user ? <NewAndPopular /> : <Navigate to="/login" />} />
        <Route path="/search" element={user ? <Search /> : <Navigate to="/login" />} />
        <Route path="/movie/:id" element={user ? <MovieDetail /> : <Navigate to="/login" />} />
        <Route path="/mylist" element={user ? <MyList /> : <Navigate to="/login" />} />

        {/* anything else */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
