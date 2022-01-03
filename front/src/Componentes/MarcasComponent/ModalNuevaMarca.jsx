import { Button, Modal, Form, Col, Row, Alert } from "react-bootstrap";
import { useState } from "react";

export const ModalNuevaMarca = ({ show, setModal, api }) => {
    const [nombre, setNombre] = useState(null);
    const [error, setError] = useState(false);

    const limpiarDatos = () => {
        setNombre("");
        setModal(false);
    };

    const enviarDatos = () => {
        setError(false);
        validar(nombre);
        if (!error) {
            api.setNuevaMarca({ nombre })
                .then((res) => limpiarDatos)
                .catch((err) => {
                    console.log("error", err);
                })
                .finally(() => setModal(false));
        }
    };

    const validar = (nombre) => {
        if (nombre === "") setError(true);
    };

    return (
        <div>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Nueva Marca</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="signup-form">
                        <Row className="mb-3">
                            <Col md={12} sm={12}>
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
                        </Row>
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
