import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LocalHospitalTwoToneIcon from "@mui/icons-material/LocalHospitalTwoTone";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import ThemeToggleButton from "../theme/ThemeToggleButton.jsx";

function Navbar() {
    const [anclaMenuMedicos, setAnclaMenuMedicos] = React.useState(null);
    const [anclaMenuPacientes, setAnclaMenuPacientes] = React.useState(null);
    const [anclaMenuXS, setAnclaMenuXS] = React.useState(null);

    const handleClickMenuMedicos = (event) => {
        setAnclaMenuMedicos(event.currentTarget);
    };

    const handleClickMenuPacientes = (event) => {
        setAnclaMenuPacientes(event.currentTarget);
    };

    const handleClickMenuXS = (event) => {
        setAnclaMenuXS(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnclaMenuMedicos(null);
        setAnclaMenuPacientes(null);
        setAnclaMenuXS(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#1fc427" }}>
            <Toolbar disableGutters>
                {/* Menú para resolución xs  */}
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                    <IconButton
                        size="large"
                        aria-label="menu pacientes db resolucion xs"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleClickMenuXS}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar-xs"
                        anchorEl={anclaMenuXS}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anclaMenuXS)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: "block", md: "none" } }}
                    >
                        <ListSubheader>Menú Medicos</ListSubheader>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/doctors/new" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Alta de Medico
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/doctors" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Listado de Medicos
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/doctors/search" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Buscar Medicos por Especialidad
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/doctors/search-age" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Buscar Medicos por Edades
                                </Typography>
                            </Link>
                        </MenuItem>
                        <Divider />
                        <ListSubheader>Menú Pacientes</ListSubheader>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/patients/new" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Alta de Paciente
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/patients" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Listado de Pacientes
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/patients" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Listado de Pacientes por Fechas
                                </Typography>
                            </Link>
                        </MenuItem>
                    </Menu>
                </Box>

                {/* Logo y nombre de la web */}
                <LocalHospitalTwoToneIcon />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mx: 2,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    GESTIÓN SANITARIA
                </Typography>

                {/* Menú para resolución md */}
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    {/* Menú para Medicos en md */}
                    <Button
                        onClick={handleClickMenuMedicos}
                        sx={{ my: 2, color: "white", display: "block" }}
                    >
                        Medicos
                    </Button>
                    <Menu
                        id="menu-medicos"
                        anchorEl={anclaMenuMedicos}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anclaMenuMedicos)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/doctors/new" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Alta de Medico
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/doctors" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Listado de Medicos
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/doctors/search" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Buscar Medicos por Especialidad
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/doctors/search-age" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Buscar Medicos por Edades
                                </Typography>
                            </Link>
                        </MenuItem>
                    </Menu>
                    {/* Menú para pacientes en md */}
                    <Button
                        onClick={handleClickMenuPacientes}
                        sx={{ my: 2, color: "white", display: "block" }}
                    >
                        Pacientes
                    </Button>
                    <Menu
                        id="menu-pacientes"
                        anchorEl={anclaMenuPacientes}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anclaMenuPacientes)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/patients/new" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Alta de Pacientes
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/patients" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Listado de Pacientes
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/patients/search-date" style={{ textDecoration: "none" }}>
                                <Typography sx={{ color: "text.primary", textAlign: "center" }}>
                                    Listado de Pacientes por Fechas
                                </Typography>
                            </Link>
                        </MenuItem>
                    </Menu>
                </Box>
                <ThemeToggleButton />
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
