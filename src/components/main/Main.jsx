import { Play, ArrowRight } from "lucide-react"
import Carousel from "../ui/Carousel"
import "./Main.css"

const Main = () => {
  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?...",
      alt: "Model wearing stylish outfit",
      collection: "Premium Collection",
    },
    {
      src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?...",
      alt: "Fashion collection showcase",
      collection: "Summer Style",
    },
    {
      src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?...",
      alt: "Summer style outfit",
      collection: "Urban Wear",
    },
    {
      src: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?...",
      alt: "Casual wear collection",
      collection: "Casual Comfort",
    },
    {
      src: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?...",
      alt: "Premium quality clothing",
      collection: "Exclusive Line",
    },
    {
      src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?...",
      alt: "Stylish outfit on model",
      collection: "Fashion Forward",
    },
    {
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?...",
      alt: "Trendy outfit collection",
      collection: "Trendy Styles",
    },
    {
      src: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?...",
      alt: "Fashionable clothing line",
      collection: "Chic Collection",
    },
  ]

  return (
    <div className="landing-page">
      <div className="svg-background"></div>
      <div className="svg-background-2"></div>

      <section className="mainContainer">
        <div className="leftMainContent">
          {/* <div className="badge">New Season Collection</div> */}
          <h1 className="mainHeadline">
            <span>Active</span>
            <span>Comfort</span>
            <span>Wear.</span>
          </h1>
          <p className="mainDescription">
            Discover our curated collection of premium quality clothing designed for both style and comfort. Each piece
            is crafted with attention to detail and sustainable materials.
          </p>
          <div className="mainControls">
            <button className="btn primary-btn">
              Explore Now <ArrowRight size={16} />
            </button>
            <button className="btn secondary-btn">
              <Play size={18} /> Watch Reels
            </button>
          </div>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">2</span>
              <span className="stat-label">Collections</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">300+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
          </div>
        </div>
        <div className="rightMainContent">
          <div className="image-container">
            <Carousel images={carouselImages} />
            <div className="carousel-label">
              <div className="dot"></div>
              <span>Featured Collections</span>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <h2 className="section-title">Our Categories</h2>
        <div className="category-grid">
          <div className="category-card">
            <div className="category-icon">👔</div>
            <h3>Formal Wear</h3>
          </div>
          <div className="category-card">
            <div className="category-icon">👕</div>
            <h3>Casual</h3>
          </div>
          <div className="category-card">
            <div className="category-icon">🏃‍♂️</div>
            <h3>Active</h3>
          </div>
          <div className="category-card">
            <div className="category-icon">🧥</div>
            <h3>Outerwear</h3>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Main
