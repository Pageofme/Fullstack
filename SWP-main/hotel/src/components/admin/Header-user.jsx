const HeaderUser = () => {
    return (
        <ul className="nav user-menu">
            {/* Notifications */}
            <li className="nav-item dropdown noti-dropdown">
                <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                    <i className="fe fe-bell"></i>
                    <span className="badge badge-pill">3</span>
                </a>
                <div className="dropdown-menu notifications">
                    <div className="topnav-dropdown-header">
                        <span className="notification-title">Notifications</span>
                        <a href="#" className="clear-noti">Clear All</a>
                    </div>
                    <div className="noti-content">
                        <ul className="notification-list">
                            {[
                                {
                                    name: "Carlson Tech",
                                    message: "has approved your estimate",
                                    avatar: "avatar-02.jpg",
                                    time: "4 mins ago"
                                },
                                {
                                    name: "International Software Inc",
                                    message: "has sent you a invoice in the amount of $218",
                                    avatar: "avatar-11.jpg",
                                    time: "6 mins ago"
                                },
                                {
                                    name: "John Hendry",
                                    message: "sent a cancellation request Apple iPhone XR",
                                    avatar: "avatar-17.jpg",
                                    time: "8 mins ago"
                                },
                                {
                                    name: "Mercury Software Inc",
                                    message: "added a new product Apple MacBook Pro",
                                    avatar: "avatar-13.jpg",
                                    time: "12 mins ago"
                                }
                            ].map((noti, idx) => (
                                <li className="notification-message" key={idx}>
                                    <a href="#">
                                        <div className="media">
                                            <span className="avatar avatar-sm">
                                                <img
                                                    className="avatar-img rounded-circle"
                                                    alt="User"
                                                    src={`/img/profiles/${noti.avatar}`}
                                                />
                                            </span>
                                            <div className="media-body">
                                                <p className="noti-details">
                                                    <span className="noti-title">{noti.name}</span> {noti.message}
                                                </p>
                                                <p className="noti-time">
                                                    <span className="notification-time">{noti.time}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="topnav-dropdown-footer">
                        <a href="#">View all Notifications</a>
                    </div>
                </div>
            </li>

            {/* User Menu */}
            <li className="nav-item dropdown has-arrow">
                <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                    <span className="user-img">
                        <img
                            className="rounded-circle"
                            src="/img/a1.jpg"
                            width="31"
                            alt="Soeng Souy"
                        />
                    </span>
                </a>
                <div className="dropdown-menu">
                    <div className="user-header">
                        <div className="avatar avatar-sm">
                            <img
                                src="assets/img/a1.jpg"
                                alt="User"
                                className="avatar-img rounded-circle"
                            />
                        </div>
                        <div className="user-text">
                            <h6>Soeng Souy</h6>
                            <p className="text-muted mb-0">Administrator</p>
                        </div>
                    </div>
                    <a className="dropdown-item" href="/profile.html">My Profile</a>
                    <a className="dropdown-item" href="/login.html">Logout</a>
                </div>
            </li>
        </ul>
    )
}

export default HeaderUser;