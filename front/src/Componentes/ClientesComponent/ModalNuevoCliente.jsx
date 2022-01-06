import { Button, Modal, Form, Col, Row, Alert } from "react-bootstrap";
import { useState, useRef } from "react";

export const ModalNuevoCliente = ({
    show,
    setModal,
    api,
    edicion,
    setEdicion,
    clienteEdicion,
}) => {
    const [error, setError] = useState(false);

    const formulario = useRef(null);
    const form = formulario.current;

    const limpiarDatos = () => {
        form?.reset();
        setEdicion(false);
        setError("");
        setModal(false);
    };

    const enviarDatos = () => {
        let id = edicion ? clienteEdicion.id : null;
        let nombre = form !== null ? form["nombre"].value : null;
        let telefono = form !== null ? form["telefono"].value : null;
        let email = form !== null ? form["email"].value : null;

        let invalido = validate([nombre, telefono, email]);

        if (invalido) {
            setError("Faltan completar campos");
        } else {
            setError("");
            if (edicion) {
                api.putCliente({ id, nombre, telefono, email })
                    .then((res) => {
                        if (res.error) {
                            setError(res.data);
                        } else {
                            setError(false);
                            setModal(false);
                            setEdicion(false);
                        }
                    })
                    .catch((err) => {
                        console.log("error", err);
                    });
            } else {
                api.setNuevoCliente({ nombre, telefono, email })
                    .then((res) => {
                        if (res.error) {
                            setError(res.data);
                        } else {
                            setError(false);
                            setModal(false);
                            setEdicion(false);
                        }
                    })
                    .catch((err) => {
                        console.log("error", err);
                    });
            }
        }
    };

    const validate = ([...args]) => {
        return args.some((arg) => arg === null || arg === "" || arg === 0);
    };

    return (
        <div>
            <Modal size="lg" show={show}>
                <Modal.Header>
                    <Modal.Title>
                        {edicion ? "Editar" : "Nuevo"} Cliente
                    </Modal.Title>
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
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        defaultValue={
                                            edicion
                                                ? clienteEdicion.nombre
                                                : null
                                        }
                                        name={"nombre"}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        defaultValue={
                                            edicion
                                                ? clienteEdicion.telefono
                                                : null
                                        }
                                        name={"telefono"}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={12} sm={12}>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        defaultValue={
                                            edicion
                                                ? clienteEdicion.email
                                                : null
                                        }
                                        name={"email"}
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
