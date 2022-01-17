import {
    Spinner,
    Container,
    Button,
    Modal,
    Form,
    Col,
    Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CabeceraBody } from "../../Comun/CabeceraBody";
import { TablaNuevaVenta } from "./TablaNuevaVenta";
import { useForm } from "react-hook-form";
import { api } from "../../api";

export const ModalVerVenta = ({ show, setVerVenta, ventaId }) => {
    const [venta, setVenta] = useState([]);
    const [loading, setLoading] = useState(true);

    function getVenta(id) {
        fetch(`http://localhost:8000/api/venta/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setVenta(res.data);
                setLoading(false);
            });
    }

    useEffect(() => {
        if (ventaId) {
            getVenta(ventaId);
        }
    }, [ventaId]);

    if (loading && ventaId > 0) {
        return (
            <div>
                <div className="content-wrapper">
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
        <div>
            <Modal size="lg" show={show}>
                <Modal.Header>
                    <Modal.Title>Venta N° {ventaId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {venta.map((detalle) => (
                                    <tr>
                                        <td>{detalle.producto.nombre}</td>
                                        <td>{detalle.producto.precio}</td>
                                        <td>{detalle.cantidad}</td>
                                        <td>
                                            {detalle.producto.precio *
                                                detalle.cantidad}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="text-center bg-success">
                                <tr>
                                    <td colSpan={6}>
                                        TOTAL FINAL:
                                        <strong>
                                            {venta[0]?.venta.precio_total}
                                        </strong>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setVerVenta(false)}
                    >
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
