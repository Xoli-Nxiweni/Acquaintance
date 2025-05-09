import { Star, Heart, ShoppingCart } from 'lucide-react';
"use client"

import { useState, useEffect } from "react"
import ProductCard from "../ui/ProductCard"
import "./ShopAll.css"

const ShopAll = ({ onToggleFavorite, favorites = [] }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // Simulate fetching products
    setLoading(true)
    setTimeout(() => {
        
        // Product data with Unsplash images for each product type
        const mockProducts = [
          {
            id: "p1",
            name: "Classic White T-Shirt",
            description: "Essential cotton tee for everyday wear",
            price: 29.99,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&q=80",
            imageAlt: "White t-shirt with crew neck and short sleeves",
            rating: 4,
            reviewCount: 42,
            isNew: false,
            category: "t-shirts",
            discount: 1,
            likes: 24,
          },
          {
            id: "p2",
            name: "Slim Fit Jeans",
            description: "Modern slim fit with stretch comfort",
            price: 59.99,
            image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop&q=80",
            imageAlt: "Blue denim slim fit jeans",
            rating: 5,
            reviewCount: 18,
            isNew: false,
            category: "bottoms",
            discount: 1,
            likes: 16,
          },
          {
            id: "p3",
            name: "Oversized Hoodie",
            description: "Cozy oversized fit for ultimate comfort",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop&q=80",
            imageAlt: "Gray oversized hoodie with front pocket",
            rating: 4,
            reviewCount: 31,
            isNew: true,
            category: "outerwear",
            discount: 1,
            likes: 38,
          },
          {
            id: "p4",
            name: "Leather Crossbody Bag",
            description: "Compact design with adjustable strap",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=300&h=300&fit=crop&q=80",
            imageAlt: "Black leather crossbody bag with gold hardware",
            rating: 5,
            reviewCount: 27,
            isNew: false,
            category: "accessories",
            discount: 15,
            likes: 42,
          },
          {
            id: "p5",
            name: "Canvas Sneakers",
            description: "Lightweight casual shoes for everyday",
            price: 44.99,
            image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&h=300&fit=crop&q=80",
            imageAlt: "White canvas low-top sneakers",
            rating: 3,
            reviewCount: 14,
            isNew: false,
            category: "footwear",
            discount: 1,
            likes: 9,
          },
          {
            id: "p6",
            name: "Floral Summer Dress",
            description: "Breezy floral print for warm days",
            price: 69.99,
            image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop&q=80", 
            imageAlt: "Light blue summer dress with small floral print",
            rating: 4,
            reviewCount: 23,
            isNew: true,
            category: "dresses",
            discount: 1,
            likes: 31,
          },
          {
            id: "p7",
            name: "Performance Leggings",
            description: "High-waisted with moisture-wicking fabric",
            price: 54.99,
            image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=300&h=300&fit=crop&q=80",
            imageAlt: "Black high-waisted athletic leggings",
            rating: 5,
            reviewCount: 47,
            isNew: false,
            category: "activewear",
            discount: 4,
            likes: 56,
          },
          {
            id: "p8",
            name: "Denim Jacket",
            description: "Classic denim with modern details",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1529391409740-59f2cea08bc6?w=300&h=300&fit=crop&q=80",
            imageAlt: "Medium wash denim jacket with button closure",
            rating: 4,
            reviewCount: 19,
            isNew: false,
            category: "outerwear",
            discount: 20,
            likes: 27,
          },
        ];
      setProducts(mockProducts)
      setLoading(false)
    }, 800)
  }, [])

  const filteredProducts = filter === "all" ? products : products.filter((product) => product.category === filter)

  const isFavorite = (product) => {
    return favorites.some((fav) => fav.id === product.id)
  }

  return (
    <div className="shop-all-container container">
      <h2 className="section-title">Shop All Products</h2>
      <p className="section-description">
        Browse our curated collection of high-quality products. From everyday essentials to statement pieces, find
        everything you need to express your unique style.
      </p>

      <div className="filter-controls">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={`filter-btn ${filter === "t-shirts" ? "active" : ""}`} onClick={() => setFilter("t-shirts")}>
          T-Shirts
        </button>
        <button className={`filter-btn ${filter === "bottoms" ? "active" : ""}`} onClick={() => setFilter("bottoms")}>
          Bottoms
        </button>
        <button
          className={`filter-btn ${filter === "outerwear" ? "active" : ""}`}
          onClick={() => setFilter("outerwear")}
        >
          Outerwear
        </button>
        <button className={`filter-btn ${filter === "dresses" ? "active" : ""}`} onClick={() => setFilter("dresses")}>
          Dresses
        </button>
        <button
          className={`filter-btn ${filter === "accessories" ? "active" : ""}`}
          onClick={() => setFilter("accessories")}
        >
          Accessories
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite(product)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ShopAll
