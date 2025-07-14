import React, { useEffect } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
// import "datatables.net-dt/css/jquery.dataTables.css";
// import "select2/dist/css/select2.css";
// import "bootstrap-datetime-picker/css/bootstrap-datetimepicker.min.css";

// Nếu dùng npm package cho datetimepicker, datatables, bạn import tương ứng
// Ở đây demo import css. Với js thì nên dùng react wrapper hoặc hook.

// const TableData = () => {
//   useEffect(() => {
//     // Khởi tạo DataTable sau khi component render
//     $("#datatable").DataTable();

//     // Khởi tạo datetimepicker nếu có
//     $(".datetimepicker").datetimepicker({
//       // options
//       format: "YYYY-MM-DD",
//     });
//   }, []);

//   return (
//     <table
//       id="datatable"
//       className="datatable table table-striped"
//       style={{ width: "100%" }}
//     >
//       <thead>
//         <tr>
//           <th>Sn.no</th>
//           <th>Invoice Number</th>
//           <th>Client</th>
//           <th>Created Date</th>
//           <th>Due Date</th>
//           <th>Amount</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>1</td>
//           <td>#INV-0001</td>
//           <td>Dibbert-Langworth</td>
//           <td>1 Jul 2020</td>
//           <td>7 Jul 2020</td>
//           <td>$3200</td>
//         </tr>
//         <tr>
//           <td>2</td>
//           <td>#INV-0002</td>
//           <td>Rohan-Carter</td>
//           <td>5 Jul 2020</td>
//           <td>10 Jul 2020</td>
//           <td>$2500</td>
//         </tr>
//         <tr>
//           <td>3</td>
//           <td>#INV-0003</td>
//           <td>Beier-Jakubowski</td>
//           <td>2 Jul 2020</td>
//           <td>8 Jul 2020</td>
//           <td>$3000</td>
//         </tr>
//         <tr>
//           <td>4</td>
//           <td>#INV-0004</td>
//           <td>Langosh-Bergstrom</td>
//           <td>5 Jul 2020</td>
//           <td>10 Jul 2020</td>
//           <td>$55888</td>
//         </tr>
//         <tr>
//           <td>5</td>
//           <td>#INV-0005</td>
//           <td>Klocko Inc</td>
//           <td>3 Jul 2020</td>
//           <td>5 Jul 2020</td>
//           <td>$2542</td>
//         </tr>
//       </tbody>
//     </table>
//   );
// };

const InvoiceReports = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <div className="mt-5">
                <h4 className="card-title float-left mt-2">Invoice Report</h4>
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
                    <label>Customer</label>
                    <select className="form-control" id="sel1" name="sellist1">
                      <option>Select Customer</option>
                      <option>Loren Gatlin</option>
                      <option>Tarah Shrosphire</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>From</label>
                    <div className="cal-icon">
                      <input
                        type="text"
                        className="form-control datetimepicker"
                        placeholder="Select date"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>To</label>
                    <div className="cal-icon">
                      <input
                        type="text"
                        className="form-control datetimepicker"
                        placeholder="Select date"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Search</label>
                    <button type="submit" className="btn btn-success btn-block mt-0">
                      Search
                    </button>
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
                  {/* <TableData /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceReports;