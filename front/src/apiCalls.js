import { useQuery } from "react-query";
import { api } from "./api";

export function useVentas() {
    return useQuery("ventas", () => api.getVentas());
}

export function useProductos() {
    return useQuery("productos", () => api.getProductos());
}

export function useClientes() {
    return useQuery("clientes", () => api.getClientes());
}

export function useCompras() {
    return useQuery("compras", () => api.getCompras());
}

export function useVendedores() {
    return useQuery("vendedores", () => api.getVendedores());
}

export function useCuentas() {
    return useQuery("cuentas", () => api.getCuentasCorrientes());
}

export function useProveedores() {
    return useQuery("proveedores", () => api.getProveedores());
}

export function useMarcas() {
    return useQuery("marcas", () => api.getMarcas());
}
