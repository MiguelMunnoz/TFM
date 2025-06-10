import { useState } from "react";

import './FavIcon.css';

function FavIcon() {
    const [filled, setFilled] = useState(false);

    const handleClick = (event) => {
        event.stopPropagation();
        setFilled(prev => !prev)
    }

    return (
        <span
            onClick={(e) => handleClick(e)}
            className={`star ${filled ? "filled" : ""}`}
            role="button"
            aria-label="Favorito"
        >
        ★
        </span>
    );
}

export default FavIcon;