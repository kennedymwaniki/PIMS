import ClientsTable from "./ClientsTable";

const Patientslist = () => {
  return (
    <div className="p-4 mx-auto">
      <p className="text-2xl uppercase">
        this is the list of enrolled clients or patients
      </p>
      <ClientsTable />
    </div>
  );
};

export default Patientslist;
