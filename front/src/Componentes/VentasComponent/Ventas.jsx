import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState, useEffect } from "react";
import { ModalNuevaVenta } from "./ModalNuevaVenta";
import { Spinner, Button, Col, Row, Container, Table } from "react-bootstrap";

export const Ventas = ({ match, history }) => {
    const [ventas, setVentas] = useState([]);
    const [modal, setModal] = useState(false);
    const [ventaEdicion, setVentaEdicion] = useState(null);
    const [edicion, setEdicion] = useState(false);
    const [vendedor, setVendedor] = useState(null);

    const allVentas = useQuery("ventar", () =>
        api
            .getVentas()
            .then((res) => setVentas(res.data))
            .catch((err) => {
                console.log("error", err);
            })
    );
    let location = useLocation();

    useEffect(() => {
        setVendedor(JSON.parse(localStorage.getItem("logueado")));
        console.log(vendedor);
    }, []);

    if (allVentas.isLoading) {
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
                                    Nueva Venta
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <div className="container-fluid text-center">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Vendedor</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio U.</th>
                                            <th>Precio Total</th>
                                            <th col="2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ventas.map((venta) => (
                                            <tr>
                                                <td>{venta.cliente.nombre}</td>
                                                <td>{venta.vendedor.nombre}</td>
                                                <td>{venta.producto.nombre}</td>
                                                <td>{venta.cantidad}</td>
                                                <td>{venta.precio_unidad}</td>
                                                <td>{venta.precio_total}</td>
                                                <td>
                                                    <Button
                                                        variant="info"
                                                        className="mx-3"
                                                        onClick={() => {
                                                            setEdicion(true);
                                                            setVentaEdicion(
                                                                venta
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
                <ModalNuevaVenta
                    show={modal || edicion}
                    location={location}
                    setModal={() => setModal()}
                    api={api}
                    edicion={edicion}
                    setEdicion={setEdicion}
                    ventaEdicion={ventaEdicion}
                    vendedor={vendedor}
                />
            </div>
        </>
    );
};
