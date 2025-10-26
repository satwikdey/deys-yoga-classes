import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef(null);

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

    const elements = heroRef.current?.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="yoga-animation-bg">
        <img 
          src="/yoga-animation-1.svg" 
          alt="Yoga Animation" 
          style={{ 
            position: 'absolute', 
            top: '10%', 
            right: '5%', 
            width: '200px', 
            height: '200px',
            opacity: 0.1,
            animation: 'float 6s ease-in-out infinite'
          }} 
        />
        <img 
          src="/yoga-animation-2.svg" 
          alt="Yoga Animation" 
          style={{ 
            position: 'absolute', 
            bottom: '20%', 
            left: '10%', 
            width: '150px', 
            height: '150px',
            opacity: 0.08,
            animation: 'float 8s ease-in-out infinite reverse'
          }} 
        />
        <img 
          src="/yoga-animation-3.svg" 
          alt="Yoga Animation" 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            right: '15%', 
            width: '120px', 
            height: '120px',
            opacity: 0.06,
            animation: 'float 10s ease-in-out infinite'
          }} 
        />
        <img 
          src="/yoga-animation-4.svg" 
          alt="Yoga Animation" 
          style={{ 
            position: 'absolute', 
            top: '30%', 
            left: '5%', 
            width: '100px', 
            height: '100px',
            opacity: 0.05,
            animation: 'float 12s ease-in-out infinite reverse'
          }} 
        />
        <img 
          src="/yoga-animation-5.svg" 
          alt="Yoga Animation" 
          style={{ 
            position: 'absolute', 
            bottom: '10%', 
            right: '20%', 
            width: '80px', 
            height: '80px',
            opacity: 0.04,
            animation: 'float 14s ease-in-out infinite'
          }} 
        />
        <img 
          src="/yoga-animation-6.svg" 
          alt="Yoga Animation" 
          style={{ 
            position: 'absolute', 
            top: '70%', 
            left: '20%', 
            width: '90px', 
            height: '90px',
            opacity: 0.03,
            animation: 'float 16s ease-in-out infinite reverse'
          }} 
        />
      </div>
      <div className="container">
        <div className="hero-content" ref={heroRef}>
          <div className="hero-text">
            <h1 className="fade-in">Find Your Inner Balance</h1>
            <p className="fade-in">
              Personalized One-to-One Yoga Classes for Women with Swati Dey (Online & Offline)
            </p>
            <div className="hero-buttons fade-in">
              <button 
                className="btn" 
                onClick={() => scrollToSection('contact')}
              >
                Book a Class
              </button>
              <button 
                className="btn btn-outline" 
                onClick={() => scrollToSection('about')}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-image slide-in-right">
            <img 
              src="/IMG-20250907-WA0015.jpg" 
              alt="Yoga Practice" 
              style={{ width: '100%', height: 'auto', maxWidth: '500px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
