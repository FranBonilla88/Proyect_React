import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function BotonEditar({ ruta, id }) {
    const navigate = useNavigate();

    return (
        <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() => navigate(`${ruta}${id}`)}
        >
            <EditIcon />
        </Button>
    );
}