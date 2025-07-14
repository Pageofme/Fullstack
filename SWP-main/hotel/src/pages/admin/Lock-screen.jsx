// File: LockScreenPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LockScreen = () => (
  <div className="main-wrapper login-body">
    <div className="login-wrapper">
      <div className="container">
        <div className="loginbox">
          <div className="login-left">
            <img className="img-fluid" src="assets/img/logo.png" alt="Logo" />
          </div>
          <div className="login-right">
            <div className="login-right-wrap">
              <div className="lock-user">
                <img className="rounded-circle" src="assets/img/profiles/avatar-02.jpg" alt="User" />
                <h4>John Doe</h4>
              </div>
              <form action="/index">
                <div className="form-group">
                  <input className="form-control" type="password" placeholder="Password" />
                </div>
                <div className="form-group mb-0">
                  <button className="btn btn-primary btn-block" type="submit">Enter</button>
                </div>
              </form>
              <div className="text-center dont-have">
                Sign in as a different user? <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LockScreen;