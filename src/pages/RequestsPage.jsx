import { useNavigate } from "react-router-dom";
import RequestList from "../components/RequestList/RequestList";

function RequestsPage({ role = "client" }) {
  const navigate = useNavigate();

  const pageTitle =
    role === "master" ? "Все заявки" : "Мои заявки";

  const handleOpenDetails = (requestId) => {
    navigate(`/requests/${requestId}`);
  };

  return (
    <main>
      <RequestList
        title={pageTitle}
        onOpenDetails={handleOpenDetails}
      />
    </main>
  );
}

export default RequestsPage;