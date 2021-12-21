import api from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ModalNuevaVenta } from "./ModalNuevaVenta";

export const Ventas = ({ match, history }) => {
    const [ventas, setVentas] = useState([]);
    const [modal, setModal] = useState(false);

    const data = {
        columns: [
            {
                label: "Cliente",
                field: "cliente_id",
                width: 100,
                sort: "asc",
            },
            {
                label: "Producto",
                field: "producto_id",
                width: 100,
                sort: "asc",
            },
            {
                label: "Cantidad",
                field: "cantidad",
                width: 100,
                sort: "asc",
            },
            {
                label: "Precio Uni.",
                field: "precio_unidad",
                width: 100,
                sort: "asc",
            },
            {
                label: "Precio Total",
                field: "precio_total",
                width: 100,
                sort: "asc",
            },
            {
                label: "Vendedor",
                field: "vendedor_id",
                width: 100,
                sort: "asc",
            },
            {
                label: "Fecha",
                field: "created_at",
                width: 100,
                sort: "asc",
            },
        ],
        rows: ventas,
    };

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
                        <div class="w-100 ">
                            <div class=" w-50" style={{ float: "right" }}>
                                <Button
                                    variant="success"
                                    style={{ float: "right" }}
                                    onClick={() => setModal(true)}
                                >
                                    Nueva Venta
                                </Button>
                            </div>
                        </div>
                        <div className="container-fluid">
                            {allVentas.isLoading ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden"></span>
                                </Spinner>
                            ) : (
                                <>
                                    <MDBDataTable
                                        scrollY
                                        scrollX
                                        width="100px"
                                        striped
                                        bordered
                                        small
                                        sorting={true}
                                        data={data}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <ModalNuevaVenta show={modal} setModal={() => setModal()} />
            </div>
        </>
    );
};
