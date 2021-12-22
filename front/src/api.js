import axios from "axios";

export const client = axios.create({
    headers: {
        Accept: "application/json",
    },
});

const API_PORT = "http://localhost:8000";

const api = {
    getProductos: () =>
        client.get(API_PORT + "/admin/productos", {}).then((res) => res.data),

    getMarcas: () =>
        client.get(API_PORT + "/admin/marcas", {}).then((res) => res.data),

    getVendedores: () =>
        client.get(API_PORT + "/admin/vendedores", {}).then((res) => res.data),

    getClientes: () =>
        client.get(API_PORT + "/admin/clientes", {}).then((res) => res.data),

    getVentas: () =>
        client.get(API_PORT + "/admin/ventas", {}).then((res) => res.data),

    getCuentasCorrientes: () =>
        client
            .get(API_PORT + "/admin/cuentas-corrientes", {})
            .then((res) => res.data),

    setNuevoProducto: (data) =>
        client.post(API_PORT + "/admin/producto", data).then((res) => res.data),
};

export default api;
