import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import api from "../api";

function EditarMedico() {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({
        name: "",
        surname: "",
        age: "",
        specialty: "",
        email: "",
        phone: "",
    });
    const [isCamposValidos, setIsCamposValidos] = useState({
        name: true,
        surname: true,
        age: true,
        specialty: true,
        email: true,
        phone: true,
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogSeverity, setDialogSeverity] = useState("success");
    const { id } = useParams();

    useEffect(() => {
        async function fetchUpdateDoctor() {
            try {
                await api.put(`/doctors/${id}`, doctor);

                setDialogMessage("Actualización correcta del medico"); // Mensaje
                setDialogSeverity("success"); // Color verde
                setOpenDialog(true); // Abrir el diálogo
            } catch (error) {
                setDialogMessage(error.mensaje || "Error al actualizar el medico");
                setDialogSeverity("error"); // Color rojo
                setOpenDialog(true); // Abrir el diálogo
            }
            // Pase lo que pase hemos terminado el proceso de actualización
            setIsUpdating(false);
        }

        if (isUpdating) fetchUpdateDoctor();
    }, [isUpdating]);

    useEffect(() => {
        async function fetchDirector() {
            try {
                const respuesta = await api.get(`/doctors/${id}`);

                setDoctor(respuesta.datos);

            } catch (error) {
                setDialogMessage(error.mensaje || "Error al recuperar los datos del medico");
                setDialogSeverity("error"); // Color rojo
                setOpenDialog(true); // Abrir el diálogo
            }
        }

        fetchDirector();
    }, [id]);

    function handleChange(e) {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
    }

    function handleClick() {
        // evitar envíos duplicados por pulsar el botón tras el mensaje de inserción correcta
        if (isUpdating) return;

        if (validarDatos()) {
            setIsUpdating(true);
        }
    }

    function handleDialogClose() {
        setOpenDialog(false);

        if (dialogSeverity === "success") navigate("/");
    }

    function validarDatos() {
        let valido = true;

        let objetoValidacion = {
            name: true,
            surname: true,
            age: true,
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

        // AGE: número entre 18 y 99
        if (!/^(1[89]|[2-9]\d)$/.test(String(doctor.age).trim())) {
            valido = false;
            objetoValidacion.age = false;
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
        if (!/^[6789]\d{8}$/.test(String(doctor.phone).trim())) {
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
                            Editar Médico
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
                                    id="age"
                                    label="Edad"
                                    name="age"
                                    type="number"
                                    value={doctor.age}
                                    onChange={handleChange}
                                    error={!isCamposValidos.age}
                                    helperText={!isCamposValidos.age && "La edad debe ser entre 18 y 99 años."}
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

            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                disableEscapeKeyDown
                aria-labelledby="result-dialog-title"
            >
                <DialogTitle id="result-dialog-title">
                    {dialogSeverity === "success" ? "Operación correcta" : "Error"}
                </DialogTitle>
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

export default EditarMedico;
