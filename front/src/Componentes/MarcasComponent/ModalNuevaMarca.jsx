import { useEffect, useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

export const ModalNuevaMarca = ({
    show,
    setModal,
    api,
    edicion,
    setEdicion,
    marcaEdicion,
}) => {
    const [errorApi, setErrorApi] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const limpiarDatos = () => {
        reset();
        setErrorApi("");
        setEdicion(false);
        setModal(false);
    };

    const enviarDatos = (data) => {
        let id = edicion ? marcaEdicion.id : null;

        if (edicion) {
            api.putMarca({ id, ...data })
                .then((res) => {
                    if (res.error) {
                        setErrorApi(res.data);
                    } else {
                        setEdicion(false);
                        setModal(false);
                        setErrorApi("");
                    }
                })
                .catch((err) => {
                    setErrorApi(err.response.data.message);
                });
        } else {
            api.setNuevaMarca({ ...data })
                .then((res) => {
                    if (res.error) {
                        setErrorApi(res.data);
                    } else {
                        setEdicion(false);
                        setModal(false);
                        setErrorApi("");
                    }
                })
                .catch((err) => {
                    setErrorApi(err.response.data.message);
                });
        }
    };

    useEffect(() => {
        setValue("nombre", edicion ? marcaEdicion.nombre : null);
    }, [edicion]);

    return (
        <div>
            <Modal size="lg" show={show}>
                <form onSubmit={handleSubmit(enviarDatos)}>
                    <Modal.Header>
                        <Modal.Title>
                            {edicion ? "Editar" : "Nueva"} Marca
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col md={12} sm={12}>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <input
                                        name="nombre"
                                        className="form-control"
                                        {...register("nombre", {
                                            required: true,
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => limpiarDatos()}
                        >
                            Cerrar
                        </Button>
                        <input className="btn btn-success" type="submit" />
                    </Modal.Footer>
                    {errors.nombre && (
                        <div className="bg-warning text-center p-2">
                            El nombre es necesario
                        </div>
                    )}
                </form>
            </Modal>
        </div>
    );
};
