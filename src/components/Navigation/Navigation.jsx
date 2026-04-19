import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({ role = "client" }) {
  const linkClass = ({ isActive }) =>
    isActive
      ? "navigation__link navigation__link--active"
      : "navigation__link";

  return (
    <nav className="navigation" aria-label="Основная навигация">
      {role === "client" && (
        <>
          <NavLink to="/requests" className={linkClass}>
            Мои заявки
          </NavLink>

          <NavLink to="/archive" className={linkClass}>
            Архивные
          </NavLink>

          <NavLink to="/create" className={linkClass}>
            Отправить заявку
          </NavLink>
        </>
      )}

      {role === "master" && (
        <>
          <NavLink to="/requests" className={linkClass}>
            Все заявки
          </NavLink>

          <NavLink to="/archive" className={linkClass}>
            Архивные
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Navigation;