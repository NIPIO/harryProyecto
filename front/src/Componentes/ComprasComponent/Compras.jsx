import { api } from "../../api";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { ModalNuevaCompra } from "./ModalNuevaCompra";
import { Spinner, Button, Col, Row, Container, Table } from "react-bootstrap";
import { useCompras } from "../../apiCalls";

export const Compras = () => {
    const [modal, setModal] = useState(false);
    const [compraEdicion, setCompraEdicion] = useState(null);
    const [edicion, setEdicion] = useState(false);
    let location = useLocation();

    const allCompras = useCompras();

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
                                        {allCompras.data.data.map((compra) => (
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
                                                        onClick={() => {
                                                            setEdicion(true);
                                                            setCompraEdicion(
                                                                compra
                                                            );
                                                        }}
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
                    show={modal || edicion}
                    location={location}
                    setModal={() => setModal()}
                    api={api}
                    edicion={edicion}
                    setEdicion={setEdicion}
                    compraEdicion={compraEdicion}
                />
            </div>
        </>
    );
};
