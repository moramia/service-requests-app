import { useNavigate } from "react-router-dom";
import RequestForm from "../components/RequestForm/RequestForm";

function CreateRequestPage() {
  const navigate = useNavigate();

  return (
    <main>
      <RequestForm onCreated={() => navigate("/requests")} />
    </main>
  );
}

export default CreateRequestPage;
