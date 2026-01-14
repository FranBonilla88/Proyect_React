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
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellidos</TableCell>
                            <TableCell>Especialidad</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {datos.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.surname}</TableCell>
                                <TableCell>{row.specialty}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>

                                <TableCell>
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