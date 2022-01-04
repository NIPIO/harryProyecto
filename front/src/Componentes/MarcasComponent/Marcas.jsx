import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ModalNuevaMarca } from "./ModalNuevaMarca";
import { Spinner, Button, Col, Row, Container } from "react-bootstrap";

export const Marcas = ({ match, history }) => {
    const [marcas, setMarcas] = useState([]);
    const [modal, setModal] = useState(false);

    const data = {
        columns: [
            {
                label: "Marcas",
                field: "nombre",
                width: 100,
                name: "nombre",

                sort: "asc",
            },
            {
                label: "Stock total",
                field: "cantidadTotal",
                name: "id",
                width: 100,
                sort: "asc",
            },
            {
                label: "En transito",
                field: "enTransito",
                name: "id",
                width: 100,
                sort: "asc",
            },
            // {
            //     label: "En transito",
            //     field: "nombre",
            //     name: "nombre",
            //     width: 100,
            //     sort: "asc",
            // },
        ],
        rows: marcas,
    };

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
                                <MDBDataTable
                                    scrollX
                                    width="100px"
                                    striped
                                    bordered
                                    displayEntries={false}
                                    small
                                    searchLabel="Buscar"
                                    infoLabel={[" ", "de", "de", "registos"]}
                                    data={data}
                                />
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
