import React, {  } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import "./NotFound.css"
import notfoundImage from "../../assets/b4018af0-78fe-40a6-9d25-3fb576134e1d_removalai_preview.png"
export default function NotFound({userData}) {
    return (
        <div className="container-fluid p-0">
            <Header userData={userData} />
            <div className="container-fluid">
                <div className="notfound">
                    <div className="image">
                        <img className='w-100' src={notfoundImage} alt="" />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
