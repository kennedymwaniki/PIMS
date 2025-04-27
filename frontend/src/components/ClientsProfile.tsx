import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import { getClientById } from "../services/ClientServices";
import { ClientResponse } from "../types/types";
import Modal from "./Modal";
import ClientAppointForm from "./ClientAppointMentForm";
import ClientPrograms from "./ClientPrograms";

const ClientsProfile = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState<ClientResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);

  useEffect(() => {
    const fetchClientData = async () => {
      if (!clientId) return;

      setLoading(true);
      setError(null);

      try {
        const id = parseInt(clientId);
        const data = await getClientById(id);
        setClient(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch client data"
        );
        toast.error("Failed to load client information");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId]);

  const handleAppointmentSuccess = () => {
    toast.success("Appointment created successfully");
    // Refetch client data to show the new appointment
    if (clientId) {
      getClientById(parseInt(clientId)).then(setClient);
    }
    setIsAppointmentModalOpen(false);
  };

  const handleProgramEnrollSuccess = () => {
    toast.success("Successfully enrolled in program");
    // Refetch client data to show the new enrollment
    if (clientId) {
      getClientById(parseInt(clientId)).then(setClient);
    }
    setIsProgramModalOpen(false);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-20 bg-gray-100 rounded mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="h-16 bg-gray-100 rounded"></div>
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

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="mt-4 text-gray-500">No client information available</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Client Profile: {client.fullname}
          </h1>
          <div className="space-x-3">
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Schedule Appointment
            </button>
            <button
              onClick={() => setIsProgramModalOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Enroll in Program
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-2 font-medium">Full Name:</td>
                  <td>{client.fullname}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Email:</td>
                  <td>{client.email}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Phone:</td>
                  <td>{client.phone}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Address:</td>
                  <td>{client.address}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Date of Birth:</td>
                  <td>{format(parseISO(client.dob), "MMMM d, yyyy")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Appointments</h2>
          {client.appointments && client.appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {client.appointments.map((appointment, index) => (
                    <tr
                      key={appointment.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {format(
                          parseISO(appointment.appointmentdate),
                          "yyyy-MM-dd"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === "scheduled"
                              ? "bg-yellow-100 text-yellow-800"
                              : appointment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.doctor?.name || "Not Assigned"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No appointments scheduled</p>
          )}
        </div>

        {/* Enrollments Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Program Enrollments</h2>
          {client.enrollments && client.enrollments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollment Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {client.enrollments.map((enrollment, index) => (
                    <tr
                      key={enrollment.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enrollment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enrollment.program?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {format(
                          parseISO(enrollment.enrollmentdate),
                          "yyyy-MM-dd"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            enrollment.status === "active"
                              ? "bg-green-100 text-green-800"
                              : enrollment.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enrollment.program?.startdate &&
                        enrollment.program?.enddate ? (
                          <>
                            {format(
                              parseISO(enrollment.program.startdate),
                              "MMM d"
                            )}{" "}
                            -{" "}
                            {format(
                              parseISO(enrollment.program.enddate),
                              "MMM d, yyyy"
                            )}
                          </>
                        ) : (
                          "Not specified"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No program enrollments</p>
          )}
        </div>
      </div>

      {/* Modals */}
      {isAppointmentModalOpen && (
        <Modal
          title="Schedule Appointment"
          onClose={() => setIsAppointmentModalOpen(false)}
        >
          <ClientAppointForm
            clientId={parseInt(clientId || "0")}
            onClose={() => setIsAppointmentModalOpen(false)}
            onSuccess={handleAppointmentSuccess}
          />
        </Modal>
      )}

      {isProgramModalOpen && (
        <Modal
          title="Enroll in Program"
          onClose={() => setIsProgramModalOpen(false)}
        >
          <ClientPrograms
            clientId={parseInt(clientId || "0")}
            onClose={() => setIsProgramModalOpen(false)}
            onSuccess={handleProgramEnrollSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default ClientsProfile;
