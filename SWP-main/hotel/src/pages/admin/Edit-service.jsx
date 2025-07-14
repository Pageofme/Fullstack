// File: EditServicePage.jsx
import React from 'react';


const EditService = () => {
  return (
    <div className="main-wrapper">
     
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title mt-5">Edit Service</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <form>
                <div className="row formtype">
                  {["Service ID", "Homestay ID", "Homestay Name", "Service Name", "Option", "Price"].map((label, idx) => (
                    <div className="col-md-4" key={idx}>
                      <div className="form-group">
                        <label>{label}</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                  ))}

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Type Service</label>
                      <select className="form-control">
                        <option>Du lịch</option>
                        <option>Book xe</option>
                        <option>Đồ ăn</option>
                      </select>
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
              <button type="button" className="btn btn-primary buttonedit ml-2">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditService;