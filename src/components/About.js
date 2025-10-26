import React, { useEffect, useRef } from 'react';

const About = () => {
  const aboutRef = useRef(null);

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

    const elements = aboutRef.current?.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title fade-in">Meet Your Instructor</h2>
        <div className="about-content" ref={aboutRef}>
          <div className="about-text slide-in-left">
            <h2>Swati Dey</h2>
            <div className="instructor-title">Masters in Yoga</div>
            <p>
              With years of dedicated practice and study, Swati brings deep knowledge and 
              compassionate guidance to every class. Her approach combines traditional yoga 
              philosophy with modern teaching methods, creating a transformative experience 
              for students of all levels.
            </p>
            <p>
              Swati's teaching style emphasizes proper alignment, mindful breathing, and 
              the integration of yoga principles into daily life. She is committed to 
              helping each student discover their own unique path through yoga.
            </p>
            <p>
              Her expertise in one-to-one instruction ensures personalized attention and 
              guidance tailored to each student's individual needs and goals.
            </p>
          </div>
          <div className="instructor-info slide-in-right">
            <div className="instructor-name">Swati Dey</div>
            <div className="instructor-title">Masters in Yoga</div>
            <p>
              With years of dedicated practice and study, Swati brings deep knowledge and 
              compassionate guidance to every class. Her approach combines traditional yoga 
              philosophy with modern teaching methods, creating a transformative experience 
              for students of all levels.
            </p>
            <p>
              Swati's teaching style emphasizes proper alignment, mindful breathing, and 
              the integration of yoga principles into daily life. She is committed to 
              helping each student discover their own unique path through yoga.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
