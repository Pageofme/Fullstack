// File: EditProfilePage.jsx
import React from 'react';

const EditProfile = () => (
  <div className="content container-fluid">
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Edit Profile</h4>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" defaultValue="John" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" defaultValue="Doe" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" defaultValue="john@example.com" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="text" className="form-control" defaultValue="0123456789" />
                  </div>
                </div>
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

export default EditProfile;