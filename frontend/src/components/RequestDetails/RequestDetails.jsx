import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { STATUS_LABELS } from "../../constants/statusMap";
import { deleteRequest, updateRequestStatus } from "../../api/api";
import { requestImageSrc } from "../../utils/requestImageSrc";
import "./RequestDetails.css";

function RequestDetails({ request, setRequest, onDeleted }) {
  const user = useSelector((state) => state.auth.user);

  const isClient = user?.roles.includes("client");
  const isMaster = user?.roles.includes("master");

  const handleDelete = async () => {
    await deleteRequest(request._id);
    onDeleted?.();
  };

  const handleStatusChange = async (e) => {
    const status = e.target.value;
    const { data } = await updateRequestStatus(request._id, status);
    setRequest(data);
  };

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
        src={requestImageSrc(request.image)}
        alt="Фото проблемы"
        className="request-details__image"
      />

      {request.masterComment && (
        <div className="request-details__comment">
          <h3>Комментарий мастера</h3>
          <p>{request.masterComment}</p>
        </div>
      )}

      {isClient && (
        <button type="button" onClick={handleDelete}>
          Удалить заявку
        </button>
      )}

      {isMaster && (
        <select value={request.status} onChange={handleStatusChange}>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      )}
    </section>
  );
}

export default RequestDetails;
