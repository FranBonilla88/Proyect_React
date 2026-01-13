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

    const [doctor, setDoctor] = useState({
        name: "",
        surname: "",
        specialty: "",
        email: "",
        phone: ""
    });

    const [isCamposValidos, setIsCamposValidos] = useState({
        name: true,
        surname: true,
        specialty: true,
        email: true,
        phone: true
    });

    const [isUpdating, setIsUpdating] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogSeverity, setDialogSeverity] = useState("success");

    useEffect(() => {
        async function fetchCreateDoctor() {
            try {
                const doctorAEnviar = {
                    ...doctor,
                    phone: Number(doctor.phone)
                };

                const respuesta = await api.post("/doctors/", doctorAEnviar);

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

        if (isUpdating) fetchCreateDoctor();
    }, [isUpdating]);

    function handleChange(e) {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
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
            name: true,
            surname: true,
            specialty: true,
            email: true,
            phone: true
        };

        // NAME: solo letras, mínimo 3 caracteres
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(doctor.name.trim())) {
            valido = false;
            objetoValidacion.name = false;
        }

        // SURNAME: solo letras y espacios, mínimo 3 caracteres
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(doctor.surname.trim())) {
            valido = false;
            objetoValidacion.surname = false;
        }

        // SPECIALTY: mínimo 3 caracteres, puede incluir letras y espacios
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(doctor.specialty.trim())) {
            valido = false;
            objetoValidacion.specialty = false;
        }

        // EMAIL: formato válido con dominio y extensión
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(doctor.email.trim())) {
            valido = false;
            objetoValidacion.email = false;
        }

        // Teléfono español: 9 dígitos, empieza por 6, 7, 8 o 9
        if (!/^[6789]\d{8}$/.test(doctor.phone.trim())) {
            valido = false;
            objetoValidacion.phone = false;
        }

        setIsCamposValidos(objetoValidacion);
        return valido;
    }

    return (
        <>
            <Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                <Grid item xs={12} sm={9} md={7}>
                    <Paper elevation={6} sx={{ mt: 3, p: 3, maxWidth: 900, mx: "auto" }}>
                        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                            Alta de Médico
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nombre: "
                                    name="name"
                                    type="text"
                                    value={doctor.name}
                                    onChange={handleChange}
                                    error={!isCamposValidos.name}
                                    helperText={!isCamposValidos.name && "El nombre debe tener al menos 3 caracteres."}
                                />
                            </Grid>

                            <Grid item xs={10}>
                                <TextField
                                    required
                                    fullWidth
                                    id="surname"
                                    label="Apellidos"
                                    name="surname"
                                    type="text"
                                    value={doctor.surname}
                                    onChange={handleChange}
                                    error={!isCamposValidos.surname}
                                    helperText={!isCamposValidos.surname && "El apellido debe tener al menos 3 caracteres."}
                                />
                            </Grid>

                            <Grid item xs={10}>
                                <TextField
                                    required
                                    fullWidth
                                    id="specialty"
                                    label="Especialidad"
                                    name="specialty"
                                    type="text"
                                    value={doctor.specialty}
                                    onChange={handleChange}
                                    error={!isCamposValidos.specialty}
                                    helperText={!isCamposValidos.specialty && "La especialidad debe tener al menos 3 caracteres."}
                                />
                            </Grid>

                            <Grid item xs={10}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo Electronico"
                                    name="email"
                                    type="text"
                                    value={doctor.email}
                                    onChange={handleChange}
                                    error={!isCamposValidos.email}
                                    helperText={!isCamposValidos.email && "Introduce un correo electronico válido"}
                                />
                            </Grid>

                            <Grid item xs={10}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Numero de Telefono"
                                    name="phone"
                                    type="text"
                                    inputProps={{ maxLength: 9 }}
                                    value={doctor.phone}
                                    onChange={handleChange}
                                    error={!isCamposValidos.phone}
                                    helperText={!isCamposValidos.phone && "Debe tener 9 dígitos y empezar por 6, 7, 8 o 9."}
                                />
                            </Grid>

                            <Grid item xs={10} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button disabled={isUpdating} variant="contained" sx={{ mt: 3 }} onClick={handleClick}>
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