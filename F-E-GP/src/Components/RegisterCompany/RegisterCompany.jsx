import React, { useState,  } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "../Login/Login.css";
import "../RegisterEmployee/RegisterEmployee.css";
import loginImage from "../../assets/0002_1_explore-how-the-fast-paced-digital-revol_41pgg1YCT6WgD7h_l4EPKQ_CBbx0yxyRnirBWGDA1nx3g_cover.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

export default function RegisterCompany() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    let [messageError, setMessageErro] = useState('');

    async function handleRegisterEmployee(values) {
        console.log("Form submission triggered:", values);

        setIsLoading(true);
        const formData = new FormData();
        formData.append("Name", values.Name);
        formData.append("Email", values.Email);
        formData.append("Password", values.Password);
        formData.append("image", values.image || ""); // fallback to avoid undefined
        formData.append("IndustryId", values.IndustryId);

        try {
            const { data } = await axios.post(
                `https://localhost:7209/api/Companies/Register`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setMessageErro(`${data}`);
            console.log("API response:", data);

            if (data.companyId) {
                localStorage.setItem('company-id', data.companyId);
                navigate("/login");
            }
        } catch (error) {
            console.error("Server returned:", error);
            setMessageErro("Error: Something went wrong during registration.");
        } finally {
            setIsLoading(false);
        }
    }

    const validation = Yup.object({
        Name: Yup.string().required("Name is required").min(6).max(30),
        Email: Yup.string().required("Email is required").email("Invalid email"),
        Password: Yup.string()
            .required("Password is required")
            .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase"),
        IndustryId: Yup.string().required("IndustryId is required"),
    });

    const formik = useFormik({
        initialValues: {
            Name: "",
            Email: "",
            Password: "",
            image: "",
            IndustryId: "",
        },
        validationSchema: validation,
        onSubmit: handleRegisterEmployee,
    });

    return (
        <div className="container-fluid p-0">
            <Header/>
            <div className="container-fluid">
                <div className="hero d-flex justify-content-center align-items-center gap-4">
                    <div className="image">
                        <img className='w-100' src={loginImage} alt="login" />
                    </div>
                    <div className="info d-flex flex-column align-items-center justify-content-center gap-5">
                        <div className="inf w-50">
                            <h3 className='fs-2'>Sign Up As A Company</h3>
                            {messageError && <div className="alert alert-danger">{messageError}</div>}
                            <p className='text-start fs-6'>Enter your details below</p>
                        </div>
                        <form className='w-100 d-flex flex-column align-items-center justify-content-center'
                            onSubmit={formik.handleSubmit}>

                            {/* Optional: Debug info */}
                            {/* <pre>{JSON.stringify(formik.errors, null, 2)}</pre> */}

                            <div className="industry" style={{ border: "none" }}>
                                <Link className='w-100' to={"/industry"}>Get Your IndustryId</Link>
                            </div>
                            {/* Name */}
                            <input className='input-data m-4' type="text" name="Name" placeholder='Name'
                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                                value={formik.values.Name} />
                            {formik.touched.Name && formik.errors.Name &&
                                <div className="alert alert-danger w-50">{formik.errors.Name}</div>}

                            <input className='input-data m-4' type="email" name="Email" placeholder='Email'
                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                                value={formik.values.Email} />
                            {formik.touched.Email && formik.errors.Email &&
                                <div className="alert alert-danger w-50">{formik.errors.Email}</div>}

                            <input className='input-data m-4' type="password" name="Password" placeholder='Password'
                                autoComplete="current-password"
                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                                value={formik.values.Password} />
                            {formik.touched.Password && formik.errors.Password &&
                                <div className="alert alert-danger w-50">{formik.errors.Password}</div>}

                            <input className='input-data m-4' type="file" name="image" accept="image/*"
                                onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])} />

                            <input className='input-data m-4' type="text" name="IndustryId" placeholder='Enter Industry UUID'
                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                                value={formik.values.IndustryId} />
                            {formik.touched.IndustryId && formik.errors.IndustryId &&
                                <div className="alert alert-danger w-50">{formik.errors.IndustryId}</div>}

                            <div className="inf_btn">
                                {isLoading ? (
                                    <button className='regist-hero' type='button'>Loading...</button>
                                ) : (
                                    <button className='regist-hero' type='submit'>Sign Up</button> // disabled removed
                                )}
                                <Link id='link-to-register' to={"/register"}>Are you an employee?</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
