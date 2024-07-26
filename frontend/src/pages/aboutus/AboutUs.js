import React from 'react';
import './AboutUs.css'; // Assuming you have the CSS in a separate file
import founderimg from '../../assets/images/IMG_8323.jpg';
import MGD from '../../assets/images/MGD.png';                
export const AboutUs = () => {
  return (
    <div>
      <section className="content-aboutus">
        <h2>About Us</h2>
        <i className="fas fa-book-open book-icon"></i>
        <div className="img-format">
          <img src={founderimg} alt="Founder" width="300" height="400" />
         
        </div>
        <p className="founder">Founder</p>
        <p>My Untold Stories is an online community where people from all walks of life can share their previously unspoken experiences. We understand the difficulty of opening up, especially if you've been silenced by family or cultural pressures. Our goal is to provide a safe space where you can freely express yourself and connect with others who can relate to your journey.</p>
        <div className='MGD'>
          <p className="book_title">My Grandmother's Diaries</p>
          <p>I wrote a book highlighting my grandmother's struggles and successes growing up as the daughter of a judge in India. Every story encapsulates an individual's unique perspective and emotions. By sharing these stories within a community, we can connect diverse people and allow our narratives to reach a broader audience, fostering understanding and unity!</p>
          <a href="https://a.co/d/bKtnlGv" target="_blank" rel="noopener noreferrer">
  <img src={MGD} alt="My Grandmother's Diaries" width="300" />
</a>
        </div>
      </section>
    </div>
  );
};
