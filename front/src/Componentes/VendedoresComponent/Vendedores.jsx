import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";

import { Spinner, Button, Row, Container, Table, Modal } from "react-bootstrap";
import { useVendedores } from "../../apiCalls";

export const Vendedores = () => {
    const [vendedores, setVendedores] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [venderorDelete, setVenderorDelete] = useState(null);

    const allVendedores = useVendedores();
    let location = useLocation();

    if (allVendedores.isLoading) {
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
                            {/* <Col md={12}>
                                <Button
                                    variant="success"
                                    onClick={() => setModal(true)}
                                >
                                    Nuevo Vendedor
                                </Button>
                            </Col> */}
                        </Row>
                        <Row>
                            <div className="container-fluid text-center">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Usuario</th>
                                            <th>Comision</th>
                                            <th>Cantidad ventas</th>
                                            <th col="2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vendedores.map((vendedor) => (
                                            <tr>
                                                <td>{vendedor.nombre}</td>
                                                <td>{vendedor.usuario}</td>
                                                <td>
                                                    {vendedor.comision ?? 0}
                                                </td>
                                                <td>¿CANTIDAD VENTAS?</td>
                                                <td>
                                                    <Button
                                                        onClick={() => {
                                                            setVenderorDelete(
                                                                vendedor
                                                            );
                                                            setShowDelete(true);
                                                        }}
                                                        variant={
                                                            vendedor.activo
                                                                ? "primary"
                                                                : "warning"
                                                        }
                                                    >
                                                        {vendedor.activo
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
                <ModalDelete
                    showDelete={showDelete}
                    setShowDelete={setShowDelete}
                    vendedor={venderorDelete}
                />
            </div>
        </>
    );
};

export const ModalDelete = ({ showDelete, setShowDelete, vendedor }) => {
    const modificarEstadoVendedor = () => {
        api.deleteVendedor(vendedor.id)
            .then((res) => {
                setShowDelete(false);
            })
            .catch((err) => {
                console.log("error", err);
            });
    };
    return (
        <Modal show={showDelete}>
            <Modal.Body>¿Modificamos este vendedor?</Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => setShowDelete(false)}
                    variant="secondary"
                >
                    Cancelar
                </Button>
                <Button
                    onClick={() => modificarEstadoVendedor()}
                    variant="primary"
                >
                    Sí
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
