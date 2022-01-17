import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { ModalNuevaCtaCte } from "./ModalNuevaCtaCte";
import { Spinner, Button, Col, Row, Container, Table } from "react-bootstrap";
import { useCuentas, useProveedores } from "../../apiCalls";

export const CuentaCorriente = ({ match, history }) => {
    const [modal, setModal] = useState(false);
    const [edicion, setEdicion] = useState(false);
    const [cuentaEdicion, setCuentaEdicion] = useState(null);
    let location = useLocation();
    const allCuentas = useCuentas();
    const allProveedores = useProveedores();

    if (allCuentas.isLoading || allProveedores.isLoading) {
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
                                    Nueva Cta Cte
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <div className="container-fluid text-center">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Saldo</th>
                                            <th>Ult. Modificacion</th>
                                            <th col="2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allCuentas.data.data.map((cta) => (
                                            <tr>
                                                <td>{cta.proveedor.nombre}</td>
                                                <td>{cta.saldo}</td>
                                                <td>{cta.updated_at}</td>
                                                <td>
                                                    <Button
                                                        variant="info"
                                                        onClick={() => {
                                                            setEdicion(true);
                                                            setCuentaEdicion(
                                                                cta
                                                            );
                                                        }}
                                                    >
                                                        Editar
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
                <ModalNuevaCtaCte
                    show={modal || edicion}
                    setModal={() => setModal()}
                    api={api}
                    edicion={edicion}
                    setEdicion={setEdicion}
                    cuentaEdicion={cuentaEdicion}
                    proveedores={allProveedores.data.data}
                />
            </div>
        </>
    );
};
