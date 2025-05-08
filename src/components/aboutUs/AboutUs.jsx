import "./AboutUs.css"
import { Star, Heart, Info } from "lucide-react"

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About Our Brand</h1>
        <p className="about-subtitle">
          Dedicated to bringing you stylish, high-quality fashion that celebrates individuality and sustainable
          practices.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
            alt="Our Story"
          />
        </div>
        <div className="about-content">
          <h2 className="about-section-title">Our Story</h2>
          <p className="about-text">
            Founded in 2015, our brand began with a simple mission: to create clothing that empowers individuals to
            express themselves authentically. What started as a small passion project has grown into a beloved catalogue
            of carefully curated collections.
          </p>
          <p className="about-text">
            Each season, we collaborate with talented designers and artists to bring fresh perspectives to our
            catalogue. Our team is dedicated to sourcing quality materials and working with ethical manufacturing
            partners to ensure our products are made responsibly.
          </p>
          <p className="about-text">
            We believe fashion should be accessible, inclusive, and sustainable. That's why we're committed to creating
            pieces that stand the test of time in both quality and style.
          </p>
        </div>
      </div>

      <div className="values-container">
        <h2 className="values-title">Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <Star />
            </div>
            <h3 className="value-title">Quality</h3>
            <p className="value-description">
              We meticulously select materials and craft each piece to ensure lasting quality and comfort that our
              customers can enjoy for years.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <Heart />
            </div>
            <h3 className="value-title">Community</h3>
            <p className="value-description">
              We celebrate diversity and strive to create a fashion community where everyone feels welcome, represented,
              and inspired.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <Info />
            </div>
            <h3 className="value-title">Transparency</h3>
            <p className="value-description">
              We believe in being honest about our processes and products, providing our customers with all the
              information they need.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
