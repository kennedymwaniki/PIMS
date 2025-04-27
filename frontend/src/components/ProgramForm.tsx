import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateProgramRequest } from "../types/types";
import { createProgram } from "../services/programsService";

interface ProgramFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ProgramForm = ({ onClose, onSuccess }: ProgramFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProgramRequest>({
    defaultValues: {
      isActive: true,
    },
  });

  const onSubmit = async (data: CreateProgramRequest) => {
    try {
      setIsSubmitting(true);
      await createProgram(data);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error submitting program:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Program Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Program name is required" })}
          className={`mt-1 block w-full rounded-md border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          rows={4}
          className={`mt-1 block w-full rounded-md border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="startdate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            id="startdate"
            type="date"
            {...register("startdate", { required: "Start date is required" })}
            className={`mt-1 block w-full rounded-md border ${
              errors.startdate ? "border-red-500" : "border-gray-300"
            } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
          />
          {errors.startdate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.startdate.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="enddate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            id="enddate"
            type="date"
            {...register("enddate", { required: "End date is required" })}
            className={`mt-1 block w-full rounded-md border ${
              errors.enddate ? "border-red-500" : "border-gray-300"
            } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
          />
          {errors.enddate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.enddate.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="isActive"
          type="checkbox"
          {...register("isActive")}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
          Active Program
        </label>
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
              Submitting...
            </span>
          ) : (
            "Save Program"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProgramForm;
