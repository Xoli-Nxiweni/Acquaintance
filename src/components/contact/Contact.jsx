"use client"

import React, { useState } from 'react'
import { X, Send, MapPin, Phone, Mail, Clock } from 'lucide-react'
import "./Contact.css"

const Contact = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    }
    
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="contact-container">
      <button className="close-contact-btn" onClick={onClose}>
        <X size={24} />
      </button>
      
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Fill out the form below or visit our store.</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                placeholder='Enter Your Name e.g Stephan Ortega'
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className={formErrors.name ? 'error' : ''}
              />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                placeholder='Enter Your Email e.g abc@me.com'
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? 'error' : ''}
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                placeholder='Enter Your Subject e.g Order Inquiry'
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                className={formErrors.subject ? 'error' : ''}
              />
              {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                placeholder='Enter Your Name e.g Stephan Ortega'
                name="message" 
                rows="3"
                value={formData.message}
                onChange={handleChange}
                className={formErrors.message ? 'error' : ''}
              ></textarea>
              {formErrors.message && <span className="error-message">{formErrors.message}</span>}
            </div>
            
            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
            
            {submitSuccess && (
              <div className="success-message">
                Your message has been sent successfully! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>
        
        <div className="contact-info-container">
          <div className="contact-info">
            <h2>Store Information</h2>
            
            <div className="info-item">
              <MapPin size={20} />
              <div>
                <h3>Address</h3>
                <p>Acquaintance Apparel<br />194a Phiri St, Meadowlands East Zone 4<br />Soweto, 1852</p>
              </div>
            </div>
            
            <div className="info-item">
              <Phone size={20} />
              <div>
                <h3>Phone</h3>
                <p>+27 11 123 4567</p>
              </div>
            </div>
            
            <div className="info-item">
              <Mail size={20} />
              <div>
                <h3>Email</h3>
                <p>info@acquaintanceapparel.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <Clock size={20} />
              <div>
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.0508083384394!2d27.8651!3d-26.2345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a7e7d7c4a4a7%3A0x4c7944a5f11245c8!2sMeadowlands%20East%20Zone%204%2C%20Soweto%2C%201852%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1625764422047!5m2!1sen!2sus" 
              width="100%" 
              height="400px" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Acquaintance Apparel Location"
            ></iframe>
          </div>
    </div>
  )
}

export default Contact
