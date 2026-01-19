import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"
import api from "../api";

function ListadoMedicos() {
    const [datos, setDatos] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMedicos() {
            try {
                const respuesta = await api.get("/doctors/");

                setDatos(respuesta.datos);
                setError(null);
            } catch (error) {
                setError(error.mensaje || "No se pudo conectar al servidor");
                setDatos([]);
            }
        }

        fetchMedicos();
    }, []);

    if (error != null) {
        return (
            <Typography variant="h5" align="center" sx={{ mt: 3 }}>
                {error}
            </Typography>
        );
    }

    if (!datos || datos.length === 0) {
        return (
            <Typography variant="h5" align="center" sx={{ mt: 3 }}>
                No hay médicos disponibles
            </Typography>
        );
    }

    return (
        <>
            <Typography variant="h4" align="center" sx={{ my: 3 }}>
                Listado de Médicos
            </Typography>

            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Apellidos</TableCell>
                            <TableCell align="center">Especialidad</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {datos.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.surname}</TableCell>
                                <TableCell align="center">{row.specialty}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>

                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ mr: 2 }}
                                        onClick={() => navigate("/doctors/update/" + row.id)}
                                    >
                                        <EditIcon />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => navigate("/doctors/delete/" + row.id)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ListadoMedicos;