import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./Footer.css"
import Logo from "../../assets/1745237649662.png"
import { useContext } from 'react'
import { TheUserContext } from '../UserContext/UserContext'
export default function Footer() {
    const {userData} = useContext(TheUserContext);
    return (
        <>
            <footer>
                <div className="container-fluid">
                    <div className="lists d-flex justify-content-between align-items-center">
                        <ul className='list' style={{width:"30%"}}>
                            <li><Link><div className="image"><img className='logo' src={Logo} alt="" /></div></Link></li>
                            <li>Your fastest way to find your job easily and <Link to={"/jobdetails"}>applying</Link> for it without worrying about competitors</li>
                            <li>copy rights <i className="fa-solid fa-copyright"></i></li>
                            <li className='follow pt-4'>
                            <h6 className='pb-2'>Follow Us</h6>
                        <div className="icons d-flex justify-content-start align-items-center gap-3">
                            <i className="fa-brands fa-facebook-f"></i>
                            <i className="fa-brands fa-youtube"></i>
                            <i className="fa-brands fa-twitter"></i>
                            <i className="fa-brands fa-linkedin"></i>
                            <i className="fa-brands fa-instagram"></i>
                        </div>
                            </li>
                        </ul>
                        <ul className='list'>
                            <li>Links</li>
                            <li className="">
                            <Link  aria-current="page" to={"/"}>Home</Link>
                            </li>
                            <li className="">
                            <Link  aria-current="page" to={"/about"}>About</Link>
                            </li>
                            <li className="">
                            <Link  aria-current="page" to={"/alljobs"}>Alljobs</Link>
                            </li>
                            <li className="">
                            <Link  aria-current="page" to={"/login"}>Login</Link>
                            </li>
                            <li className="">
                            <Link  aria-current="page" to={"/registeremployer"}>Sign up Company</Link>
                            </li>
                            <li className="">
                            <Link  aria-current="page" to={"/registeremployee"}>Sign up Employee</Link>
                            </li>
                            <li className="">
                            <Link  aria-current="page" to={"/cvbuilder"}>CV Creation</Link>
                            </li>
                        </ul>
                        <ul className='list'>
                            <li>User Area</li>
                            {userData !== null ? (
                                userData.role === "Employee" ? (
                                    <li className="">
                                    <Link aria-current="page" to={"/employeepage"}>My Account</Link>
                                    </li>
                                ) : (
                                    <li className="">
                                    <Link aria-current="page" to={"/companypage"}>My Account</Link>
                                    </li>
                                )
                                ) : (
                                <li className="">
                                    <Link aria-current="page" to={"/"}>My Account</Link>
                                </li>
                                )}
                            <li className="">
                            <Link aria-current="page" >Whishlists</Link>
                            </li>
                        
                            <li className="">
                            <Link aria-current="page">terms</Link>
                            </li>
                        </ul>
                        <ul className='list'>
                            <li>Policies</li>
                            <li className="">
                            <Link aria-current="page" >Privacy statement</Link>
                            </li>
                            <li className="">
                            <Link aria-current="page">Cookies</Link>
                            </li>
                            <li className="">
                            <Link aria-current="page">Supplier code of conduct</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}
