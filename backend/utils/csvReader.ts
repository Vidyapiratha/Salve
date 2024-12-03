import { createReadStream } from "fs";
import { access, constants } from "node:fs/promises";
import { parse } from "csv-parse";

export const csvReader = async <T>(filePath: string): Promise<T[]> => {
  try {
    await access(filePath, constants.F_OK);
  } catch (error) {
    throw new Error(`File not found: ${filePath}`);
  }
  return new Promise((resolve, reject) => {
    const results: T[] = [];

    createReadStream(`${filePath}`)
      .pipe(parse({ columns: true, delimiter: "," }))
      .on("data", (data) => {
        results.push(data as T);
      })
      .on("error", (err) => {
        console.log("Error on reading data: ", err);
        reject(err);
      })
      .on("end", () => {
        console.log("process end");
        resolve(results as T[]);
      });
  });
};
