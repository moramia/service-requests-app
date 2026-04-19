import { useDispatch } from "react-redux";
import { removeRequest, updateStatus } from "../../actions/requestActions";
import { STATUS_LABELS } from "../../constants/statusMap"
import { Link } from "react-router-dom";
import "./RequestDetails.css";

function RequestDetails({ request, role = 'master' }) {
  const dispatch = useDispatch();

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
        Статус: {STATUS_LABELS[request.status]}
      </p>

      <img
        src={request.image || '/problem.jpg'}
        alt="Фото проблемы"
        className="request-details__image"
      />

      {request.masterComment && (
        <div className="request-details__comment">
          <h3>Комментарий мастера</h3>
          <p>{request.masterComment}</p>
        </div>
      )}

      {role === "client" && (
        <button
          onClick={() => dispatch(removeRequest(request.id))}
        >
          Удалить заявку
        </button>
      )}

      {role === "master" && (
        <>
          <select
            value={request.status}
            onChange={(e) =>
              dispatch(updateStatus(request.id, e.target.value))
            }
          >
            <option value="submitted">Подано</option>
            <option value="in-progress">В обработке</option>
            <option value="rejected">Отклонено</option>
            <option value="done">Исполнено</option>
          </select>
        </>
      )}
    </section>
  );
};

export default RequestDetails;