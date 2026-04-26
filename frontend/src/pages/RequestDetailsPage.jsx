import { useParams, Link } from "react-router-dom";
import RequestDetails from "../components/RequestDetails/RequestDetails";
import { useSelector } from "react-redux";

function RequestDetailsPage() {
  const { id } = useParams();
  const requests = useSelector((state) => state.requests.requests);
  const request = requests.find(
    (item) => item.id === Number(id)
  );

  if (!request) {
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
      />
    </main>
  );
}

export default RequestDetailsPage;