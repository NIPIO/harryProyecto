import api from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ModalNuevaCtaCte } from "./ModalNuevaCtaCte";

export const CuentaCorriente = ({ match, history }) => {
    const [cuentasCorrientes, setCuentasCorrientes] = useState([]);
    const [modal, setModal] = useState(false);

    const data = {
        columns: [
            {
                label: "Proveedor",
                field: "proveedor",
                width: 100,
                sort: "asc",
            },
            {
                label: "Saldo",
                field: "saldo",
                width: 100,
                sort: "asc",
            },
        ],
        rows: cuentasCorrientes,
    };

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
                        <div class="w-100 ">
                            <div class=" w-50" style={{ float: "right" }}>
                                <Button
                                    variant="success"
                                    style={{ float: "right" }}
                                    onClick={() => setModal(true)}
                                >
                                    Nueva Cta Cte
                                </Button>
                            </div>
                        </div>
                        <div className="container-fluid">
                            {allCuentasCorrientes.isLoading ? (
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
                <ModalNuevaCtaCte show={modal} setModal={() => setModal()} />
            </div>
        </>
    );
};
