"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, SearchIcon, Heart, ChevronDown } from "lucide-react"
import "./Navbar.css"
import image from "../../assets/Logo2.jpeg"

const Navbar = ({ onFavoritesClick, favoritesCount = 0, onSearch, onCategorySelect, categoriesData = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [activePage, setActivePage] = useState("/")
  const [searchTerm, setSearchTerm] = useState("")
  const searchInputRef = useRef(null)
  const navbarRef = useRef(null)

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

  // Navigate to section function
  const navigateToSection = (path) => {
    // Close mobile menu when navigating
    setIsMenuOpen(false)

    // For client-side navigation without full page reload
    setActivePage(path)

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
    if (!searchOpen) {
      setSearchTerm("")
    }
  }

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()

    if (searchTerm.trim()) {
      // Close the search overlay
      setSearchOpen(false)

      // Call the onSearch prop with the search term
      if (onSearch) {
        onSearch(searchTerm.trim())
      }

      // Update active page for styling
      setActivePage(`/search/${searchTerm.trim()}`)
    }
  }

  // Handle category click
  const handleCategoryClick = (e, categoryName) => {
    e.preventDefault()
    if (onCategorySelect) {
      const categorySlug = categoryName.toLowerCase().replace(/\s+/g, "-")
      onCategorySelect(categorySlug)
      setActivePage(`/category/${categorySlug}`)
      setIsMenuOpen(false)
      // Close the dropdown after selection
      setActiveCategory(null)
    }
  }

  // Handle subcategory click
  const handleSubcategoryClick = (e, categoryName, subcategoryName) => {
    e.preventDefault()
    if (onCategorySelect) {
      const categorySlug = categoryName.toLowerCase().replace(/\s+/g, "-")
      const subcategorySlug = subcategoryName.toLowerCase().replace(/\s+/g, "-")
      onCategorySelect(categorySlug, subcategorySlug)
      setActivePage(`/category/${categorySlug}/${subcategorySlug}`)
      setIsMenuOpen(false)
      // Close the dropdown after selection
      setActiveCategory(null)
    }
  }

  return (
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
              // Removed the handleCategoryClick call so it doesn't navigate immediately
            }}
          >
            Categories
            <span className={`dropdownArrow ${activeCategory === 0 ? "rotated" : ""}`}>
              <ChevronDown size={16} />
            </span>
          </a>

          <div className={`dropdownContent ${activeCategory === 0 ? "visible" : ""}`}>
            {categoriesData.map((category, index) => (
              <div key={index} className="category-group">
                <a
                  href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="category-main"
                  onClick={(e) => handleCategoryClick(e, category.name)}
                >
                  {category.name}
                </a>

                <div className="subcategories">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <a
                      key={subIndex}
                      href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}/${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                      className="subcategory"
                      onClick={(e) => handleSubcategoryClick(e, category.name, subcategory)}
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
          <form onSubmit={handleSearchSubmit}>
            <SearchIcon size={20} className="search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for products..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <SearchIcon size={20} />
            </button>
            <button type="button" className="search-close" onClick={toggleSearch}>
              <X size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Action buttons */}
      <div className="navActions">
        <button className="navAction" onClick={toggleSearch} aria-label="Search">
          <SearchIcon size={20} />
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
  )
}

export default Navbar
