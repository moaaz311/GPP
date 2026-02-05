import React, { useContext, useEffect, useState } from "react";
import "./EmployeePage.css";
import { TheUserContext } from "../UserContext/UserContext";
import { NavLink } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// استيراد الصور
import forntend from "../../assets/front-end.jpeg";
import backend from "../../assets/backend.jpeg";
import project from "../../assets/project.jpeg";
import civil from "../../assets/civil.jpeg";
import designer from "../../assets/designer.jpeg";
import architect1 from "../../assets/architecture.jpeg";
import architect2 from "../../assets/architecture2.jpeg";
import network from "../../assets/Network.jpeg";
import doctor from "../../assets/doctor.jpeg";
import nurse from "../../assets/nurse.jpeg";
import mechanical from "../../assets/mechanical.jpeg";
import server from "../../assets/Server.jpeg";
import generic from "../../assets/ChatGPT Image Apr 21, 2025, 11_43_09 AM.png";
import axios from "axios";

const imageMap = {
  frontend: forntend,
  front: forntend,
  backend: backend,
  project: project,
  civil: civil,
  designer: designer,
  architecture: architect1,
  architect: architect2,
  network: network,
  doctor: doctor,
  nurse: nurse,
  mechanical: mechanical,
  server: server,
};

const normalizeString = (str) => str.toLowerCase().replace(/[\s-]/g, "");

const getImageForJob = (title) => {
  const normalizedTitle = normalizeString(title);
  for (const keyword in imageMap) {
    if (normalizedTitle.includes(normalizeString(keyword))) {
      return imageMap[keyword];
    }
  }
  return generic;
};
export default function EmployeePage() {
  const { userData, likedJobs,toggleLikeJob } = useContext(TheUserContext);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchEmployeeImage = async () => {
      const employeeId = localStorage.getItem("employee-id");
      if (!employeeId) {
        console.error("Employee ID not found in localStorage");
        return;
      }

      try {
        const response = await axios.get(
          `https://localhost:7209/api/Employee/${employeeId}/GetEmployeeImage`,
          { responseType: 'blob' }
        );
        const imgBlobUrl = URL.createObjectURL(response.data);
        setImageUrl(imgBlobUrl);
      } catch (error) {
        console.error("Error fetching employee image:", error);
      }
    };

    fetchEmployeeImage();
  }, []);

  return (
    <div className="container-fluid p-0">
      <Header userData={userData} />

      <div className="container-fluid">
        <div className="employee-page text-center py-4">
          <h2>{userData?.name || "Employee"}</h2>

          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Employee"
              className="employee-image mb-3"
              style={{ width: '200px', borderRadius: '50%' }}
            />
          ) : (
            <p>Loading image...</p>
          )}

          <p>{userData?.position}</p>
          <p>{userData?.email}</p>
          <hr />
           {/* Liked Jobs Section */}
      <h2 className="mb-4 text-start">Jobs you liked ❤️</h2>
      {likedJobs.length === 0 ? (
        <p>You haven't liked any jobs yet.</p>
      ) : (
        <div className="trends" style={{ margin: "10px 0" }}>
          {likedJobs.map((job, index) => (
            <div
              key={job.jobId || index}
              className="trend d-flex flex-column align-items-start justify-content-center p-3 bg-white rounded"
            >
              <div className="image w-100">
                <img
                  className="w-100 rounded"
                  src={getImageForJob(job.title)}
                  alt="Job"
                />
              </div>
              <p className="fs-6 text-start pt-2 m-0 text-muted">
                {job.location}
              </p>
              <h2 className="fs-4 p-0 m-0">{job.title}</h2>
              <p className="fs-6 pt-1">{job.salaryRange}</p>
              <p className="fs-6" title={job.description}>
                {job.description}
              </p>
              <div className="inf w-100 d-flex justify-content-between align-items-center">
                <NavLink
                to={"/jobdetails"}
                onClick={() => localStorage.setItem("selectedJobId", job.jobId)}
              >
                <button className="btn custom-btn">Apply</button>
              </NavLink>
                <button
                  onClick={() => toggleLikeJob(job)}
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  <i
                    className={`fa-solid fa-heart ${
                      likedJobs.find((j) => j.jobId === job.jobId)
                        ? "text-danger"
                        : ""
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
