// File: ExpensesPage.jsx 
import React from 'react'; 


const Expenses = () => { return (
<div className="main-wrapper">
  <header />
  
  <div className="page-wrapper">
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title mt-5">Expenses</h3>
          </div>
          <div className="col-auto">
            <a href="/add-expense" className="btn btn-primary float-right mt-2"
              >Add Expense</a
            >
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body booking_card">
              <div className="table-responsive">
                <table
                  className="table table-hover table-center mb-0 datatable"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item Name</th>
                      <th>Item Quantity</th>
                      <th>Price</th>
                      <th>Purchase Source</th>
                      <th>Purchase Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((id) => (
                    <tr key="{id}">
                      <td>{id}</td>
                      <td>Fan</td>
                      <td>4</td>
                      <td>$200</td>
                      <td>Amazon</td>
                      <td>2024-06-01</td>
                      <td>
                        <span className="badge badge-success">Active</span>
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
); }; export default Expenses;