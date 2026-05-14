import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const linkClass = ({ isActive }) =>
    isActive
      ? "navigation__link navigation__link--active"
      : "navigation__link";

  const authed = !!(user && token);
  const isClient = user?.role === "client";

  return (
    <nav className="navigation" aria-label="Основная навигация">
      {!authed ? (
        <>
          <NavLink to="/login" className={linkClass}>
            Вход
          </NavLink>
          <NavLink to="/register" className={linkClass}>
            Регистрация
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/requests" className={linkClass}>
            Заявки
          </NavLink>
          <NavLink to="/archive" className={linkClass}>
            Архивные
          </NavLink>
          {isClient ? (
            <NavLink to="/create" className={linkClass}>
              Отправить заявку
            </NavLink>
          ) : null}
          <button
            type="button"
            className="navigation__link navigation__logout"
            onClick={() => dispatch(logout())}
          >
            Выйти
          </button>
        </>
      )}
    </nav>
  );
}

export default Navigation;
