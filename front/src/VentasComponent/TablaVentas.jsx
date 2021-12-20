import { Table } from "react-bootstrap";

export const TablaVentas = ({ ventas }) => {
    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unidad</th>
                        <th>Precio Total</th>
                        <th>Vendedor</th>
                        <th>Vendedor Comisión</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((element) => (
                        <tr key={element.id}>
                            <td>{element.cliente_id}</td>
                            <td>{element.producto_id}</td>
                            <td>{element.cantidad}</td>
                            <td>{element.precio_unidad}</td>
                            <td>{element.precio_total}</td>
                            <td>{element.vendedor_id}</td>
                            <td>{element.vendedor_comision}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};
