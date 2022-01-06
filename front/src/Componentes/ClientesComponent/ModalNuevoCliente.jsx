import { useEffect, useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
export const ModalNuevoCliente = ({
    show,
    setModal,
    api,
    edicion,
    setEdicion,
    clienteEdicion,
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
        setEdicion(false);
        setModal(false);
    };

    const enviarDatos = (data) => {
        let id = edicion ? clienteEdicion.id : null;
        if (edicion) {
            api.putCliente({ id, ...data })
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
            api.setNuevoCliente({ ...data })
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
        if (edicion) {
            setValue("nombre", clienteEdicion.nombre);
            setValue("telefono", clienteEdicion.telefono);
            setValue("email", clienteEdicion.email);
        } else {
            setValue("nombre", null);
            setValue("telefono", null);
            setValue("email", null);
        }
    }, [edicion]);

    return (
        <div>
            <Modal size="lg" show={show}>
                <form onSubmit={handleSubmit(enviarDatos)}>
                    <Modal.Header>
                        <Modal.Title>
                            {edicion ? "Editar" : "Nuevo"} Cliente
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col md={6} sm={12}>
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
                            <Col md={6} sm={12}>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Telefono</Form.Label>
                                    <input
                                        name="telefono"
                                        className="form-control"
                                        {...register("telefono", {
                                            required: true,
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6} sm={12}>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <input
                                        name="email"
                                        className="form-control"
                                        {...register("email", {
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
                    {errors.telefono && (
                        <div className="bg-warning text-center p-2">
                            El telefono es necesario
                        </div>
                    )}
                    {errors.email && (
                        <div className="bg-warning text-center p-2">
                            El email es necesario
                        </div>
                    )}
                    {errorApi && (
                        <div className="bg-warning text-center p-2">
                            {errorApi}
                        </div>
                    )}
                </form>
            </Modal>
        </div>
    );
};
