import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Evaluation.css';
import EvaluationList from '../EvaluationPage/EvaluationPage';
import EvaluationGrid from '../EvaluationTable/EvaluationTable';
import TagPopup from '../TagPopup/TagPopup';
import '../EvaluationPage-old/EvaluationPage.css';

const Evaluation = () => {
  const [viewMode, setViewMode] = useState('List');
  const [isTagPopupOpen, setIsTagPopupOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [apiTags, setApiTags] = useState([]);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://slaft.retailmkt.mx/SLMKT01/slaft_app/SlaftCamp_ws/obtener_tags.php'
        );
  
        const formattedTags = response.data.map((tag) => ({
          name: tag.tag,
          color: tag.color
        }));
  
        setApiTags(formattedTags);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, []);

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'List' ? 'Grid' : 'List'));
  };

  const handleOpenTagPopup = () => {
    setIsTagPopupOpen(true);
  };

  const handleCloseTagPopup = () => {
    setIsTagPopupOpen(false);
  };

  const handleAddTag = (tag) => {
    if (selectedTags.some((selectedTag) => selectedTag.name === tag.name)) {
      return;
    }

    setTags((prevTags) => [...prevTags, tag]);
  };

  const handleTagClick = (tag) => {
    if (selectedTags.some((selectedTag) => selectedTag.name === tag.name)) {
      return;
    }

    setSelectedTags((prevSelectedTags) => [...prevSelectedTags, tag]);
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.filter((selectedTag) => selectedTag.name !== tag.name)
    );
  };

  return (
    <div className="evaluation-page">
    <div className="title-section">
      <div className="title-icon">
        <i className="fas fa-book"></i>
      </div>
      <h1 className="title">COLECCIONES</h1>
    </div>
    <hr className="divider" />
    <div className='view-order-section'>
        <div className='view-section'>
          <div className="set-admin-tags-box">
            <div className="admin-tags-text" onClick={toggleViewMode}>{viewMode}</div>
          </div>

        </div>
      </div>
      <p className="label-text">Etiquetas Disponibles</p>
    <div className="label-section">
  
      <div className="set-tags-section">
        {apiTags.map((tag, index) => (
          <div
            className='tag set-tags-box'
            style={{ backgroundColor: tag.color }}
            key={index}
            onClick={() => handleTagClick(tag)}
          >
            <div className="set-tags-text">{tag.name}</div>
          </div>
        ))}
  
        {tags.map((tag, index) => (
          <div
            className="tag set-tags-box"
            style={{ backgroundColor: tag.color }}
            key={index}
            onClick={() => handleTagClick(tag)}
          >
            <div className="set-tags-text">{tag.name}</div>
          </div>
        ))}
      </div>
  
      <div className="set-admin-tags-box" onClick={handleOpenTagPopup}>
        <div className="plus-icon">
          <i className="fas fa-plus"></i>
        </div>
        <div className="tag-icon">
          <i className="fas fa-tag"></i>
        </div>
        <div className="admin-tags-text">Etiquetas</div>
      </div>

      </div>


    {selectedTags.length > 0 && <hr className="divider" />}

    <div className="tag-container">
        <div className="tag-container-inner">
          {selectedTags.map((tag, index) => (
            <div
              className={`tag tag-${tag.color} fade-in`}
              style={{ backgroundColor: tag.color }}
              key={index}
              id={`tag-${tag.name}`}
            >
              <span className="tag-text">{tag.name}</span>
              <span className="close-icon" onClick={() => handleRemoveTag(tag)}>
                &#10006;
              </span>
            </div>
          ))}
        </div>

      </div>
    {/* <EvaluationList tagsToAdd={selectedTags} apiTags={apiTags}/> */}
            
        {viewMode === 'List' ? (
        <EvaluationList
          tagsToAdd={selectedTags}
          apiTags={apiTags}
        />
      ) : (
        <EvaluationGrid
          tagsToAdd={selectedTags}
          apiTags={apiTags}
        />
      )} 
  
    {isTagPopupOpen && <TagPopup onClose={handleCloseTagPopup} onTagAdd={handleAddTag} />}
  </div>
  
  );
};

export default Evaluation;
