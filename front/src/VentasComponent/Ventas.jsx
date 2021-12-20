import api from "../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { TablaVentas } from "./TablaVentas";
import { CabeceraBody } from "../Comun/CabeceraBody";
import { useState } from "react";

export const Ventas = ({ match, history }) => {
    const [ventas, setVentas] = useState([]);

    const allVentas = useQuery("ventar", () =>
        api
            .getVentas()
            .then((res) => setVentas(res.data))
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
                            {allVentas.isLoading ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden"></span>
                                </Spinner>
                            ) : (
                                <>
                                    <TablaVentas ventas={ventas} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
