import "./RequestList.css";
import RequestItem from "../RequestItem/RequestItem";
import { useSelector } from "react-redux";


function RequestList({ title, onOpenDetails }) {
  const requests = useSelector((state) => state.requests);

  return (
    <section className="requests">
      <h2 className="requests__title">{title}</h2>

      <ul className="requests__list">
        {requests.map((request) => (
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
};

export default RequestList;