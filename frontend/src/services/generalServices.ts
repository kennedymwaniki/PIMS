import { getAllAppointments } from "./AppointmentsService";
import { getAllClients } from "./ClientServices";
import { getAllEnrollments } from "./enrollmentService";
import { getAllPrograms } from "./programsService";

export interface DashboardStatistics {
  totalClients: number;
  totalAppointments: number;
  totalPrograms: number;
  totalEnrollments: number;
  activePrograms: number;
  scheduledAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  pendingEnrollments: number;
}

export const fetchDashboardStatistics =
  async (): Promise<DashboardStatistics> => {
    try {
      const [clients, appointments, programs, enrollments] = await Promise.all([
        getAllClients(),
        getAllAppointments(),
        getAllPrograms(),
        getAllEnrollments(),
      ]);

      // Calculate statistics
      const statistics: DashboardStatistics = {
        totalClients: clients.length,
        totalAppointments: appointments.length,
        totalPrograms: programs.length,
        totalEnrollments: enrollments.length,
        activePrograms: programs.filter((program) => program.isActive).length,
        scheduledAppointments: appointments.filter(
          (apt) => apt.status === "scheduled"
        ).length,
        completedAppointments: appointments.filter(
          (apt) => apt.status === "completed"
        ).length,
        cancelledAppointments: appointments.filter(
          (apt) => apt.status === "cancelled"
        ).length,
        activeEnrollments: enrollments.filter((enr) => enr.status === "active")
          .length,
        completedEnrollments: enrollments.filter(
          (enr) => enr.status === "completed"
        ).length,
        pendingEnrollments: enrollments.filter(
          (enr) => enr.status === "pending"
        ).length,
      };

      return statistics;
    } catch (error) {
      console.error("Error fetching dashboard statistics:", error);
      throw new Error("Failed to fetch dashboard statistics");
    }
  };
