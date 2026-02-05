import React, { useState, createContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

export const TheUserContext = createContext();

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [compImage, setCompImage] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // ✅ تمت الإضافة هنا
  const [likedJobs, setLikedJobs] = useState([]);

const toggleLikeJob = (job) => {
  setLikedJobs((prev) => {
    const alreadyLiked = prev.find((j) => j.jobId === job.jobId);
    if (alreadyLiked) {
      return prev.filter((j) => j.jobId !== job.jobId);
    } else {
      return [...prev, job];
    }
  });
};

  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.elements.search.value.trim();
    setSearchQuery(searchInput);
  };

  const filterByCategory = (jobs, category) => {
    if (!category) return jobs;

    const lowerCategory = category.toLowerCase();

    const keywordsMap = {
      it: ["frontend", "front-end", "backend", "back-end", "network", "server", "fullstack", "devops", "software", "web", "it"],
      medicine: ["nurse", "doctor", "medical", "clinic", "surgeon", "dentist"],
      engineering: ["mechanical", "civil", "architecture", "engineer", "electrical", "construction"],
    };

    const keywords = keywordsMap[lowerCategory];
    if (!keywords) return jobs;

    return jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      return keywords.some(keyword => title.includes(keyword));
    });
  };

  function saveUserData() {
    let encodedToken = localStorage.getItem("token");
    let company_Id = localStorage.getItem("companyId");
    setCompanyId(company_Id);
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    console.log(userData);
    console.log(companyId);
  }

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios.get("https://localhost:7209/api/Job");
        setJobs(response.data);
      } catch (error) {
        setJobsError("Failed to fetch jobs");
        console.error(error);
      } finally {
        setIsJobsLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return (
    <TheUserContext.Provider
      value={{
        saveUserData,
        setUserData,
        userData,
        companyId,
        setCompanyId,
        compImage,
        setCompImage,
        jobs,
        setJobs,
        isJobsLoading,
        jobsError,
        searchQuery,
        setSearchQuery,
        handleSearch,
        filterByCategory,
        selectedCategory,          // ✅ الإتاحة داخل الـ context
        setSelectedCategory,
        likedJobs,
        toggleLikeJob
      }}
    >
      {children}
    </TheUserContext.Provider>
  );
}
