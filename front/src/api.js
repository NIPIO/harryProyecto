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

    getVenta: (id) =>
        client.get(API_PORT + `/api/venta/${id}`, id).then((res) => res.data),

    getCompras: () =>
        client.get(API_PORT + "/api/compras", {}).then((res) => res.data),

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

    setNuevaCompra: (data) =>
        client.post(API_PORT + "/api/compra", data).then((res) => res.data),

    setNuevoCliente: (data) =>
        client.post(API_PORT + "/api/cliente", data).then((res) => res.data),

    setNuevoVendedor: (data) =>
        client.post(API_PORT + "/api/vendedor", data).then((res) => res.data),

    setNuevoProveedor: (data) =>
        client.post(API_PORT + "/api/proveedor", data).then((res) => res.data),

    setNuevaCtaCte: (data) =>
        client
            .post(API_PORT + "/api/cuentas-corrientes", data)
            .then((res) => res.data),

    //PUTTERS
    putProducto: (data) =>
        client
            .put(API_PORT + `/api/producto/${data.id}`, data)
            .then((res) => res.data),
    putMarca: (data) =>
        client
            .put(API_PORT + `/api/marca/${data.id}`, data)
            .then((res) => res.data),
    putCliente: (data) =>
        client
            .put(API_PORT + `/api/cliente/${data.id}`, data)
            .then((res) => res.data),
    putProveedor: (data) =>
        client
            .put(API_PORT + `/api/proveedor/${data.id}`, data)
            .then((res) => res.data),
    putCtaCte: (data) =>
        client
            .put(API_PORT + `/api/cuentas-corrientes/${data.id}`, data)
            .then((res) => res.data),

    putVenta: (data) =>
        client
            .put(API_PORT + `/api/venta/${data.id}`, data)
            .then((res) => res.data),
    //DELETERS
    deleteProducto: (id) =>
        client
            .delete(API_PORT + `/api/producto/${id}`, id)
            .then((res) => res.data),

    deleteMarca: (id) =>
        client
            .delete(API_PORT + `/api/marca/${id}`, id)
            .then((res) => res.data),

    deleteVendedor: (id) =>
        client
            .delete(API_PORT + `/api/vendedor/${id}`, id)
            .then((res) => res.data),
};

export const signin = {
    postLogin: (data) =>
        client.post(API_PORT + "/api/login", data).then((res) => res.data),

    postRegistro: (data) =>
        client.post(API_PORT + "/api/registro", data).then((res) => res.data),
};
