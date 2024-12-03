import { useState, useEffect } from "react";
import { Patient } from "../Types/Patient";
import Header from "../Components/Header";
import BasicCard from "../Components/BasicCard";
import { Clinic } from "../Types/Clinic";
import { fetchClinics, fetchPatients } from "../Utils/api";

const Home = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [sortBy, setSortBy] = useState<string>("id");

  const [selectedClinic, setSelectedClinic] = useState<Clinic>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const fetchPatientPage = async (page: number, reset = false) => {
    if (isFetching || (totalPages && page > totalPages)) return;
    setIsFetching(true);

    try {
      console.log(`Fetching patients for page ${page}...`);
      const response = await fetchPatients(
        selectedClinic!.id,
        sortBy,
        50,
        page
      );
      const { patients: fetchedPatients, totalPage, currentPage } = response;

      setPatients((prev) => {
        const existingPatientsMap = new Map<number, Patient>(
          prev.map((patient) => [patient.id, patient])
        );
        const newPatientsMap = new Map<number, Patient>(
          fetchedPatients.map((patient: Patient) => [patient.id, patient])
        );

        const mergedPatientsMap = reset
          ? newPatientsMap
          : new Map([...existingPatientsMap, ...newPatientsMap]);

        const mergedPatientsArray = Array.from(mergedPatientsMap.values());

        return mergedPatientsArray;
      });

      setTotalPages(totalPage);
      setCurrentPage(Number(currentPage));
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchClinics()
      .then((data) => {
        setClinics(data);
      })
      .then(() => {
        setSelectedClinic(clinics[0]);
      })
      .catch((error) => console.error("Error fetching clinics:", error));
  }, []);

  useEffect(() => {
    if (selectedClinic) {
      window.scrollTo(0, 0);
      fetchPatientPage(1, true);
    } else if (clinics.length && !selectedClinic) {
      setSelectedClinic(clinics[0]);
    }
  }, [selectedClinic, clinics, sortBy]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.offsetHeight;

      if (
        scrollPosition >= scrollHeight - 200 &&
        !isFetching &&
        currentPage <= totalPages
      ) {
        fetchPatientPage(currentPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, totalPages, isFetching]);
  return (
    <div>
      <div>
        {selectedClinic && selectedClinic.id && (
          <Header
            sortBy={sortBy}
            selectedClinic={selectedClinic}
            setSelectedClinic={setSelectedClinic}
            clinicData={clinics}
            setSortBy={setSortBy}
          />
        )}
        <div style={{ marginTop: "100px" }}>
          <BasicCard patientsData={patients} />
        </div>
      </div>
    </div>
  );
};

export default Home;
