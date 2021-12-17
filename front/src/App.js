// COMPONENTES
import { Productos } from "./ProductosComponent/Productos";
import { Clientes } from "./ClientesComponent/Clientes";
import { CuentaCorriente } from "./CuentaCorrienteComponent/CuentaCorriente";
import { Usuarios } from "./UsuariosComponent/Usuarios";
// COMPONENTES

// TEMPLATE
import { Navigation } from "./ZTemplateComponent/Navigation";
import { LeftMenu } from "./ZTemplateComponent/LeftMenu";
// import { Content } from "./ZTemplateComponent/Content";
import { SideBar } from "./ZTemplateComponent/SideBar";
// TEMPLATE

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Navigation />
            <LeftMenu />
            {/* <Content /> */}
            <SideBar />
            <div>
                <Routes>
                    <Route exact path="/productos" element={<Productos />} />
                    <Route exact path="/clientes" element={<Clientes />} />
                    <Route
                        exact
                        path="/cuenta-corriente"
                        element={<CuentaCorriente />}
                    />
                    <Route exact path="/usuarios" element={<Usuarios />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
