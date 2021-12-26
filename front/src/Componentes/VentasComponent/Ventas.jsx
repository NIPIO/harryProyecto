import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ModalNuevaVenta } from "./ModalNuevaVenta";
import { Spinner, Button, Col, Row, Container } from "react-bootstrap";

export const Ventas = ({ match, history }) => {
    const [ventas, setVentas] = useState([]);
    const [modal, setModal] = useState(false);

    const data = {
        columns: [
            {
                label: "Cliente",
                field: "cliente_id",
                width: 100,
                sort: "asc",
            },
            {
                label: "Producto",
                field: "producto_id",
                width: 100,
                sort: "asc",
            },
            {
                label: "Cantidad",
                field: "cantidad",
                width: 100,
                sort: "asc",
            },
            {
                label: "Precio Uni.",
                field: "precio_unidad",
                width: 100,
                sort: "asc",
            },
            {
                label: "Precio Total",
                field: "precio_total",
                width: 100,
                sort: "asc",
            },
            {
                label: "Vendedor",
                field: "vendedor_id",
                width: 100,
                sort: "asc",
            },
            {
                label: "Fecha",
                field: "created_at",
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

    if (allVentas.isLoading) {
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
                                    Nueva Venta
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
                <ModalNuevaVenta
                    show={modal}
                    location={location}
                    setModal={() => setModal()}
                />
            </div>
        </>
    );
};
