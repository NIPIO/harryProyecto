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

export const ModalNuevaCtaCte = ({ show, setModal, api, proveedores }) => {
    const [nombre, setNombre] = useState(null);
    const [saldo, setSaldo] = useState(null);
    const [error, setError] = useState(false);

    const limpiarDatos = () => {
        setNombre(null);
        setSaldo(null);
        setModal(false);
    };

    const enviarDatos = () => {
        setError(false);
        validar([nombre, saldo]);
        if (!error) {
            api.setNuevaCtaCte({ nombre, saldo })
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

    return (
        <div>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Nueva Cte Cte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="signup-form">
                        <Row className="mb-3">
                            <Col md={6} sm={12}>
                                <Form.Group controlId="custom-select">
                                    <Form.Label>Proveedor</Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={(e) =>
                                            setNombre(e.target.selectedIndex)
                                        }
                                    >
                                        <option value="">Seleccioná</option>
                                        {proveedores.map((proveedores) => (
                                            <option
                                                key={proveedores.id}
                                                defaultValue={proveedores.id}
                                            >
                                                {proveedores.nombre}
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
                                        <FormControl
                                            onChange={(e) =>
                                                setSaldo(e.target.value)
                                            }
                                            aria-label="Amount (to the nearest dollar)"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => limpiarDatos()}>
                        {" "}
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={() => enviarDatos()}>
                        {" "}
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
