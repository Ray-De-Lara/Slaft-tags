import React, { useState } from 'react';
import './TagPopup.css';

const TagPopup = ({ onClose, onTagAdd }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  const handleSubmit = (e) => {
    e.preventDefault();
    onTagAdd({ name, color });
    onClose();
  };

  return (
    <div className="tag-popup-container">
      <div className="tag-popup">
        <div className="tag-popup-header">
          <h2>Agregar Tag</h2>
          <button className="tag-popup-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="tag-popup-content">
            <label htmlFor="tag">Tag:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            <label htmlFor="color">Color:</label>
            <input type="color" id="color" name="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <div className="tag-popup-footer">
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TagPopup;
