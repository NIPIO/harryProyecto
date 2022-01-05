import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { ModalNuevaMarca } from "./ModalNuevaMarca";
import { Spinner, Button, Col, Row, Container, Table } from "react-bootstrap";

export const Marcas = ({ match, history }) => {
    const [marcas, setMarcas] = useState([]);
    const [modal, setModal] = useState(false);

    const allMarcas = useQuery("marcas", () =>
        api
            .getMarcas()
            .then((res) => setMarcas(res.data))
            .catch((err) => {
                console.log("error", err);
            })
    );

    let location = useLocation();

    if (allMarcas.isLoading) {
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
                                    Nueva Marca
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <div className="container-fluid text-center">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Stock total</th>
                                            <th>En transito</th>
                                            <th col="2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {marcas.map((marca) => (
                                            <tr>
                                                <td>{marca.nombre}</td>
                                                <td>{marca.stock}</td>
                                                <td>{marca.en_transito}</td>
                                                <td>
                                                    <Button variant="info">
                                                        Editar
                                                    </Button>
                                                    <Button variant="danger">
                                                        Borrar
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
                <ModalNuevaMarca
                    show={modal}
                    setModal={() => setModal()}
                    api={api}
                />
            </div>
        </>
    );
};
