import "./RequestItem.css";
import { STATUS_LABELS } from "../../constants/statusMap"

const RequestItem = ({
  id,
  title,
  description,
  location,
  status,
  onOpenDetails,
}) => {
  return (
    <div
      className="request__card"
      onClick={() => onOpenDetails(id)}
    >
      <div className="request__info">
        <h3 className="request__title">{title}</h3>
        <span className="request__location">{location}</span>
        <p className="request__description">{description}</p>
        <span className={`request__status request__status--${status}`}>
          {STATUS_LABELS[status]}
        </span>
      </div>
    </div>
  );
};

export default RequestItem;