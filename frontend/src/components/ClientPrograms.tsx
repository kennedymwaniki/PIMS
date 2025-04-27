import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getAllPrograms } from "../services/programsService";
import { createEnrollment } from "../services/enrollmentService";
import { ProgramResponse, CreateEnrollmentRequest } from "../types/types";
import { toast } from "sonner";

interface ClientProgramsProps {
  clientId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const ClientPrograms = ({
  clientId,
  onClose,
  onSuccess,
}: ClientProgramsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [programs, setPrograms] = useState<ProgramResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEnrollmentRequest>({
    defaultValues: {
      clientId: clientId,
      enrollmentdate: new Date().toISOString().split("T")[0],
      status: "active",
    },
  });

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const programsList = await getAllPrograms();
        // Filter only active programs
        const activePrograms = programsList.filter(
          (program) => program.isActive
        );
        setPrograms(activePrograms);
      } catch (error) {
        console.error("Failed to load programs:", error);
        toast.error("Failed to load available programs");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const onSubmit = async (data: CreateEnrollmentRequest) => {
    try {
      setIsSubmitting(true);
      await createEnrollment({
        ...data,
        clientId: clientId,
      });
      onSuccess();
    } catch (error) {
      console.error("Error creating enrollment:", error);
      toast.error("Failed to enroll in program");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("clientId")} value={clientId} />

      <div>
        <label
          htmlFor="programId"
          className="block text-sm font-medium text-gray-700"
        >
          Select Program
        </label>
        {loading ? (
          <div className="animate-pulse h-10 bg-gray-100 rounded mt-1"></div>
        ) : (
          <select
            id="programId"
            {...register("programId", {
              required: "Program selection is required",
            })}
            className={`mt-1 block w-full rounded-md border ${
              errors.programId ? "border-red-500" : "border-gray-300"
            } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
          >
            <option value="">Select a program</option>
            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name} ({program.description.substring(0, 30)}...)
              </option>
            ))}
          </select>
        )}
        {errors.programId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.programId.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="enrollmentdate"
          className="block text-sm font-medium text-gray-700"
        >
          Enrollment Date
        </label>
        <input
          id="enrollmentdate"
          type="date"
          {...register("enrollmentdate", { required: "Date is required" })}
          className={`mt-1 block w-full rounded-md border ${
            errors.enrollmentdate ? "border-red-500" : "border-gray-300"
          } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
        />
        {errors.enrollmentdate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.enrollmentdate.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          {...register("status")}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </select>
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
              Enrolling...
            </span>
          ) : (
            "Enroll in Program"
          )}
        </button>
      </div>
    </form>
  );
};

export default ClientPrograms;
