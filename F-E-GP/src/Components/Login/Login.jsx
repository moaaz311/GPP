import React , { useState, useEffect, useContext }from 'react'
import { TheUserContext } from '../UserContext/UserContext'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import "./Login.css"
import loginImage from "../../assets/0002_1_explore-how-the-fast-paced-digital-revol_41pgg1YCT6WgD7h_l4EPKQ_CBbx0yxyRnirBWGDA1nx3g_cover.jpeg"
import { Link, useNavigate } from 'react-router-dom'
import "../RegisterEmployee/RegisterEmployee.css";
import { useFormik } from 'formik';
// import { useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import axios from 'axios';
export default function Login() {
    const {saveUserData,compImage,setCompImage} = useContext(TheUserContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    let [messageError, setMessageErro] = useState('');
    let [userType, setUserType] = useState("");
    let [userImage,setuserImage] = useState("");
    useEffect(() => {
    console.log("Loading state changed:", isLoading);
}, [isLoading]);

useEffect(() => {
    if (compImage) {
        console.log("Updated company image:", compImage);
    }
}, [compImage]);


    function getUserType(event) {
        const value = event.target.value;
        setUserType(value);
        if (value === "Employee") {
            setuserImage("GetEmployeeImage");
        } else if (value === "Companies") {
            setuserImage("GetCompanyImage");
        }
    }
    async function handleLogin(values) {
        setIsLoading(true);
    
        try {
            const { data } = await axios.post(
                `https://localhost:7209/api/${userType}/login`,
                {
                    email: values.email,
                    password: values.password
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setMessageErro(`${data}`);
    
            console.log("API response:", data);
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user)); // لو عايز تخزن بيانات المستخدم كمان
                if (data.company?.companyId) {
                    localStorage.setItem("company-id", data.company.companyId);
                    getImage(data.company.companyId); // use data directly instead of localStorage
                }else if (data.user?.employeeId){
                    localStorage.setItem("employee-id", data.user.employeeId);
                    getImage(data.user.employeeId);
                }
                saveUserData();
                                // ✅ لو بتستخدم useNavigate
                navigate("/");
            } else {
                setMessageErro("Login failed: No token received.");
            }
            
        } catch (error) {
            console.log("Server returned:", JSON.stringify(error));
            setMessageErro(JSON.stringify(error));
        } finally {
            setIsLoading(false);
        }
    }
    async function getImage(compId) {
        try {
            const response = await axios.get(
                `https://localhost:7209/api/${userType}/${compId}/${userImage}`,
                {
                    responseType: 'blob', // مهم جداً
                }
            );
            // تحويل الصورة لشيء يمكن استخدامه كـ src في <img>
            const imageUrl = URL.createObjectURL(response.data);
            setCompImage(imageUrl);
            console.log("Image URL:", imageUrl);
            return imageUrl;
        } catch (error) {
            console.log("Server returned:", error.response?.data || error.message);
            alert("Something went wrong. Please try again.");
            return null;
        }
}
    const validation = Yup.object({
        email: Yup.string()
            .required("Email is required")
            .email("Email is not valid!"),
        password: Yup.string()
            .required("Password is required")
            .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase..."),
    });
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validation,
        onSubmit: handleLogin,
    });
    return (
        <div className="container-fluid p-0">
            <Header  />
            <div className="container-fluid">
                <div className="hero d-flex justify-content-center align-items-center gap-4">
                    <div className="image">
                        <img className='w-100' src={loginImage} alt="" />
                    </div>
                    <div className="info d-flex flex-column align-items-center justify-content-center gap-5">
                    <div className="inf w-50">
                            <h3 className='fs-2'>Log in to Exclusive</h3>
                            {messageError && (
                                <div className="alert alert-danger">
                                    {messageError}
                                </div>
                            )}
                        <p className='text-start fs-6'>Enter you details below</p>
                        </div>
                        <form
                            className='w-100 d-flex flex-column align-items-center justify-content-center'
                            onSubmit={formik.handleSubmit}>
                                {/* Email */}
                                <input
                                    onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        className='input-data m-4'
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        value={formik.values.email}
                                                        placeholder='Enter your Email'
                                />
                                {formik.errors.email && formik.touched.email && (
                                                        <div className="alert alert-danger w-50">
                                                            {String(formik.errors.email)}
                                                        </div>
                                )}
                        
                                {/* Password */}
                                <input
                                    autoComplete="current-password"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        className='input-data m-4'
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        value={formik.values.Password}
                                                        placeholder='Password'
                                />
                                {formik.errors.password && formik.touched.password && (
                                <div className="alert alert-danger w-50">
                                    {String(formik.errors.password)}
                                </div>
                            )}
                            {/* user type */}
                            <div className="type d-flex justify-conent-center align-items-center gap-3">
                                <p className="m-0">User: </p>

                                <div className="employee">
                                    <label htmlFor="employee">Employee</label>
                                    <input
                                    type="radio"
                                    name="user"
                                    value="Employee"
                                    id="employee"
                                    checked={userType === "Employee"}
                                    onChange={getUserType}
                                    />
                                </div>

                                <div className="company">
                                    <label htmlFor="company">Company</label>
                                    <input
                                    type="radio"
                                    name="user"
                                    value="Companies"
                                    id="company"
                                    checked={userType === "Companies"}
                                    onChange={getUserType}

                                    />
                                </div>
                                </div>
                                {/* Submit Button */}
                                <div className="inf_btn">
                                                        {isLoading ? (
                                                            <button className='regist-hero' type='button'>
                                                                <div>Loadin...</div>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                disabled={!(formik.isValid && formik.dirty)}
                                                                className='regist-hero'
                                                                type='submit'
                                                            >
                                                                Login
                                                            </button>
                                                        )}
                                                        <Link id='link-to-register' to={"/register"}>Don't have an account?</Link>
                                </div>
                            </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
