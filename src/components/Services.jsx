import React, { useEffect, useRef } from 'react';

const Services = () => {
  const servicesRef = useRef(null);

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

    const elements = servicesRef.current?.querySelectorAll('.fade-in, .scale-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const pricingTiers = [
    {
      plan: "1 Class per Week",
      price: "₹600",
      description: "Perfect for beginners or those with a busy schedule."
    },
    {
      plan: "2 Classes per Week", 
      price: "₹900",
      description: "Ideal for building a consistent and strong practice."
    },
    {
      plan: "3 Classes per Week",
      price: "₹1100", 
      description: "For dedicated students seeking rapid transformation."
    }
  ];

  return (
    <section id="services" className="services section">
      <div className="container">
        <h2 className="section-title fade-in">Classes & Pricing</h2>
        <p className="fade-in" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.2rem', color: '#3C3C3C' }}>
          One-to-One Classes for Women (Offline and Online)
        </p>
        <div className="services-grid" ref={servicesRef}>
          {pricingTiers.map((tier, index) => (
            <div key={index} className="service-card scale-in">
              <h3>{tier.plan}</h3>
              <div className="price">{tier.price}</div>
              <p>{tier.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
