import React, { useEffect, useRef, useState } from 'react';

const yogaImages = [
  { 
    id: 1, 
    src: "/IMG-20250907-WA0015.jpg", 
    name: "Seated Side Bend", 
    description: "A gentle side stretch that opens the spine and improves flexibility"
  },
  { 
    id: 2, 
    src: "/IMG-20250907-WA0019.jpg", 
    name: "Low Lunge Pose", 
    description: "Strengthens legs and opens hip flexors for better mobility"
  },
  { 
    id: 3, 
    src: "/IMG-20250907-WA0025.jpg", 
    name: "Yoga Practice", 
    description: "Building strength and flexibility through mindful movement"
  },
  { 
    id: 4, 
    src: "/IMG-20250907-WA0047.jpg", 
    name: "Peaceful Practice", 
    description: "Finding inner calm and balance through yoga"
  },
  { 
    id: 5, 
    src: "/IMG-20250907-WA0053.jpg", 
    name: "Mindful Movement", 
    description: "Connecting breath with movement for holistic wellness"
  }
];

const Gallery = () => {
  const galleryRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

    const elements = galleryRef.current?.querySelectorAll('.fade-in, .scale-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
        return (prev + 1) % yogaImages.length;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (index) => {
    if (index === currentImage) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <h2 className="section-title fade-in">Yoga Practice Gallery</h2>
        <p className="fade-in" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.2rem', color: '#3C3C3C' }}>
          Experience the beauty and grace of yoga through these practice moments
        </p>
        
        <div className="gallery-showcase" ref={galleryRef}>
          <div className="main-image-container">
            <div className="main-image">
              <div className={`image-wrapper ${isTransitioning ? 'fading' : ''}`}>
                <img 
                  src={yogaImages[currentImage].src}
                  alt={yogaImages[currentImage].name}
                  className="yoga-practice-image"
                  key={currentImage}
                />
              </div>
              <div className="image-info">
                <h3>{yogaImages[currentImage].name}</h3>
                <p>{yogaImages[currentImage].description}</p>
              </div>
            </div>
          </div>
          
          <div className="image-grid">
            {yogaImages.map((image, index) => (
              <div 
                key={image.id} 
                className={`image-card scale-in ${index === currentImage ? 'active' : ''}`}
                onClick={() => handleImageChange(index)}
              >
                <img 
                  src={image.src}
                  alt={image.name}
                  className="thumbnail-image"
                />
                <div className="card-overlay">
                  <h4>{image.name}</h4>
                </div>
              </div>
            ))}
          </div>
          
          <div className="gallery-dots">
            {yogaImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentImage ? 'active' : ''}`}
                onClick={() => handleImageChange(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
