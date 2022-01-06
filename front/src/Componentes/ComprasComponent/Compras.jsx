import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { ModalNuevaCompra } from "./ModalNuevaCompra";
import { Spinner, Button, Col, Row, Container, Table } from "react-bootstrap";

export const Compras = () => {
    const [compras, setCompras] = useState([]);
    const [modal, setModal] = useState(false);

    const allCompras = useQuery("compras", () =>
        api
            .getCompras()
            .then((res) => setCompras(res.data))
            .catch((err) => {
                console.log("error", err);
            })
    );

    let location = useLocation();

    if (allCompras.isLoading) {
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
                                    Nueva Compra
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <div className="container-fluid text-center">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Proveedor</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio U.</th>
                                            <th>Precio Total</th>
                                            <th>Fecha Compra</th>
                                            <th col="2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {compras.map((compra) => (
                                            <tr>
                                                <td>
                                                    {compra.proveedor.nombre}
                                                </td>
                                                <td>
                                                    {compra.producto.nombre}
                                                </td>
                                                <td>{compra.cantidad}</td>
                                                <td>{compra.precio_unidad}</td>
                                                <td>{compra.precio_total}</td>
                                                <td>{compra.created_at}</td>
                                                <td>
                                                    <Button
                                                        variant="info"
                                                        className="mx-3"
                                                    >
                                                        Editar
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
                <ModalNuevaCompra
                    show={modal}
                    setModal={() => setModal()}
                    api={api}
                    location={location}
                />
            </div>
        </>
    );
};
