import './ImageGallery.css';

const ImageGallery = ({task}) => {
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
}

export default ImageGallery;