import React, { useState, useEffect } from 'react';
import '../css/LoginSignup.css';
import { Link } from 'react-router-dom';

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login/signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("token-info"));
    if (tokenData) {
      setIsLogged(true);
      setName(tokenData.name);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password };

    if (isSignup) {
      // Signup: Save user in localStorage users array
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.find((user) => user.email === email);

      if (userExists) {
        alert("User already exists. Please login.");
        return;
      }

      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful! You can now log in.");
      setIsSignup(false);
      setName("");
      setEmail("");
      setPassword("");
    } else {
      // Login: Check credentials
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (existingUser) {
        localStorage.setItem("token-info", JSON.stringify(existingUser));
        setIsLogged(true);
        setName(existingUser.name);
        setEmail("");
        setPassword("");
      } else {
        alert("Invalid email or password.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token-info");
    setIsLogged(false);
    setName("");
  };

  return (
    <div className="login-container">
      {!isLogged ? (
        <div className="login-box">
          <h2>{isSignup ? "Signup" : "Login"}</h2>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn">
              {isSignup ? "Signup" : "Login"}
            </button>
          </form>
          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => setIsSignup(!isSignup)}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {isSignup ? "Login" : "Signup"}
            </span>
          </p>
        </div>
      ) : (
        <div className="welcome-box">
          <h2>Welcome, {name}!</h2>
          <p>You are logged in.</p>
          <Link to="/dash">
            <button className="btn logout-btn">Go to Dashboard</button>
          </Link>
          <button className="btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
