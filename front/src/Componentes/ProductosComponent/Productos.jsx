import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { ModalNuevoProducto } from "./ModalNuevoProducto";
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
    const [productos, setProductos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [modal, setModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [edicion, setEdicion] = useState(false);
    const [productoEdicion, setProductoEdicion] = useState(null);
    const [productoDelete, setProductoDelete] = useState(null);

    const allMarcas = useQuery(["marcas"], () =>
        api
            .getMarcas()
            .then((res) => setMarcas(res.data))
            .catch((err) => {
                console.log("error", err);
            })
    );

    const allProductos = useQuery("productos", () =>
        api
            .getProductos()
            .then((res) => setProductos(res.data))
            .catch((err) => {
                console.log("error", err);
            })
    );

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
                                            <th>Precio</th>
                                            <th>Stock</th>
                                            <th>En transito</th>
                                            <th col="2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productos.map((producto) => (
                                            <tr key={producto.nombre}>
                                                <td>{producto.nombre}</td>
                                                <td>
                                                    {producto.marcas.nombre}
                                                </td>
                                                <td>{producto.precio}</td>
                                                <td>{producto.stock}</td>
                                                <td>{producto.en_transito}</td>
                                                <td>
                                                    <Button
                                                        variant="info"
                                                        className="mx-3"
                                                        onClick={() => {
                                                            setEdicion(true);
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
                                                            setShowDelete(true);
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
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Row>
                    </Container>
                </div>

                <ModalNuevoProducto
                    show={modal || edicion}
                    setModal={() => setModal()}
                    marcas={marcas}
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
