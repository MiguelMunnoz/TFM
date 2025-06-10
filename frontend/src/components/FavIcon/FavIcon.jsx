import { useEffect, useState } from "react";

import './FavIcon.css';
import { taskService } from "../../services/api";

const FavIcon = ({task}) => {
    const [filled, setFilled] = useState(false);

    //Establecemos el icono de favoritos al renderizar
    useEffect(() => {
        setFilled(task.fav);
    }, [])

    const handleClick = (event) => {
        event.stopPropagation();
        const newFilled = !filled;
        setFilled(newFilled);
        console.log('Task que voy a convertir en favorita: ', task);
        const taskData = {
            ...task,
            fav: newFilled
        };
        console.log('Task favorita: ', taskData);

        taskService.update(taskData._id, taskData);
        
    }

    return (
        <div className="fav-icon-wrapper" onClick={(e)=>handleClick(e)}>
            <span className={`star ${filled ? 'filled' : ''}`}>★</span>
            
            {filled && 
                <div className="spark-container">
                    {[...Array(8)].map((_, i) => (
                    <span key={i} className={`spark spark-${i}`} />
                    ))}
                </div>}
        </div>
  );
}

export default FavIcon;