import "./cardStyle.css";

function CardExpand({ juego }) {
    return (
        <div className="card-expand">
            <p><strong>Año lanzamiento:</strong> {juego.anio}</p>
            <p><strong>Consola:</strong> {juego.consola}</p>
            <p><strong>Descripccion</strong> {juego.descripcion}</p>
        </div>
    );
}

export default CardExpand;
