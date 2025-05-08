"use client"

import { useState, useEffect } from "react"
import ProductCard from "../ui/ProductCard"
import "./NewArrivals.css"

const NewArrivals = ({ onToggleFavorite, favorites = [] }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching new arrivals
    setLoading(true)
    setTimeout(() => {
        const newArrivals = [
            {
              id: "new1",
              name: "Oversized Graphic Tee",
              description: "Limited edition graphic print on premium cotton",
              price: 39.99,
              image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop&q=80",
              imageAlt: "Oversized black t-shirt with graphic print",
              rating: 5,
              reviewCount: 7,
              isNew: true,
              category: "t-shirts",
              likes: 12,
            },
            {
              id: "new2",
              name: "Cargo Pants",
              description: "Utility-inspired design with multiple pockets",
              price: 69.99,
              image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&q=80",
              imageAlt: "Khaki cargo pants with side pockets",
              rating: 4,
              reviewCount: 3,
              isNew: true,
              category: "bottoms",
              likes: 8,
            },
            {
              id: "new3",
              name: "Cropped Puffer Jacket",
              description: "Trendy cropped silhouette with warm filling",
              price: 89.99,
              image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=300&h=300&fit=crop&q=80",
              imageAlt: "Black cropped puffer jacket",
              rating: 5,
              reviewCount: 5,
              isNew: true,
              category: "outerwear",
              likes: 15,
            },
            {
              id: "new4",
              name: "Platform Boots",
              description: "Statement boots with chunky platform sole",
              price: 119.99,
              image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop&q=80",
              imageAlt: "Black leather platform boots",
              rating: 4,
              reviewCount: 2,
              isNew: true,
              category: "footwear",
              likes: 9,
            },
          ];
      setProducts(newArrivals)
      setLoading(false)
    }, 800)
  }, [])

  const isFavorite = (product) => {
    return favorites.some((fav) => fav.id === product.id)
  }

  return (
    <div className="new-arrivals-container container">
      <h2 className="section-title">New Arrivals</h2>
      <p className="section-description">
        Be the first to discover our latest additions. These fresh styles have just landed and won't stay in stock for
        long. Shop the newest trends before they're gone.
      </p>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading new arrivals...</p>
        </div>
      ) : (
        <>
          <div className="new-arrivals-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onToggleFavorite={onToggleFavorite}
                isFavorite={isFavorite(product)}
              />
            ))}
          </div>

  
        </>
      )}
    </div>
  )
}

export default NewArrivals
