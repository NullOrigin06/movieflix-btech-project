import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api.js";

function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const data = await registerUser(name, email, password);
      onLogin(data); // registering also logs you in
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-intro">
          <Link to="/" className="logo auth-logo"><span className="logo-mark">M</span><span>MOVIEFLIX</span></Link>
          <div><span className="page-eyebrow">Your personal watchlist</span><h1>Good movies deserve a good home.</h1><p>Create an account to collect favourites and pick up where you left off.</p></div>
        </section>
        <form className="auth-box" onSubmit={handleSubmit}>
          <span className="auth-kicker">Get started</span><h2>Create your account</h2><p className="auth-subtitle">It only takes a minute.</p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-field"><label htmlFor="register-name">Full name</label><input id="register-name" name="name" type="text" placeholder="Your name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required /></div>
          <div className="form-field"><label htmlFor="register-email">Email address</label><input id="register-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div className="form-field"><label htmlFor="register-password">Password</label><input id="register-password" name="password" type="password" placeholder="Minimum 6 characters" autoComplete="new-password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          <button type="submit" className="btn btn-primary auth-submit">Create account</button>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
