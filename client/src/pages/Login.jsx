import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api.js";
import usePageTitle from "../hooks/usePageTitle.js";

function Login({ onLogin }) {
  usePageTitle("Log in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading
    setError("");

    try {
      const data = await loginUser(email, password);
      onLogin(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-intro">
          <Link to="/" className="logo auth-logo"><span className="logo-mark">M</span><span>MOVIEFLIX</span></Link>
          <div><span className="page-eyebrow">Movie night starts here</span><h1>Stories for every mood.</h1><p>Browse movies, save your favourites, and continue watching whenever you return.</p></div>
        </section>
        <form className="auth-box" onSubmit={handleSubmit}>
          <span className="auth-kicker">Welcome back</span><h2>Sign in to Movieflix</h2><p className="auth-subtitle">Enter your details to continue watching.</p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-field"><label htmlFor="login-email">Email address</label><input id="login-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div className="form-field"><label htmlFor="login-password">Password</label><input id="login-password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          <button type="submit" className="btn btn-primary auth-submit">Sign in</button>
          <p className="auth-switch">New to Movieflix? <Link to="/register">Create an account</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
