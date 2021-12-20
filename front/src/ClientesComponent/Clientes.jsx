import api from "../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { TablaClientes } from "./TablaClientes";
import { CabeceraBody } from "../Comun/CabeceraBody";
import { useState } from "react";

export const Clientes = ({ match, history }) => {
    const [clientes, setClientes] = useState([]);

    const allClientes = useQuery("clientes", () =>
        api
            .getClientes()
            .then((res) => setClientes(res.data))
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
                            {allClientes.isLoading ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden"></span>
                                </Spinner>
                            ) : (
                                <>
                                    <TablaClientes clientes={clientes} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
