import { useState } from "react";

import './FavIcon.css';
import { taskService } from "../../services/api";

const FavIcon = ({task}) => {
    const [filled, setFilled] = useState(task.fav);            //Estado que maneja si el icono esta coloreado o no
    const [justClicked, setJustClicked] = useState(false);  //Estado que maneja si el icono debe renderizar la animacion de recien clickado

    const handleClick = (event) => {
        event.stopPropagation();
        const newFilled = !filled;
        setFilled(newFilled);
        setJustClicked(true);

        const taskData = {
            ...task,
            fav: newFilled
        };

        taskService.update(taskData._id, taskData);   
    }

    return (
        <div className="fav-icon-wrapper" onClick={(e)=>handleClick(e)}>
            <span className={`star ${filled ? 'filled' : ''}`}>★</span>
            
            {filled && justClicked &&
                <div className="spark-container">
                    {[...Array(8)].map((_, i) => (
                    <span key={i} className={`spark spark-${i}`} />
                    ))}
                </div>}
        </div>
  );
}

export default FavIcon;