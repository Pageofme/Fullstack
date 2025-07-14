// File: InvoicesPage.jsx
import React from 'react';


const Invoices = () => {
  return (
    <div className="main-wrapper">

      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title mt-5">Invoices</h3>
              </div>
              <div className="col-auto">
                <a href="/add-invoice" className="btn btn-primary float-right mt-2">Create Invoice</a>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-center mb-0 datatable">
                      <thead>
                        <tr>
                          <th>Invoice Number</th>
                          <th>Customer</th>
                          <th>Room</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3].map((id) => (
                          <tr key={id}>
                            <td>INV-000{id}</td>
                            <td>Tommy Bernal</td>
                            <td>Family Suite</td>
                            <td>$1500</td>
                            <td><span className="badge badge-success">Paid</span></td>
                            <td>2024-06-01</td>
                            <td className="text-right">
                              <button className="btn btn-sm bg-success-light mr-2">View</button>
                              <button className="btn btn-sm bg-primary-light mr-2">Edit</button>
                              <button className="btn btn-sm bg-danger-light">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Invoices;