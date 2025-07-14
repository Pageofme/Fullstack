// File: ChangePasswordPage.jsx
import React from 'react';

const ChangePassword= () => (
  <div className="content container-fluid">
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Change Password</h4>
            <form>
              <div className="form-group">
                <label>Old Password</label>
                <input type="password" className="form-control" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" className="form-control" />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control" />
              </div>
              <div className="submit-section">
                <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ChangePassword;