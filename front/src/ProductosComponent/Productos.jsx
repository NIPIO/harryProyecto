import api from "../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { TablaProductos } from "./TablaProductos";
import { CabeceraBody } from "../Comun/CabeceraBody";

export const Productos = () => {
    const allProductos = useQuery("productos", () =>
        api
            .getProductos()
            .then((res) => res.data)
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
                                    <TablaProductos />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
