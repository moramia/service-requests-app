import './RequestItem.css';

const statusClassMap = {
  "подано": "submitted",
  "в обработке": "in-progress",
  "отклонено": "rejected",
  "исполнено": "done"
};

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
        <span className={`request__status request__status--${statusClassMap[status]}`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default RequestItem;