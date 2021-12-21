import api from "../../api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ModalNuevoVendedor } from "./ModalNuevoVendedor";

export const Vendedores = () => {
    const [vendedores, setVendedores] = useState([]);
    const [modal, setModal] = useState(false);

    const data = {
        columns: [
            {
                label: "Nombre",
                field: "nombre",
                width: 100,
                sort: "asc",
            },
            {
                label: "Email",
                field: "email",
                width: 100,
                sort: "asc",
            },
            {
                label: "Telefono",
                field: "telefono",
                width: 100,
                sort: "asc",
            },
        ],
        rows: vendedores,
    };

    const allVendedores = useQuery("vendedores", () =>
        api
            .getVendedores()
            .then((res) => setVendedores(res.data))
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
                    <div className="content  text-center">
                        <div class="w-100 ">
                            <div class=" w-50" style={{ float: "right" }}>
                                <Button
                                    variant="success"
                                    style={{ float: "right" }}
                                    onClick={() => setModal(true)}
                                >
                                    Nuevo Vendedor
                                </Button>
                            </div>
                        </div>
                        <div className="container-fluid">
                            {allVendedores.isLoading ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden"></span>
                                </Spinner>
                            ) : (
                                <MDBDataTable
                                    scrollY
                                    scrollX
                                    maxHeight="200px"
                                    striped
                                    bordered
                                    small
                                    data={data}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <ModalNuevoVendedor show={modal} setModal={() => setModal()} />
            </div>
        </>
    );
};
