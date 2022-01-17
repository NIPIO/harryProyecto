import { api } from "../../api";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { ModalNuevoProveedor } from "./ModalNuevoProveedor";
import { Spinner, Button, Col, Row, Container, Table } from "react-bootstrap";
import { useProveedores } from "../../apiCalls";

export const Proveedores = () => {
    const [modal, setModal] = useState(false);
    const [edicion, setEdicion] = useState(false);
    const [proveedorEdicion, setProveedorEdicion] = useState(null);
    let location = useLocation();
    const allProveedores = useProveedores();

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
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Otros campos?</th>
                                            <th>Creado</th>
                                            <th col="2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allProveedores.data.data.map(
                                            (proveedor) => (
                                                <tr>
                                                    <td>{proveedor.nombre}</td>
                                                    <td>Otros campos?</td>
                                                    <td>
                                                        {proveedor.created_at}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="info"
                                                            onClick={() => {
                                                                setEdicion(
                                                                    true
                                                                );
                                                                setProveedorEdicion(
                                                                    proveedor
                                                                );
                                                            }}
                                                        >
                                                            Editar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Row>
                    </Container>
                </div>
                <ModalNuevoProveedor
                    show={modal || edicion}
                    setModal={() => setModal()}
                    api={api}
                    edicion={edicion}
                    setEdicion={setEdicion}
                    proveedorEdicion={proveedorEdicion}
                />
            </div>
        </>
    );
};
