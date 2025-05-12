"use client"

import { useState, useEffect } from "react"
import { X, ChevronRight, Filter } from "lucide-react"
import "./Categories.css"

const Categories = ({
  selectedCategory,
  selectedSubcategory,
  categoriesData,
  onCategorySelect,
  onSubcategorySelect,
  onClose,
}) => {
  const [activeCategory, setActiveCategory] = useState(selectedCategory || null)
  const [activeSubcategory, setActiveSubcategory] = useState(selectedSubcategory || null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("featured")

  // Sample product data - in a real app, this would come from an API
  const allProducts = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      category: "t-shirts",
      subcategory: "basic-tees",
      price: 29.99,
      salePrice: null,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "White t-shirt with crew neck and short sleeves",
      description: "Essential white tee made from premium cotton.",
    },
    {
      id: 2,
      name: "Black Denim Jeans",
      category: "bottoms",
      subcategory: "jeans",
      price: 59.99,
      salePrice: 49.99,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Black denim jeans with classic fit",
      description: "Classic black jeans with a comfortable stretch fit.",
    },
    {
      id: 3,
      name: "Wool Winter Coat",
      category: "outerwear",
      subcategory: "coats",
      price: 149.99,
      salePrice: null,
      image:
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Beige wool winter coat with buttons",
      description: "Warm wool coat perfect for cold winter days.",
    },
    {
      id: 4,
      name: "Running Shoes",
      category: "footwear",
      subcategory: "sneakers",
      price: 89.99,
      salePrice: 69.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Red and white running shoes",
      description: "Lightweight running shoes with cushioned support.",
    },
    {
      id: 5,
      name: "Graphic Print T-Shirt",
      category: "t-shirts",
      subcategory: "graphic-tees",
      price: 34.99,
      salePrice: null,
      image:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Black t-shirt with artistic graphic print",
      description: "Unique graphic print tee with artistic design.",
    },
    {
      id: 6,
      name: "Summer Dress",
      category: "dresses",
      subcategory: "casual",
      price: 49.99,
      salePrice: null,
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Light floral summer dress",
      description: "Light and flowy summer dress for casual occasions.",
    },
    {
      id: 7,
      name: "Leather Jacket",
      category: "outerwear",
      subcategory: "jackets",
      price: 199.99,
      salePrice: 159.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Black leather jacket with zipper",
      description: "Classic leather jacket with modern styling.",
    },
    {
      id: 8,
      name: "Slim Fit Chinos",
      category: "bottoms",
      subcategory: "pants",
      price: 45.99,
      salePrice: null,
      image:
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Beige slim fit chino pants",
      description: "Versatile slim fit chinos for any occasion.",
    },
  ]

  // Update active category and subcategory when props change
  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory)
    }
    if (selectedSubcategory) {
      setActiveSubcategory(selectedSubcategory)
    }
  }, [selectedCategory, selectedSubcategory])

  // Filter products based on active category and subcategory
  useEffect(() => {
    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      let filteredProducts = [...allProducts]

      // Filter by category
      if (activeCategory && activeCategory !== "all") {
        filteredProducts = filteredProducts.filter((product) => product.category === activeCategory)
      }

      // Filter by subcategory
      if (activeSubcategory) {
        filteredProducts = filteredProducts.filter((product) => product.subcategory === activeSubcategory)
      }

      // Filter by price range
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.salePrice || product.price
        return price >= priceRange[0] && price <= priceRange[1]
      })

      // Sort products
      switch (sortBy) {
        case "price-low":
          filteredProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
          break
        case "price-high":
          filteredProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
          break
        case "newest":
          // In a real app, you would sort by date
          // Here we're just using the ID as a proxy for "newest"
          filteredProducts.sort((a, b) => b.id - a.id)
          break
        default:
          // "featured" - no specific sorting
          break
      }

      setProducts(filteredProducts)
      setLoading(false)
    }, 500)
  }, [activeCategory, activeSubcategory, priceRange, sortBy])

  // Handle category click
  const handleCategoryClick = (categorySlug) => {
    setActiveCategory(categorySlug)
    setActiveSubcategory(null)
    if (onCategorySelect) {
      onCategorySelect(categorySlug)
    }
  }

  // Handle subcategory click
  const handleSubcategoryClick = (subcategorySlug) => {
    setActiveSubcategory(subcategorySlug)
    if (onSubcategorySelect) {
      onSubcategorySelect(subcategorySlug)
    }
  }

  // Handle price range change
  const handlePriceRangeChange = (e, index) => {
    const newRange = [...priceRange]
    newRange[index] = Number.parseInt(e.target.value)
    setPriceRange(newRange)
  }

  // Get category name from slug
  const getCategoryName = (slug) => {
    if (!slug || slug === "all") return "All Categories"
    const category = categoriesData.find((cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === slug)
    return category ? category.name : "Category"
  }

  // Get subcategory name from slug
  const getSubcategoryName = (categorySlug, subcategorySlug) => {
    if (!subcategorySlug) return ""
    const category = categoriesData.find((cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === categorySlug)
    if (!category) return subcategorySlug
    const subcategory = category.subcategories.find((sub) => sub.toLowerCase().replace(/\s+/g, "-") === subcategorySlug)
    return subcategory || subcategorySlug
  }

  return (
    <div className="categories-container">
      <div className="categories-header">
        <div className="categories-breadcrumb">
          <span onClick={() => handleCategoryClick("all")}>All Categories</span>
          {activeCategory && activeCategory !== "all" && (
            <>
              <ChevronRight size={16} />
              <span>{getCategoryName(activeCategory)}</span>
            </>
          )}
          {activeSubcategory && (
            <>
              <ChevronRight size={16} />
              <span>{getSubcategoryName(activeCategory, activeSubcategory)}</span>
            </>
          )}
        </div>
        <button className="close-categories-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <div className="categories-content">
        <div className="categories-sidebar">
          <div className="categories-list">
            <h3>Categories</h3>
            <ul>
              <li
                className={activeCategory === "all" || !activeCategory ? "active" : ""}
                onClick={() => handleCategoryClick("all")}
              >
                All Categories
              </li>
              {categoriesData.map((category, index) => (
                <li
                  key={index}
                  className={activeCategory === category.name.toLowerCase().replace(/\s+/g, "-") ? "active" : ""}
                  onClick={() => handleCategoryClick(category.name.toLowerCase().replace(/\s+/g, "-"))}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          {activeCategory && activeCategory !== "all" && (
            <div className="subcategories-list">
              <h3>Subcategories</h3>
              <ul>
                <li className={!activeSubcategory ? "active" : ""} onClick={() => handleSubcategoryClick(null)}>
                  All {getCategoryName(activeCategory)}
                </li>
                {categoriesData
                  .find((cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === activeCategory)
                  ?.subcategories.map((subcategory, index) => (
                    <li
                      key={index}
                      className={activeSubcategory === subcategory.toLowerCase().replace(/\s+/g, "-") ? "active" : ""}
                      onClick={() => handleSubcategoryClick(subcategory.toLowerCase().replace(/\s+/g, "-"))}
                    >
                      {subcategory}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div className="categories-filters">
            <div className="filters-header" onClick={() => setShowFilters(!showFilters)}>
              <h3>Filters</h3>
              <Filter size={18} />
            </div>

            {showFilters && (
              <div className="filters-content">
                <div className="filter-group">
                  <h4>Price Range</h4>
                  <div className="price-range">
                    <div className="price-inputs">
                      <div className="price-input">
                        <label>Min</label>
                        <input
                          type="number"
                          min="0"
                          max={priceRange[1]}
                          value={priceRange[0]}
                          onChange={(e) => handlePriceRangeChange(e, 0)}
                        />
                      </div>
                      <div className="price-input">
                        <label>Max</label>
                        <input
                          type="number"
                          min={priceRange[0]}
                          max="1000"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceRangeChange(e, 1)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="filter-group">
                  <h4>Sort By</h4>
                  <div className="sort-options">
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="featured"
                        checked={sortBy === "featured"}
                        onChange={() => setSortBy("featured")}
                      />
                      Featured
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="price-low"
                        checked={sortBy === "price-low"}
                        onChange={() => setSortBy("price-low")}
                      />
                      Price: Low to High
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="price-high"
                        checked={sortBy === "price-high"}
                        onChange={() => setSortBy("price-high")}
                      />
                      Price: High to Low
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="newest"
                        checked={sortBy === "newest"}
                        onChange={() => setSortBy("newest")}
                      />
                      Newest
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="categories-products">
          <div className="products-header">
            <h2>
              {activeSubcategory
                ? `${getSubcategoryName(activeCategory, activeSubcategory)} ${getCategoryName(activeCategory)}`
                : activeCategory && activeCategory !== "all"
                  ? getCategoryName(activeCategory)
                  : "All Products"}
            </h2>
            <p>{products.length} products</p>
          </div>

          {loading ? (
            <div className="products-loading">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <p>No products found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image || "/placeholder.svg"} alt={product.imageAlt} />
                    {product.salePrice && <span className="sale-badge">Sale</span>}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-category">
                      {getCategoryName(product.category)} / {getSubcategoryName(product.category, product.subcategory)}
                    </p>
                    <div className="product-price">
                      {product.salePrice ? (
                        <>
                          <span className="sale-price">R{product.salePrice}</span>
                          <span className="original-price">R{product.price}</span>
                        </>
                      ) : (
                        <span>R{product.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Categories
