import React, { useState } from "react";
import { signin } from "../../api";
import { Navigate } from "react-router";

export const Login = (setLogueado) => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        localStorage.setItem("logueado", { usuario, password });
        setLogueado(true);

        // signin
        //     .postLogin()
        //     .then((res) => <Navigate to="/productos" />)
        //     .catch((err) => {
        //         alert(err);
        //     });
    };
    return (
        <div className="register-box mt-5 mx-auto ">
            <div className="register-logo">
                <b>Empresa</b>Harry
            </div>
            <div className="card">
                <div className="card-body register-card-body">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Usuario"
                            defaultValue={usuario}
                            onKeyDown={(e) => setUsuario(e.target.value)}
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-user" />
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="password"
                            onKeyDown={(e) => setPassword(e.target.value)}
                            className="form-control"
                            defaultValue={password}
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <a
                                href="/nuevo-usuario"
                                className="btn btn-warning btn-block"
                            >
                                Nuevo
                            </a>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <button
                                type="submit"
                                onClick={() => login()}
                                className="btn btn-primary btn-block"
                            >
                                Ingresar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
