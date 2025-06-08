import './ImageGallery.css';

/*const ImageGallery = ({task}) => {
    return (
        <div className="task-image-gallery">
                {(task.images && task.images.length > 0
                    ? task.images.slice(0, 4)
                    : Array(4).fill(null)
                ).map((img, index) => (
                    <img
                    key={index}
                    src={img || 'https://via.placeholder.com/60x60?text=No+Img'}
                    alt={`imagen-${index}`}
                    className="task-image"
                    />
                ))}
            </div>
    )
}*/

const ImageGallery = ({ task }) => {
    const images = task.images || [];

    return (
        <div className="image-gallery">
            <h4>Imágenes</h4>
            {images.length === 0 ? (
                <p className="no-images">No hay imágenes</p>
            ) : (
                <div className="image-grid">
                    {images.map((imgSrc, index) => (
                        <div key={index} className="image-wrapper">
                            <img src={imgSrc} alt={`task-img-${index}`} className="gallery-image" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;