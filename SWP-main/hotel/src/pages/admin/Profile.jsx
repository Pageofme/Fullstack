import React from 'react';


const Profile = () => {
  return (
    <div className="main-wrapper">
  
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="profile-header">
                <div className="row align-items-center">
                  <div className="col-auto profile-image">
                    <a href="#">
                      <img className="rounded-circle" alt="User" src="/assets/img/a1.jpg" />
                    </a>
                  </div>
                  <div className="col ml-md-n2 profile-user-info">
                    <h4 className="user-name mb-0">Soeng Souy</h4>
                    <h6 className="text-muted">Administrator</h6>
                    <div className="user-Location">
                      <i className="fa fa-map-marker"></i> Cambodia
                    </div>
                    <div className="about-text">Lorem ipsum dolor sit amet.</div>
                  </div>
                </div>
              </div>

              <div className="tab-content profile-tab-cont">
                <div className="tab-pane fade show active" id="per_details_tab">
                  <div className="row">
                    <div className="col-lg-9">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title d-flex justify-content-between">
                            <span>Personal Details</span>
                            <a className="edit-link" href="#">
                              <i className="fa fa-edit mr-1"></i>Edit
                            </a>
                          </h5>
                          <div className="row">
                            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Name</p>
                            <p className="col-sm-9">Soeng Souy</p>
                          </div>
                          <div className="row">
                            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Date of Birth</p>
                            <p className="col-sm-9">24 Jul 1983</p>
                          </div>
                          <div className="row">
                            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Email ID</p>
                            <p className="col-sm-9">soengsouy@example.com</p>
                          </div>
                          <div className="row">
                            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Mobile</p>
                            <p className="col-sm-9">+855 123456789</p>
                          </div>
                          <div className="row">
                            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Address</p>
                            <p className="col-sm-9 mb-0">Phnom Penh, Cambodia</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title d-flex justify-content-between">
                            <span>Account Status</span>
                            <a className="edit-link" href="#">
                              <i className="fa fa-edit mr-1"></i> Edit
                            </a>
                          </h5>
                          <button className="btn btn-success w-100">Active</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;