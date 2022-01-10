import { useEffect, useState } from "react";
import { Button, Modal, Form, InputGroup, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

export const ModalNuevoProducto = ({
    show,
    setModal,
    marcas,
    api,
    edicion,
    setEdicion,
    productoEdicion,
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
        let id = edicion ? productoEdicion.id : null;
        if (edicion) {
            api.putProducto({ id, ...data })
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
            api.setNuevoProducto({ ...data })
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
            setValue("nombre", productoEdicion.nombre);
            setValue("marca", productoEdicion.marcas.nombre);
            setValue("precio", productoEdicion.precio);
            setValue("stock", productoEdicion.stock);
        } else {
            setValue("nombre", null);
            setValue("marca", null);
            setValue("precio", null);
            setValue("stock", null);
        }
    }, [edicion]);

    return (
        <div>
            <Modal size="lg" show={show}>
                <form onSubmit={handleSubmit(enviarDatos)}>
                    <Modal.Header>
                        <Modal.Title>
                            {edicion ? "Editar" : "Nuevo"} Producto
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col md={4} sm={12}>
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
                            <Col md={4} sm={12}>
                                <Form.Group>
                                    <Form.Label>Marca</Form.Label>
                                    <select
                                        name="marca"
                                        className="form-control"
                                        {...register("marca", {
                                            required: true,
                                        })}
                                    >
                                        {marcas.map((marca) => (
                                            <option key={marca.id}>
                                                {marca.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col md={4} sm={12}>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Stock</Form.Label>
                                    <input
                                        name="stock"
                                        className="form-control"
                                        {...register("stock", {
                                            required: true,
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6} sm={12}>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Precio</Form.Label>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <input
                                            name="precio"
                                            className="form-control"
                                            {...register("precio", {
                                                required: true,
                                            })}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Costo</Form.Label>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <input
                                            name="costo"
                                            className="form-control"
                                            {...register("costo", {
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
                        <input
                            className="btn btn-success"
                            type="submit"
                            value="Guardar"
                        />
                    </Modal.Footer>

                    {errors.nombre && (
                        <div className="bg-warning text-center p-2">
                            El nombre es necesario
                        </div>
                    )}
                    {errors.stock && (
                        <div className="bg-warning text-center p-2">
                            El stock es necesario
                        </div>
                    )}
                    {errors.precio && (
                        <div className="bg-warning text-center p-2">
                            El precio es necesario
                        </div>
                    )}
                    {errors.marca && (
                        <div className="bg-warning text-center p-2">
                            La marca es necesaria
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
