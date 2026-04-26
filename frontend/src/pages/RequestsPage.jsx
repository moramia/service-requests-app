import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RequestList from "../components/RequestList/RequestList";

function RequestsPage() {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const isMaster = user?.roles.includes("master");
  const pageTitle = isMaster ? "Все заявки" : "Мои заявки";

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