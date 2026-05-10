import { useEffect, useRef, useState } from "react";
import { createRequest } from "../../api/api";
import "./RequestForm.css";

function RequestForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl("");
      return undefined;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !location.trim()) {
      return;
    }

    try {
      await createRequest({
        title,
        description,
        location,
        userId: "test-user",
        imageFile: imageFile || undefined,
      });
      setTitle("");
      setDescription("");
      setLocation("");
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onCreated?.();
    } catch {}
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

        <label className="request-form__field">
          Фото проблемы (необязательно)
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="request-form__file"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          />
        </label>

        {imagePreviewUrl ? (
          <img
            src={imagePreviewUrl}
            alt="Предпросмотр"
            className="request-form__preview"
          />
        ) : null}

        <button type="submit" className="request-form__submit">
          Отправить
        </button>
      </form>
    </section>
  );
}

export default RequestForm;
