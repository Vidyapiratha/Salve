import { Request, Response } from "express";
import { csvReader } from "../utils/csvReader";
import { Clinic } from "../models/Clinics";

export const getClinics = async (req: Request, res: Response) => {
  const CLINIC_FILE = "./data/clinics.csv";
  try {
    const clinics = (await csvReader(CLINIC_FILE)) as Clinic[];
    res.status(200).json({
      statuCode: 200,
      message: "Succesfully Retrived the data",
      data: { clinics },
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).json({
      statuCode: 400,
      message: "Error reading clinic data",
    });
  }
};
