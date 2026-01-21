import { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Inicio() {
    const imagenes = [
        {
            url: "sanidad.jpg",
            titulo: "Atención médica personalizada",
            subtitulo: "Conecta con profesionales de confianza",
        },
        {
            url: "sanidad2.jpg",
            titulo: "Gestión eficiente de pacientes",
            subtitulo: "Organiza historiales y citas fácilmente",
        },
        {
            url: "sanidad3.jpg",
            titulo: "Salud digital",
            subtitulo: "Tecnología al servicio del bienestar",
        },
    ];

    const [index, setIndex] = useState(0);

    const siguiente = () => {
        setIndex((prev) => (prev + 1) % imagenes.length);
    };

    const anterior = () => {
        setIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    };

    const navigate = useNavigate();

    return (
        <>
            <Box
                sx={{
                    height: "60vh",
                    backgroundImage: `url(${imagenes[index].url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    color: "white",
                    px: 2,
                }}
            >
                <Typography variant="h3" sx={{ mb: 2, textShadow: "0 0 10px black" }}>
                    {imagenes[index].titulo}
                </Typography>

                <Typography variant="h6" sx={{ mb: 3, maxWidth: 600, textShadow: "0 0 8px black" }}>
                    {imagenes[index].subtitulo}
                </Typography>

                <Button component={Link}
                    to="/doctors/new"
                    variant="contained"
                    sx={{ backgroundColor: "transparent", color: "white" }}
                >
                    Comienza y registrate
                </Button>

                <IconButton
                    onClick={anterior}
                    sx={{
                        position: "absolute",
                        left: 20,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
                    }}
                >
                    <ArrowBackIosIcon />
                </IconButton>

                <IconButton
                    onClick={siguiente}
                    sx={{
                        position: "absolute",
                        right: 20,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>

            <Box sx={{ px: 4, py: 6 }}>

                {/* Sección: Alta de paciente */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Atención personalizada desde el primer momento
                    </Typography>
                    <Typography sx={{ mb: 2, color: "text.secondary" }}>
                        Añade nuevos pacientes al sistema para gestionar su información clínica,
                        citas y seguimiento de manera clara, segura y organizada. Nuestro sistema
                        permite registrar datos esenciales de forma rápida, evitando duplicidades
                        y facilitando el acceso inmediato a la información.
                    </Typography>
                    <Typography sx={{ mb: 2, color: "text.secondary" }}>
                        La plataforma está diseñada para adaptarse a distintos perfiles sanitarios,
                        garantizando que cada profesional pueda acceder únicamente a la información
                        necesaria para su labor, manteniendo siempre la privacidad del paciente.
                    </Typography>
                    <Button component={Link} to="/patients/new" variant="contained" color="primary" >
                        Registrar paciente
                    </Button>
                </Box>

                {/* Sección: Listado de médicos */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Profesionales a tu alcance
                    </Typography>
                    <Typography sx={{ mb: 2, color: "text.secondary" }}>
                        Consulta el listado completo de médicos y accede rápidamente a sus datos
                        para una gestión sanitaria eficiente y bien estructurada. Cada profesional
                        cuenta con un perfil detallado que incluye especialidad, disponibilidad y
                        datos de contacto interno.
                    </Typography>
                    <Typography sx={{ mb: 2, color: "text.secondary" }}>
                        Esta herramienta facilita la coordinación entre departamentos, permitiendo
                        asignar pacientes, derivar casos y consultar la carga de trabajo de cada
                        médico en tiempo real.
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={() => navigate("/doctors")}>
                        Ver médicos
                    </Button>
                </Box>

                {/* Sección adicional: Seguridad de los datos */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Seguridad y confidencialidad
                    </Typography>
                    <Typography sx={{ mb: 2, color: "text.secondary" }}>
                        Todos los datos clínicos están protegidos mediante protocolos de cifrado
                        avanzados y sistemas de auditoría interna. Cada acción queda registrada
                        para garantizar la trazabilidad y el cumplimiento de la normativa vigente.
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        Nuestro compromiso con la seguridad se refleja en actualizaciones constantes,
                        revisiones periódicas y un equipo técnico dedicado a mantener la plataforma
                        estable y protegida frente a accesos no autorizados.
                    </Typography>
                </Box>

                {/* Sección adicional: Tecnología al servicio del bienestar */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Tecnología al servicio del bienestar
                    </Typography>
                    <Typography sx={{ mb: 2, color: "text.secondary" }}>
                        La digitalización del entorno sanitario permite reducir tiempos de espera,
                        mejorar la comunicación entre profesionales y ofrecer una experiencia más
                        fluida tanto para el personal como para los pacientes.
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        Nuestro sistema integra herramientas de análisis que ayudan a detectar
                        patrones, optimizar recursos y anticipar necesidades, contribuyendo a una
                        atención más eficiente y humana.
                    </Typography>
                </Box>
            </Box>
            <Box
                component="footer"
                sx={{
                    position: "relative",
                    left: 0,
                    right: 0,
                    mt: 8,
                    py: 4,
                    px: 2,
                    textAlign: "center",
                    backgroundColor: "#43A047",
                    color: "white",
                }}
            >
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Gestión Sanitaria
                </Typography>
                <Typography variant="body2">
                    © {new Date().getFullYear()} Todos los derechos reservados.
                </Typography>
            </Box>
        </>
    );
}



export default Inicio;