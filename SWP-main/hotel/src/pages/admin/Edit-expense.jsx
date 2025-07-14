// File: EditExpensePage.jsx
import React from 'react';

const EditExpense = () => (
  <div className="content container-fluid">
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Edit Expense</h4>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Item Name</label>
                    <input type="text" className="form-control" defaultValue="Gạo 10kg" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Purchase From</label>
                    <input type="text" className="form-control" defaultValue="Vinmart" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Purchase Date</label>
                    <input type="date" className="form-control" defaultValue="2023-10-01" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Price</label>
                    <input type="number" className="form-control" defaultValue="250000" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" rows="3" defaultValue="Mua thêm các nhu yếu phẩm cho homestay."></textarea>
                  </div>
                </div>
              </div>
              <div className="submit-section">
                <button type="submit" className="btn btn-primary submit-btn">Update Expense</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EditExpense;