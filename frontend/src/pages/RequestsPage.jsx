import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRequests } from "../api/api";
import RequestList from "../components/RequestList/RequestList";

function RequestsPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isMaster = user?.role === "master";
  const pageTitle = isMaster ? "Все заявки" : "Мои заявки";

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = useCallback(async () => {
    try {
      const { data } = await getRequests();
      const activeRequests = data.filter((request) => request.status !== "done");
      setRequests(activeRequests);
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleOpenDetails = (requestId) => {
    navigate(`/requests/${requestId}`);
  };

  return (
    <main>
      {loading ? (
        <p>Загрузка…</p>
      ) : (
        <RequestList
          title={pageTitle}
          requests={requests}
          onOpenDetails={handleOpenDetails}
          onRefresh={loadRequests}
        />
      )}
    </main>
  );
}

export default RequestsPage;
