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
import { useEffect, useState } from "react";

export const ModalNuevoVendedor = ({ show, setModal, api }) => {
    const [nombre, setNombre] = useState(null);
    const [telefono, setTelefono] = useState(null);
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(false);

    const limpiarDatos = () => {
        setNombre(null);
        setTelefono(null);
        setEmail(null);
        setModal(false);
    };

    const enviarDatos = () => {
        api.setNuevoVendedor({ nombre, telefono, email })
            .then((res) => limpiarDatos)
            .catch((err) => {
                console.log("error", err);
            })
            .finally(() => setModal(false));
    };

    const validar = ([...args]) => {
        args.forEach((arg) => {
            if (arg === null || arg === "") {
                setError(true);
                return;
            } else {
                setError(false);
            }
        });
    };

    useEffect(() => {
        validar([nombre, telefono, email]);
    }, [nombre, telefono, email]);

    return (
        <div>
            <Modal size="lg" show={show}>
                <Modal.Header>
                    <Modal.Title>Nuevo Cliente</Modal.Title>
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
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        onChange={(e) =>
                                            setTelefono(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={12} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
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
