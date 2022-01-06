import { Button, Modal, Form, Col, Row, Alert } from "react-bootstrap";
import { useState, useRef } from "react";

export const ModalNuevoProveedor = ({
    show,
    setModal,
    api,
    edicion,
    setEdicion,
    proveedorEdicion,
}) => {
    const [error, setError] = useState(false);

    const formulario = useRef(null);
    const form = formulario.current;

    const limpiarDatos = () => {
        setEdicion(false);
        setError("");
        setModal(false);
    };

    const enviarDatos = () => {
        let nombre = form !== null ? form["nombre"].value : null;
        let id = edicion ? proveedorEdicion.id : null;
        let invalido = validate([nombre]);

        if (invalido) {
            setError("Faltan completar campos");
        } else {
            setError("");
            if (edicion) {
                api.putProveedor({ id, nombre })
                    .then((res) => {
                        if (res.error) {
                            setError(res.data);
                        } else {
                            setError("");
                            setModal(false);
                            setEdicion(false);
                        }
                    })
                    .catch((err) => {
                        console.log("error", err);
                    });
            } else {
                api.setNuevoProveedor({ nombre })
                    .then((res) => {
                        if (res.error) {
                            setError(res.data);
                        } else {
                            setError("");
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
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>
                        {edicion ? "Editar" : "Nuevo"} Proveedor
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
                            <Col sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        defaultValue={
                                            edicion
                                                ? proveedorEdicion.nombre
                                                : null
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
                    <Button variant="success" onClick={() => enviarDatos()}>
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
