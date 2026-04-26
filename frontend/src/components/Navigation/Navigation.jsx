import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "navigation__link navigation__link--active"
      : "navigation__link";
  const user = useSelector((state) => state.auth.user);
  const isClient = user?.roles.includes("client");

  return (
    <nav className="navigation" aria-label="Основная навигация">
        <NavLink to="/requests" className={linkClass}>
          Заявки
        </NavLink>

        <NavLink to="/archive" className={linkClass}>
          Архивные
        </NavLink>

        {isClient && (<NavLink to="/create" className={linkClass}>
          Отправить заявку
        </NavLink>)}
    </nav>
  );
}

export default Navigation;