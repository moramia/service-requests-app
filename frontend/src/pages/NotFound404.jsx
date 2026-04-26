import { Link } from "react-router-dom";
import "./NotFound404.css";

function NotFound404() {
  return (
    <main className="not-found">
      <h2 className="not-found__title">404 - Страница не найдена</h2>
      <p className="not-found__text">
        Возможно, вы ошиблись в адресе.
      </p>
      <Link to="/requests" className="not-found__link">
        Вернуться к заявкам
      </Link>
    </main>
  );
}

export default NotFound404;