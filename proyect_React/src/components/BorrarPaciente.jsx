import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import api from "../api";

function BorrarPaciente() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [openDialog, setOpenDialog] = useState(true);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogSeverity, setDialogSeverity] = useState("error");
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        if (isDeleting) return;
        setIsDeleting(true);

        try {
            await api.delete("/patients/" + id);

            setDialogMessage("Paciente eliminado correctamente");
            setDialogSeverity("success");
        } catch (error) {
            setDialogMessage(error.mensaje || "No se pudo eliminar el paciente");
            setDialogSeverity("error");
        }
    }

    function handleClose() {
        setOpenDialog(false);
        navigate("/patients");
    }

    return (
        <Dialog open={openDialog} onClose={handleClose} disableEscapeKeyDown>
            <DialogTitle>Eliminar Paciente</DialogTitle>

            <DialogContent dividers>
                {dialogMessage === "" ? (
                    <Typography>
                        ¿Seguro que deseas eliminar el paciente con ID {id}?
                    </Typography>
                ) : (
                    <Alert severity={dialogSeverity} variant="filled">
                        {dialogMessage}
                    </Alert>
                )}
            </DialogContent>

            <DialogActions>
                {dialogMessage === "" ? (
                    <>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button color="error" onClick={handleDelete}>
                            Eliminar
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleClose}>OK</Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default BorrarPaciente;