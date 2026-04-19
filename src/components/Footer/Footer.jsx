import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <h3 className="footer__title">Общежитие №1</h3>
          <address className="footer__address">
            г. Москва, проспект Вернадского, д. 86 с. 1
          </address>
          <a className="footer__phone">
            +7 (999) 123-45-67
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

