// COMPONENTES
import { Productos } from "./Componentes/ProductosComponent/Productos";
import { Clientes } from "./Componentes/ClientesComponent/Clientes";
import { CuentaCorriente } from "./Componentes/CuentaCorrienteComponent/CuentaCorriente";
import { Vendedores } from "./Componentes/VendedoresComponent/Vendedores";
import { Marcas } from "./Componentes/MarcasComponent/Marcas";
import { Ventas } from "./Componentes/VentasComponent/Ventas";
import { Login } from "./Componentes/LoginComponent/Login";
import { NuevoUsuario } from "./Componentes/LoginComponent/NuevoUsuario";
// COMPONENTES

// TEMPLATE
import { Navigation } from "./Comun/TemplateComponent/Navigation";
import { LeftMenu } from "./Comun/TemplateComponent/LeftMenu";
// import { Content } from "./Comun/TemplateComponent/Content";
import { SideBar } from "./Comun/TemplateComponent/SideBar";
// TEMPLATE

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
    const [logueado, setLogueado] = useState(false);

    if (!logueado) {
        return (
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={<Login setLogueado={() => setLogueado()} />}
                    />
                    <Route
                        path="/nuevo-usuario"
                        element={
                            <NuevoUsuario setLogueado={() => setLogueado()} />
                        }
                    />
                </Routes>
            </div>
        );
    }

    return (
        <div>
            <Navigation />
            <LeftMenu />
            {/* <Content /> */}
            <SideBar />
            <div>
                <Routes>
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/ventas" element={<Ventas />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/marcas" element={<Marcas />} />

                    <Route
                        path="/cuenta-corriente"
                        element={<CuentaCorriente />}
                    />
                    <Route path="/vendedores" element={<Vendedores />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
