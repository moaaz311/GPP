import React, { useContext } from "react";
import "./Trendings.css";
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
import { TheUserContext } from "../UserContext/UserContext";
import { NavLink } from "react-router-dom";

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

export default function Trendings({ number = 12, search = "" }) {
  
  const {
    jobs,
    isJobsLoading,
    jobsError,
    filterByCategory,
    selectedCategory,
    likedJobs,
    toggleLikeJob, // ✅ نستخدمها من context
  } = useContext(TheUserContext);

  // فلترة بالبحث
  const filteredBySearch = jobs.filter((job) => {
    const searchText = search.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchText) ||
      job.description.toLowerCase().includes(searchText)
    );
  });

  // فلترة بالكَاتيجوري من الـ context
  const finalFilteredJobs = filterByCategory(filteredBySearch, selectedCategory);

  const getImageForJob = (title) => {
    const normalizedTitle = normalizeString(title);
    for (const keyword in imageMap) {
      if (normalizedTitle.includes(normalizeString(keyword))) {
        return imageMap[keyword];
      }
    }
    return generic;
  };

  localStorage.setItem("numberJobs", jobs.length);

  return (
    <div className="trends" style={{ margin: "10px 0" }}>
      {isJobsLoading && <p>Loading jobs...</p>}
      {jobsError && <p className="text-danger">{jobsError}</p>}
      {finalFilteredJobs.slice(0, number).map((job, index) => (
        <div
          key={job.jobId || index}
          className="trend d-flex flex-column align-items-start justify-content-center p-3 bg-white rounded"
        >
          <div className="image w-100">
            <img className="w-100 rounded" src={getImageForJob(job.title)} alt="Job" />
          </div>
          <p className="fs-6 text-start pt-2 m-0 text-muted">{job.location}</p>
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
              className={`fa-solid fa-heart ${likedJobs.find(j => j.jobId === job.jobId) ? "text-danger" : ""}`}
            ></i>
          </button>
          </div>
        </div>
      ))}
    </div>
  );
}
