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
import { MenuItem } from "@mui/material";

import api from "../api";

function AltaPaciente() {
    const navigate = useNavigate();

    const [listadoDoctores, setListadoDirectores] = useState([]);

    const [patient, setPatient] = useState({
        name: "",
        surname: "",
        birth_date: "",
        email: "",
        phone: "",
        doctor_id: ""
    });

    const [isCamposValidos, setIsCamposValidos] = useState({
        name: true,
        surname: true,
        birth_date: true,
        email: true,
        phone: true,
        doctor_id: true
    });

    const [isUpdating, setIsUpdating] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogSeverity, setDialogSeverity] = useState("success");

    // UseEffect que faltaba para cargar los datos de los doctores en el desplegable
    useEffect(() => {
        async function fetchDoctores() {
            try {
                const response = await api.get("/doctors");
                setListadoDirectores(response.datos);   // ← AQUÍ SE GUARDAN LOS MÉDICOS
            } catch (error) {
                console.error("Error al cargar los médicos:", error);
            }
        }

        fetchDoctores();
    }, []); // se ejecuta al montar el componente


    useEffect(() => {
        async function fetchCreateDoctor() {
            try {
                const pacienteAEnviar = {
                    ...patient,
                    phone: Number(patient.phone)
                };

                const respuesta = await api.post("/patients/", pacienteAEnviar);

                setDialogMessage(respuesta.mensaje);
                setDialogSeverity("success");
                setOpenDialog(true);
            } catch (error) {
                setDialogMessage(error.mensaje || "Error al crear el paciente");
                setDialogSeverity("error");
                setOpenDialog(true);
            }

            setIsUpdating(false);
        }

        if (isUpdating) fetchCreateDoctor();
    }, [isUpdating]);

    function handleChange(e) {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    }

    function handleClick() {
        if (isUpdating) return;

        if (validarDatos()) {
            setIsUpdating(true);
        }
    }

    function handleDialogClose() {
        setOpenDialog(false);

        if (dialogSeverity === "success") navigate("/patients");
    }

    function validarDatos() {
        let valido = true;

        let objetoValidacion = {
            name: true,
            surname: true,
            birth_date: true,
            email: true,
            phone: true,
            doctor_id: true
        };

        // NAME: solo letras, mínimo 3 caracteres
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(patient.name.trim())) {
            valido = false;
            objetoValidacion.name = false;
        }

        // SURNAME: solo letras y espacios, mínimo 3 caracteres
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(patient.surname.trim())) {
            valido = false;
            objetoValidacion.surname = false;
        }

        // BIRTH_DATE: formato YYYY-MM-DD y fecha válida menor que hoy
        const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (!fechaRegex.test(patient.birth_date)) {
            valido = false;
            objetoValidacion.birth_date = false;
        } else {
            const fecha = new Date(patient.birth_date);
            const hoy = new Date();

            if (isNaN(fecha.getTime()) || fecha >= hoy) {
                valido = false;
                objetoValidacion.birth_date = false;
            }
        }

        // EMAIL: formato válido con dominio y extensión
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(patient.email.trim())) {
            valido = false;
            objetoValidacion.email = false;
        }

        // Teléfono español: 9 dígitos, empieza por 6, 7, 8 o 9
        if (!/^[6789]\d{8}$/.test(patient.phone.trim())) {
            valido = false;
            objetoValidacion.phone = false;
        }

        // DOCTOR_ID: debe ser un número válido y obligatorio
        if (!patient.doctor_id || isNaN(patient.doctor_id) || Number(patient.doctor_id) <= 0) {
            valido = false;
            objetoValidacion.doctor_id = false;
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
                            Alta de Paciente
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
                                    value={patient.name}
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
                                    value={patient.surname}
                                    onChange={handleChange}
                                    error={!isCamposValidos.surname}
                                    helperText={!isCamposValidos.surname && "El apellido debe tener al menos 3 caracteres."}
                                />
                            </Grid>

                            <Grid item xs={10}>
                                <TextField
                                    required
                                    fullWidth
                                    id="birth_date"
                                    name="birth_date"
                                    type="date"
                                    value={patient.birth_date}
                                    onChange={handleChange}
                                    error={!isCamposValidos.birth_date}
                                    helperText={!isCamposValidos.birth_date && "El formato de fecha no es correcto"}
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
                                    value={patient.email}
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
                                    value={patient.phone}
                                    onChange={handleChange}
                                    error={!isCamposValidos.phone}
                                    helperText={!isCamposValidos.phone && "Debe tener 9 dígitos y empezar por 6, 7, 8 o 9."}
                                />
                            </Grid>

                            <Grid item xs={10}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    id="doctor_id"
                                    label="Medico asignado"
                                    name="doctor_id"
                                    value={patient.doctor_id}
                                    onChange={handleChange}
                                    error={!isCamposValidos.doctor_id}
                                    helperText={!isCamposValidos.doctor_id && "Debe seleccionar un médico válido."}
                                    InputLabelProps={{ shrink: true, style: { whiteSpace: "nowrap" } }}                                >
                                    {listadoDoctores.map((doctor) => (
                                        <MenuItem key={doctor.id} value={doctor.id}>
                                            {doctor.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={10} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button disabled={isUpdating} variant="contained" color="success" sx={{ mt: 3 }} onClick={handleClick}>
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

export default AltaPaciente;