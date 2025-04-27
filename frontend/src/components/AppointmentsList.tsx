import AppointmentsTable from "./AppointmentsTable";

const AppointmentsList = () => {
  return (
    <div className="p-4 mx-auto">
      <h1 className="uppercase font-semibold">
        List of Scheduled appointments
      </h1>
      <AppointmentsTable />
    </div>
  );
};

export default AppointmentsList;
