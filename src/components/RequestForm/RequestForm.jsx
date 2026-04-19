import { useState } from "react";
import "./RequestForm.css";

function RequestForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      location,
    });

    // очистка формы
    setTitle("");
    setDescription("");
    setLocation("");
  };

  return (
    <section className="from-creation">
      <h2 className="request-form__title">Отправить заявку</h2>
      <form className="request-form" onSubmit={handleSubmit}>
        <label className="request-form__field">
          Заголовок
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label className="request-form__field">
          Описание проблемы
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label className="request-form__field">
          Помещение
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="request-form__submit">
          Отправить
        </button>
      </form>
    </section>
  );
}

export default RequestForm;