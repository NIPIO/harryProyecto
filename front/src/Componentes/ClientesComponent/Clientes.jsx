import api from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ModalNuevoCliente } from "./ModalNuevoCliente";
import { Spinner, Button, Col, Row, Container } from "react-bootstrap";

export const Clientes = ({ match, history }) => {
    const [clientes, setClientes] = useState([]);
    const [modal, setModal] = useState(false);

    const data = {
        columns: [
            {
                label: "Nombre",
                field: "nombre",
                width: 100,
                sort: "asc",
            },
            {
                label: "Email",
                field: "email",
                width: 100,
                sort: "asc",
            },
            {
                label: "Telefono",
                field: "telefono",
                width: 100,
                sort: "asc",
            },
        ],
        rows: clientes,
    };

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
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Button
                                    variant="success"
                                    onClick={() => setModal(true)}
                                >
                                    Nueva Venta
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <div className="container-fluid text-center">
                                {allClientes.isLoading ? (
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
                <ModalNuevoCliente show={modal} setModal={() => setModal()} />
            </div>
        </>
    );
};
