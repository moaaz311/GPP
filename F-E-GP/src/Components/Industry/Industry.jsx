import React, { useState } from 'react'; // ✅ import useState
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "../Login/Login.css";
import "../RegisterEmployee/RegisterEmployee.css";
import loginImage from "../../assets/0002_1_explore-how-the-fast-paced-digital-revol_41pgg1YCT6WgD7h_l4EPKQ_CBbx0yxyRnirBWGDA1nx3g_cover.jpeg";
// import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

export default function Industry() {
    // const navigate = useNavigate();
    // const [submitted, setSubmitted] = useState(false); // ✅ track submission
    const [industryState, setIndustryState] = useState(false);
    const [id, setId] = useState("");
    async function handleIndustry(values) {
        setIndustryState(true);
        console.log("FormData being sent:", { name: values.name });

        try {
            const { data } = await axios.post(
                `https://localhost:7209/api/Companies/AddIndustry?name=${values.name}`,
                { name: values.name },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("API response:", data);
            window.location.reload();
        } catch (error) {
            console.log("Server returned:", error.response?.data || error.message);
            alert("Something went wrong. Please try again.");
        }
    }
    // get industry
    async function getIndustry(values) {
        setIndustryState(false);
        console.log("FormData being sent:", { name: values.name });

        try {
            const { data } = await axios.get(
                `https://localhost:7209/api/Companies/GetAllIndustries`,
            );
            console.log("API response:", data);
            data.forEach((industry) => {
                if(industry.name == values.name && industryState == false) {
                    setId(industry.id);
                }else{
                    setIndustryState(true);
                    handleIndustry;
                }
            })
        } catch (error) {
            console.log("Server returned:", error.response?.data || error.message);
            alert("Something went wrong. Please try again.");
        }
    }
    const validation = Yup.object({
        name: Yup.string()
            .required("Industry name is required")
            .min(2, "Minimum length is 2")
            .max(15, "Maximum length is 15"),
    });
    // define the sybmit state
    function submitHandler(values) {
        if (industryState === false) {
            return getIndustry(values);
        } else {
            return handleIndustry(values);
        }
    }
    const formik = useFormik({
        initialValues: { name: "" },
        validationSchema: validation,
        onSubmit: submitHandler,
    });
    

    return (
        <div className="container-fluid p-0">
            <Header />
            <div className="container-fluid">
                <div className="hero d-flex justify-content-center align-items-center gap-4">
                    <div className="image">
                        <img className='w-100' src={loginImage} alt="login" />
                    </div>
                    <div className="info d-flex flex-column align-items-center justify-content-center gap-5">
                        <div className="inf w-50">
                            <h3 className='fs-2'>Enter your Industry Name</h3>
                            <p className='text-start fs-6'>If your industry is not listed, type it again after the page reload</p>
                        </div>
                        <form
                            className='w-100 d-flex flex-column align-items-center justify-content-center'
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="hero industry input-data">
                                <input
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder='Industry name'
                                    style={{ backgroundColor: "transparent", border: "none" }}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className="text-danger">{formik.errors.name}</div>
                                )}
                                <button type='submit'>
                                    Get Your Industry
                                </button>
                                <div className="info">
                                    <p style={{cursor:"auto"}}>{id}</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
