import api from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ModalNuevaCtaCte } from "./ModalNuevaCtaCte";
import { Spinner, Button, Col, Row, Container } from "react-bootstrap";

export const CuentaCorriente = ({ match, history }) => {
    const [cuentasCorrientes, setCuentasCorrientes] = useState([]);
    const [modal, setModal] = useState(false);

    const data = {
        columns: [
            {
                label: "Proveedor",
                field: "proveedor_id",
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
                                {allCuentasCorrientes.isLoading ? (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden"></span>
                                    </Spinner>
                                ) : (
                                    <MDBDataTable
                                        scrollX
                                        width="100px"
                                        striped
                                        bordered
                                        displayEntries={false}
                                        small
                                        searchLabel="Buscar"
                                        sorting={true}
                                        infoLabel={[
                                            " ",
                                            "de",
                                            "de",
                                            "registos",
                                        ]}
                                        data={data}
                                    />
                                )}
                            </div>
                        </Row>
                    </Container>
                </div>
                <ModalNuevaCtaCte show={modal} setModal={() => setModal()} />
            </div>
        </>
    );
};
