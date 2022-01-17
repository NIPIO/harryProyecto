import { api } from "../../api";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { ModalNuevoProducto } from "./ModalNuevoProducto";
import { useMarcas, useProductos } from "../../apiCalls";

import {
    Spinner,
    Button,
    Col,
    Row,
    Container,
    Table,
    Modal,
} from "react-bootstrap";

export const Productos = () => {
    let location = useLocation();
    const [modal, setModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [edicion, setEdicion] = useState(false);
    const [productoEdicion, setProductoEdicion] = useState(null);
    const [productoDelete, setProductoDelete] = useState(null);

    const allMarcas = useMarcas();
    const allProductos = useProductos();

    if (allProductos.isLoading || allMarcas.isLoading) {
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
        <>
            <div>
                <div className="content-wrapper">
                    <CabeceraBody path={location.pathname} />
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Button
                                    variant="success"
                                    onClick={() => setModal(true)}
                                >
                                    Nuevo Producto
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <div className="container-fluid text-center">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Marca</th>
                                            <th>|</th>
                                            <th>Precio</th>
                                            <th>Costo</th>
                                            <th>|</th>
                                            <th>Stock</th>
                                            <th>Reservado</th>
                                            <th>|</th>
                                            <th>En transito</th>
                                            <th>Reservado</th>
                                            <th>|</th>
                                            <th col="2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allProductos.data.data.map(
                                            (producto) => (
                                                <tr key={producto.nombre}>
                                                    <td>{producto.nombre}</td>
                                                    <td>
                                                        {producto.marcas.nombre}
                                                    </td>
                                                    <td></td>
                                                    <td>{producto.precio}</td>
                                                    <td>{producto.costo}</td>
                                                    <td></td>
                                                    <td>{producto.stock}</td>
                                                    <td>
                                                        {
                                                            producto.stock_reservado
                                                        }
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        {producto.en_transito}
                                                    </td>
                                                    <td>
                                                        {
                                                            producto.en_transito_reservado
                                                        }
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <Button
                                                            variant="info"
                                                            onClick={() => {
                                                                setEdicion(
                                                                    true
                                                                );
                                                                setProductoEdicion(
                                                                    producto
                                                                );
                                                            }}
                                                        >
                                                            Editar
                                                        </Button>

                                                        <Button
                                                            onClick={() => {
                                                                setProductoDelete(
                                                                    producto
                                                                );
                                                                setShowDelete(
                                                                    true
                                                                );
                                                            }}
                                                            variant={
                                                                producto.activo
                                                                    ? "primary"
                                                                    : "warning"
                                                            }
                                                        >
                                                            {producto.activo
                                                                ? "Activo"
                                                                : "Inactivo"}
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Row>
                    </Container>
                </div>

                <ModalNuevoProducto
                    show={modal || edicion}
                    setModal={() => setModal()}
                    marcas={allMarcas.data.data}
                    api={api}
                    edicion={edicion}
                    setEdicion={setEdicion}
                    productoEdicion={productoEdicion}
                />

                <ModalDelete
                    showDelete={showDelete}
                    setShowDelete={setShowDelete}
                    producto={productoDelete}
                />
            </div>
        </>
    );
};

export const ModalDelete = ({ showDelete, setShowDelete, producto }) => {
    const modificarEstadoProducto = () => {
        api.deleteProducto(producto.id)
            .then((res) => {
                setShowDelete(false);
            })
            .catch((err) => {
                console.log("error", err);
            });
    };
    return (
        <Modal show={showDelete}>
            <Modal.Body>¿Modificamos este producto?</Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => setShowDelete(false)}
                    variant="secondary"
                >
                    Cancelar
                </Button>
                <Button
                    onClick={() => modificarEstadoProducto()}
                    variant="primary"
                >
                    Sí
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
