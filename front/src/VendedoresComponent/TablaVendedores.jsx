import { Table } from "react-bootstrap";

export const TablaVendedores = ({ vendedores }) => {
    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    {vendedores.map((element) => (
                        <tr key={element.id}>
                            <td>{element.nombre}</td>
                            <td>{element.email}</td>
                            <td>{element.telefono}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};
