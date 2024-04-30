import React from "react";
import Header from "../../components/header/DeanHeader";

const Deandashboard = () => {
  const deanData = JSON.parse(localStorage.getItem('auth'));
  // console.log(deanData.auth.name)

  return (
    <>
      <Header />
      <section className="home" id="home">
        <div className="image">
          <img src="/hospital1.png" alt="img" />
        </div>
        <div className="content">
          <h3>Hi.... <span> Dean {deanData.auth.name}</span></h3>
          <h3>stay safe, stay healthy</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
            voluptatibus esse maxime culpa placeat commodi dignissimos doloribus
            eaque id aliquam. Vel laboriosam delectus esse quam assumenda fuga
            praesentium dicta cumque!
          </p>
          <a href="#nothing" className="btn">
            contact us<span className="fas fa-chevron-right"></span>
          </a>
        </div>
      </section>
      <div className="icons-container">
        <div className="icons">
          <i className="fas fa-user-md"></i>
          <h3>140+</h3>
          <p>Doctors at work</p>
        </div>
        <div className="icons">
          <i className="fas fa-users"></i>
          <h3>10Lakh +</h3>
          <p>Satisfied patients</p>
        </div>
        <div className="icons">
          <i className="fas fa-procedures"></i>
          <h3>500+</h3>
          <p>Bed facility</p>
        </div>
        <div className="icons">
          <i className="fas fa-hospital"></i>
          <h3>50+</h3>
          <p>Hospital available</p>
        </div>
      </div>
    
    </>
  );
};

export default Deandashboard;
