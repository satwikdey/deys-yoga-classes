import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const yogaImages = [
  {
    id: 1,
    src: '/IMG-20250907-WA0015.jpg',
    name: 'Seated Side Bend',
    description: 'A gentle side stretch that opens the spine and improves flexibility'
  },
  {
    id: 2,
    src: '/IMG-20250907-WA0019.jpg',
    name: 'Low Lunge Pose',
    description: 'Strengthens legs and opens hip flexors for better mobility'
  },
  {
    id: 3,
    src: '/IMG-20250907-WA0025.jpg',
    name: 'Yoga Practice',
    description: 'Building strength and flexibility through mindful movement'
  },
  {
    id: 4,
    src: '/IMG-20250907-WA0047.jpg',
    name: 'Peaceful Practice',
    description: 'Finding inner calm and balance through yoga'
  },
  {
    id: 5,
    src: '/IMG-20250907-WA0053.jpg',
    name: 'Mindful Movement',
    description: 'Connecting breath with movement for holistic wellness'
  }
];

const AUTO_ROTATE_MS = 3400;

const Gallery = () => {
  const galleryRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  const totalImages = yogaImages.length;

  const loopedImages = useMemo(
    () => [yogaImages[totalImages - 1], ...yogaImages, yogaImages[0]],
    [totalImages]
  );

  const getRealIndex = (slideIndex) => {
    return ((slideIndex - 1) % totalImages + totalImages) % totalImages;
  };

  const activeIndex = getRealIndex(currentSlide);
  const activeImage = yogaImages[activeIndex] || yogaImages[0];

  const visibleThumbIndices = useMemo(
    () => [-1, 0, 1].map((offset) => (activeIndex + offset + totalImages) % totalImages),
    [activeIndex, totalImages]
  );

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

    const elements = galleryRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Move to the next slide so images travel right-to-left.
      setCurrentSlide((prev) => prev + 1);
    }, AUTO_ROTATE_MS);

    return () => clearInterval(interval);
  }, []);

  const jumpToSlideWithoutTransition = useCallback((slideNumber) => {
    setIsTransitionEnabled(false);
    setCurrentSlide(slideNumber);

    setTimeout(() => {
      setIsTransitionEnabled(true);
    }, 40);
  }, []);

  useEffect(() => {
    if (currentSlide > totalImages + 1) {
      jumpToSlideWithoutTransition(1);
      return;
    }

    if (currentSlide < 0) {
      jumpToSlideWithoutTransition(totalImages);
    }
  }, [currentSlide, jumpToSlideWithoutTransition, totalImages]);

  const handleSlideTransitionEnd = () => {
    if (currentSlide <= 0) {
      jumpToSlideWithoutTransition(totalImages);
      return;
    }

    if (currentSlide >= totalImages + 1) {
      jumpToSlideWithoutTransition(1);
    }
  };

  const showPreviousImage = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  const showNextImage = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  const handleImageChange = (index) => {
    setCurrentSlide(index + 1);
  };

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <h2 className="section-title fade-in">Yoga Practice Gallery</h2>
        <p className="gallery-intro fade-in">
          Experience the beauty and grace of yoga through these practice moments
        </p>

        <div className="gallery-showcase" ref={galleryRef}>
          <div className="main-image-container fade-in">
            <article className="main-image">
              <div className="carousel-window">
                <div
                  className={`carousel-track ${!isTransitionEnabled ? 'no-transition' : ''}`}
                  style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
                  onTransitionEnd={handleSlideTransitionEnd}
                >
                  {loopedImages.map((image, index) => (
                    <figure className="carousel-slide" key={`${image.id}-${index}`}>
                      <img src={image.src} alt={image.name} className="yoga-practice-image" />
                    </figure>
                  ))}
                </div>

                <button
                  type="button"
                  className="carousel-nav carousel-nav-prev"
                  aria-label="Show previous yoga image"
                  onClick={showPreviousImage}
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="carousel-nav carousel-nav-next"
                  aria-label="Show next yoga image"
                  onClick={showNextImage}
                >
                  Next
                </button>
              </div>

              <div className="image-info">
                <h3>{activeImage.name}</h3>
                <p>{activeImage.description}</p>
              </div>
            </article>
          </div>

          <div className="image-grid fade-in">
            {visibleThumbIndices.map((thumbIndex, position) => {
              const thumbImage = yogaImages[thumbIndex];

              return (
                <button
                  type="button"
                  key={`${thumbImage.id}-${position}`}
                  className={`image-card thumb-${position} ${thumbIndex === activeIndex ? 'active' : ''}`}
                  onClick={() => handleImageChange(thumbIndex)}
                  aria-label={`View ${thumbImage.name}`}
                  aria-pressed={thumbIndex === activeIndex}
                >
                  <img src={thumbImage.src} alt={thumbImage.name} className="thumbnail-image" />
                  <div className="card-overlay">
                    <h4>{thumbImage.name}</h4>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="gallery-dots fade-in">
            {yogaImages.map((image, index) => (
              <button
                type="button"
                key={image.id}
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleImageChange(index)}
                aria-label={`Go to ${image.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
