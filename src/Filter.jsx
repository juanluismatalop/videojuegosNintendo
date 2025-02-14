import "./cardStyle.css";

function Filter({ consolas, onFilter }) {
    return (
        <select 
            name="consola" 
            id="consola" 
            onChange={(e) => onFilter(e.target.value)}
            className="filter-select"
        >
            <option value="">Todas las Consolas</option>
            {consolas.map((consola, index) => (
                <option key={index} value={consola}>
                    {consola}
                </option>
            ))}
        </select>
    );
}

export default Filter;
