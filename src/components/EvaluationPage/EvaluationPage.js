import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../EvaluationPage-old/EvaluationPage.css';
import '../../assets/bootstrap/feather.min.css';

const MyComponent = ({ tagsToAdd, apiTags }) => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectAllText, setSelectAllText] = useState('Seleccionar todos');
  const [sortBy, setSortBy] = useState({
    field: '', // Campo por el cual se ordenará
    order: 'asc', // Orden ascendente por defecto
    orderOptions: [
      { value: 'asc', label: 'Ascendente' },
      { value: 'desc', label: 'Descendente' },
    ],
  });
  
  

  useEffect(() => {
    fetchData();
  }, []); // Ejecutar solo una vez al montar el componente

  useEffect(() => {
    fetchData();
  }, [sortBy]); // Ejecutar cuando cambie sortBy

  const fetchData = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const coleccion = urlParams.get('coleccion');
  
      const response = await axios.post('https://slaft.retailmkt.mx/SLMKT01/slaft_app/SlaftCamp_ws/obtenerObjetosTags_byColeccion.php', {
        coleccion: coleccion
      });
  
      const data = response.data;
      let sortedData = sortData(data, sortBy);
  
      setData(sortedData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sortData = (data, sortBy) => {
    const sortedData = [...data];
  
    sortedData.sort((a, b) => {
      if (sortBy.field === 'codigo') {
        return a.codigo.localeCompare(b.codigo) * (sortBy.order === 'asc' ? 1 : -1);
      } else if (sortBy.field === 'clave_obj') {
        return a.clave_obj.localeCompare(b.clave_obj) * (sortBy.order === 'asc' ? 1 : -1);
      } else if (sortBy.field === 'fecha_edicion') {
        const dateA = new Date(a.fecha_edicion);
        const dateB = new Date(b.fecha_edicion);
        return (dateA - dateB) * (sortBy.order === 'asc' ? 1 : -1);
      }
      return 0;
    });
  
    return sortedData;
  };

  const handleSelectItem = (item) => {
    setSelectedItems((prevSelectedItems) => {
      const selectedItemIds = prevSelectedItems.map((selectedItem) => selectedItem.id);

      if (selectedItemIds.includes(item.id)) {
        return prevSelectedItems.filter((selectedItem) => selectedItem.id !== item.id);
      } else {
        return [...prevSelectedItems, item];
      }
    });

    if (selectedItems.length !== data.length - 1) {
      setSelectAllText('Seleccionar todos');
    }
  };

  const handleApplySelectedTags = async () => {
    const updatedData = data.map((item) => {
      if (selectedItems.map((selectedItem) => selectedItem.id).includes(item.id)) {
        // const existingTags = item.tags.split(',');
        const updatedTags = tagsToAdd.map((tag) => tag.name);
        const updatedColors = tagsToAdd.map((tag) => tag.color);

        const updatedItem = {
          ...item,
          newTags: updatedColors.map((color, index) => ({ name: updatedTags[index], color })),
        };

        return updatedItem;
      }
      return item;
    });

    await applyTagsToObjects(updatedData);
    fetchData();
  };

  const applyTagsToObjects = async (data) => {
    try {
      const requestData = data
        .filter((item) => item.newTags !== undefined)
        .map((item) => {
          const existingTags = new Set(item.tags.split(','));
          const updatedTagsSet = new Set([...existingTags, ...item.newTags.map((tag) => tag.name)]);
          const updatedTags = Array.from(updatedTagsSet).join(',');

          return {
            id: item.id,
            tags: updatedTags,
            rank: item.rank,
            colores: '#fff',
          };
        });

      console.log('Datos enviados al endpoint:', requestData);

      await axios.post('https://slaft.retailmkt.mx/SLMKT01/slaft_app/SlaftCamp_ws/editarObjetosTags.php', {
        objetos: requestData,
      });

      // Realizar acciones adicionales con la respuesta del endpoint
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const applyTagsToObjectsFromTags = async (data) => {
    try {
      const requestData = data
        .filter((item) => item.tags !== undefined)
        .map((item) => ({
          id: item.id,
          tags: item.tags,
          rank: item.rank,
          colores: '#fff',
        }));

      console.log('Datos enviados al endpoint:', requestData);

      await axios.post('https://slaft.retailmkt.mx/SLMKT01/slaft_app/SlaftCamp_ws/editarObjetosTags.php', {
        objetos: requestData,
      });

      // Realizar acciones adicionales con la respuesta del endpoint
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelectAll = () => {
    if (!selectAllChecked || selectedItems.length !== data.length) {
      setSelectedItems(data);
      setSelectAllText('Deseleccionar todos');
    } else {
      setSelectedItems([]);
      setSelectAllText('Seleccionar todos');
    }
    setSelectAllChecked(!selectAllChecked);
  };

  const handleSortByChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'field') {
      setSortBy({
        ...sortBy,
        field: value,
      });
    } else if (name === 'order') {
      setSortBy((prevSortBy) => ({
        ...prevSortBy,
        order: value,
      }));
    }
  };
  

  const tagActionsStyle = {
    marginTop: tagsToAdd.length > 0 ? '-30px' : '0px',
    marginBottom: tagsToAdd.length> 0 ? '-30px' : '0px'
  };

  const dividerStyle = {
    marginTop: tagsToAdd.length > 0 ? '40px' : '10px',
  };

  const handleRemoveTag = async (item, tagName) => {
    const updatedData = data.map((dataItem) => {
      if (dataItem.id === item.id) {
        const existingTags = dataItem.tags.split(',');
        const updatedTags = existingTags.filter((tag) => tag !== tagName);

        const updatedItem = {
          ...dataItem,
          tags: updatedTags.join(','),
        };

        return updatedItem;
      }
      return dataItem;
    });

    setData(updatedData);

    await applyTagsToObjectsFromTags(updatedData);
  };

  return (
    <div>
      <div className="tag-actions" style={tagActionsStyle}>
        <div className="apply-selected-section">
          <div className="apply-selected-text" onClick={handleApplySelectedTags}>
            Aplicar a objetos seleccionados
          </div>
        </div>
        <div className="select-all-section">
          <div className="select-all-text" onClick={handleSelectAll}>
            {selectAllText}
          </div>
        </div>

        <div className='order-box-container' style={{ position: 'absolute', top: 110, right: 70 }}>
          <select name="field" value={sortBy.field} className="set-admin-order-box" onChange={handleSortByChange}>
            <option value="">Ordenar por</option>
            <option value="codigo">Tienda(ascendente)</option>
            <option value="-codigo">Tienda (descendente)</option>
            <option value="clave_obj">Clave (ascendente)</option>
            <option value="-clave_obj">Clave (descendente)</option>
            <option value="clave_obj">Fecha (ascendente)</option>
            <option value="-clave_obj">Fecha (descendente)</option>
          </select>
        </div>

      </div>
      <hr className="divider" style={dividerStyle} />

      <div className="item-container">
        {data.length > 0 ? (
          data.map((item, index) => {
            const tagsArray = item.tags.split(',');
            return (
              <div className="item card card-style" key={index}>
                <div className="div-title">
                  <p className="item-key">{item.clave_obj} </p>
                  <input
                    type="checkbox"
                    checked={selectedItems.map((selectedItem) => selectedItem.id).includes(item.id)}
                    onChange={() => handleSelectItem(item)}
                  />
                </div>
                <div className="item-image">
                  <div className="image-wrapper" >
                    <img src={item.foto} alt={item.nombre_obj} style={{ paddingBottom: '75%' }}/>
                    <span className="item-label">{item.codigo}</span>
                    <div className="item-rating">{item.no_cont}</div>
                  </div>
                </div>
                <div className="item-details">
                  <p className="item-name">Nombre de objeto: {item.nombre_obj}</p>
                  <p className="item-type">Clave: {item.clave_obj}</p>
                  <p className="item-type">Tipo: </p>
                  <p className="item-area">Área: {item.area}</p>
                  <p className="item-measures">
                    Medidas: {item.ancho}x{item.alto}x{item.fondo}
                  </p>
                </div>

                <div className="item-tags">
                  {tagsArray.length > 0 && (
                    <div className="tag-container">
                      {tagsArray.filter(tag => tag !== "").map((tag, tagIndex) => {
                        const matchedTag = apiTags.find((apiTag) => apiTag.name === tag);
                        const backgroundColor = matchedTag ? matchedTag.color : '';
                        return (
                          <div key={tagIndex} className="tag tag-${tag.color}" style={{ backgroundColor }}>
                            {tag}
                            <span className="close-icon" onClick={() => handleRemoveTag(item, tag)}>&#10006;</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {item.newTags && item.newTags.length > 0 && (
                    <div className="tag-container">
                      {item.newTags.map((tag, newTagIndex) => (
                        <div key={newTagIndex} className="tag" style={{ backgroundColor: tag.color }}>
                          {tag.name}
                          <span className="close-icon" onClick={() => handleRemoveTag(item, tag.name)}>&#10006;</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No hay datos</p>
        )}
      </div>
    </div>
  );
};

export default MyComponent;
