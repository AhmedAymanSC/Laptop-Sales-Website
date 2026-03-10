import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../DescriptionLink/DescLink.css'; 

const DecsLink = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const { product, index } = location.state || {};
    const [showNotification, setShowNotification] = useState(false);

    const handleAddToCart = () => {
        if (product) {
            // Get existing cart from localStorage
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
            // Add the product to cart
            existingCart.push(product);
            // Save back to localStorage
            localStorage.setItem('cart', JSON.stringify(existingCart));
            
            // Show notification
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 2000);
        }
    };

    const renderStars = (rating) => {
        return (
            <>
                {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                        key={star}
                        icon={faStar}
                        className={star <= Math.round(rating) ? "star-filled" : "star-empty"}
                        size="lg"
                        style={{ marginRight: '4px' }}
                    />
                ))}
            </>
        );
    };

    if (!product) {
        return (
            <div className="description-container">
                <div className="description-card">
                    <p>Product not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="description-container">
            {showNotification && (
                <div className="notification-detail">
                    ✓ Added to Cart!
                </div>
            )}
            <button className="back-btn" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
            <div className="description-card">
                {/* Image on the left */}
                <div className="description-image">
                    <img src={product?.image} alt={product?.name} />
                </div>
                {/* Content on the right */}
                <div className="description-content">
                    <h1>{product?.name}</h1>
                    <div className="rating-section">
                        {renderStars(product?.rating)}
                        <span className="rating-value">({product?.rating?.toFixed(1) || 'N/A'})</span>
                    </div>
                    
                    <div className="price-section">
                        <h2 className="price">${product?.price}</h2>
                        <p className="category-badge">{product?.category}</p>
                    </div>

                    <div className="description-section">
                        <h3>Description</h3>
                        <p>{product?.description}</p>
                    </div>

                    {product?.reviews && product.reviews.length > 0 && (
                        <div className="reviews-section">
                            <h3>Customer Reviews</h3>
                            <div className="reviews-list">
                                {product.reviews.map((review, idx) => (
                                    <div key={idx} className="review-card">
                                        <div className="review-header">
                                            <strong>{review.author}</strong>
                                            <span className="review-rating">
                                                {renderStars(review.rating)}
                                            </span>
                                        </div>
                                        <p className="review-comment">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="action-buttons">
                        <button className="add-cart-btn" onClick={handleAddToCart}>
                            <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DecsLink;

