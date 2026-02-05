import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "../Login/Login.css";
import "./RegisterEmployee.css";
import loginImage from "../../assets/0002_1_explore-how-the-fast-paced-digital-revol_41pgg1YCT6WgD7h_l4EPKQ_CBbx0yxyRnirBWGDA1nx3g_cover.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
export default function RegisterEmployee() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    let [messageError, setMessageErro] = useState('');

    useEffect(() => {
        console.log("Loading state changed:", isLoading);
    }, [isLoading]);

    async function handleRegisterEmployee(values) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("FullName", values.FullName);
        formData.append("Email", values.Email);
        formData.append("Password", values.Password);
        formData.append("image", values.image);

        // Log only readable data
        console.log("FormData being sent:", {
            FullName: values.FullName,
            Email: values.Email,
            Password: values.Password,
            imageName: values.image?.name,
        });

        try {
            const { data } = await axios.post(
                `https://localhost:7209/api/Employee/register`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setMessageErro(`${data}`);

            console.log("API response:", data);

            if (data === "Employee registered successfully.") {
                navigate("/login")
            }
        } catch (error) {
            console.log("Server returned:", JSON.stringify(error));
            setMessageErro("Error: Something went wrong during registration.");
        } finally {
            setIsLoading(false);
        }
    }

    const validation = Yup.object({
        FullName: Yup.string()
            .required("FullName is required")
            .min(6, "minimum length is 6")
            .max(30, "maximum length is 30, you can try your nick name instead!"),
        Email: Yup.string()
            .required("Email is required")
            .email("Email is not valid!"),
        Password: Yup.string()
            .required("Password is required")
            .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase..."),
    });

    const formik = useFormik({
        initialValues: {
            FullName: "",
            Email: "",
            Password: "",
            image: "",
        },
        validationSchema: validation,
        onSubmit: handleRegisterEmployee,
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
                            <h3 className='fs-2'>Sign Up As An Employee</h3>
                            {messageError && (
                                <div className="alert alert-danger">
                                    {messageError}
                                </div>
                            )}
                            <p className='text-start fs-6'>Enter your details below</p>
                        </div>
                        <form
                            className='w-100 d-flex flex-column align-items-center justify-content-center'
                            onSubmit={formik.handleSubmit}
                        >
                            {/* FullName */}
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className='input-data m-4'
                                type="text"
                                name="FullName"
                                id="FullName"
                                value={formik.values.FullName}
                                placeholder='FullName'
                            />
                            {formik.errors.FullName && formik.touched.FullName && (
                                <div className="alert alert-danger w-50">
                                    {String(formik.errors.FullName)}
                                </div>
                            )}

                            {/* Email */}
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className='input-data m-4'
                                type="email"
                                name="Email"
                                id="Email"
                                value={formik.values.Email}
                                placeholder='Enter your Email'
                            />
                            {formik.errors.Email && formik.touched.Email && (
                                <div className="alert alert-danger w-50">
                                    {String(formik.errors.Email)}
                                </div>
                            )}

                            {/* Password */}
                            <input
                                autoComplete="current-password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className='input-data m-4'
                                type="password"
                                name="Password"
                                id="Password"
                                value={formik.values.Password}
                                placeholder='Password'
                            />
                            {formik.errors.Password && formik.touched.Password && (
                                <div className="alert alert-danger w-50">
                                    {String(formik.errors.Password)}
                                </div>
                            )}

                            {/* Image Upload */}
                            <input
                                className='input-data m-4'
                                onChange={(event) => {
                                    formik.setFieldValue("image", event.currentTarget.files[0]);
                                }}
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                            />

                            {/* Submit Button */}
                            <div className="inf_btn">
                                {isLoading ? (
                                    <button className='regist-hero' type='button'>
                                        <div>Loading...</div>
                                    </button>
                                ) : (
                                    <button
                                        disabled={!(formik.isValid && formik.dirty)}
                                        className='regist-hero'
                                        type='submit'
                                    >
                                        Sign Up
                                    </button>
                                )}
                                <Link id='link-to-register' to={"/register"}>Are you a company?</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
