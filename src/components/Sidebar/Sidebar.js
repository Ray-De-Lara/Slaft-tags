import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleDropdownToggle = (event) => {
    event.stopPropagation(); // Evitar la propagación del evento
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <aside className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <ul className="sidebar-list">
        <li>
          <Link to="/grid">
            <i className="fas fa-th"></i>
            <span className="icon-name">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/casa">
            <i className="fas fa-home"></i>
            <span className="icon-name">Tiendas</span>
          </Link>
        </li>
        <li>
          <Link to="/foto">
            <i className="fas fa-camera"></i>
            <span className="icon-name">Objetos</span>
          </Link>
        </li>
        <li>
          <Link to="/lapiz" onClick={handleDropdownToggle}>
            <i className="fas fa-pencil-alt"></i>
            <span className="icon-name">Modificaciones</span>
            <i className={`fas ${dropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </Link>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/teestigos-de-campana" className="dropdown-item">
                  Teestigos de campana
                </Link>
              </li>
              <li>
                <Link to="/asignasion-de-catalogo" className="dropdown-item">
                  Asignasion de catalogo
                </Link>
              </li>
              <li>
                <Link to="/estatus-de-objeto" className="dropdown-item">
                  Estatus de objeto
                </Link>
              </li>
              <li>
                <Link to="/area-de-tienda" className="dropdown-item">
                  Area de tienda
                </Link>
              </li>
              <li>
                <Link to="/colecciones" className="dropdown-item">
                  Colecciones
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/subir-archivos">
            <i className="fas fa-upload"></i>
            <span className="icon-name">Levantamientos</span>
          </Link>
        </li>
        <li>
          <Link to="/escalera">
            <i className="fas fa-stairs"></i>
            <span className="icon-name">Reportes</span>
          </Link>
        </li>
        <li>
          <Link to="/tres-personas">
            <i className="fas fa-users"></i>
            <span className="icon-name">Reportes Estadisticos</span>
          </Link>
        </li>
        <li>
          <Link to="/campanas">
            <i className="fas fa-bell"></i>
            <span className="icon-name">Campañas</span>
          </Link>
        </li>
        <li>
          <Link to="/usuarios">
            <i className="fas fa-users"></i>
            <span className="icon-name">Usuarios</span>
          </Link>
        </li>
      </ul>
      <button className="expand-button" onClick={handleToggle}>
        <i className={`fas ${expanded ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
      </button>
    </aside>
  );
}

export default Sidebar;
