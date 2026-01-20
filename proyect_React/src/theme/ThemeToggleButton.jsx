import { useContext } from "react";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext } from "./ColorModeContext";

export default function ThemeToggleButton() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    );
}