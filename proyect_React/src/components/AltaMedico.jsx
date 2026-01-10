import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";

import api from "../api";

function AltaMedico() {
    const navigate = useNavigate();

    const [medico, setMedico] = useState({
        nombre: "",
        especialidad: "",
    });

    const [isCamposValidos, setIsCamposValidos] = useState({
        nombre: true,
        especialidad: true,
    });

    const [isUpdating, setIsUpdating] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogSeverity, setDialogSeverity] = useState("success");

    useEffect(() => {
        async function fetchCreateMedico() {
            try {
                const respuesta = await api.post("/doctors/", medico);

                setDialogMessage(respuesta.mensaje);
                setDialogSeverity("success");
                setOpenDialog(true);
            } catch (error) {
                setDialogMessage(error.mensaje || "Error al crear el médico");
                setDialogSeverity("error");
                setOpenDialog(true);
            }

            setIsUpdating(false);
        }

        if (isUpdating) fetchCreateMedico();
    }, [isUpdating]);

    function handleChange(e) {
        setMedico({ ...medico, [e.target.name]: e.target.value });
    }

    function handleClick() {
        if (isUpdating) return;

        if (validarDatos()) {
            setIsUpdating(true);
        }
    }

    function handleDialogClose() {
        setOpenDialog(false);

        if (dialogSeverity === "success") navigate("/doctors");
    }

    function validarDatos() {
        let valido = true;
        let objetoValidacion = {
            nombre: true,
            especialidad: true,
        };

        if (medico.nombre.length < 3) {
            valido = false;
            objetoValidacion.nombre = false;
        }

        if (medico.especialidad.length < 3) {
            valido = false;
            objetoValidacion.especialidad = false;
        }

        setIsCamposValidos(objetoValidacion);
        return valido;
    }

    return (
        <>
            <Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                <Grid item size={{ xs: 12, sm: 9, md: 7 }}>
                    <Paper elevation={6} sx={{ mt: 3, p: 3, maxWidth: 900, mx: "auto" }}>
                        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                            Alta de Médico
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item size={{ xs: 10 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="nombre"
                                    label="Nombre"
                                    name="nombre"
                                    type="text"
                                    value={medico.nombre}
                                    onChange={handleChange}
                                    error={!isCamposValidos.nombre}
                                    helperText={!isCamposValidos.nombre && "El nombre debe tener al menos 3 caracteres."}
                                />
                            </Grid>

                            <Grid item size={{ xs: 10 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="especialidad"
                                    label="Especialidad"
                                    name="especialidad"
                                    type="text"
                                    value={medico.especialidad}
                                    onChange={handleChange}
                                    error={!isCamposValidos.especialidad}
                                    helperText={!isCamposValidos.especialidad && "La especialidad debe tener al menos 3 caracteres."}
                                />
                            </Grid>

                            <Grid item size={{ xs: 10 }} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button variant="contained" sx={{ mt: 3 }} loading={isUpdating} onClick={handleClick}>
                                    Aceptar
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={openDialog} onClose={handleDialogClose} disableEscapeKeyDown>
                <DialogTitle>{dialogSeverity === "success" ? "Operación correcta" : "Error"}</DialogTitle>
                <DialogContent dividers>
                    <Alert severity={dialogSeverity} variant="filled">
                        {dialogMessage}
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AltaMedico;