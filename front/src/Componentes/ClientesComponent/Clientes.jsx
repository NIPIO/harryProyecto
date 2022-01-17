import { api } from "../../api";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { ModalNuevoCliente } from "./ModalNuevoCliente";
import { Spinner, Button, Col, Row, Container, Table } from "react-bootstrap";
import { useClientes } from "../../apiCalls";

export const Clientes = ({ match, history }) => {
    const [modal, setModal] = useState(false);
    const [edicion, setEdicion] = useState(false);
    const [clienteEdicion, setClienteEdicion] = useState(null);
    let location = useLocation();
    const allClientes = useClientes();

    if (allClientes.isLoading) {
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
                                    Nuevo Cliente
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <div className="container-fluid text-center">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Mail</th>
                                            <th>Telefono</th>
                                            <th>Creado</th>
                                            <th col="2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allClientes.data.data.map(
                                            (cliente) => (
                                                <tr>
                                                    <td>{cliente.nombre}</td>
                                                    <td>{cliente.email}</td>
                                                    <td>{cliente.telefono}</td>
                                                    <td>
                                                        {cliente.created_at}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="info"
                                                            onClick={() => {
                                                                setEdicion(
                                                                    true
                                                                );
                                                                setClienteEdicion(
                                                                    cliente
                                                                );
                                                            }}
                                                        >
                                                            Editar
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
                <ModalNuevoCliente
                    show={modal || edicion}
                    setModal={() => setModal()}
                    api={api}
                    edicion={edicion}
                    setEdicion={setEdicion}
                    clienteEdicion={clienteEdicion}
                />
            </div>
        </>
    );
};
