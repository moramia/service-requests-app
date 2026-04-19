import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img 
          className="header__logo" 
          src="logo.png" 
          alt="Логотип сервиса"
        />
        <h1 className="header__title">Личный кабинет</h1>
      </div>

      <Navigation />
    </header>
  );
}

export default Header;
