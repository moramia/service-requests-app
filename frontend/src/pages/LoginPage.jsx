import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../actions/authActions";
import { clientUser, masterUser } from "../constants/mockUser";
import "./LoginPage.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const handleLogin = (user) => {
    dispatch(login(user));
    navigate("/requests");
  };

  if (user) {
    return <Navigate to="/requests" />;
  }
  return (
    <div className="login-page">
      <div className="login-page__container">
        <h2 className="login-page__title">Вход в систему</h2>

        <div className="login-page__buttons">

          <button
            className="login-page__button login-page__button--client"
            onClick={() => handleLogin(clientUser)}
          >
            Войти как Client
          </button>

          <button
            className="login-page__button login-page__button--master"
            onClick={() => handleLogin(masterUser)}
          >
            Войти как Master
          </button>
        </div>
      </div>
    </div>
  );
}
