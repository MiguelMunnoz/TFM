import './ImageGallery.css';
import { imageService } from '../../services/api';
import { useEffect, useState } from 'react';

const ImageGallery = ({ task }) => {
    const [imageUrls, setImageUrls] = useState([]);
    const images = task.images || [];

    useEffect(() => {
        let active = true;
        let urls = [];

        const loadImages = async () => {
            try {
                urls = await Promise.all(
                    images.map(async (name) => {
                        const url = await imageService.getImageByName(name);
                        console.log('URL obtenida:', url);
                        return url;
                    })
                );
                if (active) setImageUrls(urls);
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
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-images">No hay imágenes</p>
                )}
            </div>
        </>
    );
};

export default ImageGallery;