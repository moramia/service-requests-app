import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequests } from "../api/api";
import RequestList from "../components/RequestList/RequestList";

function ArchivePage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = useCallback(async () => {
    try {
      const { data } = await getRequests();
      const doneOnly = data.filter((request) => request.status === "done");
      setRequests(doneOnly);
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
          title="Архив заявок"
          requests={requests}
          onOpenDetails={handleOpenDetails}
          onRefresh={loadRequests}
        />
      )}
    </main>
  );
}

export default ArchivePage;
