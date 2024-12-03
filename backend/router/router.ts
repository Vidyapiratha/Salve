import { Router, Request, Response } from "express";
import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { getClinics } from "../routes/clinicRoutes";
import { getPatients } from "../routes/patientRoutes";

const router = Router();

router.get("/get/clinics", async (req: Request, res: Response) => {
  const results: Array<Object> = [];
  console.log("dirname", __dirname);
  await createReadStream(`${__dirname}/data/clinics.csv`)
    .pipe(parse({ columns: true, delimiter: "," }))
    .on("data", (data) => {
      results.push(data);
    })
    .on("error", (err) => {
      console.log("Error on reading data: ", err);
      res.status(400).send({
        statuCode: 400,
        message: "No data available",
      });
    })
    .on("end", () => {
      console.log("process end");
      console.log("results on end", results);

      res.status(200).json({
        statuCode: 200,
        message: "Succesfully Retrived the data",
        data: { results },
      });
    });
  console.log("results", results);
});

router.get("/get/patients/:clinicId", async (req: Request, res: Response) => {
  const results: Array<Object> = [];
  console.log("dirname", __dirname);
  console.log("params: ", req.params);
  const clinicId = req.params?.clinicId;
  await createReadStream(`${__dirname}/data/patients-${clinicId}.csv`)
    .pipe(parse({ columns: true, delimiter: "," }))
    .on("data", (data) => {
      results.push(data);
    })
    .on("error", (err) => {
      console.log("Error on reading data: ", err);
      res.status(400).json({
        statuCode: 400,
        message: "No data available",
      });
    })
    .on("end", () => {
      console.log("process end");
      //   console.log("results on end", results);

      res.status(200).json({
        statuCode: 200,
        message: "Succesfully Retrived the data",
        data: { results },
      });
    });

  //   console.log("results", results);
});

router.get("/clinics", getClinics);

router.get("/patients", getPatients);

export default router;
