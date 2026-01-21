import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import BotonBorrar from "./BotonBorrar";
import BotonEditar from "./BotonEditar";

function BusquedaMedicosEspecialidad() {
    const [especialidad, setEspecialidad] = useState("");
    const [datos, setDatos] = useState([]);
    const [error, setError] = useState(null);
    const [buscado, setBuscado] = useState(false);

    const handleBuscar = async () => {
        setBuscado(true);
        setError(null);
        setDatos([]);

        const valor = especialidad.trim(); // elimina espacios antes/después

        if (!valor) {
            setError("Debe indicar la especialidad para ver lo medicos disponibles actualmente de esa especialidad");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3001/api/doctors/search?specialty=${encodeURIComponent(valor)}`
            );

            const data = await response.json();

            if (response.ok) {
                setDatos(data.datos);
            } else {
                setError(data.mensaje || "No se encontraron medicos con esa especialidad en concreto");
            }
        } catch (e) {
            setError("No se pudo conectar con el servidor" + e.toString());
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            {/* FORMULARIO */}
            <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
                    Búsqueda de medicos por Especialidad
                </Typography>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField label="Especialidad" type="text" fullWidth value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Button variant="contained" color="success" size="large" fullWidth onClick={handleBuscar} sx={{ height: "56px" }}>
                            Buscar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* ERROR */}
            {error && (
                <Typography variant="h6" color="error" align="center" sx={{ mb: 3 }}>
                    {error}
                </Typography>
            )}

            {/* RESULTADOS */}
            {buscado && datos.length > 0 && (
                <TableContainer component={Paper}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nombre</TableCell>
                                <TableCell align="center">Apellidos</TableCell>
                                <TableCell align="center">Edad</TableCell>
                                <TableCell align="center">Especialidad</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Salario</TableCell>
                                <TableCell align="center">Activo</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {datos.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.surname}</TableCell>
                                    <TableCell align="center">{row.age}</TableCell>
                                    <TableCell align="center">{row.specialty}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align="center">{row.salary}</TableCell>
                                    <TableCell align="center">{row.active ? "Sí" : "No"}</TableCell>
                                    <TableCell align="center">
                                        <BotonEditar ruta="/doctors/update/" id={row.id} />
                                        <BotonBorrar ruta="/doctors/delete/" id={row.id} />
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}
export default BusquedaMedicosEspecialidad;