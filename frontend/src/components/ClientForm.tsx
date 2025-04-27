import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateClientRequest } from "../types/types";
import { createClient } from "../services/ClientServices";

interface ClientFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ClientForm = ({ onClose, onSuccess }: ClientFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientRequest>();

  const onSubmit = async (data: CreateClientRequest) => {
    try {
      setIsSubmitting(true);
      await createClient(data);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error submitting client:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center gap-8">
        <div className="w-full">
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            id="fullname"
            type="text"
            {...register("fullname", { required: "Full name is required" })}
            className={`mt-1 block w-full rounded-md border ${
              errors.fullname ? "border-red-500" : "border-gray-300"
            } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
          />
          {errors.fullname && (
            <p className="mt-1 text-sm text-red-600">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`mt-1 block w-full rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10,}$/,
              message: "Phone number must be at least 10 digits",
            },
          })}
          className={`mt-1 block w-full rounded-md border ${
            errors.phone ? "border-red-500" : "border-gray-300"
          } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <input
          id="address"
          type="text"
          {...register("address", { required: "Address is required" })}
          className={`mt-1 block w-full rounded-md border ${
            errors.address ? "border-red-500" : "border-gray-300"
          } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="dob"
          className="block text-sm font-medium text-gray-700"
        >
          Date of Birth
        </label>
        <input
          id="dob"
          type="date"
          {...register("dob", { required: "Date of birth is required" })}
          className={`mt-1 block w-full rounded-md border ${
            errors.dob ? "border-red-500" : "border-gray-300"
          } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
        />
        {errors.dob && (
          <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700"
        >
          Gender
        </label>
        <select
          id="gender"
          {...register("gender")}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unspecified">Unspecified</option>
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
              Submitting...
            </span>
          ) : (
            "Save Client"
          )}
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
