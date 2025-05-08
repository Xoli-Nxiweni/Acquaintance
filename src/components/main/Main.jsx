import { Play } from "lucide-react"
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
    <section className="mainContainer">
      <div className="leftMainContent">
        <h1 className="mainHeadline">
          <span>Active</span>
          <span>Comfort</span>
          <span>Wear.</span>
        </h1>
        <div className="mainControls">
          <button className="btn primary-btn">Explore Now</button>
          <button className="btn secondary-btn">
            <Play size={18} /> Watch Reels
          </button>
        </div>
      </div>
      <div className="rightMainContent">
        <div className="image-container">
          <Carousel images={carouselImages} />
        </div>
        <div className="extraContent">
          <h5>View Our Latest Collection</h5>
          <p>Crafted for those who value quality and elegance</p>
          {/* <div className="collection-indicators">
            <span className="active-indicator"></span>
            <span></span>
            <span></span>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default Main
