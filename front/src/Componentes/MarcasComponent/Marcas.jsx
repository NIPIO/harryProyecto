import api from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ModalNuevaMarca } from "./ModalNuevaMarca";
import { Spinner, Button, Col, Row, Container } from "react-bootstrap";

export const Marcas = ({ match, history }) => {
    const [ventas, setVentas] = useState([]);
    const [modal, setModal] = useState(false);

    const data = {
        columns: [
            {
                label: "Marcas",
                field: "cliente_id",
                width: 100,
                sort: "asc",
            },
            {
                label: "Stock total",
                field: "producto_id",
                width: 100,
                sort: "asc",
            },
            {
                label: "En transito",
                field: "producto_id",
                width: 100,
                sort: "asc",
            },
        ],
        rows: ventas,
    };

    const allVentas = useQuery("ventar", () =>
        api
            .getVentas()
            .then((res) => setVentas(res.data))
            .catch((err) => {
                console.log("error", err);
            })
    );
    let location = useLocation();

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
                                {allVentas.isLoading ? (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden"></span>
                                    </Spinner>
                                ) : (
                                    <>
                                        <MDBDataTable
                                            scrollX
                                            width="100px"
                                            striped
                                            bordered
                                            displayEntries={false}
                                            small
                                            searchLabel="Buscar"
                                            sorting={true}
                                            infoLabel={[
                                                " ",
                                                "de",
                                                "de",
                                                "registos",
                                            ]}
                                            data={data}
                                        />
                                    </>
                                )}
                            </div>
                        </Row>
                    </Container>
                </div>
                <ModalNuevaMarca show={modal} setModal={() => setModal()} />
            </div>
        </>
    );
};
