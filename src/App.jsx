"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/navbar/Navbar"
import Main from "./components/main/Main"
import AboutUs from "./components/aboutUs/AboutUs"
import ShopAll from "./components/shopAll/ShopAll"
import NewArrivals from "./components/newArrivals/NewArrivals"
import Sale from "./components/sale/Sale"
import Footer from "./components/footer/Footer"
import Favorites from "./components/favorites/Favorites"
import Search from "./components/search/Search"
import Contact from "./components/contact/Contact"
import Categories from "./components/categories/Categories"
import "./App.css"
import "./globalStyles.css"

export default function App() {
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)

  // Categories data structure
  const categoriesData = [
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

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.id === product.id)
      if (exists) {
        return prevFavorites.filter((item) => item.id !== product.id)
      } else {
        return [...prevFavorites, product]
      }
    })
  }

  const toggleFavoritesView = () => {
    setShowFavorites(!showFavorites)
    setShowSearch(false)
    setShowContact(false)
    setShowCategories(false)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    setShowSearch(true)
    setShowFavorites(false)
    setShowContact(false)
    setShowCategories(false)
  }

  const handleRenderContact = () => {
    setShowContact(true)
    setShowFavorites(false)
    setShowSearch(false)
    setShowCategories(false)

    // Scroll to top when contact is opened
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleCloseContact = () => {
    setShowContact(false)
  }

  const handleCategorySelect = (categorySlug, subcategorySlug = null) => {
    // Only show the categories page if a specific category is selected
    if (categorySlug && categorySlug !== "all") {
      setSelectedCategory(categorySlug)
      setSelectedSubcategory(subcategorySlug)
      setShowCategories(true)
      setShowFavorites(false)
      setShowSearch(false)
      setShowContact(false)

      // Scroll to top when categories is opened
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  const handleSubcategorySelect = (subcategorySlug) => {
    setSelectedSubcategory(subcategorySlug)
  }

  const handleCloseCategories = () => {
    setShowCategories(false)
  }

  return (
    <div id="top" className="app">
      <Navbar
        onFavoritesClick={toggleFavoritesView}
        favoritesCount={favorites.length}
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        categoriesData={categoriesData}
      />

      {showFavorites ? (
        <section id="favorites" className="content-section">
          <Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />
        </section>
      ) : showSearch ? (
        <section id="search" className="content-section">
          <Search searchTerm={searchTerm} />
        </section>
      ) : showContact ? (
        <section id="contact" className="content-section">
          <Contact onClose={handleCloseContact} />
        </section>
      ) : showCategories ? (
        <section id="categories" className="content-section">
          <Categories
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            categoriesData={categoriesData}
            onCategorySelect={handleCategorySelect}
            onSubcategorySelect={handleSubcategorySelect}
            onClose={handleCloseCategories}
          />
        </section>
      ) : (
        <>
          <section id="home" className="content-section">
            <Main />
          </section>

          <section id="products" className="content-section">
            <ShopAll onToggleFavorite={toggleFavorite} favorites={favorites} />
          </section>

          <section id="about" className="content-section">
            <AboutUs />
          </section>
        </>
      )}

      <Footer onRenderContact={handleRenderContact} />
    </div>
  )
}
