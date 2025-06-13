import { useState } from "react";

import './FavIcon.css';
import { eventService, taskService } from "../../services/api";

const FavIcon = ({task = null, event = null}) => {
    const [filled, setFilled] = useState(task ? task.fav : event.fav);            //Estado que maneja si el icono esta coloreado o no
    const [justClicked, setJustClicked] = useState(false);  //Estado que maneja si el icono debe renderizar la animacion de recien clickado

    const handleClick = (e) => {
        console.log('Click');
        e.stopPropagation();
        const newFilled = !filled;
        setFilled(newFilled);
        setJustClicked(true);

        if(task) {
            const taskData = {
                ...task,
                fav: newFilled
            };

            taskService.update(taskData._id, taskData);
        }

        if(event) {
            const eventData = {
                ...event,
                fav: newFilled
            };

            eventService.update(eventData._id, eventData);
        }
           
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