"use client"

import { useState } from "react"
import ProductCard from "../ui/ProductCard"
import { Trash2 } from "lucide-react"
import "./Favorites.css"

const Favorites = ({ favorites = [], onToggleFavorite }) => {
  const [view, setView] = useState("grid") // grid or list

  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <h2 className="section-title">Your Favorites</h2>
        <div className="empty-state">
          <div className="empty-icon">❤️</div>
          <h3>No favorites yet</h3>
          <p>Items you like will appear here. Start browsing and save your favorite pieces!</p>
   
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-container container">
      <div className="favorites-header">
        <h2 className="section-title">Your Favorites</h2>
        <div className="favorites-controls">
          <div className="view-toggle">
            <button
              className={`view-btn ${view === "grid" ? "active" : ""}`}
              onClick={() => setView("grid")}
              aria-label="Grid view"
            >
              Grid
            </button>
            <button
              className={`view-btn ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
              aria-label="List view"
            >
              List
            </button>
          </div>
          <button className="clear-btn" onClick={() => favorites.forEach((item) => onToggleFavorite(item))}>
            <Trash2 size={16} />
            Clear All
          </button>
        </div>
      </div>

      <div className={`favorites-${view}`}>
        {favorites.map((product) => (
          <div key={product.id} className="favorite-item">
            {view === "grid" ? (
              <ProductCard product={product} onToggleFavorite={onToggleFavorite} isFavorite={true} />
            ) : (
              <div className="favorite-list-item">
                <div className="favorite-image">
                  <img src={product.image || "/placeholder.svg?height=120&width=120"} alt={product.name} />
                </div>
                <div className="favorite-details">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="favorite-price">
                    {product.discount ? (
                      <>
                        <span className="sale-price">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                        <span className="regular-price with-discount">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="regular-price">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
                <button
                  className="remove-favorite"
                  onClick={() => onToggleFavorite(product)}
                  aria-label="Remove from favorites"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites
