import React, { useState, useEffect } from 'react';
import '../../assets/bootstrap/feather.min.css';
import loading from '../../assets/images/pageload-spinner.gif';

function Item({
  clave_obj,
  codigo,
  foto,
  id,
  no_cont,
  no_obj,
  nombre_obj,
  tags,
  rank,
  area,
  ancho,
  alto,
  fondo,
  selectedTags,
  onItemSelection,
  onTagSelection,
  removeItemTags,
  selectedItemsTags,
  onAddTagsToItems
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTagsTemp, setSelectedTagsTemp] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
      console.log(tags)
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    onItemSelection(id, isChecked);

    if (isChecked) {
      setSelectedTagsTemp(selectedTags);
    } else {
      setSelectedTagsTemp([]);
      removeItemTags(id);
    }
  };

  const handleTagSelection = (tag) => {
    const isSelected = selectedItemsTags.some((selectedTag) => selectedTag.tag === tag.tag);
    const updatedTags = isSelected
      ? selectedItemsTags.filter((selectedTag) => selectedTag.tag !== tag.tag)
      : [...selectedItemsTags, tag];

    if (isSelected) {
      removeItemTags(id);
    } else {
      onTagSelection(updatedTags);
    }
  };

  const handleAddTagsToItems = () => {
    const itemIds = [id]; // Aquí se obtienen los ids de los elementos seleccionados, en este caso, solo se pasa el id del elemento actual
    onAddTagsToItems(selectedTagsTemp, itemIds);
    setSelectedTagsTemp([]);
  };

  if (isLoading) {
    return (
      <div className="item card card-style skeleton-loader">
        <div className="div-title">
          <p className="item-key">Loading...</p>
          <div className="checkpoint-style form-check">
            <input className="form-check-input" type="checkbox" id="selection" disabled />
          </div>
        </div>
        <div className="item-image">
          <span className="item-label">***</span>
          <div className="item-rating">***</div>
          <div className="skeleton-image">
            <img className="loading-image" src={loading} alt="Cargando..." />
          </div>
        </div>
        <div className="item-details">
          <p className="item-name">Nombre: Loading...</p>
          <p className="item-type">Tipo: Loading...</p>
          <p className="item-area">Área: Loading...</p>
          <p className="item-measures">Medidas: Loading...</p>
          <div className="flag-container">
            <div className="flag-icons">
              <span className="feather-icon icon-flag icon-sm icon-blue"></span>
              <span className="feather-icon icon-flag icon-sm"></span>
              <span className="feather-icon icon-flag icon-sm"></span>
              <span className="feather-icon icon-flag icon-sm"></span>
              <span className="feather-icon icon-flag icon-sm"></span>
            </div>
          </div>
          <div className="item-tags">
            {tags.map((tag, index) => (
              <div
                className="tag tag-gray"
                key={index}
              >
                <span className="tag-text">Loading...</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const combinedTags = [...tags, ...selectedTagsTemp];

  return (
    <div className="item card card-style">
      <div className="div-title">
        <p className="item-key">{clave_obj}</p>
        <div className="checkpoint-style form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="selection"
            checked={selectedItemsTags && selectedItemsTags.length > 0}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
      <div className="item-image">
        <span className="item-label">{rank}</span>
        <div className="item-rating">{fondo}</div>
        <img src={foto} alt="Imagen" />
      </div>
      <div className="item-details">
        <p className="item-name">Nombre: {nombre_obj}</p>
        <p className="item-type">Tipo: {codigo}</p>
        <p className="item-area">Área: {area}</p>
        <p className="item-measures">Medidas: {ancho}x{alto}x{fondo}</p>
        <div className="flag-container">
          <div className="flag-icons">
            <span className="feather-icon icon-flag icon-sm icon-blue"></span>
            <span className="feather-icon icon-flag icon-sm"></span>
            <span className="feather-icon icon-flag icon-sm"></span>
            <span className="feather-icon icon-flag icon-sm"></span>
            <span className="feather-icon icon-flag icon-sm"></span>
          </div>
        </div>
        <div className="item-tags">
          {combinedTags.map((tag, index) => (
            <div
              className="tag tag-gray"
              style={{ backgroundColor: tag.color }}
              onClick={() => handleTagSelection(tag)}
              key={index}
            >
              <span className="tag-text">{tag.tag || tag.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Item;
