import React, { useContext, } from 'react';
import Header from '../Header/Header';
import "./Home.css";
import heroImage from "../../assets/ChatGPT Image Apr 21, 2025, 01_11_05 PM.png";
import contactImage from "../../assets/contact.jpeg";
import Trendings from '../Trendings/Trendings';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { TheUserContext } from '../UserContext/UserContext';

export default function Home() {
    const {searchQuery, handleSearch} = useContext(TheUserContext)

  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="container-fluid">
        <div className="hero d-flex justify-content-center align-items-center">
          <div className="info">
            <h2>Welcome to the Job<span>Portal</span></h2>
            <p>Your fastest way to find your job easily and applying for it without worrying about competitors <i className="fa-solid fa-person-running"></i></p>
            <form
              className="d-flex align-items-center bg-white p-3 rounded"
              role="search"
              onSubmit={handleSearch}
            >
              <label htmlFor="search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </label>
              <input
                className="me-2"
                type="search"
                id="search"
                name="search"
                placeholder="Get your job now"
                aria-label="Search"
              />
              <button className="btn custom-btn active-link btn2" type="submit">
                <span>Search</span>
              </button>
            </form>
          </div>
          <div className="image">
            <img className="w-100" src={heroImage} alt="" />
          </div>
        </div>

        <div className="trendings">
          <h2>Our Popular ideal jobs</h2>
          <p>Find your suitable job in the most popular jobs that are trending now </p>
          <Trendings number={12} search={searchQuery} />
        </div>

        <div className="hero d-flex justify-content-center align-items-center">
          <div className="image">
            <img className="w-100" src={contactImage} alt="" />
          </div>
          <div className="info">
            <h2>How to Contact <span>Us?</span></h2>
            <p style={{ cursor: "auto", width: "80%" }}>
              Have a question or need assistance? Log in to your account and reach out — we're here to help!
            </p>
            <form action="">
              <Link className="btn custom-btn active-link btn2" to={"/login"} type="submit">
                <span>Login</span>
              </Link>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
