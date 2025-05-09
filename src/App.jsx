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
import "./App.css"
import "./globalStyles.css"

export default function App() {
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [showContact, setShowContact] = useState(false)

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
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    setShowSearch(true)
    setShowFavorites(false)
    setShowContact(false)
  }

  const handleRenderContact = () => {
    setShowContact(true)
    setShowFavorites(false)
    setShowSearch(false)

    // Scroll to top when contact is opened
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleCloseContact = () => {
    setShowContact(false)
  }

  return (
    <div id="top" className="app">
      <Navbar onFavoritesClick={toggleFavoritesView} favoritesCount={favorites.length} onSearch={handleSearch} />

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
      ) : (
        <>
          <section id="home" className="content-section">
            <Main />
          </section>

          <section id="products" className="content-section">
            <ShopAll onToggleFavorite={toggleFavorite} favorites={favorites} />
          </section>

          <section id="new-arrivals" className="content-section">
            <NewArrivals onToggleFavorite={toggleFavorite} favorites={favorites} />
          </section>

          <section id="sale" className="content-section">
            <Sale onToggleFavorite={toggleFavorite} favorites={favorites} />
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
