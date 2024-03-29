import {
    Spinner,
    Container,
    Button,
    Modal,
    Form,
    Col,
    Row,
} from "react-bootstrap";
import { useState } from "react";
import { useQuery } from "react-query";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { TablaNuevaVenta } from "../VentasComponent/TablaNuevaVenta";

import { useForm } from "react-hook-form";
export const ModalNuevaCompra = ({
    show,
    setModal,
    location,
    api,
    edicion,
    setEdicion,
    compraEdicion,
}) => {
    const [proveedoresSelect, setProveedoresSelect] = useState([]);

    const allProveedores = useQuery("proveedores", () =>
        api
            .getProveedores()
            .then((res) => setProveedoresSelect(res.data))
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
        let id = edicion ? compraEdicion.id : null;

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
                // api.putCompra({ id, ...data })
                //     .then((res) => {
                //         if (res.error) {
                //             setErrorApi(res.data);
                //         } else {
                //             setEdicion(false);
                //             setModal(false);
                //             setErrorApi("");
                //             reset();
                //         }
                //     })
                //     .catch((err) => {
                //         setErrorApi(err.response.data.message);
                //     });
            } else {
                api.setNuevaCompra({ rowsProductos, ...data })
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

    if (allProveedores.isLoading || allProductos.isLoading) {
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
                        <Modal.Title>Nueva Compra</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col md={6} sm={12}>
                                <Form.Group>
                                    <Form.Label>Proveedor</Form.Label>
                                    <select
                                        name="proveedor"
                                        className="form-control"
                                        {...register("proveedor", {
                                            required: true,
                                        })}
                                    >
                                        {proveedoresSelect.map((cliente) => (
                                            <option key={cliente.id}>
                                                {cliente.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <TablaNuevaVenta
                            productos={allProductos.data}
                            setFilas={setFilas}
                            filas={rowsProductos}
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
                        <input
                            className="btn btn-success"
                            type="submit"
                            value="Guardar"
                        />
                    </Modal.Footer>

                    {errors.proveedor && (
                        <div className="bg-warning text-center p-2">
                            El proveedor es necesario
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
