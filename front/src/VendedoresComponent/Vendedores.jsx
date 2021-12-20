import api from "../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { TablaVendedores } from "./TablaVendedores";
import { CabeceraBody } from "../Comun/CabeceraBody";
import { useState } from "react";

export const Vendedores = () => {
    const [vendedores, setVendedores] = useState([]);

    const allVendedores = useQuery("vendedores", () =>
        api
            .getVendedores()
            .then((res) => setVendedores(res.data))
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
                            {allVendedores.isLoading ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden"></span>
                                </Spinner>
                            ) : (
                                <>
                                    <TablaVendedores vendedores={vendedores} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
