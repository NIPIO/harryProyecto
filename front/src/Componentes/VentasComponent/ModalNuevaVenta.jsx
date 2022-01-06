import {
    Spinner,
    Container,
    Button,
    Modal,
    Form,
    Col,
    Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { TablaNuevaVenta } from "./TablaNuevaVenta";
import { useForm } from "react-hook-form";

export const ModalNuevaVenta = ({
    show,
    location,
    setModal,
    api,
    edicion,
    setEdicion,
    ventaEdicion,
    vendedor,
}) => {
    const [clientesSelect, setClientesSelect] = useState([]);
    const allClientes = useQuery("clientes", () =>
        api
            .getClientes()
            .then((res) => setClientesSelect(res.data))
            .catch((err) => {
                console.log("error", err);
            })
    );

    const allProductos = useQuery("productos", () =>
        api
            .getProductos()
            .then((res) => res.data)
            .catch((err) => {
                console.log("error", err);
            })
    );

    const [errorApi, setErrorApi] = useState("");

    const [rowsProductos, setFilas] = useState([]);

    let row = {
        producto: "",
        nombre: "",
        cantidad: 1,
        precioUnitario: "",
    };

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const limpiarDatos = () => {
        setErrorApi("");
        setEdicion(false);
        setModal(false);
    };

    const enviarDatos = (data) => {
        let id = edicion ? ventaEdicion.id : null;

        //Chequeo si los productos vendidos tienen todos los datos:
        let productosInvalidos = rowsProductos.some((prod) => {
            return (
                prod.cantidad === "" ||
                prod.cantidad < 1 ||
                prod.precioUnitario === ""
            );
        });

        if (productosInvalidos) {
            setErrorApi(
                "Faltan campos en los productos (la cantidad no puede ser negativa)"
            );
        } else {
            setErrorApi("");
            if (edicion) {
                api.putVenta({ id, ...data })
                    .then((res) => {
                        if (res.error) {
                            setErrorApi(res.data);
                        } else {
                            setEdicion(false);
                            setModal(false);
                            setErrorApi("");
                            reset();
                        }
                    })
                    .catch((err) => {
                        setErrorApi(err.response.data.message);
                    });
            } else {
                api.setNuevaVenta({ rowsProductos, ...data })
                    .then((res) => {
                        if (res.error) {
                            setErrorApi(res.data);
                        } else {
                            setEdicion(false);
                            setModal(false);
                            setErrorApi("");
                            reset();
                        }
                    })

                    .catch((err) => {
                        setErrorApi(err.response.data.message);
                    });
            }
        }
    };

    useEffect(() => {
        setValue("cliente", edicion ? ventaEdicion.cliente : null);
        setValue("vendedor", vendedor.usuario);
    }, [edicion]);

    if (allClientes.isLoading || allProductos.isLoading) {
        return (
            <div>
                <div className="content-wrapper">
                    <CabeceraBody path={location.pathname} />
                    <Container>
                        <Row>
                            <div className="container-fluid text-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden"></span>
                                </Spinner>
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Modal size="lg" show={show}>
                <form onSubmit={handleSubmit(enviarDatos)}>
                    <Modal.Header>
                        <Modal.Title>
                            {edicion ? "Editar" : "Nueva"} Venta
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            {console.log(ventaEdicion)}
                            <Col md={6} sm={12}>
                                <Form.Group>
                                    <Form.Label>Cliente</Form.Label>
                                    <select
                                        name="cliente"
                                        className="form-control"
                                        {...register("cliente", {
                                            required: true,
                                        })}
                                    >
                                        {clientesSelect.map((cliente) => (
                                            <option key={cliente.id}>
                                                {cliente.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Vendedor</Form.Label>
                                    <input
                                        disabled
                                        name="vendedor"
                                        className="form-control"
                                        {...register("vendedor", {
                                            required: true,
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <TablaNuevaVenta
                            productos={allProductos.data}
                            setFilas={setFilas}
                            filas={
                                // edicion ? productosVentaEdicion : rowsProductos
                                rowsProductos
                            }
                            edicion={edicion}
                            row={row}
                        />
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

                    {errors.cliente && (
                        <div className="bg-warning text-center p-2">
                            El cliente es necesario
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
