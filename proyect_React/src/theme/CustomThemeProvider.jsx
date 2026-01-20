import { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "./ColorModeContext";

export default function CustomThemeProvider({ children }) {
    const [mode, setMode] = useState("light");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prev) => (prev === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}