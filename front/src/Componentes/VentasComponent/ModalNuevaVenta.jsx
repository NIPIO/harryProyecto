import { Button, Modal, Form, Col, Row, Alert } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { Spinner, Container } from "react-bootstrap";
import { TablaNuevaVenta } from "./TablaNuevaVenta";

export const ModalNuevaVenta = ({
    show,
    location,
    setModal,
    api,
    edicion,
    setEdicion,
    ventaEdicion,
}) => {
    const [error, setError] = useState("");
    const formulario = useRef(null);
    const [rowsProductos, setFilas] = useState([]);
    const [productosVentaEdicion, setProductosVentaEdicion] = useState([]);
    const form = formulario.current;

    let row = {
        producto: "",
        nombre: "",
        cantidad: 1,
        precioUnitario: "",
    };

    const allClientes = useQuery("clientes", () =>
        api
            .getClientes()
            .then((res) => res.data)
            .catch((err) => {
                console.log("error", err);
            })
    );

    const allProductos = useQuery("productos", () =>
        api
            .getProductos()
            .then((res) => res.data)
            .catch((err) => {
                console.log("error", err);
            })
    );

    const allVendedores = useQuery("vendedores", () =>
        api
            .getVendedores()
            .then((res) => res.data)
            .catch((err) => {
                console.log("error", err);
            })
    );

    useEffect(() => {
        if (edicion) {
            api.getVenta(ventaEdicion.id)
                .then((res) => setProductosVentaEdicion(res.data))
                .catch((err) => {
                    console.log("error", err);
                });
        }
    }, [edicion]);

    const limpiarDatos = () => {
        form?.reset();
        setEdicion(false);
        setError("");
        setFilas([]);
        setModal(false);
    };

    const enviarDatos = () => {
        // api.setNuevaVenta({
        //     cliente,
        //     vendedor,
        //     rowsProductos,
        // })
        //     .then((res) => limpiarDatos, setModal(false), setError(false))
        //     .catch((err) => {
        //         setError(true);
        //     });
    };

    const validate = ([...args]) => {
        return args.some((arg) => arg === null || arg === "" || arg === 0);
    };

    // const validarRowsProductos = (rowsProductos) => {
    //     if (rowsProductos.length === 0) {
    //         setError(true);
    //         return;
    //     }
    //     rowsProductos.forEach((arg) => {
    //         if (
    //             arg.producto === "" ||
    //             arg.nombre === "" ||
    //             arg.cantidad === "" ||
    //             arg.precioUnitario === ""
    //         ) {
    //             setError(true);
    //             return;
    //         } else {
    //             setError(false);
    //         }
    //     });
    // };

    if (
        allClientes.isLoading ||
        allProductos.isLoading ||
        allVendedores.isLoading
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
        <div>
            <Modal size="lg" show={show}>
                <Modal.Header>
                    <Modal.Title>
                        {edicion ? "Editar" : "Nueva"} Venta
                    </Modal.Title>{" "}
                </Modal.Header>
                <Modal.Body>
                    <Form
                        className="signup-form"
                        onSubmit={() => enviarDatos}
                        ref={formulario}
                        noValidate
                    >
                        <Row className="mb-3">
                            <Col md={6} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Cliente</Form.Label>
                                    <Form.Control as="select" name={"cliente"}>
                                        {allClientes.data.map((cliente) => (
                                            <option
                                                defaultValue={
                                                    edicion
                                                        ? ventaEdicion.cliente
                                                              .nombre
                                                        : null
                                                }
                                                key={cliente.id}
                                            >
                                                {cliente.nombre}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Vendedor</Form.Label>
                                    <Form.Control as="select" name={"vendedor"}>
                                        {allVendedores.data.map((vendedor) => (
                                            <option
                                                defaultValue={
                                                    edicion
                                                        ? ventaEdicion.vendedor
                                                              .nombre
                                                        : null
                                                }
                                                key={vendedor.id}
                                            >
                                                {vendedor.nombre}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <TablaNuevaVenta
                            productos={allProductos.data}
                            setFilas={setFilas}
                            filas={
                                edicion ? productosVentaEdicion : rowsProductos
                            }
                            edicion={edicion}
                            row={row}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => limpiarDatos()}>
                        Cerrar
                    </Button>
                    <Button
                        variant="success"
                        disabled={error}
                        onClick={() => enviarDatos()}
                    >
                        Cargar
                    </Button>
                </Modal.Footer>
                {error && (
                    <Alert variant="warning" style={{ textAlign: "center" }}>
                        Faltan completar campos
                    </Alert>
                )}
            </Modal>
        </div>
    );
};
