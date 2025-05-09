"use client"

import { useState } from "react"
import { Heart, Share2, ThumbsUp } from "lucide-react"
import "./ProductCard.css"

const ProductCard = ({ product, onToggleFavorite, isFavorite }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(product.likes || 0)

  const handleLike = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const handleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onToggleFavorite) {
      onToggleFavorite(product)
    }
  }

  const handleShare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // In a real app, this would open a share dialog
    alert(`Sharing product: ${product.name}`)
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image || "/placeholder.svg?height=300&width=300"} alt={product.name} />
        {/* {product.isNew && <span className="product-tag new-tag">NEW</span>} */}
        {/* {product.discount && <span className="product-tag sale-tag">-{product.discount}%</span>} */}
        <div className="product-actions">
          <button className={`action-button ${isLiked ? "active" : ""}`} onClick={handleLike} aria-label="Like product">
            <ThumbsUp size={18} />
            <span className="action-count">{likeCount}</span>
          </button>
          <button
            className={`action-button ${isFavorite ? "active" : ""}`}
            onClick={handleFavorite}
            aria-label="Add to favorites"
          >
            <Heart size={18} />
          </button>
          <button className="action-button" onClick={handleShare} aria-label="Share product">
            <Share2 size={18} />
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price-rating">
          <div className="product-price">
            {product.discount ? (
              <>
                <span className="sale-price">R{(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                <span className="regular-price">R{product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="regular-price">R{product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="product-rating">
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
            <span className="rating-count">({product.reviewCount || 0})</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
