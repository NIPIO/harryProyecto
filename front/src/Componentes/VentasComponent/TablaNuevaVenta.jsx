import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

export const TablaNuevaVenta = ({ productos, filas, setFilas, row }) => {
    const handleChangeSelect = (e, idx) => {
        let idProducto = e.target.selectedIndex - 1;
        filas[idx]["producto"] = idProducto;
        filas[idx]["precioUnitario"] = productos[idProducto].precio;
        filas[idx]["nombre"] = productos[idProducto].nombre;
        setFilas([...filas]);
    };

    const handleChange = (e, idx) => {
        const { name, value } = e.target;
        filas[idx][name] = value;
        setFilas([...filas]);
    };
    const handleAddRow = () => {
        const item = {
            producto: "",
            nombre: "",
            cantidad: 1,
            precioUnitario: "",
        };
        setFilas([...filas, item]);
    };

    const handleRemoveSpecificRow = (idx) => {
        const rows = [...filas];
        rows.splice(idx, 1);
        setFilas([...rows]);
    };

    return (
        <div>
            <div className="container">
                <div className="row clearfix">
                    <div className="col-md-12 column">
                        <table
                            className="table table-bordered table-hover"
                            id="tab_logic"
                        >
                            <thead>
                                <tr>
                                    <th className="text-center"> # </th>
                                    <th className="text-center"> Producto </th>
                                    <th className="text-center"> Cantidad </th>
                                    <th className="text-center"> Precio U. </th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {filas.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx}</td>
                                        <td>
                                            <Form.Control
                                                onChange={(e) =>
                                                    handleChangeSelect(e, idx)
                                                }
                                                as="select"
                                                value={filas[idx].nombre}
                                                required
                                            >
                                                <option value="">
                                                    Seleccioná
                                                </option>
                                                {productos.map((producto) => (
                                                    <option key={producto.id}>
                                                        {producto.nombre}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="cantidad"
                                                value={filas[idx].cantidad}
                                                onChange={(e) =>
                                                    handleChange(e, idx)
                                                }
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="precioUnitario"
                                                value={
                                                    filas[idx].precioUnitario
                                                }
                                                onChange={(e) =>
                                                    handleChange(e, idx)
                                                }
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <Button
                                                variant="success"
                                                onClick={() =>
                                                    handleRemoveSpecificRow(idx)
                                                }
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Button
                            variant="success"
                            onClick={() => handleAddRow()}
                        >
                            Agregar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
