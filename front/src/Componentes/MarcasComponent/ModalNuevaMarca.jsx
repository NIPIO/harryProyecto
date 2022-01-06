import { Button, Modal, Form, Col, Row, Alert } from "react-bootstrap";
import { useState, useRef } from "react";

export const ModalNuevaMarca = ({
    show,
    setModal,
    api,
    edicion,
    setEdicion,
    marcaEdicion,
}) => {
    const [error, setError] = useState("");

    const formulario = useRef(null);
    const form = formulario.current;

    const limpiarDatos = () => {
        form?.reset();
        setEdicion(false);
        setError("");
        setModal(false);
    };

    const enviarDatos = () => {
        let nombre = form !== null ? form["nombre"].value : null;
        let id = edicion ? marcaEdicion.id : null;

        let invalido = validate([nombre]);

        if (invalido) {
            setError("Faltan completar campos");
        } else {
            setError("");
            if (edicion) {
                api.putMarca({ id, nombre })
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
                api.setNuevaMarca({ nombre })
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
                        {edicion ? "Editar" : "Nueva"} Marca
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
                            <Col md={12} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        defaultValue={
                                            edicion ? marcaEdicion.nombre : null
                                        }
                                        name={"nombre"}
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
