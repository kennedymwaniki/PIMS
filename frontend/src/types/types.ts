export interface User {
  id: number;
  role: "Doctor" | "admin" | "both";
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Types for the getAllUsers API response
export interface UserResponse {
  id: number;
  name: string;
  email: string;
  contact: string;
  role: "Doctor" | "admin" | "both";
  isActive: boolean;
  createdAt: string;
  appointments: UserAppointment[];
  enrollments: UserEnrollment[];
}

export interface UserAppointment {
  id: number;
  appointmentdate: string;
  description: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
}

export interface UserEnrollment {
  id: number;
  enroller: number;
  enrollmentdate: string;
  status: "active" | "completed" | "pending";
  program: {
    name: string;
    description: string;
    isActive: boolean;
    startdate: string;
    enddate: string;
  };
}

// Client Types

// Request types
export interface CreateClientRequest {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  dob: string; // ISO format date string: "YYYY-MM-DD"
  gender?: "male" | "female" | "unspecified";
}

export interface UpdateClientRequest {
  fullname?: string;
  email?: string;
  phone?: string;
  address?: string;
  dob?: string; // ISO format date string: "YYYY-MM-DD"
  gender?: "male" | "female" | "unspecified";
}

// Response types
export interface ClientProgram {
  name: string;
  description: string;
  isActive: boolean;
  startdate: string;
  enddate: string;
}

export interface ClientEnrollment {
  id: number;
  enrollmentdate: string;
  status: "active" | "completed" | "pending";
  program: ClientProgram;
}

export interface ClientDoctor {
  id: number;
  name: string;
  email: string;
  contact: string;
  role: "Doctor" | "admin" | "both";
}

export interface ClientAppointment {
  id: number;
  appointmentdate: string;
  description: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  doctor: ClientDoctor;
}

export interface ClientResponse {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  dob: string; // ISO format date string
  gender?: "male" | "female" | "unspecified";
  enrollments: ClientEnrollment[];
  appointments: ClientAppointment[];
}

export interface ClientsListResponse {
  clients: ClientResponse[];
}

export interface SingleClientResponse {
  client: ClientResponse;
}

export interface ClientCreateResponse {
  message: string;
  data: ClientResponse;
}

export interface ClientUpdateResponse {
  message: string;
  data: ClientResponse;
}

export interface ClientDeleteResponse {
  message: string;
  data: ClientResponse;
}

export interface ClientErrorResponse {
  error: string;
  details?: string;
}
