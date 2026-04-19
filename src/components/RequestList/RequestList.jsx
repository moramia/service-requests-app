import "./RequestList.css";
import RequestItem from "../RequestItem/RequestItem";

const requestsData = [
  {
    id: 1,
    title: "Не работает розетка",
    description: "Розетка искрит и не подаёт питание",
    location: "Комната 214",
    status: "подано",
  },
  {
    id: 2,
    title: "Поломка кондиционера",
    description: "Кондиционер не включается",
    location: "Комната 505",
    status: "в обработке",
  },
];

function RequestList({ title, onOpenDetails }) {
  return (
    <section className="requests">
      <h2 className="requests__title">{title}</h2>

      <ul className="requests__list">
        {requestsData.map((request) => (
          <li key={request.id} className="requests__item">
            <RequestItem
              id={request.id}
              title={request.title}
              description={request.description}
              location={request.location}
              status={request.status}
              onOpenDetails={onOpenDetails}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RequestList;