import { useEffect, useState } from "react";
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

export const ModalNuevoProducto = ({ show, setModal, marcas, api }) => {
    const [nombre, setNombre] = useState(null);
    const [marca, setMarca] = useState(null);
    const [stock, setStock] = useState(null);
    const [precio, setPrecio] = useState(null);
    const [error, setError] = useState(false);

    const limpiarDatos = () => {
        setNombre(null);
        setMarca(null);
        setStock(null);
        setPrecio(null);
        setModal(false);
    };

    const enviarDatos = () => {
        console.log(nombre, marca, stock, precio);
        // api.setNuevoProducto({ nombre, marca, stock, precio })
        //     .then((res) => {
        //         if (res.error) {
        //             setError(true);
        //         } else {
        //             setError(false);
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("error", err);
        //     });
        // .finally(() => setModal(false));
    };

    useEffect(() => {
        validar([nombre, marca, stock, precio]);
    }, [nombre, marca, stock, precio]);

    const validar = ([...args]) => {
        args.forEach((arg) => {
            if (arg === null || arg === "" || arg === 0) {
                setError(true);
                return;
            } else {
                setError(false);
            }
        });
    };
    return (
        <div>
            <Modal size="lg" show={show}>
                <Modal.Header>
                    <Modal.Title>Nuevo Producto</Modal.Title>
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
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group controlId="custom-select">
                                    <Form.Label>Marca</Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={(e) =>
                                            setMarca(e.target.selectedIndex)
                                        }
                                    >
                                        <option value="">Seleccioná</option>
                                        {marcas.map((marca) => (
                                            <option
                                                key={marca.id}
                                                defaultValue={marca.id}
                                            >
                                                {marca.nombre}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group
                                as={Col}
                                className="mb-3"
                                controlId="formGridAddress1"
                            >
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group
                                as={Col}
                                className="mb-3"
                                controlId="formGridAddress1"
                            >
                                <Form.Label>Precio</Form.Label>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control
                                        onChange={(e) =>
                                            setPrecio(e.target.value)
                                        }
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>
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
