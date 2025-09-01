import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header">
        <Link to="/">
          <div className="plogo">
            <span>API ФНС</span>
            <span className="mini">Система поиска сведений из ЕГРЮЛ/ЕГРИП</span>
          </div>
        </Link>
        <nav>
          <Link to="/docs">
            Документация
          </Link>
          <Link to="https://kaurcev.dev" target="_blank">
            Разработчик
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;