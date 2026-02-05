import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import aboutImage from "../../assets/about.png"
import servicePhoto from "../../assets/a-photo-of-a-clean-bright-office-setting_m4_4ai0-SV2KjF8Lscj0WA_GV6_BveTQ0i4wBnTLBVKmQ.jpeg"
import servicePhoto2 from "../../assets/a-realistic-slider-image-representing-mo_Oz4-JYMuSM6ZM2vaRGaCPg_GV6_BveTQ0i4wBnTLBVKmQ.jpeg"
import "./About.css"

export default function About() {
    return (
        <>
            <div className="container-fluid p-0">
                <Header />
                <div className="container-fluid">
                    <div className="hero d-flex justify-content-center align-items-center">
                    <div className="image move">
                            <img className='w-100' src={aboutImage} alt="" />
                        </div>
                        <div className="info">
                            <h1>About Us</h1>
                            <p className='special-paragraph'>We are a passionate team of university students who came together for our graduation project with one goal in mind — to make job searching and hiring faster, easier, and more efficient for everyone. Our project, Jobify, is a modern job portal platform designed to connect job seekers and employers in a smart, user-friendly way.

                            With Jobify, job seekers can quickly find opportunities that match their skills and interests, while employers can post jobs and discover the right candidates without the usual hassle. We focused on creating a clean, responsive design and a smooth user experience to ensure that both sides of the hiring process are supported.

                            This project represents months of dedication, collaboration, and a shared vision to solve real-world problems through technology. We're proud to present Jobify as a reliable, practical tool that helps bridge the gap between talent and opportunity.
                            </p>
                            <Link  to={"/login"}>Contact Us</Link>
                        </div>
                    </div>
                    <div className="service d-flex">
                        <div className="image w-50">
                            <img className='w-100' src={servicePhoto} alt="" />
                        </div>
                        <div className="image w-50">
                            <img className='w-100' src={servicePhoto2} alt="" />
                        </div>
                    </div>
                    <div className="theproperties">
                        <h2>Properties</h2>
                        <div className="properties">
                        <div className="property">
                            <i className="fa-solid fa-earth-americas"></i>
                            <div className="inf">
                                <h3>Globally</h3>
                                <p>You can use it in any country in the world</p>
                            </div>
                        </div>
                        <div className="property">
                            <div className='proper'>
                            <i class="fa-solid fa-x"></i>
                            <i class="fa-solid fa-dollar-sign"></i>
                            </div>
                            <div className="inf">
                                <h3>Free</h3>
                                <p>You're not forced to subscribe in paid plans to get better chances for getting jobs</p>
                            </div>
                        </div>
                        <div className="property">
                            <i class="fa-solid fa-thumbs-up"></i>
                            <div className="inf">
                                <h3>New</h3>
                                <p>You don't worry about competitors</p>
                            </div>
                            
                        </div>
                        <div className="property">
                        <i class="fa-solid fa-person-chalkboard"></i>
                        <div className="inf">
                            <h3>Communication</h3>
                            <p>Due to the limited number of users comparing to other similar platforms, you can contact with us easily and fast</p>
                        </div>
                        </div>
                        
                            
                        </div>
                    </div>
                    <div className="theproperties">
                        <h2>Services</h2>
                        <div className="properties">
                        <div className="property">
                        <i class="fa-solid fa-laptop"></i>
                            <div className="inf">
                                <h3>Post Jobs</h3>
                                <p>Employers can post jobs easily</p>
                            </div>
                        </div>
                        <div className="property">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <div className="inf">
                                <h3>Filter By Search</h3>
                                <p>User can search for the needed job and filter the results would help them</p>
                            </div>
                        </div>
                        <div className="property">
                        <i class="fa-solid fa-file"></i>
                            <div className="inf">
                                <h3>CV Creation</h3>
                                <p>We offer CV Creation page to help you reach fast and save your time because we care about you</p>
                            </div>
                        </div>
                        <div className="property">
                        <i class="fa-solid fa-gauge-simple-high"></i>
                            <div className="inf">
                                <h3>Internet Speed</h3>
                                <p>You can check your internet speed if the processes are waiting too much in its page</p>
                            </div>
                            
                        </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
