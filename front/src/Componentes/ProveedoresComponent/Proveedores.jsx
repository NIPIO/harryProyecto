import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { ModalNuevoProveedor } from "./ModalNuevoProveedor";
import { Spinner, Button, Col, Row, Container, Table } from "react-bootstrap";

export const Proveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [modal, setModal] = useState(false);

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
                                        {proveedores.map((proveedor) => (
                                            <tr>
                                                <td>{proveedor.nombre}</td>
                                                <td>Otros campos?</td>
                                                <td>{proveedor.created_at}</td>
                                                <td>
                                                    <Button variant="info">
                                                        Editar
                                                    </Button>
                                                    <Button variant="danger">
                                                        Borrar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
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
