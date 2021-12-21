import {
    Button,
    Modal,
    FloatingLabel,
    Form,
    InputGroup,
    Col,
    Row,
    FormControl,
} from "react-bootstrap";

export const ModalNuevoProducto = ({ show, setModal }) => {
    const handleSubmit = () => {
        alert("jacer");
    };
    return (
        <div>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Producto</Modal.Title>
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
                                    <Form.Control />
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group controlId="custom-select">
                                    <Form.Label>Marca</Form.Label>
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
                            <Form.Group
                                as={Col}
                                className="mb-3"
                                controlId="formGridAddress1"
                            >
                                <Form.Label>Stock</Form.Label>
                                <Form.Control />
                            </Form.Group>

                            <Form.Group
                                as={Col}
                                className="mb-3"
                                controlId="formGridAddress1"
                            >
                                <Form.Label>Precio</Form.Label>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <FormControl aria-label="Amount (to the nearest dollar)" />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setModal(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
