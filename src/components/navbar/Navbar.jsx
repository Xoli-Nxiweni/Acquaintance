"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Search, Heart, ChevronDown } from 'lucide-react'
import "./Navbar.css"
import image from "../../assets/Logo2.jpeg"
import Categories from "../categories/Categories"

const Navbar = ({ onFavoritesClick, favoritesCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [activePage, setActivePage] = useState("/")
  const searchInputRef = useRef(null)
  const navbarRef = useRef(null)

  // States for Categories component
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [showCategoriesComponent, setShowCategoriesComponent] = useState(false)

  // Categories data structure
  const categories = [
    {
      name: "T-Shirts",
      subcategories: ["Graphic Tees", "Basic Tees", "Long Sleeve", "Polo Shirts"],
    },
    {
      name: "Bottoms",
      subcategories: ["Jeans", "Shorts", "Pants", "Skirts"],
    },
    {
      name: "Outerwear",
      subcategories: ["Jackets", "Coats", "Hoodies", "Sweaters"],
    },
    {
      name: "Dresses",
      subcategories: ["Casual", "Formal", "Maxi", "Mini"],
    },
    {
      name: "Activewear",
      subcategories: ["Tops", "Bottoms", "Sets", "Jackets"],
    },
    {
      name: "Accessories",
      subcategories: ["Bags", "Jewelry", "Hats", "Scarves"],
    },
    {
      name: "Footwear",
      subcategories: ["Sneakers", "Boots", "Sandals", "Formal"],
    },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Set initial active page based on URL
    const path = window.location.pathname
    setActivePage(path)

    // Check if URL contains category or subcategory info
    const pathParts = path.split("/")
    if (pathParts[1] === "category" && pathParts[2]) {
      setSelectedCategory(pathParts[2])
      if (pathParts[3]) {
        setSelectedSubcategory(pathParts[3])
      }
      setShowCategoriesComponent(true)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Focus search input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveCategory(null)
        setSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Navigate to section function with Categories support
  const navigateToSection = (path) => {
    // Close mobile menu when navigating
    setIsMenuOpen(false)

    // For client-side navigation without full page reload
    setActivePage(path)

    // Check if it's a category path
    if (path.startsWith("/category/")) {
      const pathParts = path.split("/")
      if (pathParts[2]) {
        setSelectedCategory(pathParts[2])
        if (pathParts[3]) {
          setSelectedSubcategory(pathParts[3])
        } else {
          setSelectedSubcategory(null)
        }
        setShowCategoriesComponent(true)
      }
      return
    }

    // Reset Categories component if navigating elsewhere
    setShowCategoriesComponent(false)
    setSelectedCategory(null)
    setSelectedSubcategory(null)

    // Smooth scroll to section if on same page
    const sectionId = path.replace(/^\//g, "")
    const element = sectionId ? document.getElementById(sectionId) : document.getElementById("top")

    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      // If element doesn't exist, it's a different page
      window.location.href = path
    }
  }

  // Toggle category expansion (mobile only)
  const toggleCategory = (index) => {
    setActiveCategory(activeCategory === index ? null : index)
  }

  // Toggle search bar
  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
  }

  // Handle category selection from Categories component
  const handleCategorySelect = (categorySlug) => {
    if (categorySlug === null) {
      setSelectedCategory(null)
      setSelectedSubcategory(null)
      // Optionally navigate to all categories page
      // navigateToSection('/categories')
    } else {
      setSelectedCategory(categorySlug)
      setSelectedSubcategory(null)
    }
  }

  // Handle subcategory selection from Categories component
  const handleSubcategorySelect = (subcategorySlug) => {
    setSelectedSubcategory(subcategorySlug)
  }

  return (
    <>
      <nav ref={navbarRef} className={`myNavbar ${scrolled ? "scrolled" : ""}`}>
        {/* Logo area */}
        <div className="logo" onClick={() => navigateToSection("/")}>
          <img
            src={image || "/placeholder.svg"}
            alt="Logo"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        </div>

        {/* Navigation links - desktop & mobile */}
        <div className={`navLinks ${isMenuOpen ? "active" : ""}`}>
          <a
            href="/"
            className={activePage === "/" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault()
              navigateToSection("/")
            }}
          >
            Home
          </a>

          <a
            href="/products"
            className={activePage === "/products" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault()
              navigateToSection("/products")
            }}
          >
            Shop All
          </a>

          <div className="categoryDropdown">
            <a
              href="/categories"
              className={`categoryLink ${activePage.startsWith("/category") ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                toggleCategory(0)
              }}
            >
              Categories
              <span className={`dropdownArrow ${activeCategory === 0 ? "rotated" : ""}`}><ChevronDown size={16}/></span>
            </a>

            <div className={`dropdownContent ${activeCategory === 0 ? "visible" : ""}`}>
              {categories.map((category, index) => (
                <div key={index} className="category-group">
                  <a
                    href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="category-main"
                    onClick={(e) => {
                      e.preventDefault()
                      navigateToSection(`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`)
                    }}
                  >
                    {category.name}
                  </a>

                  <div className="subcategories">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <a
                        key={subIndex}
                        href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}/${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                        className="subcategory"
                        onClick={(e) => {
                          e.preventDefault()
                          navigateToSection(
                            `/category/${category.name.toLowerCase().replace(/\s+/g, "-")}/${subcategory.toLowerCase().replace(/\s+/g, "-")}`,
                          )
                        }}
                      >
                        {subcategory}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a
            href="/new-arrivals"
            className={activePage === "/new-arrivals" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault()
              navigateToSection("/new-arrivals")
            }}
          >
            New Arrivals
          </a>

          <a
            href="/sale"
            className={activePage === "/sale" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault()
              navigateToSection("/sale")
            }}
          >
            Sale
          </a>

          <a
            href="/about"
            className={activePage === "/about" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault()
              navigateToSection("/about")
            }}
          >
            About Us
          </a>
        </div>

        {/* Search overlay */}
        <div className={`search-overlay ${searchOpen ? "active" : ""}`}>
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input ref={searchInputRef} type="text" placeholder="Search for products..." className="search-input" />
            <button className="search-close" onClick={toggleSearch}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="navActions">
          <button className="navAction" onClick={toggleSearch} aria-label="Search">
            <Search size={20} />
          </button>
          <button className="navAction favorites-btn" onClick={onFavoritesClick} aria-label="Favorites">
            <Heart size={20} />
            {favoritesCount > 0 && <span className="favorites-count">{favoritesCount}</span>}
          </button>
          <button className="menuToggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Render Categories component when needed */}
      {showCategoriesComponent && (
        <Categories
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          categoriesData={categories}
          onCategorySelect={handleCategorySelect}
          onSubcategorySelect={handleSubcategorySelect}
        />
      )}
    </>
  )
}

export default Navbar
