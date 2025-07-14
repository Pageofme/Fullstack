// File: AddServicePage.jsx
import React from 'react';


const AddService = () => {
  return (
    <div className="main-wrapper">
    
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title mt-5">Add Service</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <form>
                <div className="row formtype">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Homestay Name</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Service Type</label>
                      <select className="form-control">
                        <option>Du lịch</option>
                        <option>Book xe</option>
                        <option>Đồ ăn</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Service Name</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Option</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Price</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>File Image Upload</label>
                      <input type="file" className="form-control" />
                    </div>
                  </div>
                </div>
              </form>
              <button type="button" className="btn btn-primary buttonedit ml-2">Add Service</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;