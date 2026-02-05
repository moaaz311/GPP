import React, { useContext } from 'react'
import "./Header.css"
import Logo from "../../assets/1745237649662.png"
import { Link, NavLink } from 'react-router-dom'
import { TheUserContext } from '../UserContext/UserContext'

export default function Header() {
    const {
        userData,
        setUserData,
        compImage,
        handleSearch,
        setSelectedCategory
    } = useContext(TheUserContext);
    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid d-flex ">
                    <NavLink className="navbar-brand" to={"/"}>
                        <div className="logo image">
                            <img src={Logo} className='w-100 rounded' alt="Jobify" />
                        </div>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "active-link nav-link" : "nav-link"} to={"/"}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "active-link nav-link" : "nav-link"} to={"/about"}>About</NavLink>
                            </li>

                            {userData !== null && (
                                <>
                                    <li className="nav-item dropdown">
                                        <NavLink className={({ isActive }) => isActive ? "active-link nav-link dropdown-toggle" : "nav-link dropdown-toggle"} to={"/alljobs"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            All Jobs
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link className='dropdown-item' to={"/alljobs"} onClick={() => setSelectedCategory("")}>All Jobs</Link>
                                            </li>
                                            <li>
                                                <Link className='dropdown-item' to={"/alljobs"} onClick={() => setSelectedCategory("IT")}>IT</Link>
                                            </li>
                                            <li>
                                                <Link className='dropdown-item' to={"/alljobs"} onClick={() => setSelectedCategory("Medicine")}>Medicine</Link>
                                            </li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li>
                                                <Link className='dropdown-item' to={"/alljobs"} onClick={() => setSelectedCategory("Engineering")}>Engineering</Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink className={({ isActive }) => isActive ? "active-link nav-link" : "nav-link"} to={"/cvbuilder"}>CV creation</NavLink>
                                    </li>
                                </>
                            )}

                            {userData === null && (
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => isActive ? "active-link nav-link" : "nav-link"} to={"/login"}>Contact Us</NavLink>
                                </li>
                            )}
                        </ul>

                        <form className="d-flex" role="search" onSubmit={handleSearch}>
                            <input name="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn custom-btn" type="submit">Search</button>
                        </form>

                        <ul className='p-0 m-0 px-2 d-flex justify-content-center align-items-center gap-2 list-unstyled' id='thelist'>
                                                       {userData !== null ? (
    userData.role === "Employee" ? (
        <>
            <li>
                <Link to="/employeepage">
                    <i className="fa-solid fa-heart"></i>
                </Link>
            </li>
        </>
    ) : (
        <>
            
        </>
    )
) : (
    <li>
        <NavLink className="the-nav" to="/login">
            <li><i className="fa-solid fa-heart"></i></li>
        </NavLink>
    </li>
)}

                           {userData !== null ? (
    userData.role === "Employee" ? (
        <>
            <li>
                <Link to="/employeepage">
                    <div className="image">
                        <img src={compImage} className="w-100" alt="Company" />
                    </div>
                </Link>
            </li>
            <li onClick={() => setUserData(null)}>
                <i className="fa-solid fa-person-through-window"></i>
            </li>
        </>
    ) : (
        <>
            <li>
                <Link to="/companypage">
                    <div className="image">
                        <img src={compImage} className="w-100" alt="Company" />
                    </div>
                </Link>
            </li>
            <li onClick={() => setUserData(null)}>
                <i className="fa-solid fa-person-through-window"></i>
            </li>
        </>
    )
) : (
    <li>
        <NavLink className="the-nav" to="/login">
            <i className="fa-solid fa-user-tie"></i>
        </NavLink>
    </li>
)}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
