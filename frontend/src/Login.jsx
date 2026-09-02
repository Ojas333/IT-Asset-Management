import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* LEFT BRANDING PANEL */}
        <div className="login-brand">

          <div className="brand-content">

            <div className="brand-icon">
              💻
            </div>

            <h1>IT Asset Hub</h1>

            <p>
              Enterprise IT Asset & Service Management
            </p>

            <div className="brand-divider"></div>

            <div className="brand-features">
              <div>
                <span>✓</span>
                Centralized Asset Management
              </div>

              <div>
                <span>✓</span>
                Service Request Tracking
              </div>

              <div>
                <span>✓</span>
                Real-Time IT Operations Dashboard
              </div>
            </div>

          </div>

          <div className="brand-footer">
            IT Operations Portal
          </div>

        </div>


        {/* RIGHT LOGIN PANEL */}
        <div className="login-card">

          <div className="login-header">

            <div className="login-logo">
              🔐
            </div>

            <h2>Welcome Back</h2>

            <p>
              Sign in to access your IT operations dashboard
            </p>

          </div>


          <form onSubmit={handleLogin}>

            <div className="login-form-group">

              <label>Username</label>

              <div className="input-wrapper">
                <span>👤</span>

                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>

            </div>


            <div className="login-form-group">

              <label>Password</label>

              <div className="input-wrapper">
                <span>🔒</span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>

            </div>


            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}


            <button
              type="submit"
              className="login-button"
            >
              Sign In
              <span>→</span>
            </button>

          </form>


          <div className="login-demo">

            <span>Demo Access</span>

            <div>
              Username: <strong>admin</strong>
              &nbsp; | &nbsp;
              Password: <strong>admin123</strong>
            </div>

          </div>


          <div className="login-security">
            🔒 Secure Administrative Access
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;