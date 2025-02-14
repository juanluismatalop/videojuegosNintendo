import { useEffect, useState } from "react";
import Card from "./Card";
import CardExpand from "./CardExpand";
import Search from "./Search";
import Filter from "./Filter";
import "./cardStyle.css";

function GameList() {
    const [juegos, setJuegos] = useState([]);
    const [hoveredJuego, setHoveredJuego] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedConsola, setSelectedConsola] = useState("");
    const [consolas, setConsolas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/consolas')
            .then(response => response.json())
            .then(data => {
                console.log("Datos recibidos del servidor:", data);

                if (!Array.isArray(data)) {
                    console.error("La respuesta no es un array.", data);
                    return;
                }

                const allGames = data.flatMap(consola =>
                    consola.juegos.map(juego => ({
                        ...juego,
                        consola: consola.nombre
                    }))
                );

                setJuegos(allGames);

                // Extraer nombres de consolas sin duplicados
                const consolasUnicas = [...new Set(data.map(consola => consola.nombre))];
                setConsolas(consolasUnicas);
            })
            .catch(error => console.error("Error cargando juegos:", error));
    }, []);

    // Filtrar juegos en base a la búsqueda y consola seleccionada
    const juegosFiltrados = juegos.filter(juego =>
        juego.titulo.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedConsola === "" || juego.consola === selectedConsola)
    );

    return (
        <div className="gameList">
            <h1 className="neon">Lista de Juegos</h1>
            <Search onSearch={setSearchTerm} />
            <Filter consolas={consolas} onFilter={setSelectedConsola} />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', position: 'relative' }}>
                {juegosFiltrados.length > 0 ? (
                    juegosFiltrados.map((juego, index) => (
                        <div 
                            key={index} 
                            onMouseEnter={() => setHoveredJuego(juego)}
                            onMouseLeave={() => setHoveredJuego(null)}
                            style={{ position: 'relative' }}
                        >
                            <Card juego={juego} />
                            {hoveredJuego?.titulo === juego.titulo && (
                                <div className="card-expand-container">
                                    <CardExpand juego={hoveredJuego} />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No se encontraron juegos.</p>
                )}
            </div>
        </div>
    );
}

export default GameList;
