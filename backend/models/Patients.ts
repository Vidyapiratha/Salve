export interface Patient {
  id: number;
  clinic_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

export interface PatientsResponse {
  totalPage: number;
  currentPage: number;
  pageSize: number;
  patients: Patient[];
}

export interface PatientsRequestQuery {
  clinicId?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  currentPage?: number;
  pageSize?: number;
}
