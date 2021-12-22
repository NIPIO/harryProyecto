import {
    Button,
    Modal,
    Form,
    InputGroup,
    Col,
    Row,
    FormControl,
} from "react-bootstrap";

export const ModalNuevaVenta = ({ show, setModal }) => {
    const handleSubmit = () => {
        alert("jacer");
    };
    return (
        <div>
            <Modal show={show}>
                <Modal.Header CerrarButton>
                    <Modal.Title>Nueva Venta</Modal.Title>
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
                                    <Form.Label>Cliente</Form.Label>
                                    <Form.Control as="select">
                                        {["1", "2", "3", "4", "5"].map(
                                            (option) => (
                                                <option key={option}>
                                                    Option {option}
                                                </option>
                                            )
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group controlId="custom-select">
                                    <Form.Label>Producto</Form.Label>
                                    <Form.Control as="select">
                                        {["1", "2", "3", "4", "5"].map(
                                            (option) => (
                                                <option key={option}>
                                                    Option {option}
                                                </option>
                                            )
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Vendedor</Form.Label>
                                    <Form.Control as="select">
                                        {["1", "2", "3", "4", "5"].map(
                                            (option) => (
                                                <option key={option}>
                                                    Option {option}
                                                </option>
                                            )
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Cantidad</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Precio U.</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <FormControl aria-label="Amount (to the nearest dollar)" />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Total</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <FormControl aria-label="Amount (to the nearest dollar)" />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModal(false)}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={() => setModal(false)}>
                        Cargar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
