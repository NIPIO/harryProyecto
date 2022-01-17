import { api } from "../../api";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { Filtros } from "../../Comun/Filtros";
import { useState, useEffect } from "react";
import { ModalNuevaVenta } from "./ModalNuevaVenta";
import { ModalVerVenta } from "./ModalVerVenta";
import { Spinner, Button, Col, Row, Container, Table } from "react-bootstrap";
import {
    useClientes,
    useVendedores,
    useProductos,
    useVentas,
} from "../../apiCalls";
import { useQuery } from "react-query";

export const Ventas = () => {
    const [ventas, setVentas] = useState([]);
    // const [error, setError] = useState("");
    const [modal, setModal] = useState(false);

    const [ventaEdicion, setVentaEdicion] = useState(null);
    const [edicion, setEdicion] = useState(false);
    const [verVenta, setVerVenta] = useState(false);
    const [detalleVenta, setDetalleVenta] = useState(null);

    // const [vendedor, setVendedor] = useState(null);
    let location = useLocation();

    const allVentas = useVentas();
    const allClientes = useClientes();
    const allVendedores = useVendedores();
    const allProductos = useProductos();

    useEffect(() => {
        if (!allVentas.isLoading) setVentas(allVentas.data.data);
    }, [allVentas.isLoading]);

    if (
        allVentas.isLoading ||
        allClientes.isLoading ||
        allVendedores.isLoading ||
        allProductos.isLoading
    ) {
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
                        <Row className="my-2 mx-1">
                            <Filtros
                                clientes={allClientes}
                                vendedores={allVendedores}
                                productos={allProductos}
                            />
                        </Row>
                        <Row>
                            <div className="container-fluid text-center">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Nro</th>
                                            <th>Cliente</th>
                                            <th>Vendedor</th>
                                            <th>Cantidad</th>
                                            <th>Precio Total</th>
                                            <th>Fecha</th>

                                            <th col="2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ventas.map((venta) => (
                                            <tr key={venta.id}>
                                                <td>{venta.id}</td>
                                                <td>{venta.cliente.nombre}</td>
                                                <td>{venta.vendedor.nombre}</td>
                                                <td>{venta.cantidad}</td>
                                                <td>{venta.precio_total}</td>
                                                <td>{venta.fecha_venta}</td>
                                                <td>
                                                    <Button
                                                        variant="info"
                                                        className="mx-1"

                                                        // onClick={() => {
                                                        //     setEdicion(
                                                        //         true
                                                        //     );
                                                        //     setProveedorEdicion(
                                                        //         proveedor
                                                        //     );
                                                        // }}
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        variant="info"
                                                        className="mx-1"
                                                        onClick={() => {
                                                            setDetalleVenta(
                                                                venta.id
                                                            );
                                                            setVerVenta(true);
                                                        }}
                                                    >
                                                        Ver
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
                />

                <ModalVerVenta
                    show={verVenta}
                    setVerVenta={() => setVerVenta()}
                    ventaId={detalleVenta}
                />
            </div>
        </>
    );
};
