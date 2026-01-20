import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Inicio from "./components/Inicio.jsx";
import ListadoMedicos from "./components/ListadoMedicos";
import AltaMedico from "./components/AltaMedico";
import BorrarMedico from "./components/BorrarMedico.jsx";
import EditarMedico from "./components/EditarMedico.jsx";
import BusquedaMedicosEspecialidad from "./components/BusquedaMedicosEspecialidad.jsx";
import BusquedaMedicosEdades from "./components/BusquedaMedicosEdades.jsx";
import AltaPaciente from "./components/AltaPaciente.jsx";
import ListadoPacientes from "./components/ListadoPacientes.jsx";
import BorrarPaciente from "./components/BorrarPaciente.jsx";
import EditarPaciente from "./components/EditarPaciente.jsx";

// import ListadoPacientes from "./components/ListadoPacientes";
// import AltaPaciente from "./components/AltaPaciente";

import Home from "./pages/Home";
import BusquedaPacientesFechas from "./components/BusquedaPacientesFechas.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <Inicio /> },

      // MÉDICOS
      {
        path: "/doctors",
        element: <ListadoMedicos />,
      },
      {
        path: "/doctors/new",
        element: <AltaMedico />,
      },
      {
        path: "/doctors/delete/:id",
        element: <BorrarMedico />,
      },
      {
        path: "/doctors/update/:id",
        element: <EditarMedico />
      },
      {
        path: "/doctors/search",
        element: <BusquedaMedicosEspecialidad />
      },
      {
        path: "/doctors/search-age",
        element: <BusquedaMedicosEdades />
      },
      // PACIENTES
      {
        path: "/patients",
        element: <ListadoPacientes />,
      },
      {
        path: "/patients/new",
        element: <AltaPaciente />,
      },
      {
        path: "/patients/delete/:id",
        element: <BorrarPaciente />,
      },
      {
        path: "/patients/update/:id",
        element: <EditarPaciente />
      },
      {
        path: "/patients/search-date",
        element: <BusquedaPacientesFechas />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;