//     import React, { useEffect } from "react";
// import "../assets/css/bootstrap.min.css";
// import "../assets/plugins/fontawesome/css/all.min.css";
// import "../assets/css/feathericon.min.css";
// import "../assets/plugins/datatables/datatables.min.css";
// import "../assets/plugins/morris/morris.css";
// import "../assets/css/bootstrap-datetimepicker.min.css";
// import "../assets/css/style.css";

// import $ from "jquery";
// import "../assets/js/bootstrap.min.js";
// import "../assets/js/moment.min.js";
// import "../assets/js/bootstrap-datetimepicker.min.js";
// import "../assets/plugins/datatables/datatables.min.js";

const ExpenseReport = () => {


  return (
    <div className="main-wrapper">
      <div id="header-container"></div>
      <div id="sidebar-container"></div>

      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <div className="mt-5">
                  <h4 className="card-title float-left mt-2">Expense Report</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <form>
                <div className="row formtype">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Purchased By</label>
                      <select className="form-control">
                        <option>Select Buyer</option>
                        <option>Loren Gatlin</option>
                        <option>Tarah Shrosphire</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-group">
                      <label>From</label>
                      <div className="cal-icon">
                        <input type="text" className="form-control datetimepicker" />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-group">
                      <label>To</label>
                      <div className="cal-icon">
                        <input type="text" className="form-control datetimepicker" />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Search</label>
                      <a href="#" className="btn btn-success btn-block mt-0 search_button">
                        Search
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="datatable table table-stripped">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Purchased From</th>
                          <th>Purchased Date</th>
                          <th>Amount</th>
                          <th>Paid By</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Digitized Bi-Directional</td>
                          <td>Dibbert-Langworth</td>
                          <td>20 Jun 2020</td>
                          <td>$2000</td>
                          <td>Tommy Bernal</td>
                          <td>cheque</td>
                        </tr>
                        <tr>
                          <td>Zeroadministration Hub</td>
                          <td>Rohan-Carter</td>
                          <td>2 Jun 2020</td>
                          <td>$1800</td>
                          <td>Richard Brobst</td>
                          <td>cheque</td>
                        </tr>
                        <tr>
                          <td>Transitional Product</td>
                          <td>Beier-Jakubowski</td>
                          <td>15 Jun 2020</td>
                          <td>$4000</td>
                          <td>Ellen Thill</td>
                          <td>cheque</td>
                        </tr>
                        <tr>
                          <td>Static Attitude</td>
                          <td>Weissnat Inc</td>
                          <td>12 Jun 2020</td>
                          <td>$3200</td>
                          <td>Corina Kelsey</td>
                          <td>cheque</td>
                        </tr>
                        <tr>
                          <td>Multimedia Encryption</td>
                          <td>Klocko Inc</td>
                          <td>16 Jun 2020</td>
                          <td>$2500</td>
                          <td>Carolyn Lane</td>
                          <td>cheque</td>
                        </tr>
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

export default ExpenseReport;