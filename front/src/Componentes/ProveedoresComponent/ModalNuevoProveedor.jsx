import { useEffect, useState } from "react";

import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

export const ModalNuevoProveedor = ({
    show,
    setModal,
    api,
    edicion,
    setEdicion,
    proveedorEdicion,
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
        let id = edicion ? proveedorEdicion.id : null;
        if (edicion) {
            api.putProveedor({ id, ...data })
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
            api.setNuevoProveedor({ ...data })
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
        setValue("nombre", edicion ? proveedorEdicion.nombre : null);
    }, [edicion]);

    return (
        <div>
            <Modal show={show}>
                <form onSubmit={handleSubmit(enviarDatos)}>
                    <Modal.Header>
                        <Modal.Title>
                            {edicion ? "Editar" : "Nuevo"} Proveedor
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col sm={12}>
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
