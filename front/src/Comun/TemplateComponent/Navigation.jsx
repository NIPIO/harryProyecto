export const Navigation = () => {
    const cerrarSesion = () => {
        localStorage.removeItem("logueado");
        window.location.reload();
    };
    return (
        <>
            <div>
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-widget="pushmenu"
                                href="/productos"
                                role="button"
                            >
                                <i className="fas fa-bars" />
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {/* <li className="nav-item dropdown">
                            <a
                                className="nav-link"
                                data-toggle="dropdown"
                                href="/productos"
                            >
                                <i className="far fa-comments" />
                                <span className="badge badge-danger navbar-badge">
                                    3
                                </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                <a href="/productos" className="dropdown-item">
                                    <div className="media">
                                        <img
                                            src="dist/img/user1-128x128.jpg"
                                            alt="User Avatar"
                                            className="img-size-50 mr-3 img-circle"
                                        />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                                Brad Diesel
                                                <span className="float-right text-sm text-danger">
                                                    <i className="fas fa-star" />
                                                </span>
                                            </h3>
                                            <p className="text-sm">
                                                Call me whenever you can...
                                            </p>
                                            <p className="text-sm text-muted">
                                                <i className="far fa-clock mr-1" />{" "}
                                                4 Hours Ago
                                            </p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="/productos" className="dropdown-item">
                                    <div className="media">
                                        <img
                                            src="dist/img/user8-128x128.jpg"
                                            alt="User Avatar"
                                            className="img-size-50 img-circle mr-3"
                                        />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                                John Pierce
                                                <span className="float-right text-sm text-muted">
                                                    <i className="fas fa-star" />
                                                </span>
                                            </h3>
                                            <p className="text-sm">
                                                I got your message bro
                                            </p>
                                            <p className="text-sm text-muted">
                                                <i className="far fa-clock mr-1" />{" "}
                                                4 Hours Ago
                                            </p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="/productos" className="dropdown-item">
                                    <div className="media">
                                        <img
                                            src="dist/img/user3-128x128.jpg"
                                            alt="User Avatar"
                                            className="img-size-50 img-circle mr-3"
                                        />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                                Nora Silvester
                                                <span className="float-right text-sm text-warning">
                                                    <i className="fas fa-star" />
                                                </span>
                                            </h3>
                                            <p className="text-sm">
                                                The subject goes here
                                            </p>
                                            <p className="text-sm text-muted">
                                                <i className="far fa-clock mr-1" />{" "}
                                                4 Hours Ago
                                            </p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider" />
                                <a
                                    href="/productos"
                                    className="dropdown-item dropdown-footer"
                                >
                                    See All Messages
                                </a>
                            </div>
                        </li> */}
                        <li className="nav-item dropdown">
                            <button data-toggle="dropdown">
                                <i className="fas fa-th-large" />
                                {/* <span className="badge badge-warning navbar-badge">
                                    15
                                </span> */}
                            </button>
                            <div
                                className="dropdown-menu dropdown-menu-lg dropdown-menu-right"
                                style={{
                                    marginLeft: "-130px",
                                    minWidth: "170px",
                                }}
                            >
                                {/* <span className="dropdown-item dropdown-header">
                                    15 Notifications
                                </span>
                                <div className="dropdown-divider" /> */}
                                <button
                                    className="dropdown-item"
                                    onClick={() => cerrarSesion()}
                                >
                                    <i className="fas fa-times-circle mr-2" />{" "}
                                    Cerrar sesión
                                    {/* <span className="float-right text-muted text-sm">
                                        3 mins
                                    </span> */}
                                </button>
                                {/* <div className="dropdown-divider" />
                                <a href="/productos" className="dropdown-item">
                                    <i className="fas fa-users mr-2" /> 8 friend
                                    requests
                                    <span className="float-right text-muted text-sm">
                                        12 hours
                                    </span>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="/productos" className="dropdown-item">
                                    <i className="fas fa-file mr-2" /> 3 new
                                    reports
                                    <span className="float-right text-muted text-sm">
                                        2 days
                                    </span>
                                </a>
                                <div className="dropdown-divider" />
                                <a
                                    href="/productos"
                                    className="dropdown-item dropdown-footer"
                                >
                                    See All Notifications
                                </a> */}
                            </div>
                        </li>

                        {/* <li className="nav-item">
                            <a
                                className="nav-link"
                                data-widget="control-sidebar"
                                data-slide="true"
                                href="/productos"
                                role="button"
                            >
                                <i className="fas fa-th-large" />
                            </a>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </>
    );
};
