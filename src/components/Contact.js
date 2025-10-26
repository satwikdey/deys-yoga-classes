import React, { useEffect, useRef, useState } from 'react';

const Contact = () => {
  const contactRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = contactRef.current?.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="section-title fade-in">Begin Your Journey Today</h2>
        <div className="contact-content" ref={contactRef}>
          <div className="contact-info slide-in-left">
            <h3>Get in Touch</h3>
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <p>swati.dey@yogaclasses.com</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <p>+91 98765 43210</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <p>Available for Online & Offline Classes</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">⏰</div>
              <p>Flexible timings to suit your schedule</p>
            </div>
          </div>
          <div className="contact-form slide-in-right">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message about your yoga goals</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about your yoga goals and what you hope to achieve..."
                />
              </div>
              <button type="submit" className="btn" style={{ width: '100%' }}>
                {isSubmitted ? '✓ Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
