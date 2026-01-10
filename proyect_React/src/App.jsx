import { RouterProvider, createBrowserRouter } from "react-router-dom";


import Inicio from "./components/Inicio.jsx";
import ListadoMedicos from "./components/ListadoMedicos";
import AltaMedico from "./components/AltaMedico";

import ListadoPacientes from "./components/ListadoPacientes";
import AltaPaciente from "./components/AltaPaciente";

import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      { index: true, Component: Inicio },

      // MÉDICOS
      {
        path: "/doctors",
        element: <ListadoMedicos />,
      },
      {
        path: "/doctors/new",
        element: <AltaMedico />,
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