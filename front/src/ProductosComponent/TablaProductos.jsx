import { Table } from "react-bootstrap";

export const TablaProductos = ({ productos }) => {
    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>En Transito</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((element) => (
                        <tr key={element.id}>
                            <td>{element.nombre}</td>
                            <td>{element.marca}</td>
                            <td>{element.precio}</td>
                            <td>{element.stock}</td>
                            <td>{element.en_transito}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};
