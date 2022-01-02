import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ModalNuevoProveedor } from "./ModalNuevoProveedor";
import { Spinner, Button, Col, Row, Container } from "react-bootstrap";

export const Proveedores = () => {
    const [proveedores, setProveedores] = useState([]);
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
                label: "Creado",
                field: "created_at",
                width: 100,
                sort: "asc",
            },
            {
                label: "Modificado",
                field: "updated_at",
                width: 100,
                sort: "asc",
            },
        ],
        rows: proveedores,
    };

    const allProveedores = useQuery("proveedores", () =>
        api
            .getProveedores()
            .then((res) => setProveedores(res.data))
            .catch((err) => {
                console.log("error", err);
            })
    );
    let location = useLocation();

    if (allProveedores.isLoading) {
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
                                    Nuevo Proveedor
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
                <ModalNuevoProveedor
                    show={modal}
                    setModal={() => setModal()}
                    api={api}
                />
            </div>
        </>
    );
};
