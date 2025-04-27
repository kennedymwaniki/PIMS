import { useState } from "react";
import { useForm } from "react-hook-form";
import { createAppointment } from "../services/AppointmentsService";
import { CreateAppointmentRequest } from "../types/types";
import { toast } from "sonner";

interface ClientAppointFormProps {
  clientId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const ClientAppointForm = ({
  clientId,
  onClose,
  onSuccess,
}: ClientAppointFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the doctor ID from localStorage (current logged-in user)
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem("user");
    if (!userString) return null;

    try {
      return JSON.parse(userString);
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  };

  const currentUser = getUserFromLocalStorage();
  const doctorId = currentUser?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<CreateAppointmentRequest, "doctorId" | "status">>({
    defaultValues: {
      clientId: clientId,
      appointmentdate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (
    data: Omit<CreateAppointmentRequest, "doctorId" | "status">
  ) => {
    if (!doctorId) {
      toast.error("Doctor information not found. Please log in again.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Format the date properly with time
      const appointmentDateTime = new Date(data.appointmentdate);
      appointmentDateTime.setHours(9, 0, 0); // Default to 9:00 AM if no time specified

      const appointmentRequest: CreateAppointmentRequest = {
        ...data,
        doctorId,
        appointmentdate: appointmentDateTime.toISOString(),
        status: "scheduled",
      };

      await createAppointment(appointmentRequest);
      toast.success("Appointment scheduled successfully");
      onSuccess();
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to schedule appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("clientId")} value={clientId} />

      <div>
        <label
          htmlFor="appointmentdate"
          className="block text-sm font-medium text-gray-700"
        >
          Appointment Date
        </label>
        <input
          id="appointmentdate"
          type="date"
          {...register("appointmentdate", { required: "Date is required" })}
          className={`mt-1 block w-full rounded-md border ${
            errors.appointmentdate ? "border-red-500" : "border-gray-300"
          } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
        />
        {errors.appointmentdate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.appointmentdate.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description / Reason
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          rows={4}
          className={`mt-1 block w-full rounded-md border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
          placeholder="Reason for appointment"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Scheduling...
            </span>
          ) : (
            "Schedule Appointment"
          )}
        </button>
      </div>
    </form>
  );
};

export default ClientAppointForm;
