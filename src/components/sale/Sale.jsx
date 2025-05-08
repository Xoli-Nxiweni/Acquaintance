"use client"

import { useState, useEffect } from "react"
import ProductCard from "../ui/ProductCard"
import "./Sale.css"

const Sale = ({ onToggleFavorite, favorites = [] }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching sale items
    setLoading(true)
    setTimeout(() => {
        const saleItems = [
            {
              id: "sale1",
              name: "Wool Blend Coat",
              description: "Classic tailored coat in premium wool blend",
              price: 199.99,
              image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&h=300&fit=crop&q=80",
              imageAlt: "Beige wool blend tailored coat",
              rating: 4,
              reviewCount: 32,
              isNew: false,
              category: "outerwear",
              discount: 30,
              likes: 47,
            },
            {
              id: "sale2",
              name: "Cashmere Sweater",
              description: "Luxuriously soft pure cashmere knit",
              price: 149.99,
              image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop&q=80",
              imageAlt: "Soft beige cashmere sweater",
              rating: 5,
              reviewCount: 28,
              isNew: false,
              category: "outerwear",
              discount: 25,
              likes: 39,
            },
            {
              id: "sale3",
              name: "Leather Ankle Boots",
              description: "Genuine leather with comfortable block heel",
              price: 129.99,
              image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=300&h=300&fit=crop&q=80",
              imageAlt: "Brown leather ankle boots with block heel",
              rating: 4,
              reviewCount: 21,
              isNew: false,
              category: "footwear",
              discount: 40,
              likes: 26,
            },
            {
              id: "sale4",
              name: "Silk Blouse",
              description: "Elegant pure silk with relaxed fit",
              price: 89.99,
              image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop&q=80",
              imageAlt: "White silk blouse with relaxed fit",
              rating: 4,
              reviewCount: 18,
              isNew: false,
              category: "tops",
              discount: 20,
              likes: 31,
            },
            {
              id: "sale5",
              name: "Designer Sunglasses",
              description: "Premium UV protection with stylish frames",
              price: 159.99,
              image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop&q=80",
              imageAlt: "Black designer sunglasses with gold accents",
              rating: 5,
              reviewCount: 14,
              isNew: false,
              category: "accessories",
              discount: 35,
              likes: 22,
            },
            {
              id: "sale6",
              name: "Structured Handbag",
              description: "Sophisticated design with multiple compartments",
              price: 179.99,
              image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop&q=80",
              imageAlt: "Black structured leather handbag",
              rating: 4,
              reviewCount: 19,
              isNew: false,
              category: "accessories",
              discount: 45,
              likes: 34,
            }
      ]
      setProducts(saleItems)
      setLoading(false)
    }, 800)
  }, [])

  const isFavorite = (product) => {
    return favorites.some((fav) => fav.id === product.id)
  }

  return (
    <div className="sale-container container">
      <div className="sale-header">
        <h2 className="section-title">Sale</h2>
        <div className="sale-badge">Up to 45% Off</div>
      </div>
      <p className="section-description">
        Limited time offers on premium items. Discover exceptional savings on our curated selection of high-quality
        products. Don't miss these deals before they're gone.
      </p>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading sale items...</p>
        </div>
      ) : (
        <>
          <div className="sale-grid">
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

export default Sale
