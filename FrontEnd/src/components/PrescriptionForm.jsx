import React, { useState } from "react";
import axios from "axios";
import "./PrescriptionForm.css";
import PatientHistory from "./PatientHistory";
import { BASE_URL } from "../services/APIconstants";
import { getToken } from "../services/TokenUtil";

export default function MedicalReport() {

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [medicalData, setMedicalData] = useState({
    patientMedicalHistoryDto: {
      visitDate: getCurrentDate(),
      symptoms: "",
      suggestion: "",
      patientId: ""
    },
    medicineDto: []
  });
  const [responseData, setResponseData] = useState({});
  const [records, setRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  function handleInput(event) {
    const { name, value } = event.target;
    const updatedData = { ...medicalData };
    if (name === "medicine" || name === "dosage" || name === "duration") {
      const lastMedicineIndex = updatedData.medicineDto.length - 1;
      updatedData.medicineDto[lastMedicineIndex][name] = value;
    } else {
      updatedData.patientMedicalHistoryDto[name] = value;
    }
    setMedicalData(updatedData);

    if (name === "patientId" && value.trim() === "") {
      setErrorMessage("Please enter correct patient ID");
    } else {
      setErrorMessage("");
    }
  }

  function addMedicineField() {
    setMedicalData((prevData) => ({
      ...prevData,
      medicineDto: [...prevData.medicineDto, { medicine: "", dosage: "", duration: "" }]
    }));
  }

  function removeMedicineField(index) {
    setMedicalData((prevData) => {
      const updatedMedicineDto = [...prevData.medicineDto];
      updatedMedicineDto.splice(index, 1);
      return { ...prevData, medicineDto: updatedMedicineDto };
    });
  }

  const validateForm = () => {
    let isValid = true;

    Object.keys(medicalData.patientMedicalHistoryDto).forEach((fieldName) => {
      const value = medicalData.patientMedicalHistoryDto[fieldName];
      validateField(fieldName, value);
      if (errorMessage[fieldName]) {
        isValid = false;
      }
    });

    return isValid;
  };

  function medicalReport(event) {
    event.preventDefault();
    console.log(medicalData);

    if (validateForm()) {
      axios
        .post(`${BASE_URL}/report`, medicalData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        .then((response) => {
          setResponseData(response.data);
          alert("Medical report submitted successfully!");
        })
        .catch((error) => {
          console.error("Please enter correct data:", error);
        });
      setRecords([...records, medicalData]);
      setMedicalData({
        patientMedicalHistoryDto: {
          visitDate: getCurrentDate(),
          symptoms: "",
          suggestion: "",
          patientId: ""
        },
        medicineDto: []
      });
    }
  }

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "patientId":
        const patientIdRegex = /^[1-9]\d*$/;
        if (!patientIdRegex.test(value)) {
          errorMessage = "Id must be in digits only";
        }
        break;
      case "symptoms":
      case "suggestion":
        const symptomsRegex = /^[a-zA-Z\s&,/]+$/;
        if (!symptomsRegex.test(value)) {
          errorMessage = "Only letters, spaces and special characters(& , /)are allowed";
        }
        break;
      default:
        break;
    }
    setErrorMessage((prevState) => ({
      ...prevState,
      [fieldName]: errorMessage
    }));
  };

  return (
    <div className="report">
      <div className="history">
        <PatientHistory />
      </div>

      <div className="medical-report-container  pulse">
        <h2 id="head">Patient Medical Report</h2>
        <h1>{responseData.customerId}</h1>

        <form onSubmit={medicalReport}>
          <div className="form-group">
            <label htmlFor="patientId">Patient ID:</label>
            <input
              type="text"
              name="patientId"
              value={medicalData.patientMedicalHistoryDto.patientId}
              onChange={handleInput}
              onBlur={() => validateField("patientId", medicalData.patientMedicalHistoryDto.patientId)}
              required
            />
            {errorMessage.patientId && <span style={{ color: "red" }}>{errorMessage.patientId}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="visitDate">Visiting Date:</label>
            <input
              type="date"
              name="visitDate"
              value={medicalData.patientMedicalHistoryDto.visitDate}
              readOnly
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="symptoms">Symptoms:</label>
            <input
              type="text"
              name="symptoms"
              value={medicalData.patientMedicalHistoryDto.symptoms}
              onChange={handleInput}
              onBlur={() => validateField("symptoms", medicalData.patientMedicalHistoryDto.symptoms)}
              required
            />
            {errorMessage.symptoms && <span style={{ color: "red" }}>{errorMessage.symptoms}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="suggestion">Suggestions:</label>
            <input
              type="text"
              name="suggestion"
              value={medicalData.patientMedicalHistoryDto.suggestion}
              onChange={handleInput}
              onBlur={() => validateField("suggestion", medicalData.patientMedicalHistoryDto.suggestion)}
              required
            />
            {errorMessage.suggestion && <span style={{ color: "red" }}>{errorMessage.suggestion}</span>}
          </div>
          {medicalData.medicineDto.map((medicine, index) => (
            <div key={index}>
              <div className="form-group">
                <label htmlFor={`medicine-${index}`}>Medicine:</label>
                <input
                  type="text"
                  name="medicine"
                  value={medicine.medicine}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`dosage-${index}`}>Dosage:</label>
                <input
                  type="text"
                  name="dosage"
                  value={medicine.dosage}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`duration-${index}`}>Duration:</label>
                <input
                  className="form-control"
                  type="text"
                  name="duration"
                  value={medicine.duration}
                  onChange={handleInput}
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  className="btn btn-danger mb-1"
                  onClick={() => removeMedicineField(index)}
                >
                  Remove Medicine
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={addMedicineField}
          >
            Add Medicine
          </button>
          <button type="submit" className="btn btn-primary mx-5">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
