import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ModalNuevaCtaCte } from "./ModalNuevaCtaCte";
import { Spinner, Button, Col, Row, Container } from "react-bootstrap";

export const CuentaCorriente = ({ match, history }) => {
    const [cuentasCorrientes, setCuentasCorrientes] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [modal, setModal] = useState(false);

    const data = {
        columns: [
            {
                label: "Proveedor",
                field: "proveedor.nombre",
                width: 100,
                sort: "asc",
            },
            {
                label: "Saldo",
                field: "saldo",
                width: 100,
                sort: "asc",
            },
            {
                label: "Ultima Mod.",
                field: "updated_at",
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

    const allProveedores = useQuery("proveedores", () =>
        api
            .getProveedores()
            .then((res) => setProveedores(res.data))
            .catch((err) => {
                console.log("error", err);
            })
    );

    let location = useLocation();

    if (allCuentasCorrientes.isLoading || allProveedores.isLoading) {
        return (
            <div>
                <div className="content-wrapper">
                    <CabeceraBody path={location.pathname} />
                    <Container>
                        <Row>
                            <div className="container-fluid text-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden"></span>
                                </Spinner>
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }

    return (
        <>
            <div>
                <div className="content-wrapper">
                    <CabeceraBody path={location.pathname} />
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Button
                                    variant="success"
                                    onClick={() => setModal(true)}
                                >
                                    Nueva Cta Cte
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <div className="container-fluid text-center">
                                <MDBDataTable
                                    scrollX
                                    width="100px"
                                    striped
                                    bordered
                                    displayEntries={false}
                                    small
                                    searchLabel="Buscar"
                                    infoLabel={[" ", "de", "de", "registos"]}
                                    data={data}
                                />
                            </div>
                        </Row>
                    </Container>
                </div>
                <ModalNuevaCtaCte
                    show={modal}
                    setModal={() => setModal()}
                    api={api}
                    proveedores={proveedores}
                />
            </div>
        </>
    );
};
