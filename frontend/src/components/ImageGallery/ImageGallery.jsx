import './ImageGallery.css';
import { imageService } from '../../services/api';
import { useEffect, useState } from 'react';

import Image from '../Image/Image';
import Modal from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../slices/taskSlice';
import { taskService } from '../../services/api';

const ImageGallery = ({ task }) => {
    const [imageUrls, setImageUrls] = useState([]);
    const [imageZoomed, setImageZoomed] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false); // Mostrar o no el mensaje
    const [imageToDelete, setImageToDelete] = useState(null); // Índice de la imagen seleccionada
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

    const handleDelete = (index) => {
        setShowConfirm(true);
        setImageToDelete(index);
    }

    const confirmDelete = async () => {
        try {
            const updatedImages = [...task.images];
            const [deletedImage] = updatedImages.splice(imageToDelete, 1);

            const updatedTask = {
                ...task,
                images: updatedImages
            };

            dispatch(updateTask(updatedTask));
            const res = await taskService.update(task._id, updatedTask);
            dispatch(updateTask(res.data));

            await imageService.deleteImage(deletedImage);
        } catch (error) {
            console.error('[ERROR] Error deleting image:', error);
        } finally {
            setShowConfirm(false);
            setImageToDelete(null);
        }
    };

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
                                <button className="image-delete-button" onClick={() => handleDelete(index)}> X </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-images">No hay imágenes</p>
                )}
                { imageZoomed && (
                    <Image src={imageZoomed} onClick={() => setImageZoomed(null)} />
                )}

                {showConfirm && (
                    <Modal type="image" mode="delete" onClose={() => setShowConfirm(false)} onDeleteConfirm={confirmDelete}
                    />
                )}
                
            </div>
        </>
    );
};

export default ImageGallery;