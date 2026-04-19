import { Link } from "react-router-dom";
import "./RequestDetails.css";

function RequestDetails({ request }) {
  return (
    <section className="request-details">
    <Link to="/requests">← Назад к заявкам</Link>

      <h2 className="request-details__title">
        {request.title}
      </h2>

      <p className="request-details__location">
        {request.location}
      </p>

      <p className="request-details__description">
        {request.description}
      </p>

      <p className="request-details__status">
        Статус: {request.status}
      </p>

      {request.image ? (
        <img
          src={request.image}
          alt="Фото проблемы"
          className="request-details__image"
        />
      ) :
      (
        <img
          src='/problem.jpg'
          alt="Фото проблемы"
          className="request-details__image"
        />
      )}

      {request.masterComment && (
        <div className="request-details__comment">
          <h3>Комментарий мастера</h3>
          <p>{request.masterComment}</p>
        </div>
      )}
    </section>
  );
}

export default RequestDetails;