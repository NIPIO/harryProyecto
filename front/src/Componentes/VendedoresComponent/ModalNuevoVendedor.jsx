import {
    Button,
    Modal,
    Form,
    InputGroup,
    Col,
    Row,
    FormControl,
} from "react-bootstrap";
export const ModalNuevoVendedor = ({ show, setModal }) => {
    const handleSubmit = () => {
        alert("jacer");
    };
    return (
        <div>
            <Modal show={show}>
                <Modal.Header CerrarButton>
                    <Modal.Title>Nuevo Vendedor</Modal.Title>
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
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={12} sm={12}>
                                <Form.Group
                                    as={Col}
                                    className="mb-3"
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control />
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
