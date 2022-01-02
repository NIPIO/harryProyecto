import axios from "axios";

export const client = axios.create({
    headers: {
        Accept: "application/json",
    },
});

const API_PORT = "http://localhost:8000";

export const api = {
    ///GETTERS
    getProductos: () =>
        client.get(API_PORT + "/api/productos", {}).then((res) => res.data),

    getMarcas: () =>
        client.get(API_PORT + "/api/marcas", {}).then((res) => res.data),

    getVendedores: () =>
        client.get(API_PORT + "/api/vendedores", {}).then((res) => res.data),

    getProveedores: () =>
        client.get(API_PORT + "/api/proveedores", {}).then((res) => res.data),

    getClientes: () =>
        client.get(API_PORT + "/api/clientes", {}).then((res) => res.data),

    getVentas: () =>
        client.get(API_PORT + "/api/ventas", {}).then((res) => res.data),

    getCuentasCorrientes: () =>
        client
            .get(API_PORT + "/api/cuentas-corrientes", {})
            .then((res) => res.data),

    ///SETTERS
    setNuevoProducto: (data) =>
        client.post(API_PORT + "/api/producto", data).then((res) => res.data),

    setNuevaMarca: (data) =>
        client.post(API_PORT + "/api/marca", data).then((res) => res.data),

    setNuevaVenta: (data) =>
        client.post(API_PORT + "/api/venta", data).then((res) => res.data),

    setNuevoCliente: (data) =>
        client.post(API_PORT + "/api/cliente", data).then((res) => res.data),

    setNuevoVendedor: (data) =>
        client.post(API_PORT + "/api/vendedor", data).then((res) => res.data),

    setNuevoProveedor: (data) =>
        client.post(API_PORT + "/api/proveedor", data).then((res) => res.data),

    setNuevaCtaCte: (data) =>
        client.post(API_PORT + "/api/ctacte", data).then((res) => res.data),
};

export const signin = {
    postLogin: (data) =>
        client.post(API_PORT + "/login", { data }).then((res) => res.data),

    postRegistro: (data) =>
        client.get(API_PORT + "/sign-up", { data }).then((res) => res.data),
};
