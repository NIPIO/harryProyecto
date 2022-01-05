import React, { useState } from "react";
import { signin } from "../../api";
import { Alert } from "react-bootstrap";

export const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const login = () => {
        signin
            .postLogin({ usuario, password })
            .then((res) => {
                if (res.status === 401) {
                    setError(res.data);
                } else {
                    localStorage.setItem("logueado", JSON.stringify(res.data));
                    window.location.reload();
                }
            })
            .catch((err) => {
                alert("algo pasó");
            });
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
                            onChange={(e) => setUsuario(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
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
                                className="btn btn-success btn-block"
                            >
                                Ingresar
                            </button>
                        </div>
                    </div>
                    <div className="mt-3">
                        {error.length > 0 && (
                            <Alert
                                variant="danger"
                                style={{ textAlign: "center" }}
                            >
                                {error}
                            </Alert>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
