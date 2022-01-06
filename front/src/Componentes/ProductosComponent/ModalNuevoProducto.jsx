import { useState, useRef } from "react";
import {
    Button,
    Modal,
    Form,
    InputGroup,
    Col,
    Row,
    Alert,
} from "react-bootstrap";

export const ModalNuevoProducto = ({
    show,
    setModal,
    marcas,
    api,
    edicion,
    setEdicion,
    productoEdicion,
}) => {
    const [error, setError] = useState("");

    const formulario = useRef(null);
    const form = formulario.current;

    const limpiarDatos = () => {
        setEdicion(false);
        setError("");
        setModal(false);
    };

    const enviarDatos = () => {
        let id = edicion ? productoEdicion.id : null;
        let nombre = form !== null ? form["nombre"].value : null;
        let marca = form !== null ? form["marca"].value : null;
        let stock = form !== null ? form["stock"].value : null;
        let precio = form !== null ? form["precio"].value : null;

        let invalido = validate([nombre, marca, stock, precio]);
        if (invalido) {
            setError("Faltan completar campos");
        } else {
            setError("");
            if (edicion) {
                api.putProducto({ id, nombre, marca, stock, precio })
                    .then((res) => {
                        console.log(res);
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
                api.setNuevoProducto({ nombre, marca, stock, precio })
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
                <Form
                    className="signup-form"
                    onSubmit={() => enviarDatos}
                    ref={formulario}
                    noValidate
                >
                    <Modal.Header>
                        <Modal.Title>
                            {edicion ? "Editar" : "Nuevo"} Producto
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col md={6} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        defaultValue={
                                            edicion
                                                ? productoEdicion.nombre
                                                : null
                                        }
                                        name={"nombre"}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group controlId="custom-select">
                                    <Form.Label>Marca</Form.Label>
                                    <Form.Control as="select" name={"marca"}>
                                        <option value="">Seleccioná</option>
                                        {marcas.map((marca) => (
                                            <option key={marca.id}>
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
                                    defaultValue={
                                        edicion ? productoEdicion.stock : null
                                    }
                                    name={"stock"}
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
                                        defaultValue={
                                            edicion
                                                ? productoEdicion.precio
                                                : null
                                        }
                                        name={"precio"}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => limpiarDatos()}
                        >
                            Cerrar
                        </Button>
                        <Button variant="success" onClick={() => enviarDatos()}>
                            Cargar
                        </Button>
                    </Modal.Footer>
                    {error.length > 0 && (
                        <Alert
                            variant="warning"
                            style={{ textAlign: "center" }}
                        >
                            {error}
                        </Alert>
                    )}
                </Form>
            </Modal>
        </div>
    );
};
