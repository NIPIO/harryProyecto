import {
    Button,
    Modal,
    Form,
    InputGroup,
    Col,
    Row,
    FormControl,
    Alert,
} from "react-bootstrap";

import { useState } from "react";
import { useQuery } from "react-query";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { Spinner, Container } from "react-bootstrap";

export const ModalNuevaVenta = ({ show, setModal, location, api }) => {
    const [cliente, setCliente] = useState(null);
    const [producto, setProducto] = useState(null);
    const [vendedor, setVendedor] = useState(null);
    const [cantidad, setCantidad] = useState(null);
    const [precioUnitario, setPrecioUnitario] = useState(null);
    const [precioTotal, setPrecioTotal] = useState(null);
    const [vendedorComision, setVendedorComision] = useState(null);

    const [error, setError] = useState(false);

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

    const limpiarDatos = () => {
        setCliente(null);
        setProducto(null);
        setVendedor(null);
        setCantidad(null);
        setPrecioUnitario(null);
        setPrecioTotal(null);
        setVendedorComision(null);
        setError(false);
        setModal(false);
    };

    const enviarDatos = () => {
        setError(false);
        validar([
            cliente,
            producto,
            vendedor,
            cantidad,
            precioUnitario,
            precioTotal,
            vendedorComision,
        ]);
        if (!error) {
            api.setNuevaVenta({
                cliente,
                producto,
                vendedor,
                cantidad,
                precioUnitario,
                precioTotal,
                vendedorComision,
            })
                .then((res) => limpiarDatos)
                .catch((err) => {
                    console.log("error", err);
                })
                .finally(() => setModal(false));
        }
    };

    const validar = ([...args]) => {
        args.map((arg) => {
            if (arg === null) setError(true);
        });
    };

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
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Nueva Venta</Modal.Title>
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
                                    <Form.Label>Cliente</Form.Label>
                                    <Form.Control
                                        onChange={(e) =>
                                            setCliente(e.target.selectedIndex)
                                        }
                                        as="select"
                                    >
                                        <option value="">Seleccioná</option>
                                        {allClientes.data.map((cliente) => (
                                            <option key={cliente.id}>
                                                {cliente.nombre}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group controlId="custom-select">
                                    <Form.Label>Producto</Form.Label>
                                    <Form.Control
                                        onChange={(e) =>
                                            setProducto(e.target.selectedIndex)
                                        }
                                        as="select"
                                    >
                                        <option value="">Seleccioná</option>
                                        {allProductos.data.map((producto) => (
                                            <option key={producto.id}>
                                                {producto.nombre}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Vendedor</Form.Label>
                                    <Form.Control
                                        onChange={(e) =>
                                            setVendedor(e.target.selectedIndex)
                                        }
                                        as="select"
                                    >
                                        <option value="">Seleccioná</option>
                                        {allVendedores.data.map((vendedor) => (
                                            <option key={vendedor.id}>
                                                {vendedor.nombre}
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
                                    <Form.Label>Cantidad</Form.Label>
                                    <Form.Control
                                        onChange={(e) =>
                                            setCantidad(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Precio U.</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <FormControl
                                            onChange={(e) =>
                                                setPrecioUnitario(
                                                    e.target.value
                                                )
                                            }
                                            aria-label="Amount (to the nearest dollar)"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Total</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <FormControl
                                            onChange={(e) =>
                                                setPrecioTotal(e.target.value)
                                            }
                                            aria-label="Amount (to the nearest dollar)"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Vendedor Comisión</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <FormControl
                                            onChange={(e) =>
                                                setVendedorComision(
                                                    e.target.value
                                                )
                                            }
                                            aria-label="Amount (to the nearest dollar)"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => limpiarDatos()}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={() => enviarDatos()}>
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
