  export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
  }
  export type PublicPatient = Omit<Patient, "ssn" | "entries">;
  export interface Entry {}
  export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    occupation: string;
    ssn: string;
    entries: Entry[];
  }
  
  export type NewPatient = Omit<Patient, "id">;
  
  export enum Gender {
    male = "male",
    female = "female",
    other = "other",
  }