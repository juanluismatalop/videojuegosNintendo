import "./cardStyle.css"

function Card({juego}){
    return(
        <div className="card">
            <p className="neon">{juego.titulo}</p>
            <div className="cardImage">
                <img src={juego.portada}/>
            </div>
        </div>
    )
}

export default Card