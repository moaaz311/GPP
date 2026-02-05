import React, { useContext, useEffect, useState } from 'react';
import "./JobDetails.css";
import { TheUserContext } from '../UserContext/UserContext';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from 'axios';

export default function JobDetails() {
  const { userData } = useContext(TheUserContext);
  const jobId = localStorage.getItem("selectedJobId");
  const employeeId = localStorage.getItem("employee-id");

  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [applications, setApplications] = useState([]);

  // 📥 Load applications for this job
  useEffect(() => {
    const fetchApplications = async () => {
      if (!jobId) return;
      try {
        const response = await axios.get(`https://localhost:7209/api/Employee/${jobId}/GetAllApplication`);
        setApplications(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [jobId]);

  // 📤 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverLetter || !cvFile) {
      setResponseMessage("Please fill in both the cover letter and upload your CV.");
      return;
    }

    const formData = new FormData();
    formData.append("CoverLetter", coverLetter);
    formData.append("Cv", cvFile);

    try {
      const response = await axios.post(
        `https://localhost:7209/api/Employee/${employeeId}/apply/${jobId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setResponseMessage("Application submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error applying to job:", error);
      setResponseMessage("There was an error submitting your application.");
    }
  };

  return (
    <div className="container-fluid p-0">
      <Header userData={userData} />
      <div className="container-fluid">
        <div className="job-details">

          {/* ✅ Applications List Section */}
          <h2 className="mb-4">Applications for this Job</h2>
          {applications.length === 0 ? (
            <p>No applications submitted yet.</p>
          ) : (
            <div className="applications-list mb-5">
              {applications.map((app, index) => (
                <div key={index} className="application-card p-3 mb-3 border rounded bg-light">
                  <p><strong>Applied Date:</strong> {new Date(app.appliedDate).toLocaleString()}</p>
                  <p><strong>Status:</strong> {app.status}</p>
                </div>
              ))}
            </div>
          )}

          {/* 📝 Application Form */}
          <h2 className="mb-4">Apply to this Job</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="coverLetter" className="form-label">Cover Letter</label>
              <textarea
                id="coverLetter"
                className="form-control"
                rows="5"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write your cover letter here..."
                required
              ></textarea>
            </div>

            {/* 🆕 CV Upload with Preview */}
            <div className="mb-3">
              <label htmlFor="cvUpload" className="form-label">Upload Your CV</label>
              <input
                type="file"
                id="cvUpload"
                className="form-control"
                onChange={(e) => setCvFile(e.target.files[0])}
                accept=".pdf,.doc,.docx"
                required
              />
              {cvFile && (
                <div className="mt-2 p-2 border rounded bg-white">
                  <p className="mb-1"><strong>Selected File:</strong> {cvFile.name}</p>
                  <p className="text-muted small">{(cvFile.size / 1024).toFixed(2)} KB</p>
                </div>
              )}
            </div>

            <button type="submit" className="btn custom-btn">Apply Now</button>
          </form>

          {responseMessage && (
            <div className="alert alert-info mt-3">{responseMessage}</div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
