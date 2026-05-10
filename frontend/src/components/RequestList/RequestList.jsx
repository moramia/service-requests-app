import "./RequestList.css";
import RequestItem from "../RequestItem/RequestItem";

function RequestList({ title, requests, onOpenDetails, onRefresh }) {
  return (
    <section className="requests">
      <h2 className="requests__title">{title}</h2>

      <ul className="requests__list">
        {requests.map((request) => (
          <li key={request._id} className="requests__item">
            <RequestItem
              request={request}
              onOpenDetails={onOpenDetails}
              onRefresh={onRefresh}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RequestList;
