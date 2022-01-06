import { Button, Modal, Form, InputGroup, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
export const ModalNuevaCtaCte = ({
    show,
    setModal,
    api,
    edicion,
    setEdicion,
    cuentaEdicion,
    proveedores,
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
        let id = edicion ? cuentaEdicion.id : null;
        if (edicion) {
            api.putCtaCte({ id, ...data })
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
            api.setNuevaCtaCte({ ...data })
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
            setValue("nombre", cuentaEdicion.nombre);
            setValue("saldo", cuentaEdicion.saldo);
        } else {
            setValue("nombre", null);
            setValue("saldo", null);
        }
    }, [edicion]);

    return (
        <div>
            <Modal size="lg" show={show}>
                <form onSubmit={handleSubmit(enviarDatos)}>
                    <Modal.Header>
                        <Modal.Title>
                            {edicion ? "Editar" : "Nueva"} Cuenta Corriente
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col md={6} sm={12}>
                                <Form.Group>
                                    <Form.Label>Marca</Form.Label>
                                    <select
                                        name="proveedor"
                                        className="form-control"
                                        {...register("proveedor", {
                                            required: true,
                                        })}
                                    >
                                        {proveedores.map((proveedor) => (
                                            <option key={proveedor.id}>
                                                {proveedor.nombre}
                                            </option>
                                        ))}
                                    </select>
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
                                        <input
                                            name="saldo"
                                            className="form-control"
                                            {...register("saldo", {
                                                required: true,
                                            })}
                                        />
                                    </InputGroup>
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

                    {errors.proveedor && (
                        <div className="bg-warning text-center p-2">
                            El proveedor es necesario
                        </div>
                    )}
                    {errors.saldo && (
                        <div className="bg-warning text-center p-2">
                            El saldo es necesario
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
