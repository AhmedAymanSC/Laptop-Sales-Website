import React, { useState } from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ title, price, image, Counter, product, index, category }) => {
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleDescriptionClick = () => {
        navigate(`/Description`, { state: { product, index } });
    };

    const handleAddToCart = () => {
        Counter(product);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    // Render star rating
    const renderStars = (rating) => {
        return (
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                        key={star}
                        icon={faStar}
                        className={star <= Math.round(rating) ? "star filled" : "star empty"}
                        size="sm"
                    />
                ))}
                <span className="rating-text">({rating.toFixed(1)})</span>
            </div>
        );
    };

    return (
        <div className="productcard-card">
            {showNotification && (
                <div className="notification">
                    ✓ Added Successfully!
                </div>
            )}
            <div className="productcard-image-wrapper">
                {imageError ? (
                    <div className="productcard-image-fallback">
                        <span>📷 No Image</span>
                    </div>
                ) : (
                    <>
                        <img
                            src={image}
                            alt={title}
                            className="productcard-image primary-image"
                            onError={handleImageError}
                            style={{ cursor: 'pointer' }}
                        />
                        {product?.hoverImage && (
                            <img
                                src={product.hoverImage}
                                alt={`${title} hover`}
                                className="productcard-image hover-image"
                                onError={handleImageError}
                                style={{ cursor: 'pointer' }}
                            />
                        )}
                    </>
                )}
            </div>
            <div className="productcard-content">
                <h3 className="productcard-title">{title}</h3>
                <h3 className="productcard-category">{category}</h3>
                {product?.rating && renderStars(product.rating)}
                <h4 className="productcard-prices">Price: <span>${price}</span></h4>
                {product?.reviews && product.reviews.length > 0 && (
                    <div className="reviews-preview">
                        <p className="reviews-label">Reviews:</p>
                        {product.reviews.slice(0, 1).map((review, idx) => (
                            <p key={idx} className="review-item">
                                <strong>{review.author}:</strong> {review.comment}
                            </p>
                        ))}
                    </div>
                )}
                <h5 onClick={handleDescriptionClick} className='productcard-link'>More...</h5>
            </div>
            <div className="btn-Buy" onClick={handleAddToCart}>
                <h2>Add</h2>
                <FontAwesomeIcon className="fs" icon={faShoppingCart} size="1x" />
            </div>
        </div>
    );
};

export default ProductCard;

