import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";

import { ModalNuevoVendedor } from "./ModalNuevoVendedor";
import { Spinner, Button, Col, Row, Container, Table } from "react-bootstrap";

export const Vendedores = () => {
    const [vendedores, setVendedores] = useState([]);
    const [modal, setModal] = useState(false);

    const allVendedores = useQuery("vendedores", () =>
        api
            .getVendedores()
            .then((res) => setVendedores(res.data))
            .catch((err) => {
                console.log("error", err);
            })
    );
    let location = useLocation();

    if (allVendedores.isLoading) {
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
                                    Nuevo Vendedor
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <div className="container-fluid text-center">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Usuario</th>
                                            <th>Comision</th>
                                            <th>Cantidad ventas</th>
                                            <th col="2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vendedores.map((vendedor) => (
                                            <tr>
                                                <td>{vendedor.nombre}</td>
                                                <td>{vendedor.usuario}</td>
                                                <td>
                                                    {vendedor.comision ?? 0}
                                                </td>
                                                <td>¿CANTIDAD VENTAS?</td>
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
                <ModalNuevoVendedor
                    show={modal}
                    setModal={() => setModal()}
                    api={api}
                />
            </div>
        </>
    );
};
