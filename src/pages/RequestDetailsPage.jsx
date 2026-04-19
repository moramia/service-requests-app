import { useParams, Link } from "react-router-dom";
import RequestDetails from "../components/RequestDetails/RequestDetails";


const mockRequests = [
  {
    id: "1",
    title: "Не работает розетка",
    description: "Розетка искрит и не подаёт питание",
    location: "Комната 214",
    status: "подано",
    image: null,
    masterComment: "",
  },
  {
    id: "2",
    title: "Поломка кондиционера",
    description: "Кондиционер не включается",
    location: "Комната 505",
    status: "в обработке",
    image: "/example.jpg",
    masterComment: "Ожидается доставка деталей, необходимых для починки",
  },
];

function RequestDetailsPage() {
  const { id } = useParams();

  const request = mockRequests.find(
    (item) => item.id === id
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