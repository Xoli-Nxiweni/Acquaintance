"use client"

import { useState, useEffect } from "react"
import ProductCard from "../ui/ProductCard"
import "./Categories.css"

const Categories = ({
  selectedCategory,
  selectedSubcategory,
  categoriesData,
  onCategorySelect,
  onSubcategorySelect,
  onToggleFavorite,
  favorites = [],
  onClose
}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      const mockProducts = Array(12)
        .fill()
        .map((_, index) => ({
          id: `${selectedCategory || "product"}-${index}`,
          name: `${selectedSubcategory || selectedCategory || "Product"} ${index + 1}`,
          description: `Quality ${selectedSubcategory || selectedCategory || ""} item for your collection.`,
          price: Math.floor(Math.random() * 50) + 20,
          image: `https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=300&h=300&fit=crop&q=80`,
          discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : null,
          rating: Math.floor(Math.random() * 5) + 1,
          reviewCount: Math.floor(Math.random() * 50) + 5,
          isNew: Math.random() > 0.8,
          likes: Math.floor(Math.random() * 30),
        }))

      setProducts(mockProducts)
      setLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [selectedCategory, selectedSubcategory])

  const handleCloseModalOnSideClick = (e) => {
    if (e.target.classList.contains("categoriesOverlay")) {
      onClose()
    }
  }

  const isFavorite = (product) => {
    return favorites?.some((fav) => fav.id === product.id)
  }

  return (
    <div className="categoriesContainerOverlay">
      <div className="categoriesOverlay" onClick={handleCloseModalOnSideClick}>
        <div className="categories-container container" >
          <button
            className="close-button"
            onClick={() => {
              onClose()
            }}
          >
            &times;
          </button>

          {/* Breadcrumb navigation */}
          <div className="breadcrumbs">
            <span onClick={() => onCategorySelect(null)} className="breadcrumb-link">
              All Categories
            </span>

            {selectedCategory && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span onClick={() => onSubcategorySelect(null)} className="breadcrumb-link">
                  {selectedCategory.replace(/-/g, " ")}
                </span>
              </>
            )}

            {selectedSubcategory && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{selectedSubcategory.replace(/-/g, " ")}</span>
              </>
            )}
          </div>

          <div className="categories-layout">
            {/* Sidebar */}
            <div className="categories-sidebar">
              <h2 className="sidebar-title">Categories</h2>
              <ul className="category-list">
                {categoriesData.map((category, index) => (
                  <li key={index} className="category-item">
                    <div
                      className={`category-name ${
                        selectedCategory === category.name.toLowerCase().replace(/\s+/g, "-") ? "active" : ""
                      }`}
                      onClick={() =>
                        onCategorySelect(category.name.toLowerCase().replace(/\s+/g, "-"))
                      }
                    >
                      {category.name}
                    </div>

                    {selectedCategory === category.name.toLowerCase().replace(/\s+/g, "-") && (
                      <ul className="subcategory-list">
                        {category.subcategories.map((subcat, idx) => (
                          <li
                            key={idx}
                            className={`subcategory-item ${
                              selectedSubcategory === subcat.toLowerCase().replace(/\s+/g, "-") ? "active" : ""
                            }`}
                            onClick={() =>
                              onSubcategorySelect(subcat.toLowerCase().replace(/\s+/g, "-"))
                            }
                          >
                            {subcat}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Main content */}
            <div className="content-area">
              <div className="content-header">
                <h1 className="page-title">
                  {selectedSubcategory
                    ? `${selectedSubcategory.replace(/-/g, " ")} ${selectedCategory.replace(/-/g, " ")}`
                    : selectedCategory
                    ? selectedCategory.replace(/-/g, " ")
                    : "All Categories"}
                </h1>

                <div className="sort-control">
                  <label htmlFor="sort" className="sort-label">Sort by:</label>
                  <select id="sort" className="sort-select">
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Popular</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="product-grid">
                  {Array(8)
                    .fill()
                    .map((_, index) => (
                      <div key={index} className="product-skeleton">
                        <div className="skeleton-image"></div>
                        <div className="skeleton-title"></div>
                        <div className="skeleton-price"></div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="product-grid">
                  {products.map((product) => (
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
