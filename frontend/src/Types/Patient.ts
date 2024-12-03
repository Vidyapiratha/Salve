export type Patient = {
  id: number;
  clinic_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
};

export interface PatientsResponse {
  totalPage: number;
  currentPage: number;
  pageSize: number;
  patients: Patient[];
}
