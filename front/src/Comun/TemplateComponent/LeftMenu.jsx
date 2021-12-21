export const LeftMenu = () => {
    return (
        <>
            <div>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <a href="/productos" className="brand-link">
                        {/* <img
                            src="dist/img/AdminLTELogo.png"
                            alt="AdminLTE Logo"
                            className="brand-image img-circle elevation-3"
                            style={{ opacity: ".8" }}
                        /> */}
                        <span className="brand-text font-weight-light">
                            EMPRESA HARRY NOMBRE
                        </span>
                    </a>
                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            {/* <div className="image">
                                <img
                                    src="dist/img/user2-160x160.jpg"
                                    className="img-circle elevation-2"
                                    alt="User Image"
                                />
                            </div> */}
                            <div className="info">
                                <a href="/productos" className="d-block">
                                    Usuario Nombre
                                </a>
                            </div>
                        </div>
                        <nav className="mt-2">
                            <ul
                                className="nav nav-pills nav-sidebar flex-column"
                                data-widget="treeview"
                                role="menu"
                                data-accordion="false"
                            >
                                <li className="nav-item">
                                    <a href="/productos" className="nav-link">
                                        <i className="nav-icon fas fa-mobile-alt" />
                                        <p>Productos</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/marcas" className="nav-link">
                                        <i className="nav-icon fas fa-columns" />
                                        <p>Marcas</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/ventas" className="nav-link">
                                        <i class=" nav-icon fas fa-dollar-sign"></i>
                                        <p>Ventas</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/clientes" className="nav-link">
                                        <i className="nav-icon fas fa-user-friends" />
                                        <p>Clientes</p>
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a
                                        href="/cuenta-corriente"
                                        className="nav-link"
                                    >
                                        <i className="nav-icon fas fa-university" />
                                        <p>Cuentas Corrientes</p>
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="/vendedores" className="nav-link">
                                        <i className="nav-icon fas fa-user-circle" />
                                        <p>Vendedores</p>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
            </div>
        </>
    );
};
