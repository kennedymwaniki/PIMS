import { useEffect, useState } from "react";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { getAllPrograms } from "../services/programsService";
import { ProgramResponse } from "../types/types";
import Modal from "./Modal";
import ProgramForm from "./ProgramForm";

const ProgramsTable = () => {
  const [programs, setPrograms] = useState<ProgramResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchPrograms = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAllPrograms();
      setPrograms(response);
      toast.success("Programs loaded successfully");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch programs"
      );
      toast.error("An error occurred while fetching programs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProgramSuccess = () => {
    toast.success("Program created successfully");
    fetchPrograms();
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            {[1, 2, 3].map((item) => (
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

  if (programs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="mt-4 text-gray-500">No programs found</p>
        <button
          onClick={handleOpenModal}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add New Program
        </button>

        {isModalOpen && (
          <Modal title="Add New Program" onClose={handleCloseModal}>
            <ProgramForm
              onClose={handleCloseModal}
              onSuccess={handleProgramSuccess}
            />
          </Modal>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-md ml-2 mr-4 mt-4">
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center p-4">
          <h1 className="font-bold text-xl">Programs List</h1>
          <button
            onClick={handleOpenModal}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Add New Program
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {programs.map((program, index) => (
              <tr
                key={program.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {program.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {program.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {program.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(parseISO(program.startdate), "yyyy-MM-dd")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(parseISO(program.enddate), "yyyy-MM-dd")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      program.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {program.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal title="Add New Program" onClose={handleCloseModal}>
          <ProgramForm
            onClose={handleCloseModal}
            onSuccess={handleProgramSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProgramsTable;
