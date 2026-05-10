import { useSelector } from "react-redux";
import "./RequestItem.css";
import { STATUS_LABELS } from "../../constants/statusMap";
import { deleteRequest, updateRequestStatus } from "../../api/api";

const RequestItem = ({ request, onOpenDetails, onRefresh }) => {
  const user = useSelector((state) => state.auth.user);
  const isClient = user?.roles.includes("client");
  const isMaster = user?.roles.includes("master");

  const handleDelete = async (e) => {
    e.stopPropagation();
    await deleteRequest(request._id);
    onRefresh?.();
  };

  const handleStatusChange = async (e) => {
    e.stopPropagation();
    await updateRequestStatus(request._id, e.target.value);
    onRefresh?.();
  };

  return (
    <div
      className="request__card"
      role="presentation"
      onClick={() => onOpenDetails(request._id)}
    >
      <div className="request__info">
        <h3 className="request__title">{request.title}</h3>
        <span className="request__location">{request.location}</span>
        <p className="request__description">{request.description}</p>
        <span className={`request__status request__status--${request.status}`}>
          {STATUS_LABELS[request.status]}
        </span>
      </div>

      {(isClient || isMaster) && (
        <div className="request__card-actions" onClick={(e) => e.stopPropagation()}>
          {isClient && (
            <button type="button" onClick={handleDelete}>
              Удалить
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
        </div>
      )}
    </div>
  );
};

export default RequestItem;
