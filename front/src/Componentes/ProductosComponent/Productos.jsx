import api from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ModalNuevoProducto } from "./ModalNuevoProducto";

export const Productos = () => {
    let location = useLocation();
    const [productos, setProductos] = useState([]);
    const [modal, setModal] = useState(false);

    const data = {
        columns: [
            {
                label: "Nombre",
                field: "nombre",
                sort: "asc",
                width: 150,
            },
            {
                label: "Marca",
                field: "marca",
                sort: "asc",
                width: 270,
            },
            {
                label: "Precio",
                field: "precio",
                sort: "asc",
                width: 200,
            },
            {
                label: "Stock",
                field: "stock",
                sort: "asc",
                width: 100,
            },
            {
                label: "En transito",
                field: "en_transito",
                sort: "asc",
                width: 150,
            },
        ],
        rows: productos,
    };

    const allProductos = useQuery("productos", () =>
        api
            .getProductos()
            .then((res) => setProductos(res.data))
            .catch((err) => {
                console.log("error", err);
            })
    );

    return (
        <>
            <div>
                <div className="content-wrapper">
                    <CabeceraBody path={location.pathname} />
                    <div className="content  text-center">
                        <div class="w-100 ">
                            <div class=" w-50" style={{ float: "right" }}>
                                <Button
                                    variant="success"
                                    style={{ float: "right" }}
                                    onClick={() => setModal(true)}
                                >
                                    Nuevo Producto
                                </Button>
                            </div>
                        </div>
                        <div className="container-fluid">
                            {allProductos.isLoading ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden"></span>
                                </Spinner>
                            ) : (
                                <MDBDataTable
                                    scrollY
                                    scrollX
                                    maxHeight="200px"
                                    striped
                                    bordered
                                    small
                                    data={data}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <ModalNuevoProducto show={modal} setModal={() => setModal()} />
            </div>
        </>
    );
};
