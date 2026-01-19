import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Inicio from "./components/Inicio.jsx";
import ListadoMedicos from "./components/ListadoMedicos";
import AltaMedico from "./components/AltaMedico";
import BorrarMedico from "./components/BorrarMedico.jsx";
import EditarMedico from "./components/EditarMedico.jsx";
import BusquedaMedicos from "./components/BusquedaMedicos.jsx";


// import ListadoPacientes from "./components/ListadoPacientes";
// import AltaPaciente from "./components/AltaPaciente";

import Home from "./pages/Home";

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
        element: <BusquedaMedicos />
      },
      // PACIENTES
      // {
      //   path: "/patients",
      //   element: <ListadoPacientes />,
      // },
      // {
      //   path: "/patients/new",
      //   element: <AltaPaciente />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;