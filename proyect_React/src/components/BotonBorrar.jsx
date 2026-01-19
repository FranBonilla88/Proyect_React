import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function BotonBorrar({ ruta, id }) {
    const navigate = useNavigate();

    return (
        <Button
            variant="contained"
            color="error"
            onClick={() => navigate(`${ruta}${id}`)}
        >
            <DeleteIcon />
        </Button>
    );
}