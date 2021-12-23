import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ModalNuevoProducto } from "./ModalNuevoProducto";
import { Spinner, Button, Col, Row, Container } from "react-bootstrap";

export const Productos = () => {
    let location = useLocation();
    const [productos, setProductos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [modal, setModal] = useState(false);

    const data = {
        columns: [
            {
                label: "Nombre",
                field: "nombre",
                sort: "asc",
                width: 150,
            },
            {
                label: "Marca",
                field: "marca",
                sort: "asc",
                width: 270,
            },
            {
                label: "Precio",
                field: "precio",
                sort: "asc",
                width: 200,
            },
            {
                label: "Stock",
                field: "stock",
                sort: "asc",
                width: 100,
            },
            {
                label: "En transito",
                field: "en_transito",
                sort: "asc",
                width: 150,
            },
        ],
        rows: productos,
    };

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

                <ModalNuevoProducto
                    show={modal}
                    setModal={() => setModal()}
                    marcas={marcas}
                    api={api}
                />
            </div>
        </>
    );
};
