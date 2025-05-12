"use client"

import { useState } from "react"
import { Heart, ShoppingCart, X, ChevronRight, Share2, Truck, RotateCcw, Shield, ThumbsUp } from "lucide-react"
import "./SelectedProductDetails.css"

const SelectedProductDetails = ({ product, onClose, onToggleFavorite, isFavorite }) => {
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(product?.likes || 0)

  // Mock sizes - in a real app, these would come from the product data
  const sizes = ["XS", "S", "M", "L", "XL"]

  // Mock reviews - in a real app, these would come from an API
  const reviews = [
    {
      id: 1,
      author: "Jane D.",
      date: "2023-10-15",
      rating: 5,
      comment: "Absolutely love this! The quality is exceptional and it fits perfectly.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&q=80",
    },
    {
      id: 2,
      author: "Michael T.",
      date: "2023-09-28",
      rating: 4,
      comment: "Great product, shipping was fast. Would buy again.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&q=80",
    },
    {
      id: 3,
      author: "Sarah L.",
      date: "2023-09-10",
      rating: 5,
      comment: "Exceeded my expectations. The material is so comfortable!",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&q=80",
    },
  ]

  if (!product) return null

  const { name, description, price, image, imageAlt, rating, reviewCount, category, discount = 0 } = product

  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price

  const handleAddToCart = () => {
    // In a real app, this would add the product to the cart
    console.log("Adding to cart:", {
      product,
      quantity,
      size: selectedSize,
    })
    // You could show a confirmation message here
  }

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleLike = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const handleShare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // In a real app, this would open a share dialog
    alert(`Sharing product: ${name}`)
  }

  const renderStars = (rating) => {
    return (
      <div className="stars-container">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>
    )
  }

  return (
    <div className="product-details-overlay" onClick={onClose}>
      <div className="product-details-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-details-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="product-details-content">
          {/* Product Images */}
          <div className="product-details-images">
            <div className="main-image">
              <img src={image || "/placeholder.svg?height=500&width=500"} alt={imageAlt || name} />
              {/* {discount > 0 && <span className="discount-badge">-{discount}%</span>} */}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-details-info">
            <div className="product-breadcrumb">
              <span>Home</span>
              <ChevronRight size={14} />
              <span>{category ? category.charAt(0).toUpperCase() + category.slice(1) : "Products"}</span>
              <ChevronRight size={14} />
              <span>{name}</span>
            </div>

            <h1 className="product-title">{name}</h1>

            <p className="product-description">{description}</p>

            <div className="product-rating">
              <div className="stars">{renderStars(rating)}</div>
              <span className="review-count">({reviewCount || 0} reviews)</span>
            </div>

            <div className="product-price">
              {discount > 0 ? (
                <>
                  <span className="discounted-price">R{discountedPrice.toFixed(2)}</span>
                  <span className="original-price">R{price.toFixed(2)}</span>
                </>
              ) : (
                <span className="regular-price">R{price.toFixed(2)}</span>
              )}
            </div>

            <div className="product-sizes">
              <div className="size-header">
                <span>Available Sizes</span>
              </div>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button className="quantity-btn" onClick={() => handleQuantityChange(1)} disabled={quantity >= 10}>
                  +
                </button>
              </div>

              <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={!selectedSize}>
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <div className="social-actions">
                <button
                  className={`action-button ${isFavorite ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onToggleFavorite(product)
                  }}
                >
                  <Heart size={18} />
                </button>

                <button className={`action-button ${isLiked ? "active" : ""}`} onClick={handleLike}>
                  <ThumbsUp size={18} />
                  <span className="action-count">{likeCount}</span>
                </button>

                <button className="action-button" onClick={handleShare}>
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            <div className="product-features">
              <div className="feature">
                <Truck size={18} />
                <span>Free shipping on orders over R500</span>
              </div>
              <div className="feature">
                <RotateCcw size={18} />
                <span>30-day return policy</span>
              </div>
              <div className="feature">
                <Shield size={18} />
                <span>2-year warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button
              className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === "details" ? "active" : ""}`}
              onClick={() => setActiveTab("details")}
            >
              Details & Care
            </button>
            <button
              className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews ({reviewCount || 0})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && (
              <div className="description-tab">
                <p>{description}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                </p>
              </div>
            )}

            {activeTab === "details" && (
              <div className="details-tab">
                <h3>Product Details</h3>
                <ul>
                  <li>Material: Premium quality fabric</li>
                  <li>Care: Machine wash cold, tumble dry low</li>
                  <li>Imported</li>
                  <li>Model is wearing size M</li>
                  <li>Model's height: 5'9" / 175 cm</li>
                </ul>

                <h3>Shipping & Returns</h3>
                <p>Free standard shipping on orders over R500. Delivery within 3-5 business days.</p>
                <p>
                  We accept returns within 30 days of delivery. Items must be unworn, unwashed, and with original tags
                  attached.
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="reviews-tab">
                <div className="reviews-summary">
                  <div className="average-rating">
                    <span className="rating-number">{rating.toFixed(1)}</span>
                    <div className="rating-stars">{renderStars(rating)}</div>
                    <span className="total-reviews">Based on {reviewCount || 0} reviews</span>
                  </div>
                </div>

                <div className="reviews-list">
                  {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <img
                          src={review.avatar || "/placeholder.svg?height=50&width=50"}
                          alt={review.author}
                          className="reviewer-avatar"
                        />
                        <div className="reviewer-info">
                          <span className="reviewer-name">{review.author}</span>
                          <div className="review-rating">{renderStars(review.rating)}</div>
                          <span className="review-date">{review.date}</span>
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <button className="write-review-btn">Write a Review</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectedProductDetails
