import ProgramsTable from "./ProgramsTable";

const ProgramsList = () => {
  return (
    <div className="p-4 mx-auto">
      <h1 className="uppercase font-semibold">List of available programs</h1>
      <ProgramsTable />
    </div>
  );
};

export default ProgramsList;
