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
import { TablaNuevaVenta } from "./TablaNuevaVenta";

export const ModalNuevaVenta = ({ show, setModal, location, api }) => {
    const [cliente, setCliente] = useState(null);
    const [vendedor, setVendedor] = useState(null);
    const [rowsProductos, setFilas] = useState([
        {
            producto: "",
            nombre: "",
            cantidad: 1,
            precioUnitario: "",
        },
    ]);

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
        setVendedor(null);
        setFilas([]);
        setError(false);
        setModal(false);
    };

    const enviarDatos = () => {
        setError(false);
        validar([cliente, vendedor]);
        validarRowsProductos(rowsProductos);

        if (!error) {
            api.setNuevaVenta({
                cliente,
                vendedor,
                rowsProductos,
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

    const validarRowsProductos = (rowsProductos) => {
        rowsProductos.map((arg) => {
            if (
                arg.producto === "" ||
                arg.nombre === "" ||
                arg.cantidad === "" ||
                arg.precioUnitario === ""
            ) {
                setError(true);
            }
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
            <Modal show={show} size="lg">
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
                        </Row>

                        <TablaNuevaVenta
                            productos={allProductos.data}
                            setFilas={setFilas}
                            filas={rowsProductos}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => limpiarDatos()}>
                        Cerrar
                    </Button>
                    <Button variant="success" onClick={() => enviarDatos()}>
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
