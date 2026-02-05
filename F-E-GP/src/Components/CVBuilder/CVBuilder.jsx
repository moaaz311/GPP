import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./CVBuilder.css"
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import "bootstrap/dist/css/bootstrap.min.css";

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 3,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

// PDF Component
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {data.photo && <Image src={data.photo} style={styles.image} />}
        <Text style={styles.heading}>{data.name}</Text>
        <Text>
          {data.email} | {data.phone}
        </Text>
        <Text>
          {data.linkedin} {data.github ? `| ${data.github}` : ""}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Summary</Text>
        <Text>{data.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Experience</Text>
        <Text>{data.experience}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Projects</Text>
        <Text>{data.projects}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Education</Text>
        <Text>{data.education}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Skills</Text>
        <Text>{data.skills}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Certifications</Text>
        <Text>{data.certifications}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Languages</Text>
        <Text>{data.languages}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Achievements</Text>
        <Text>{data.achievements}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Portfolio</Text>
        <Text>{data.portfolio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>References</Text>
        <Text>Available upon request.</Text>
      </View>
    </Page>
  </Document>
);

const CVBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    summary: "",
    experience: "",
    projects: "",
    education: "",
    skills: "",
    certifications: "",
    languages: "",
    achievements: "",
    portfolio: "",
    photo: "",
    category: "", // New field
  });

  const [submitted, setSubmitted] = useState(false);
  const [apiKeywords, setApiKeywords] = useState([]);

  useEffect(() => {
  axios
    .get("https://gist.githubusercontent.com/mohamedshal/fb06b06a9d30c2c75ca1729f1002db0f/raw")
    .then((response) => {


      if (Array.isArray(response.data.keywords)) {
        setApiKeywords(response.data.keywords.map(kw => kw.toLowerCase())); // ensure lowercase
      } else {
        console.warn("response.data.keywords is not an array");
      }
    })
    .catch((error) => {
      console.error("Failed to fetch API data:", error);
    });
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, photo: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

const isITCategory = () => {
  const summary = formData.summary.toLowerCase();
  return (
    formData.category === "IT" ||
    apiKeywords.some((kw) => summary.includes(kw))
  );
};


  const inputFields = [
    "name",
    "email",
    "phone",
    "linkedin",
    ...(isITCategory() ? ["github"] : []), // Only include GitHub if IT
    "summary",
    "experience",
    "projects",
    "education",
    "skills",
    "certifications",
    "languages",
    "achievements",
    "portfolio",
  ];

  return (
          <div className="container-fluid p-0">
              <Header />
              <div className="container-fluid">
                  <div className="cvbuilder">
      <h1 className="mb-4">CV Builder</h1>
      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">Profile Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleImageUpload}
          />
        </div>

        {/* Category Selection */}
        <div className="mb-3">
          <label className="form-label">Your Field</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="it"
                name="category"
                value="IT"
                checked={formData.category === "IT"}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="it" className="form-check-label">
                IT / Software
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="non-it"
                name="category"
                value="Non-IT"
                checked={formData.category === "Non-IT"}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="non-it" className="form-check-label">
                Non-IT
              </label>
            </div>
          </div>
        </div>

        {/* Input Fields */}
        {inputFields.map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            {["summary", "experience", "projects", "education", "skills", "certifications", "achievements"].includes(field) ? (
              <textarea
                className="form-control"
                placeholder={`Enter your ${field}`}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                type="text"
                className="form-control"
                placeholder={`Enter your ${field}`}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}

        <button type="submit" className="btn custom-btn">
          Generate CV
        </button>
      </form>

      {submitted && (
        <div className="mt-5">
          <h2 className="mb-3">CV Preview</h2>
          <div className="card p-3">
            {formData.photo && (
              <div className="mb-4 text-center">
                <strong>Profile Photo:</strong>
                <div>
                  <img
                    src={formData.photo}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginTop: "10px",
                    }}
                  />
                </div>
              </div>
            )}
            {inputFields.map((field) => (
              <div key={field} className="mb-2">
                <strong className="text-capitalize">
                  {field.replace(/([A-Z])/g, " $1")}:
                </strong>
                <p>{formData[field]}</p>
                <button
                  className="btn btn-sm custom-btn"
                  onClick={() => {
                    const element = document.querySelector(`[name="${field}"]`);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "center" });
                      element.focus();
                    }
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <PDFDownloadLink
              document={<MyDocument data={formData} />}
              fileName={`${formData.name}-CV.pdf`}
              className="btn btn-success mt-3"
            >
              {({ loading }) => (loading ? "Preparing document..." : "Download as PDF")}
            </PDFDownloadLink>
          </div>
        </div>
      )}
    </div>
                  <Footer />
              </div>
          </div>
      )
};

export default CVBuilder;
