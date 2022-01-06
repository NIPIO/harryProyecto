import {
    Button,
    Modal,
    Form,
    InputGroup,
    Col,
    Row,
    Alert,
} from "react-bootstrap";
import { useState, useRef } from "react";

export const ModalNuevaCtaCte = ({
    show,
    setModal,
    api,
    edicion,
    setEdicion,
    cuentaEdicion,
    proveedores,
}) => {
    const [error, setError] = useState(false);
    const formulario = useRef(null);
    let form = formulario.current;
    const limpiarDatos = () => {
        setEdicion(false);
        setError("");
        setModal(false);
        form?.reset();
    };

    const enviarDatos = () => {
        let proveedor = form !== null ? form["proveedor"].value : null;
        let saldo = form !== null ? form["saldo"].value : null;
        let id = edicion ? cuentaEdicion.id : null;
        console.log(proveedor, saldo);
        let invalido = validate([proveedor, saldo]);

        if (invalido) {
            setError("Faltan completar campos");
        } else {
            setError("");
            if (edicion) {
                api.putCtaCte({ proveedor, saldo, id })
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
                api.setNuevaCtaCte({ proveedor, saldo })
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
            <Modal size="lg" show={show}>
                <Modal.Header>
                    <Modal.Title>
                        {edicion ? "Editar" : "Nueva"} Cuenta Corriente
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
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Proveedor</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name={"proveedor"}
                                        disabled={edicion}
                                    >
                                        {proveedores.map((proveedor) => (
                                            <option
                                                defaultValue={
                                                    edicion
                                                        ? cuentaEdicion
                                                              .proveedor.nombre
                                                        : null
                                                }
                                                key={proveedor.id}
                                            >
                                                {proveedor.nombre}
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
                                    <Form.Label>Saldo Inicial</Form.Label>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control
                                            defaultValue={
                                                edicion
                                                    ? cuentaEdicion.saldo
                                                    : null
                                            }
                                            name={"saldo"}
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
