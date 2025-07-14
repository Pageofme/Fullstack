// File: EditInvoicePage.jsx
import React from 'react';

const EditInvoice = () => (
  <div className="content container-fluid">
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Edit Invoice</h4>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input type="text" className="form-control" defaultValue="Tommy Bernal" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Room Type</label>
                    <input type="text" className="form-control" defaultValue="Deluxe" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Invoice Date</label>
                    <input type="date" className="form-control" defaultValue="2024-06-01" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Due Date</label>
                    <input type="date" className="form-control" defaultValue="2024-06-10" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Total</label>
                    <input type="number" className="form-control" defaultValue="3000000" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Status</label>
                    <select className="form-control">
                      <option value="paid">Paid</option>
                      <option value="unpaid">Unpaid</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="submit-section">
                <button type="submit" className="btn btn-primary submit-btn">Update Invoice</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EditInvoice;