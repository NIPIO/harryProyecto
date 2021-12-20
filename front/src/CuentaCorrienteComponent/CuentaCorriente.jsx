import api from "../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { TablaCuentaCorriente } from "./TablaCuentaCorriente";
import { CabeceraBody } from "../Comun/CabeceraBody";
import { useState } from "react";

export const CuentaCorriente = ({ match, history }) => {
    const [cuentasCorrientes, setCuentasCorrientes] = useState([]);

    const allCuentasCorrientes = useQuery("cuentasCorrientes", () =>
        api
            .getCuentasCorrientes()
            .then((res) => setCuentasCorrientes(res.data))
            .catch((err) => {
                console.log("error", err);
            })
    );

    let location = useLocation();

    return (
        <>
            <div>
                <div className="content-wrapper">
                    <CabeceraBody path={location.pathname} />
                    <div className="content  text-center">
                        <div className="container-fluid">
                            {allCuentasCorrientes.isLoading ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden"></span>
                                </Spinner>
                            ) : (
                                <>
                                    <TablaCuentaCorriente
                                        cuentas={cuentasCorrientes}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
