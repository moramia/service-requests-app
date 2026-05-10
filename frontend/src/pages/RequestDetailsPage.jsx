import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RequestDetails from "../components/RequestDetails/RequestDetails";
import { getRequest } from "../api/api";

function RequestDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const { data } = await getRequest(id);
        if (!cancelled) {
          setRequest(data);
          setNotFound(false);
        }
      } catch {
        if (!cancelled) {
          setNotFound(true);
          setRequest(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main>
        <p>Загрузка…</p>
      </main>
    );
  }

  if (notFound || !request) {
    return (
      <main>
        <h2>Заявка не найдена</h2>
        <Link to="/requests">Вернуться к списку</Link>
      </main>
    );
  }

  return (
    <main>
      <RequestDetails
        request={request}
        setRequest={setRequest}
        onDeleted={() => navigate("/requests")}
      />
    </main>
  );
}

export default RequestDetailsPage;
