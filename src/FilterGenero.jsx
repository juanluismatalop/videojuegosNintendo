import { useEffect, useState } from "react";
import "./cardStyle.css";

function FilterGenero({ juegos, onFilter }) {
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        if (juegos.length > 0) {
            const generosUnicos = new Set();
            juegos.forEach(juego => {
                juego.genero.split("/").forEach(g => generosUnicos.add(g.trim()));
            });
            setGeneros([...generosUnicos]);
        }
    }, [juegos]);

    return (
        <select name="genero" id="genero" onChange={(e) => onFilter(e.target.value)} className="filter-select">
            <option value="">Todos los generos</option>
            {generos.map((genero, index) => (
                <option key={index} value={genero}>{genero}</option>
            ))}
        </select>
    );
}

export default FilterGenero;
