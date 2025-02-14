import "./cardStyle.css";

function Search({ onSearch }) {
    return (
        <input 
            type="text"
            placeholder="Buscar juego..."
            onChange={(e) => onSearch(e.target.value)}
            className="search-input"
        />
    );
}

export default Search;
