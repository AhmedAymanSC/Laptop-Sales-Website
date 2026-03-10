import React from "react";
import './AboutProj.css'
import laptopImage from '../images/Homebg.jpg';

function AboutProj(){
    return(<>

<div className="about-project-container">
      <div className="about-project-left">
        <h2>About This Project</h2>
        <p>
          Welcome to the Laptop E-commerce platform! This project was built using React to showcase an online store
          that sells a variety of laptops for different needs, including gaming, business, and budget-friendly options.
          Users can browse through various laptops, add them to their cart, and proceed to checkout. The main goal is to
          provide an intuitive and seamless shopping experience for laptop buyers.
        </p>
        
        

        <h3>Technologies Used</h3>
        <p>
          The project is built using React for the frontend. For routing, we use `react-router-dom`, and data fetching is
          done with `axios`. The project is designed to be fully responsive, with simple styling for an easy user
          experience.
        </p>
      </div>

      <div className="about-project-right">
      <img src={laptopImage} alt="Laptop E-commerce" />
      </div>
    </div>
    
    </>)
}
export default AboutProj;