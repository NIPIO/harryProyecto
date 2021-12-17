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
};

export default api;
