import React, { useEffect, useRef, useState } from 'react';

const DIRECTIONS_LINK = 'https://www.google.com/maps/dir/22.484991,88.333911/Dey+Yoga+Classes,+86,+Karunamoyee+Ghat+Rd,+Madhusudan+Park,+Paschim+Putiary,+Kolkata,+West+Bengal+700082/@22.4848733,88.3311844,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3a0271a4d7dc258b:0xc2a2d3ecc6c0aeac!2m2!1d88.333612!2d22.4847586?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D';
const EMBED_LINK =
  'https://www.google.com/maps?q=Dey+Yoga+Classes,+86,+Karunamoyee+Ghat+Rd,+Madhusudan+Park,+Paschim+Putiary,+Kolkata,+West+Bengal+700082&output=embed';
const CONTACT_ENDPOINT = '/api/contact';
const MAILTO_EMAIL = 'deyswati65@gmail.com';

const Contact = () => {
  const contactRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');

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
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitState === 'sending') {
      return;
    }

    setSubmitState('sending');
    setSubmitMessage('');

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      const responseText = await response.text();
      let result = {};

      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        result = {};
      }

      const success = response.ok && result.success === true;

      if (!success) {
        if (response.status === 404) {
          throw new Error('Email API is not running. Start the site with npm run dev and try again.');
        }

        throw new Error(
          result.message ||
            `Submission service unavailable (${response.status}). Please retry in a moment.`
        );
      }

      setSubmitState('success');
      setSubmitMessage('Thanks! Your message has been sent.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(error.message);
    }
  };

  const buildMailtoLink = () => {
    const subject = encodeURIComponent('Yoga Inquiry - Dey Yoga Classes');
    const body = encodeURIComponent(
      `Name: ${formData.name || '-'}\nEmail: ${formData.email || '-'}\n\nMessage:\n${formData.message || '-'}`
    );
    return `mailto:${MAILTO_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="section-title fade-in">Begin Your Journey Today</h2>
        <div className="contact-content" ref={contactRef}>
          <div className="contact-info slide-in-left">
            <h3>Get in Touch</h3>
            <div className="contact-item">
              <div className="contact-icon">Email</div>
              <p>deyswati65@gmail.com</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">Phone</div>
              <p>8910528675</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">Mode</div>
              <p>Available for Online & Offline Classes</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">Hours</div>
              <p>Flexible timings to suit your schedule</p>
            </div>

            <div className="contact-map-card">
              <h4>Studio Location</h4>
              <p className="contact-address">
                Dey Yoga Classes, 86 Karunamoyee Ghat Rd, Madhusudan Park, Paschim Putiary, Kolkata, West Bengal 700082
              </p>
              <div className="contact-map-frame">
                <iframe
                  title="Dey Yoga Classes Location Map"
                  src={EMBED_LINK}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a className="map-link-btn" href={DIRECTIONS_LINK} target="_blank" rel="noreferrer">
                Get Directions
              </a>
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
              <button type="submit" className="btn" style={{ width: '100%' }} disabled={submitState === 'sending'}>
                {submitState === 'sending' ? 'Sending...' : submitState === 'success' ? 'Message Sent!' : 'Send Message'}
              </button>
              {submitMessage ? <p className={`form-status ${submitState}`}>{submitMessage}</p> : null}
              {submitState === 'error' ? (
                <a className="form-fallback-link" href={buildMailtoLink()}>
                  Email us directly instead
                </a>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
