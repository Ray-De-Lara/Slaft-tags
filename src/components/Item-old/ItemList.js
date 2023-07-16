import React, { useState, useEffect } from 'react';
import './ItemList.css';
import loading from '../../assets/images/pageload-spinner.gif';

function ItemList({ id, codigo, rank, area, no_cont, no_obj, nombre_obj, clave_obj, foto, ancho, alto, fondo, tags }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return (
      <tr>
        <td>
        <img className="loading-image" src={loading} alt="Cargando..." />        </td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>
          <div className="tag-container">
            <div className="tag" style={{ backgroundColor: '#f2f2f2' }}>***</div>
            <div className="tag" style={{ backgroundColor: '#f2f2f2' }}>***</div>
            <div className="tag" style={{ backgroundColor: '#f2f2f2' }}>***</div>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        <img className="list-image" src={foto} alt="Imagen" />
      </td>
      <td>{codigo}</td>
      <td>{rank}</td>
      <td>{nombre_obj}</td>
      <td>{clave_obj}</td>
      <td>
        <div className="tag-container">
          {tags.map((tag, index) => (
            <div className="tag" style={{ backgroundColor: tag.color }} key={index}>
              {tag.tag}
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
}

export default ItemList;
