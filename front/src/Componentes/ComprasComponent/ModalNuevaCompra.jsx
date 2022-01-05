import { Button, Modal, Form, Col, Row, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { Spinner, Container } from "react-bootstrap";
import { TablaNuevaVenta } from "../VentasComponent/TablaNuevaVenta";

export const ModalNuevaCompra = ({ show, setModal, location, api }) => {
    const [proveedor, setProveedor] = useState(null);
    const [rowsProductos, setFilas] = useState([]);
    const [error, setError] = useState("");

    let row = {
        producto: "",
        nombre: "",
        cantidad: 1,
        precioUnitario: "",
    };

    const allProveedores = useQuery("proveedores", () =>
        api
            .getProveedores()
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

    const limpiarDatos = () => {
        setProveedor(null);
        setFilas([]);
        setError("");
        setModal(false);
    };

    const enviarDatos = () => {
        api.setNuevaCompra({
            proveedor,
            rowsProductos,
        })
            .then((res) => limpiarDatos, setModal(false), setError(false))
            .catch((err) => {
                setError(err);
            });
    };

    const validarProveedor = () => {
        if (proveedor === 0 || proveedor === null) {
            setError("Falta proveedor");
            return;
        }
    };
    const validarRowsProductos = (rowsProductos) => {
        if (rowsProductos.length === 0) {
            setError("Elegí algun producto para comprar");
            return;
        }
        rowsProductos.forEach((arg) => {
            if (
                arg.producto === "" ||
                arg.nombre === "" ||
                arg.cantidad === "" ||
                arg.precioUnitario === ""
            ) {
                setError("Falta completar algun campo de los productos");
                return;
            } else {
                setError("");
            }
        });
    };

    useEffect(() => {
        validarRowsProductos(rowsProductos);
    }, [rowsProductos]);

    useEffect(() => {
        validarProveedor(proveedor);
    }, [proveedor]);

    if (allProveedores.isLoading || allProductos.isLoading) {
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
                    <Modal.Title>Nueva Compra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="signup-form">
                        <Row className="mb-3">
                            <Col md={6} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Proveedor</Form.Label>
                                    <Form.Control
                                        onChange={(e) =>
                                            setProveedor(e.target.selectedIndex)
                                        }
                                        as="select"
                                    >
                                        <option value="">Seleccioná</option>
                                        {allProveedores.data.map(
                                            (proveedor) => (
                                                <option
                                                    value={proveedor.id}
                                                    key={proveedor.id}
                                                >
                                                    {proveedor.nombre}
                                                </option>
                                            )
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <TablaNuevaVenta
                            productos={allProductos.data}
                            setFilas={setFilas}
                            filas={rowsProductos}
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
                        disabled={
                            error || proveedor === 0 || proveedor === null
                        }
                        onClick={() => enviarDatos()}
                    >
                        Cargar
                    </Button>
                </Modal.Footer>
                {error.length > 0 && (
                    <Alert variant="warning" style={{ textAlign: "center" }}>
                        {error}
                    </Alert>
                )}
            </Modal>
        </div>
    );
};
