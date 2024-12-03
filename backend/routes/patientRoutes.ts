import { Request, Response } from "express";
import { csvReader } from "../utils/csvReader";
import {
  Patient,
  PatientsRequestQuery,
  PatientsResponse,
} from "../models/Patients";

enum SortBy {
  ID = "id",
  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  DATE_OF_BIRTH = "date_of_birth",
}

export const getPatients = async (req: Request, res: Response) => {
  const {
    clinicId,
    sortBy = SortBy.ID,
    order = "asc",
    currentPage = 1,
    pageSize = 10,
  } = req.query as PatientsRequestQuery;

  console.log("sorby", sortBy);

  const CLINIC_FILE = `./data/patients-${clinicId}.csv`;

  try {
    const patients: Patient[] = (await csvReader(CLINIC_FILE)) as Patient[];
    console.log("patients data: ", patients);

    console.log("type ofpatients:", typeof patients);
    console.log("type ofid:", typeof patients[0].id);
    const sortData = (field: keyof Patient, order: "asc" | "desc") => {
      return patients.sort((a, b) => {
        let comparison = 0;
        // console.log("type of:", typeof a[field]);

        if (field === SortBy.DATE_OF_BIRTH) {
          comparison =
            new Date(a[field]).getTime() - new Date(b[field]).getDate();
        } else if (field === SortBy.ID) {
          comparison = (a[field] as number) - (b[field] as number);
        } else if (
          typeof a[field] === "string" &&
          typeof b[field] === "string"
        ) {
          comparison = (a[field] as string).localeCompare(b[field] as string);
        } else if (
          typeof a[field] === "number" &&
          typeof b[field] === "number"
        ) {
          comparison = (a[field] as number) - (b[field] as number);
        }
        return order === "asc" ? comparison : -comparison;
      });
    };

    let filteredData = patients.sort((a, b) => a.id - b.id);
    if (sortBy === SortBy.FIRST_NAME) {
      filteredData = patients.sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );
    } else if (sortBy === SortBy.LAST_NAME) {
      filteredData = patients.sort((a, b) =>
        a.last_name.localeCompare(b.last_name)
      );
    } else if (sortBy === SortBy.DATE_OF_BIRTH) {
      filteredData = patients.sort(
        (a, b) =>
          new Date(a.date_of_birth).getTime() -
          new Date(b.date_of_birth).getTime()
      );
    }

    const sortedData = sortData(
      sortBy as keyof Patient,
      order as "asc" | "desc"
    );
    const pageData = sortedData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    if (pageData.length === 0) {
      res.status(200).json({
        statuCode: 200,
        message: "No Records available",
      });
    } else {
      const totalPage: number = Math.ceil(sortedData.length / pageSize);
      const results: PatientsResponse = {
        totalPage: totalPage,
        currentPage: currentPage as number,
        pageSize: pageSize,
        patients: pageData,
      };

      res.status(200).json({
        statuCode: 200,
        message: "Succesfully Retrived the data",
        data: { ...results },
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      statuCode: 500,
      message: "Error reading patients data",
    });
  }
};
