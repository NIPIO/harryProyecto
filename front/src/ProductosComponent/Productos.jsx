import api from "../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { TablaProductos } from "./TablaProductos";
import { CabeceraBody } from "../Comun/CabeceraBody";
import { useState } from "react";

export const Productos = () => {
    const [productos, setProductos] = useState([]);

    const allProductos = useQuery("productos", () =>
        api
            .getProductos()
            .then((res) => setProductos(res.data))
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
                            {allProductos.isLoading ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden"></span>
                                </Spinner>
                            ) : (
                                <>
                                    <TablaProductos productos={productos} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
