import axios from "axios";
import { Clinic } from "../Types/Clinic";

const API_BASE = "http://localhost:4000/api/v1";

export const fetchClinics = async (): Promise<Clinic[]> => {
  console.log("in axios");
  const response = await axios.get(`${API_BASE}/clinics`);
  console.log("axios clinic: ", response.data.data);
  return response.data.data.clinics;
};

export const fetchPatients = async (
  clinicId: number,
  sortBy: string,
  pageSize: number,
  currentPage: number
) => {
  const response = await axios.get(`${API_BASE}/patients`, {
    params: { clinicId, sortBy, pageSize, currentPage },
  });
  console.log("axios patients: ", response.data.data);

  return response.data.data;
};
