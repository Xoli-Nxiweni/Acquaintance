"use client"

import { useState, useEffect } from "react"
import { SearchIcon, X } from "lucide-react"
import "./Search.css"

const Search = ({ searchTerm: initialSearchTerm, products }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || "")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [noResults, setNoResults] = useState(false)

  // Sample product data with Unsplash images
  const allProducts = products || [
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

  // Update search results when search term changes
  useEffect(() => {
    if (initialSearchTerm && initialSearchTerm !== searchTerm) {
      setSearchTerm(initialSearchTerm)
    }
  }, [initialSearchTerm])

  // Perform search when search term changes
  useEffect(() => {
    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      if (searchTerm) {
        const filteredResults = allProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.subcategory.toLowerCase().includes(searchTerm.toLowerCase()),
        )

        setSearchResults(filteredResults)
        setNoResults(filteredResults.length === 0)
      } else {
        // When search term is empty, show all products
        setSearchResults(allProducts)
        setNoResults(false)
      }
      setLoading(false)
    }, 500)
  }, [searchTerm])

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // The search is already performed via the useEffect when searchTerm changes
    // This just prevents the form from submitting and refreshing the page
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <div className="search-results-container">
      {/* Independent search bar */}
      <div className="independent-search">
        <form onSubmit={handleSearchSubmit}>
          <div className="search-input-container">
            <SearchIcon size={20} className="search-input-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products..."
              className="search-input-field"
            />
            {searchTerm && (
              <button type="button" onClick={clearSearch} className="search-clear-btn">
                <X size={16} />
              </button>
            )}
            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="search-loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : noResults ? (
        <div className="search-no-results">
          <div className="no-results-icon">😕</div>
          <h3>No products found</h3>
          <p>Try a different search term or browse our categories</p>
        </div>
      ) : (
        <>
          <div className="search-header">
            {searchTerm ? (
              <>
                <h2>Search Results for "{searchTerm}"</h2>
                <p>{searchResults.length} products found</p>
              </>
            ) : (
              <h2>All Products</h2>
            )}
          </div>

          <div className="search-results-grid">
            {searchResults.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image || "/placeholder.svg"} alt={product.imageAlt} />
                  {/* {product.salePrice && <span className="sale-badge">Sale</span>} */}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-category">
                    {product.category} / {product.subcategory}
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
        </>
      )}
    </div>
  )
}

export default Search
