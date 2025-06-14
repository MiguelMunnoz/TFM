import './ImageGallery.css';
import { imageService } from '../../services/api';
import { useEffect, useState } from 'react';

import Image from '../Image/Image';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../slices/taskSlice';
import { taskService } from '../../services/api';

const ImageGallery = ({ task }) => {
    const [imageUrls, setImageUrls] = useState([]);
    const [imageZoomed, setImageZoomed] = useState(null);
    const dispatch = useDispatch();
    const images = task.images || [];

    useEffect(() => {
        let active = true;
        let urls = [];

        const loadImages = async () => {
            try {
                urls = await Promise.all(
                    images.map(async (name) => {
                        const url = await imageService.getImageByName(name);
                        return url;
                    })
                );
                
                if (active) {
                    setImageUrls(urls);
                }

            } catch (err) {
                console.error('Error cargando imágenes:', err);
            }
        };

        loadImages();

        return () => {
            active = false;
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [images]);

    const handleClick = (imgSrc) => {
        setImageZoomed(imgSrc);
    }

    const handleDelete = async (index) => {
        
        let updatedImages = Object.values(images);
        updatedImages.splice(index);

        const taskData = {
            ...task, 
            images: updatedImages
        }

        dispatch(updateTask(taskData))
        const res = await taskService.update(task._id, taskData);

        dispatch(updateTask(res.data));
        imageService.deleteImage(images[index]);
    }

    return (
        <>
            <h4>Images</h4>
            <div className="image-gallery">
                {imageUrls.length !== 0 ? (
                    <div className="image-grid">
                        {imageUrls.map((imgSrc, index) => (
                            <div key={index} className="image-wrapper">
                                <img
                                    src={imgSrc}
                                    alt={`task-img-${index}`}
                                    className="gallery-image"
                                    onClick={ () => handleClick(imgSrc) }
                                />
                                <button className="image-delete-button" onClick={() => handleDelete(index)}>X</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-images">No hay imágenes</p>
                )}
                { imageZoomed && (
                    <Image src={imageZoomed} onClick={() => setImageZoomed(null)} />
                )}
                
            </div>
        </>
    );
};

export default ImageGallery;