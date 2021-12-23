import React, { useState } from "react";
import { signin } from "../../api";
import { Navigate } from "react-router";

export const NuevoUsuario = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [email, setEmail] = useState("");

    const registrarse = () => {
        if (repassword !== password) {
            alert("eu no.");
        }

        localStorage.setItem("logueado", { usuario, password, email });
        // signin
        //     .postRegistro()
        //     .then((res) => <Navigate to="/productos" />)
        //     .catch((err) => {
        //         alert(err);
        //     });
    };

    return (
        <div className="register-box mt-5 mx-auto">
            <div className="register-logo">
                <a href="../../index2.html">
                    <b>Empresa</b>Harry
                </a>
            </div>
            <div className="card">
                <div className="card-body register-card-body">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setUsuario(e.target.value)}
                            placeholder="Usuario"
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-user" />
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-envelope" />
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock" />
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="password"
                            className="form-control"
                            onChange={(e) => setRepassword(e.target.value)}
                            placeholder="Repita Contraseña"
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <button
                                type="submit"
                                onClick={() => registrarse()}
                                className="btn btn-success btn-block"
                            >
                                Registrarse
                            </button>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <a
                                type="submit"
                                a
                                href="/"
                                className="btn btn-primary btn-block"
                            >
                                Tengo usuario
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
