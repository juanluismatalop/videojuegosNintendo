import { useEffect, useState } from "react";
import Card from "./Card";
import CardExpand from "./CardExpand";
import "./cardStyle.css";

function GameList() {
    const [juegos, setJuegos] = useState([]);
    const [hoveredJuego, setHoveredJuego] = useState(null);

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
            })
            .catch(error => console.error("Error cargando juegos:", error));
    }, []);

    return (
        <div className="gameList">
            <h1 className="neon">Lista de Juegos</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', position: 'relative' }}>
                {juegos.map((juego, index) => (
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
                ))}
            </div>
        </div>
    );
}

export default GameList;
