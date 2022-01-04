import { api } from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ModalNuevaCompra } from "./ModalNuevaCompra";
import { Spinner, Button, Col, Row, Container } from "react-bootstrap";

export const Compras = ({ match, history }) => {
    // const allCompras = useQuery("ventar", () =>
    //     api
    //         .getVentas()
    //         .then((res) => setVentas(res.data))
    //         .catch((err) => {
    //             console.log("error", err);
    //         })
    // );
    let location = useLocation();

    // if (allVentas.isLoading) {
    //     return (
    //         <div>
    //             <div className="content-wrapper">
    //                 <CabeceraBody path={location.pathname} />
    //                 <Container>
    //                     <Row>
    //                         <div className="container-fluid text-center">
    //                             <Spinner animation="border" role="status">
    //                                 <span className="visually-hidden"></span>
    //                             </Spinner>
    //                         </div>
    //                     </Row>
    //                 </Container>
    //             </div>
    //         </div>
    //     );
    // }

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
                                    // onClick={() => setModal(true)}
                                >
                                    Nueva Compra
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <div className="container-fluid text-center">
                                {/* <MDBDataTable
                                    scrollX
                                    width="100px"
                                    striped
                                    bordered
                                    displayEntries={false}
                                    small
                                    searchLabel="Buscar"
                                    infoLabel={[" ", "de", "de", "registos"]}
                                    data={data}
                                /> */}
                            </div>
                        </Row>
                    </Container>
                </div>
                <ModalNuevaCompra />
            </div>
        </>
    );
};
