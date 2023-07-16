import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Asegúrate de tener el archivo CSS asociado al componente


function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <Link to="/soporte">Soporte</Link>
          </li>
          <li>
            <Link to="/tiendas">Tiendas</Link>
          </li>
          <li>
            <Link to="/reportes">Reportes</Link>
          </li>
        </ul>
        <div className="profile-dropdown" onClick={toggleDropdown}>
          <div className="profile-icon">
            <i className="fas fa-user"></i>
          </div>
          <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
          {isDropdownOpen && (
            <div className="dropdown-content">
        <ul className="nav-list-mobil">
        <li>
            <Link to="/perfil">Perfil</Link>
          </li>
          <li className="hidden-on-desktop">
            <Link  to="/soporte">Soporte</Link>
          </li>
          <li className="hidden-on-desktop">
            <Link  to="/tiendas">Tiendas</Link>
          </li>
          <li className="hidden-on-desktop">
            <Link  to="/reportes">Reportes</Link>
          </li>
        </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;


