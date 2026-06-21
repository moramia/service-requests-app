import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { login } from "../actions/authActions";
import { registerUser } from "../api/api";
import "./LoginPage.css";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user && token) {
    return <Navigate to="/requests" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await registerUser({
        name: name.trim(),
        email,
        password,
      });
      dispatch(login({ user: data.user, token: data.token }));
      navigate("/requests");
    } catch (err) {
      const message =
        err?.response?.data?.message ??
        "Не удалось зарегистрироваться. Попробуйте снова.";
      setError(message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <h2 className="login-page__title">Регистрация</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error ? (
            <p className="auth-form__error" role="alert">
              {error}
            </p>
          ) : null}

          <label className="auth-form__field">
            Имя
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </label>

          <label className="auth-form__field">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className="auth-form__field">
            Пароль
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>

          <button type="submit" className="login-page__button login-page__button--master">
            Зарегистрироваться
          </button>

          <p className="auth-form__footnote">
            Уже есть аккаунт?{" "}
            <NavLink to="/login" className="auth-form__link">
              Вход
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
