import { useState } from "react";
import {
    Button,
    Modal,
    Form,
    InputGroup,
    Col,
    Row,
    FormControl,
} from "react-bootstrap";

export const ModalNuevoProducto = ({ show, setModal, marcas, api }) => {
    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState(0);
    const [stock, setStock] = useState(0);
    const [precio, setPrecio] = useState(null);

    const limpiarDatos = () => {
        setNombre("");
        setMarca(null);
        setStock(0);
        setPrecio(0);
        setModal(false);
    };

    const enviarDatos = () => {
        api.setNuevoProducto({ nombre, marca, stock, precio })
            .then((res) => limpiarDatos)
            .catch((err) => {
                console.log("error", err);
            });
        // .finally(() => setModal(false));
    };
    return (
        <div>
            <Modal show={show}>
                <Modal.Header CerrarButton>
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
                                        onClick={(e) =>
                                            setMarca(e.target.value)
                                        }
                                    >
                                        {marcas.map((marca) => (
                                            <option
                                                key={marca.id}
                                                value={marca.id}
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
                    <Button variant="primary" onClick={() => enviarDatos()}>
                        Cargar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
