import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import "./RegisterState.css"
import { Link } from 'react-router-dom'

export default function RegisterState() {
    return (
        <>
            <div className="container-fluid p-0">
                <Header />
                <div className="container-fluid">
                    <div className="hero d-flex flex-column align-items-center justify-conent-center gap-4">
                        <Link className='stateRegis' to={"/registeremployee"}>Sign Up As An Employee?</Link>
                        <Link className='stateRegis' to={"/registeremployer"}>Sign Up As A Company?</Link>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
