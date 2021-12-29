import axios from "axios";

export const client = axios.create({
    headers: {
        Accept: "application/json",
    },
});

const API_PORT = "http://localhost:8000";

export const api = {
    getProductos: () =>
        client.get(API_PORT + "/api/productos", {}).then((res) => res.data),

    getMarcas: () =>
        client.get(API_PORT + "/api/marcas", {}).then((res) => res.data),

    getVendedores: () =>
        client.get(API_PORT + "/api/vendedores", {}).then((res) => res.data),

    getClientes: () =>
        client.get(API_PORT + "/api/clientes", {}).then((res) => res.data),

    getVentas: () =>
        client.get(API_PORT + "/api/ventas", {}).then((res) => res.data),

    getCuentasCorrientes: () =>
        client
            .get(API_PORT + "/api/cuentas-corrientes", {})
            .then((res) => res.data),

    setNuevoProducto: (data) =>
        client.post(API_PORT + "/api/producto", data).then((res) => res.data),
};

export const signin = {
    postLogin: (data) =>
        client.post(API_PORT + "/login", { data }).then((res) => res.data),

    postRegistro: (data) =>
        client.get(API_PORT + "/sign-up", { data }).then((res) => res.data),
};
