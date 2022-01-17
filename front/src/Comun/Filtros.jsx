import { useEffect } from "react";
import { Col, Row, Dropdown, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import moment from "moment";
import { api } from "../api";

export const Filtros = ({ clientes, vendedores, productos }) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const limpiarDatos = () => {
        setValue("cliente", null);
        setValue("vendedor", null);
        setValue("producto", null);
        setValue("desde", moment().format("yyyy-MM-DD"));
        setValue("hasta", moment().format("yyyy-MM-DD"));
    };

    useEffect(() => {
        limpiarDatos();
    }, []);

    const buscarConFiltro = (data) => {
        api.getVentasByFilter(data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                alert("algo pasó");
            });
    };

    return (
        <>
            <div className="w-100">
                <Dropdown className="w-100">
                    <Dropdown.Toggle
                        variant="warning"
                        className="w-100"
                        id="dropdown-basic"
                    >
                        Filtros
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100 text-center p-3">
                        <form onSubmit={handleSubmit(buscarConFiltro)}>
                            <Row>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Cliente</Form.Label>
                                        <select
                                            name="cliente"
                                            className="form-control"
                                            {...register("cliente")}
                                        >
                                            {/* {clientes?.data?.data.map(
                                                (cliente) => (
                                                    <option key={cliente.id}>
                                                        {cliente.nombre}
                                                    </option>
                                                )
                                            )} */}
                                        </select>
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Vendedor</Form.Label>
                                        <select
                                            name="vendedor"
                                            className="form-control"
                                            {...register("vendedor")}
                                        >
                                            {/* {vendedores?.data?.data.map(
                                                (vendedor) => (
                                                    <option key={vendedor.id}>
                                                        {vendedor.nombre}
                                                    </option>
                                                )
                                            )} */}
                                        </select>
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Producto</Form.Label>
                                        <select
                                            name="producto"
                                            className="form-control"
                                            {...register("producto")}
                                        >
                                            {/* {productos?.data?.data.map(
                                                (producto) => (
                                                    <option key={producto.id}>
                                                        {producto.nombre}
                                                    </option>
                                                )
                                            )} */}
                                        </select>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Desde</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="desde"
                                            {...register("desde")}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Hasta</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="hasta"
                                            {...register("hasta")}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row sm={6} className="p-3 text-center">
                                <Col sm={12}>
                                    <Button
                                        variant="warning"
                                        className="mx-1"
                                        onClick={() => {
                                            limpiarDatos();
                                        }}
                                    >
                                        Limpiar
                                    </Button>
                                    <input
                                        className="btn btn-info"
                                        type="submit"
                                        value="Filtrar"
                                    />
                                </Col>
                            </Row>
                        </form>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
};
