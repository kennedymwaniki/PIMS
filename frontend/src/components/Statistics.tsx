import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  FaUserFriends,
  FaCalendarCheck,
  FaCertificate,
  FaClipboardList,
  FaCheckCircle,
  FaRegClock,
  FaTimesCircle,
  FaBookOpen,
  FaGraduationCap,
  FaHourglassHalf,
} from "react-icons/fa";
import StatCard from "./StatCards";
import {
  DashboardStatistics,
  fetchDashboardStatistics,
} from "../services/generalServices";

const Statistics = () => {
  const [statistics, setStatistics] = useState<DashboardStatistics | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchDashboardStatistics();
        setStatistics(response);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch dashboard statistics"
        );
        toast.error("An error occurred while fetching statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="h-32 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-500 text-center">Error: {error}</p>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="mt-4 text-gray-500">No statistics available</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Clients",
      value: statistics.totalClients,
      icon: <FaUserFriends />,
      color: "border-blue-500",
    },
    {
      title: "Total Appointments",
      value: statistics.totalAppointments,
      icon: <FaCalendarCheck />,
      color: "border-purple-500",
    },
    {
      title: "Total Programs",
      value: statistics.totalPrograms,
      icon: <FaCertificate />,
      color: "border-green-500",
    },
    {
      title: "Total Enrollments",
      value: statistics.totalEnrollments,
      icon: <FaClipboardList />,
      color: "border-teal-500",
    },
    {
      title: "Active Programs",
      value: statistics.activePrograms,
      icon: <FaCheckCircle />,
      color: "border-emerald-500",
    },
    {
      title: "Scheduled Appointments",
      value: statistics.scheduledAppointments,
      icon: <FaRegClock />,
      color: "border-amber-500",
    },
    {
      title: "Completed Appointments",
      value: statistics.completedAppointments,
      icon: <FaCheckCircle />,
      color: "border-green-500",
    },
    {
      title: "Cancelled Appointments",
      value: statistics.cancelledAppointments,
      icon: <FaTimesCircle />,
      color: "border-red-500",
    },
    {
      title: "Active Enrollments",
      value: statistics.activeEnrollments,
      icon: <FaBookOpen />,
      color: "border-indigo-500",
    },
    {
      title: "Completed Enrollments",
      value: statistics.completedEnrollments,
      icon: <FaGraduationCap />,
      color: "border-blue-500",
    },
    {
      title: "Pending Enrollments",
      value: statistics.pendingEnrollments,
      icon: <FaHourglassHalf />,
      color: "border-yellow-500",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-6">Dashboard Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Statistics;
