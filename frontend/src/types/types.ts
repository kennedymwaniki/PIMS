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

// Program Types

// Request types
export interface CreateProgramRequest {
  name: string;
  description: string;
  isActive: boolean;
  startdate: string;
  enddate: string;
}

export interface UpdateProgramRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
  startdate?: string;
  enddate?: string;
}

// Response types
export interface ProgramResponse {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  startdate: string; // ISO format date string
  enddate: string; // ISO format date string
}

export interface ProgramsListResponse {
  programs: ProgramResponse[];
}

export interface SingleProgramResponse {
  program: ProgramResponse;
}

export interface ProgramCreateResponse {
  message: string;
  data: ProgramResponse;
}

export interface ProgramUpdateResponse {
  message: string;
  data: ProgramResponse;
}

export interface ProgramDeleteResponse {
  message: string;
  data: ProgramResponse;
}

export interface ProgramErrorResponse {
  error: string;
  details?: string;
}

// Enrollment Types

// Request types
export interface CreateEnrollmentRequest {
  clientId: number;
  programId: number;
  enrollmentdate: string; // ISO format date string: "YYYY-MM-DD"
  status?: "active" | "completed" | "pending";
  enroller?: number;
}

export interface UpdateEnrollmentRequest {
  clientId?: number;
  programId?: number;
  enrollmentdate?: string; // ISO format date string: "YYYY-MM-DD"
  status?: "active" | "completed" | "pending";
  enroller?: number;
}

// Response types
export interface EnrollmentResponse {
  id: number;
  enrollmentdate: string;
  status: "active" | "completed" | "pending";
  client: {
    id: number;
    fullname: string;
    email: string;
    phone: string;
  };
  program: {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    startdate: string;
    enddate: string;
  };
}

export interface EnrollmentsListResponse {
  enrollments: EnrollmentResponse[];
}

export interface SingleEnrollmentResponse {
  enrollment: EnrollmentResponse;
}

export interface EnrollmentCreateResponse {
  message: string;
  data: EnrollmentResponse;
}

export interface EnrollmentUpdateResponse {
  message: string;
  data: EnrollmentResponse;
}

export interface EnrollmentDeleteResponse {
  message: string;
  data: EnrollmentResponse;
}

export interface EnrollmentErrorResponse {
  error: string;
  details?: string;
}

// Appointment Types

// Request types
export interface CreateAppointmentRequest {
  clientId: number;
  doctorId: number;
  appointmentdate: string; // ISO format date string: "YYYY-MM-DD"
  description: string;
  status?: "scheduled" | "completed" | "cancelled" | "no-show";
}

export interface UpdateAppointmentRequest {
  clientId?: number;
  doctorId?: number;
  appointmentdate?: string; // ISO format date string: "YYYY-MM-DD"
  description?: string;
  status?: "scheduled" | "completed" | "cancelled" | "no-show";
}

// Response types
export interface AppointmentResponse {
  id: number;
  appointmentdate: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  description: string;
  client: {
    id: number;
    fullname: string;
    gender?: "male" | "female" | "unspecified";
    phone: string;
  };
  doctor: {
    id: number;
    name: string;
    isActive: boolean;
  };
}

export interface AppointmentsListResponse {
  appointments: AppointmentResponse[];
}

export interface SingleAppointmentResponse {
  appointment: AppointmentResponse;
}

export interface AppointmentCreateResponse {
  message: string;
  data: AppointmentResponse;
}

export interface AppointmentUpdateResponse {
  message: string;
  data: AppointmentResponse;
}

export interface AppointmentDeleteResponse {
  message: string;
  data: AppointmentResponse;
}

export interface AppointmentErrorResponse {
  error: string;
  details?: string;
}
