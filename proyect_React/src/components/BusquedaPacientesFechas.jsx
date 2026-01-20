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

function BusquedaPacientesFechas() {
    const [dateMin, setDateMin] = useState("");
    const [dateMax, setDateMax] = useState("");
    const [datos, setDatos] = useState([]);
    const [error, setError] = useState(null);
    const [buscado, setBuscado] = useState(false);

    const handleBuscar = async () => {
        setBuscado(true);
        setError(null);
        setDatos([]);

        const valorFechaMin = dateMin.trim();
        const valorFechaMax = dateMax.trim();

        // Validar fecha mínima
        if (isNaN(new Date(valorFechaMin).getTime())) {
            setError("La fecha mínima no es válida");
            return;
        }

        // Validar fecha máxima
        if (isNaN(new Date(valorFechaMax).getTime())) {
            setError("La fecha máxima no es válida");
            return;
        }

        // Validar que fechaMin <= fechaMax
        if (new Date(valorFechaMin) > new Date(valorFechaMax)) {
            setError("La fecha mínima no puede ser mayor que la fecha máxima");
            return;
        }


        try {
            const response = await fetch(
                `http://localhost:3001/api/patients/search-date?startDate=${dateMin}&endDate=${dateMax}`
            );

            const data = await response.json();

            if (response.ok) {
                setDatos(data.datos);
            } else {
                setError(data.mensaje || "No se encontraron pacientes entre esas fechas en concreto");
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
                    Búsqueda de pacientes por Fechas
                </Typography>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField label="Fecha minima" type="date" fullWidth value={dateMin} onChange={(e) => setDateMin(e.target.value)} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField label="Fecha maxima" type="date" fullWidth value={dateMax} onChange={(e) => setDateMax(e.target.value)} />
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
                                <TableCell align="center">Fecha de Nacimiento</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Numero de Telefono</TableCell>
                                <TableCell align="center">Medico asignado</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {datos.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.surname}</TableCell>
                                    <TableCell align="center">{row.birth_date}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align="center">{row.id_doctor}</TableCell>

                                    <TableCell align="center">
                                        <BotonEditar ruta="/patients/update/" id={row.id} />
                                        <BotonBorrar ruta="/patients/delete/" id={row.id} />
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
export default BusquedaPacientesFechas;