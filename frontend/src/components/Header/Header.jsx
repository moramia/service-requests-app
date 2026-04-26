import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";

function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="header__container">
        <img
          className="header__logo"
          src="logo.png"
          alt="Логотип сервиса"
        />
        <h1 className="header__title">Личный кабинет</h1>
          
        {user && (
          <button class="header_logout" onClick={() => dispatch(logout())}>
            Выйти ({user.name})
          </button>
        )}
      </div>
      <Navigation />
    </header>
  );
}

export default Header;
