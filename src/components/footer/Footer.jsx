"use client"

import { useState } from "react"
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react'
import "./Footer.css"
import logo from "../../assets/Logo2.jpeg"

const Footer = ({ onRenderContact }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleContactClick = (e) => {
    e.preventDefault()
    if (onRenderContact) {
      onRenderContact()
    }
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo || "/placeholder.svg"} alt="Brand Logo" />
            <span className="footer-logo-text">Acquaintance</span>
          </div>
          <p className="footer-description">
            Discover curated collections of comfortable, stylish clothing designed to fit your lifestyle.
          </p>
          <div className="footer-social">
            <a href="https://www.instagram.com" className="social-icon" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.twitter.com" className="social-icon" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="https://www.facebook.com" className="social-icon" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://www.youtube.com" className="social-icon" aria-label="YouTube">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Collections</h3>
          <div className="footer-links">
            <a href="#products" className="footer-link">
              All Products
            </a>
            <a href="#new-arrivals" className="footer-link">
              New Arrivals
            </a>
            <a href="#sale" className="footer-link">
              Sale Items
            </a>
            <a href="#" className="footer-link">
              Featured
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>About</h3>
          <div className="footer-links">
            <a href="#about" className="footer-link">
              Our Story
            </a>
            <a href="#" className="footer-link">
              Our Team
            </a>
            <a href="#" className="footer-link">
              Sustainability
            </a>
            <a href="#" className="footer-link">
              Blog
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Help</h3>
          <div className="footer-links">
            <a href="#" className="footer-link contact-link" onClick={handleContactClick}>
              Contact Us
            </a>
            <a href="#" className="footer-link">
              FAQs
            </a>
            <a href="#" className="footer-link">
              Shipping Information
            </a>
            <a href="#" className="footer-link">
              Size Guide
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">© {new Date().getFullYear()} Acquaintance. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#" className="legal-link">
            Privacy Policy
          </a>
          <a href="#" className="legal-link">
            Terms of Service
          </a>
          <a href="#" className="legal-link" onClick={scrollToTop}>
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
