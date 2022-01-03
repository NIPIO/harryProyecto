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

export const ModalNuevoProveedor = ({ show, setModal, api }) => {
    const [nombre, setNombre] = useState(null);
    const [error, setError] = useState(false);

    const limpiarDatos = () => {
        setNombre(null);
        setModal(false);
    };

    const enviarDatos = () => {
        setError(false);
        validar([nombre]);
        if (!error) {
            api.setNuevoProveedor({ nombre })
                .then((res) => limpiarDatos)
                .catch((err) => {
                    console.log("error", err);
                });
            // .finally(() => setModal(false));
        }
    };

    const validar = ([...args]) => {
        args.map((arg) => {
            if (arg === null) setError(true);
        });
    };

    return (
        <div>
            <Modal show={show}>
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
