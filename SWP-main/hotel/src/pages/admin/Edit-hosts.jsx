import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditHost = () => {
    const query = new URLSearchParams(window.location.search);
    const userId = query.get('id');

    const [host, setHost] = useState({
        fullName: '',
        userName: '',
        email: '',
        phone: '',
        birthdate: '',
        address: '',
        role: 'host',
        status: true
    });

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8080/api/users/${userId}`)
                .then(res => setHost(res.data))
                .catch(err => console.error("Lỗi lấy thông tin host:", err));
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHost(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        axios.put(`http://localhost:8080/api/users/${userId}`, host)
            .then(() => alert("Cập nhật thành công"))
            .catch(err => {
                console.error("Lỗi cập nhật:", err);
                alert("Cập nhật thất bại");
            });
    };

    return (
        <div className="main-wrapper">
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title mt-5">Edit Host</h3>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <form>
                                <div className="row formtype">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input className="form-control" name="fullName" value={host.fullName} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input className="form-control" name="userName" value={host.userName} disabled />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input className="form-control" name="email" value={host.email} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input className="form-control" name="phone" value={host.phone} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Birthdate</label>
                                            <input type="date" className="form-control" name="birthdate" value={host.birthdate} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input className="form-control" name="address" value={host.address} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select
                                                className="form-control"
                                                name="status"
                                                value={host.status ? 'true' : 'false'}
                                                onChange={(e) => setHost(prev => ({ ...prev, status: e.target.value === 'true' }))}
                                            >
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <button type="button" className="btn btn-primary buttonedit" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditHost;