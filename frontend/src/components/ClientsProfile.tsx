import { useParams } from "react-router";

const ClientsProfile = () => {
  const { clientId } = useParams();

  return (
    <div>
      <p>This is the clients profile page</p>
      <p>clientId is {clientId}</p>
    </div>
  );
};

export default ClientsProfile;
