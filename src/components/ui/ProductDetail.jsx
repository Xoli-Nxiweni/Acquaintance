"use client"

import { useState } from "react"
import { Heart, Share2, ThumbsUp, ShoppingBag } from "lucide-react"
import Carousel from "./Carousel"
import "./ProductDetail.css"

const ProductDetail = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert(`Sharing product: ${product.name}`)
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="product-detail">
      <div className="product-detail-images">
        <Carousel
          images={product.images.map((img, index) => ({
            src: img,
            alt: `${product.name} - Image ${index + 1}`,
          }))}
        />
      </div>

      <div className="product-detail-info">
        <h1 className="product-detail-name">{product.name}</h1>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        <p className="product-detail-description">{product.description}</p>

        <div className="product-detail-section">
          <h3>Size</h3>
          <div className="size-options">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                className={`size-option ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail-section">
          <h3>Quantity</h3>
          <div className="quantity-selector">
            <button onClick={decrementQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={incrementQuantity}>+</button>
          </div>
        </div>

        <div className="product-detail-actions">
          <button className="add-to-cart-button">
            <ShoppingBag size={18} />
            Add to Cart
          </button>

          <div className="product-detail-social">
            <button
              className={`social-button ${isLiked ? "active" : ""}`}
              onClick={handleLike}
              aria-label="Like product"
            >
              <ThumbsUp size={20} />
            </button>
            <button
              className={`social-button ${isFavorite ? "active" : ""}`}
              onClick={handleFavorite}
              aria-label="Add to favorites"
            >
              <Heart size={20} />
            </button>
            <button className="social-button" onClick={handleShare} aria-label="Share product">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="product-detail-section">
          <h3>Details</h3>
          <ul className="product-details-list">
            {product.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
